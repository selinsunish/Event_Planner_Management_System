import uuid
import json
import logging
from datetime import datetime
from typing import Dict, Any, Optional

from schemas import (
    EventCreateRequest, 
    EventPlanResponse, 
    BudgetItem, 
    TimelineSlot, 
    VendorChecklistItem, 
    AiIdeaItem
)
from gemini_config import get_gemini_client, GEMINI_MODEL

logger = logging.getLogger("planner_engine")
logging.basicConfig(level=logging.INFO)

CURRENCY_SYMBOLS = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "INR": "₹",
    "CAD": "$",
    "AUD": "$"
}

def generate_ai_event_blueprint(event: EventCreateRequest) -> EventPlanResponse:
    """
    Main orchestration entrypoint:
    Tries Gemini generation using official google-genai SDK.
    If ANY failure occurs (Permission denied, invalid API key, quota exceeded,
    rate limits, service errors, empty responses, or validation issues),
    it automatically falls back to an intelligent, event-tailored local template engine.
    """
    plan_id = f"plan_{uuid.uuid4().hex[:8]}"
    budget = float(event.totalBudget)
    guests = int(event.guestCount)
    sym = CURRENCY_SYMBOLS.get(event.currency, "$")
    cost_per_guest = round(budget / max(guests, 1), 2)
    created_at = datetime.utcnow().isoformat() + "Z"

    # 1. Attempt Gemini Generation
    client = get_gemini_client()
    if client:
        try:
            logger.info("Calling Gemini API with official google-genai SDK...")
            gemini_plan = _call_gemini_with_resilience(client, event, plan_id, sym, cost_per_guest, created_at)
            if gemini_plan:
                logger.info(f"Successfully generated blueprint with Gemini for '{event.eventName}'")
                return gemini_plan
            else:
                logger.warning("Gemini returned invalid or empty structured data. Engaging local fallback.")
        except Exception as e:
            # Handles: PermissionDenied, QuotaExceeded, RateLimit, 401, 403, 404, 429, 500, network errors
            logger.warning(f"Gemini API request failed ({type(e).__name__}: {str(e)}). Engaging local fallback engine.")
    else:
        logger.info("No Gemini client available. Engaging local structured template engine.")

    # 2. Local Structured Template Fallback Engine (Tailored specifically according to event type and parameters)
    return _generate_event_tailored_fallback(event, plan_id, sym, cost_per_guest, created_at)


def _call_gemini_with_resilience(client, event: EventCreateRequest, plan_id: str, sym: str, cost_per_guest: float, created_at: str) -> Optional[EventPlanResponse]:
    """
    Queries Gemini model with strict JSON schema instructions and validates response structure.
    Returns None if any validation check fails.
    """
    system_instruction = (
        "You are an expert event planning director and financial estimator. "
        "Create a realistic, tailored, and comprehensive event plan in JSON. "
        "Strictly output a single JSON object with the following schema:\n"
        "{\n"
        '  "title": "string",\n'
        '  "tagline": "string",\n'
        '  "overview": "string",\n'
        '  "budgetBreakdown": [{"category": "string", "amount": number, "percentage": number, "status": "string", "notes": "string"}],\n'
        '  "timeline": [{"time": "string", "title": "string", "description": "string", "milestone": "string"}],\n'
        '  "vendorChecklist": [{"id": "string", "task": "string", "category": "string", "deadline": "string", "status": "string"}],\n'
        '  "aiIdeas": [{"title": "string", "desc": "string"}]\n'
        "}"
    )

    prompt = f"""
Event Details:
- Name: {event.eventName}
- Type: {event.eventType}
- Target Date: {event.eventDate}
- Location: {event.eventLocation}
- Guest Count: {event.guestCount}
- Total Budget: {sym}{event.totalBudget} {event.currency}
- Theme: {event.theme}
- Venue Layout: {event.venueType}
- Food & Drinks: {event.foodPreferences}
- Decor & Florals: {event.decorationPreferences}
- Special Notes: {event.additionalRequirements}

Generate a meticulously balanced budget breakdown that sums up to approximately {event.totalBudget}, 
a chronological run-of-show timeline, actionable vendor checklist, and 4 creative personalized ideas.
"""

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config={
            "system_instruction": system_instruction,
            "response_mime_type": "application/json"
        }
    )

    # Validate non-empty response
    if not response or not response.text or not response.text.strip():
        logger.warning("Gemini returned an empty text response.")
        return None

    # Parse and validate JSON structure
    try:
        data = json.loads(response.text)
    except json.JSONDecodeError as jde:
        logger.warning(f"Failed to parse Gemini response as JSON: {jde}")
        return None

    if not isinstance(data, dict):
        logger.warning("Gemini JSON response is not a dictionary.")
        return None

    # Validate essential keys and collections
    required_keys = ["budgetBreakdown", "timeline", "vendorChecklist", "aiIdeas"]
    for key in required_keys:
        if key not in data or not isinstance(data[key], list) or len(data[key]) == 0:
            logger.warning(f"Gemini response missing or invalid key: '{key}'")
            return None

    # Validate items inside arrays
    budget_items = []
    for item in data["budgetBreakdown"]:
        if not isinstance(item, dict) or "category" not in item or "amount" not in item:
            return None
        budget_items.append(BudgetItem(
            category=str(item.get("category", "General")),
            amount=float(item.get("amount", 0)),
            percentage=int(item.get("percentage", 0)),
            status=str(item.get("status", "Allocated")),
            notes=str(item.get("notes", ""))
        ))

    timeline_items = []
    for slot in data["timeline"]:
        if not isinstance(slot, dict) or "title" not in slot or "time" not in slot:
            return None
        timeline_items.append(TimelineSlot(
            time=str(slot.get("time", "")),
            title=str(slot.get("title", "")),
            description=str(slot.get("description", "")),
            milestone=str(slot.get("milestone", "Milestone"))
        ))

    vendor_items = []
    for idx, v in enumerate(data["vendorChecklist"]):
        if not isinstance(v, dict) or "task" not in v:
            return None
        vendor_items.append(VendorChecklistItem(
            id=str(v.get("id", f"v_{idx+1}")),
            task=str(v.get("task", "")),
            category=str(v.get("category", "General")),
            deadline=str(v.get("deadline", "TBD")),
            status=str(v.get("status", "pending"))
        ))

    idea_items = []
    for idea in data["aiIdeas"]:
        if not isinstance(idea, dict) or "title" not in idea:
            return None
        idea_items.append(AiIdeaItem(
            title=str(idea.get("title", "")),
            desc=str(idea.get("desc", ""))
        ))

    return EventPlanResponse(
        id=plan_id,
        title=data.get("title") or event.eventName,
        tagline=data.get("tagline") or f"Curated celebration in {event.eventLocation}",
        overview=data.get("overview") or f"A personalized blueprint for {event.guestCount} guests.",
        eventName=event.eventName,
        eventType=event.eventType,
        eventDate=event.eventDate,
        eventLocation=event.eventLocation,
        guestCount=event.guestCount,
        totalBudget=event.totalBudget,
        costPerGuest=cost_per_guest,
        currency=event.currency,
        currencySymbol=sym,
        venueType=event.venueType,
        foodPreferences=event.foodPreferences or "",
        decorationPreferences=event.decorationPreferences or "",
        additionalRequirements=event.additionalRequirements or "",
        budgetBreakdown=budget_items,
        timeline=timeline_items,
        vendorChecklist=vendor_items,
        aiIdeas=idea_items,
        createdAt=created_at
    )


def _generate_event_tailored_fallback(
    event: EventCreateRequest, 
    plan_id: str, 
    sym: str, 
    cost_per_guest: float, 
    created_at: str
) -> EventPlanResponse:
    """
    Local structured template engine that tailors the blueprint dynamically
    based on whether the event is a Wedding, Birthday, or Community Event,
    incorporating all user preferences (theme, location, venue type, dining, decor).
    """
    budget = event.totalBudget
    guests = event.guestCount
    venue_style = event.venueType.capitalize()

    if event.eventType == "wedding":
        title = event.eventName or f"{event.theme} Wedding Celebration"
        tagline = f"An exquisite romantic celebration for {guests} guests in {event.eventLocation} on {event.eventDate}"
        overview = (
            f"A luxury {event.venueType} wedding blueprint curated around the '{event.theme}' aesthetic. "
            f"Tailored for {guests} guests with dedicated dining ({event.foodPreferences or 'curated multi-course catering'}), "
            f"floral styling ({event.decorationPreferences or 'bespoke romantic florals & arches'}), and seamless coordination."
        )

        budget_breakdown = [
            BudgetItem(
                category="Venue & Ceremony Grounds",
                amount=round(budget * 0.38, 2),
                percentage=38,
                status="Allocated",
                notes=f"{venue_style} venue contract, ceremony arch site, bridal dressing suite"
            ),
            BudgetItem(
                category="Catering & Signature Cocktails",
                amount=round(budget * 0.28, 2),
                percentage=28,
                status="Allocated",
                notes=f"{event.foodPreferences or 'Plated dining & welcome champagne'} (~{sym}{round((budget * 0.28)/guests, 2)}/guest)"
            ),
            BudgetItem(
                category="Floral Artistry & Atmosphere Decor",
                amount=round(budget * 0.12, 2),
                percentage=12,
                status="Allocated",
                notes=f"{event.decorationPreferences or 'Bespoke floral arches, candlelit centerpieces & runner styling'}"
            ),
            BudgetItem(
                category="Photography, Cinema & Drone",
                amount=round(budget * 0.10, 2),
                percentage=10,
                status="Pending",
                notes="Full-day coverage, golden hour couple portraits, 4K film trailer and curated album"
            ),
            BudgetItem(
                category="Music & Live Entertainment",
                amount=round(budget * 0.05, 2),
                percentage=5,
                status="Allocated",
                notes="Acoustic strings ceremony processional + high-energy evening reception DJ"
            ),
            BudgetItem(
                category="Bridal Attire, Hair & Makeup",
                amount=round(budget * 0.04, 2),
                percentage=4,
                status="Allocated",
                notes="Bridal party hair & makeup styling, touch-up emergency vanity kit"
            ),
            BudgetItem(
                category="Emergency Reserve / Contingency Buffer",
                amount=round(budget * 0.03, 2),
                percentage=3,
                status="Reserve",
                notes="Vendor gratuities, weather backup contingency, unforeseen guest transport"
            )
        ]

        timeline = [
            TimelineSlot(
                time="11:30 AM",
                title="Bridal Party & Groom Styling",
                description="Hair, makeup, candid mimosas, and wedding dress/suit detail photography.",
                milestone="Preparation"
            ),
            TimelineSlot(
                time="02:00 PM",
                title="First Look & Intimate Couple Portraits",
                description="Private reveal between the couple in the gardens, followed by wedding party shots.",
                milestone="Photos"
            ),
            TimelineSlot(
                time="03:45 PM",
                title="Guest Arrival & Acoustic Welcome Prelude",
                description="Acoustic music welcomes guests as they take their seats and sip signature welcome spritz.",
                milestone="Guest Welcome"
            ),
            TimelineSlot(
                time="04:15 PM",
                title="Ceremony & Exchange of Vows",
                description="Processional walk, emotional ring exchange, handwritten vows, and rose-petal recessional.",
                milestone="Ceremony"
            ),
            TimelineSlot(
                time="05:00 PM",
                title="Golden Hour Cocktail Hour & Hors d’oeuvres",
                description="Artisanal canapés, signature cocktails, and sunset golden hour couple portraits.",
                milestone="Social"
            ),
            TimelineSlot(
                time="06:45 PM",
                title="Grand Reception Entrance & Plated Dinner",
                description="First dance under canopy lighting, emotional welcome toasts, and 3-course dinner service.",
                milestone="Dinner"
            ),
            TimelineSlot(
                time="08:30 PM",
                title="Cake Cutting & Speeches",
                description="Speeches by maid of honor, best man, and parents paired with champagne and dessert.",
                milestone="Speeches"
            ),
            TimelineSlot(
                time="09:15 PM",
                title="Dance Floor Open & Sparkler Farewell",
                description="DJ dance party kicks into gear; midnight comfort sliders served; sparkler send-off.",
                milestone="Party"
            )
        ]

        vendor_checklist = [
            VendorChecklistItem(
                id="w1",
                task=f"Lock {venue_style} Venue Contract & Security Deposit",
                category="Venue",
                deadline="6 months before",
                status="completed"
            ),
            VendorChecklistItem(
                id="w2",
                task=f"Catering Tasting & Menu Finalization: '{event.foodPreferences[:35]}...'",
                category="Catering",
                deadline="3 months before",
                status="in-progress"
            ),
            VendorChecklistItem(
                id="w3",
                task="Book Primary Photographer & 4K Cinema Drone Operator",
                category="Media",
                deadline="4 months before",
                status="completed"
            ),
            VendorChecklistItem(
                id="w4",
                task=f"Florist Consultation: '{event.decorationPreferences[:35]}...'",
                category="Decor",
                deadline="2 months before",
                status="pending"
            ),
            VendorChecklistItem(
                id="w5",
                task="Submit Ceremony Acoustics & Must-Play Reception Playlist",
                category="Music",
                deadline="4 weeks before",
                status="pending"
            ),
            VendorChecklistItem(
                id="w6",
                task="Commission Showstopper Wedding Cake & Sweet Station",
                category="Bakery",
                deadline="6 weeks before",
                status="in-progress"
            ),
            VendorChecklistItem(
                id="w7",
                task="Finalize Seating Chart, Place Cards & Guest Transportation",
                category="Logistics",
                deadline="2 weeks before",
                status="pending"
            )
        ]

        ai_ideas = [
            AiIdeaItem(
                title="Vintage Audio Guestbook Telephone",
                desc="Place an antique rotary phone for guests to record raw, hilarious, and heartfelt voicemail messages."
            ),
            AiIdeaItem(
                title="Interactive Live Event Canvas Painter",
                desc="A live artist captures the vows on canvas in real-time, entertaining guests and creating an heirloom keepsake."
            ),
            AiIdeaItem(
                title="Bespoke 'His & Hers' Signature Cocktails",
                desc="Two customized drinks matching your favorite flavor profiles with illustrated watercolor bar menu cards."
            ),
            AiIdeaItem(
                title="Midnight Comfort Food Surprise",
                desc="Roll out warm cinnamon churros, mini smash burgers, or wood-fired pizza slices right as the dance floor peaks."
            )
        ]

    elif event.eventType == "birthday":
        title = event.eventName or f"{event.theme} Birthday Bash"
        tagline = f"A high-energy birthday celebration for {guests} guests in {event.eventLocation} on {event.eventDate}"
        overview = (
            f"An electrifying {event.venueType} birthday party created for {guests} attendees. "
            f"Highlighting '{event.theme}' aesthetics, featuring custom dining ({event.foodPreferences or 'tapas and appetizers'}), "
            f"statement decor ({event.decorationPreferences or 'neon lights and balloon garland'}), and interactive social entertainment."
        )

        budget_breakdown = [
            BudgetItem(
                category="Venue Lounge Booking",
                amount=round(budget * 0.32, 2),
                percentage=32,
                status="Allocated",
                notes=f"{venue_style} space reservation with mood lighting & sound access"
            ),
            BudgetItem(
                category="Food Stations, Sliders & Drinks",
                amount=round(budget * 0.30, 2),
                percentage=30,
                status="Allocated",
                notes=f"{event.foodPreferences or 'Tapas, sliders, taco bar & cocktails'} (~{sym}{round((budget * 0.30)/guests, 2)}/guest)"
            ),
            BudgetItem(
                category="Lighting, Neon & Balloon Styling",
                amount=round(budget * 0.15, 2),
                percentage=15,
                status="Allocated",
                notes=f"{event.decorationPreferences or 'Custom LED neon sign, chrome balloon installations & selfie wall'}"
            ),
            BudgetItem(
                category="Showstopper Tiered Birthday Cake",
                amount=round(budget * 0.08, 2),
                percentage=8,
                status="Allocated",
                notes="Custom designed themed cake with sparklers & dessert platters"
            ),
            BudgetItem(
                category="Live DJ & Club Sound Rig",
                amount=round(budget * 0.09, 2),
                percentage=9,
                status="Pending",
                notes="High-energy sound setup, club lighting rig, and crowd request queue"
            ),
            BudgetItem(
                category="Interactive Photobooth & Party Favors",
                amount=round(budget * 0.06, 2),
                percentage=6,
                status="Allocated",
                notes="360 slow-mo video booth, trivia prizes, and personalized guest favors"
            )
        ]

        timeline = [
            TimelineSlot(
                time="05:30 PM",
                title="Vendor Setup & Lighting Sound Check",
                description="Balloons, neon sign installation, DJ sound check, and bar preparation.",
                milestone="Setup"
            ),
            TimelineSlot(
                time="07:00 PM",
                title="Red Carpet Arrivals & Welcome Drinks",
                description="Guests arrive, grab signature drinks, and pose at the photo installation.",
                milestone="Arrival"
            ),
            TimelineSlot(
                time="07:45 PM",
                title="Food Stations Open & Upbeat Lounge Vibes",
                description="Tapas, taco or slider stations active with upbeat background lounge music.",
                milestone="Food"
            ),
            TimelineSlot(
                time="08:45 PM",
                title="Birthday Trivia Roast & Video Reels",
                description="Engaging smartphone live quiz or roast video compilation honoring the birthday star.",
                milestone="Fun"
            ),
            TimelineSlot(
                time="09:30 PM",
                title="Cake Cutting & Sparkler Toast",
                description="Sparkler candles lit, birthday singing, and champagne popping.",
                milestone="Celebration"
            ),
            TimelineSlot(
                time="10:00 PM",
                title="DJ Dance Floor Unleashed",
                description="High-energy club beats, LED glow batons distributed, party peaks.",
                milestone="Dance"
            ),
            TimelineSlot(
                time="12:30 AM",
                title="Midnight Snacks & Goodie Bags",
                description="Warm midnight fries/cookies served and custom guest favor kits handed out.",
                milestone="Farewell"
            )
        ]

        vendor_checklist = [
            VendorChecklistItem(
                id="b1",
                task=f"Lock {venue_style} Venue Space & Security Deposit",
                category="Venue",
                deadline="4 weeks before",
                status="completed"
            ),
            VendorChecklistItem(
                id="b2",
                task="Commission Themed Custom Birthday Cake",
                category="Bakery",
                deadline="3 weeks before",
                status="in-progress"
            ),
            VendorChecklistItem(
                id="b3",
                task=f"Order Custom Neon & Decor: '{event.decorationPreferences[:35]}...'",
                category="Decor",
                deadline="2 weeks before",
                status="completed"
            ),
            VendorChecklistItem(
                id="b4",
                task="Reserve 360-Degree Slow-Mo Video Booth",
                category="Media",
                deadline="2 weeks before",
                status="pending"
            ),
            VendorChecklistItem(
                id="b5",
                task="Coordinate Bartender & Custom Cocktail Recipe List",
                category="Drinks",
                deadline="10 days before",
                status="pending"
            ),
            VendorChecklistItem(
                id="b6",
                task="Assemble Custom Favors & Glow Accessories",
                category="Favors",
                deadline="3 days before",
                status="pending"
            )
        ]

        ai_ideas = [
            AiIdeaItem(
                title="360 Slow-Motion Video Booth",
                desc="Instantly generates branded social-media clips with custom overlays and slow-motion confetti bursts."
            ),
            AiIdeaItem(
                title="Personalized 'This Is Your Life' Trivia",
                desc="An interactive smartphone Kahoot quiz about hilarious memories of the birthday star with prizes."
            ),
            AiIdeaItem(
                title="Late-Night Food Truck Pull-Up",
                desc="A gourmet food truck arrives at midnight right outside the venue to serve warm street tacos."
            ),
            AiIdeaItem(
                title="Foliage Cocktail Wall with Neon Sign",
                desc="Guests grab their welcome drinks straight off a branded Instagram-ready grass wall display."
            )
        ]

    else:
        # Community event / festival
        title = event.eventName or f"{event.theme} Community Gathering"
        tagline = f"Bringing {guests}+ neighbors together for an inspiring experience in {event.eventLocation} on {event.eventDate}"
        overview = (
            f"An organized, crowd-pleasing, and eco-conscious community activation tailored for a {event.venueType} layout. "
            f"Designed for {guests} community members with '{event.theme}' branding, local food options ({event.foodPreferences or 'diverse food trucks'}), "
            f"and robust safety protocols."
        )

        budget_breakdown = [
            BudgetItem(
                category="City Permits, Insurance & Park Fees",
                amount=round(budget * 0.16, 2),
                percentage=16,
                status="Allocated",
                notes="Municipality event permits, liability insurance and waste management fee"
            ),
            BudgetItem(
                category="Staging, PA Audio & Generator Power",
                amount=round(budget * 0.24, 2),
                percentage=24,
                status="Allocated",
                notes="PA sound system, stage risers, microphones and silenced generator rental"
            ),
            BudgetItem(
                category="Food Truck Partners & Water Refills",
                amount=round(budget * 0.25, 2),
                percentage=25,
                status="Allocated",
                notes=f"{event.foodPreferences or 'Subsidized family food vouchers & hydration'} (~{sym}{round((budget * 0.25)/guests, 2)}/attendee)"
            ),
            BudgetItem(
                category="Signage, Wayfinding & Eco Banners",
                amount=round(budget * 0.11, 2),
                percentage=11,
                status="Allocated",
                notes=f"{event.decorationPreferences or 'Directional signs, booth maps & recycling station banners'}"
            ),
            BudgetItem(
                category="Performers & Youth Workshop Leads",
                amount=round(budget * 0.14, 2),
                percentage=14,
                status="Pending",
                notes="Local acoustic acts, cultural performers, and interactive youth workshop leaders"
            ),
            BudgetItem(
                category="Safety, Sanitation & First Aid Station",
                amount=round(budget * 0.10, 2),
                percentage=10,
                status="Allocated",
                notes="Handwash stations, portable restrooms, volunteer safety vests and first aid kit"
            )
        ]

        timeline = [
            TimelineSlot(
                time="08:00 AM",
                title="Site Setup & Vendor Load-In",
                description="Tents, food truck parking, sound check, safety cones, and waste sorting stations.",
                milestone="Setup"
            ),
            TimelineSlot(
                time="10:00 AM",
                title="Gates Open & Opening Ceremony",
                description="Welcome address by community leaders and youth marching/music ensemble.",
                milestone="Opening"
            ),
            TimelineSlot(
                time="11:15 AM",
                title="Family Games, Workshops & Scavenger Hunt",
                description="Interactive art workshops, face painting, and local craft booths active.",
                milestone="Activities"
            ),
            TimelineSlot(
                time="01:00 PM",
                title="Lunch Hour & Main Stage Live Acts",
                description="Food trucks operating at full capacity, local acoustic singers on stage.",
                milestone="Music"
            ),
            TimelineSlot(
                time="03:30 PM",
                title="Community Hero Awards & Raffle Draw",
                description="Recognizing local volunteers, charity announcements, and prize giveaways.",
                milestone="Awards"
            ),
            TimelineSlot(
                time="05:00 PM",
                title="Closing Encore & Eco-Cleanup Drive",
                description="Final musical performance, followed by volunteer zero-waste cleanup and safe exit.",
                milestone="Wrap-up"
            )
        ]

        vendor_checklist = [
            VendorChecklistItem(
                id="c1",
                task="Submit Municipality Park & Street Event Permit",
                category="Legal",
                deadline="8 weeks before",
                status="completed"
            ),
            VendorChecklistItem(
                id="c2",
                task="Curate 6-10 Local Food Truck Vendors & Health Verification",
                category="Food",
                deadline="5 weeks before",
                status="in-progress"
            ),
            VendorChecklistItem(
                id="c3",
                task="Contract Portable Sanitation & Handwashing Stations",
                category="Sanitation",
                deadline="4 weeks before",
                status="completed"
            ),
            VendorChecklistItem(
                id="c4",
                task="Book PA Sound Audio Engineer & Generator Rig",
                category="Tech",
                deadline="3 weeks before",
                status="pending"
            ),
            VendorChecklistItem(
                id="c5",
                task="Recruit & Brief 20 Volunteer Stewards",
                category="Staff",
                deadline="2 weeks before",
                status="in-progress"
            ),
            VendorChecklistItem(
                id="c6",
                task=f"Print Signage: '{event.decorationPreferences[:35]}...'",
                category="Signage",
                deadline="1 week before",
                status="pending"
            )
        ]

        ai_ideas = [
            AiIdeaItem(
                title="Collaborative Community Mural Canvas",
                desc="A large white paint-by-numbers canvas where every neighbor paints a segment, later displayed at the community hall."
            ),
            AiIdeaItem(
                title="Zero-Waste Reusable Hydration Hub",
                desc="Partner with local eco-sponsors to provide reusable cups and cold-filtered water refill bars."
            ),
            AiIdeaItem(
                title="Local Business Passport Scavenger Hunt",
                desc="Attendees get a booklet stamped by visiting artisan stalls to enter a grand community gift basket raffle."
            ),
            AiIdeaItem(
                title="Sensory-Friendly Reset Pavilion",
                desc="A peaceful, shaded marquee with noise-canceling headphones, seating, and calming coloring books."
            )
        ]

    return EventPlanResponse(
        id=plan_id,
        title=title,
        tagline=tagline,
        overview=overview,
        eventName=event.eventName,
        eventType=event.eventType,
        eventDate=event.eventDate,
        eventLocation=event.eventLocation,
        guestCount=guests,
        totalBudget=budget,
        costPerGuest=cost_per_guest,
        currency=event.currency,
        currencySymbol=sym,
        venueType=event.venueType,
        foodPreferences=event.foodPreferences or "",
        decorationPreferences=event.decorationPreferences or "",
        additionalRequirements=event.additionalRequirements or "",
        budgetBreakdown=budget_breakdown,
        timeline=timeline,
        vendorChecklist=vendor_checklist,
        aiIdeas=ai_ideas,
        createdAt=created_at
    )
