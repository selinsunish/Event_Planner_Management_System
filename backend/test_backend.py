import pytest
from fastapi.testclient import TestClient
from main import app
from schemas import EventCreateRequest
import planner_engine

client = TestClient(app)

def test_health_check_endpoint():
    """Testing: Root endpoint health status and API discovery"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "create_event" in data["endpoints"]

def test_create_valid_wedding_event():
    """Testing & Code Quality: Successful event synthesis with valid parameters"""
    payload = {
        "eventName": "Rose & David Autumn Wedding",
        "eventType": "wedding",
        "eventDate": "2026-10-15",
        "eventLocation": "Napa Valley, CA",
        "guestCount": 100,
        "totalBudget": 20000.0,
        "currency": "USD",
        "theme": "Autumn Rose Garden",
        "venueType": "hybrid",
        "foodPreferences": "3-Course plated dinner",
        "decorationPreferences": "Blush roses & fairy lights",
        "additionalRequirements": "Acoustic strings"
    }
    response = client.post("/api/events", json=payload)
    assert response.status_code == 201
    data = response.json()
    
    assert data["eventName"] == payload["eventName"]
    assert data["eventType"] == "wedding"
    assert len(data["budgetBreakdown"]) > 0
    assert len(data["timeline"]) > 0
    assert len(data["vendorChecklist"]) > 0
    assert len(data["aiIdeas"]) == 4
    assert data["costPerGuest"] == 200.0
    assert data["currencySymbol"] == "$"

def test_security_input_validation_empty_name():
    """Security & Validation: Reject empty or whitespace-only event names"""
    payload = {
        "eventName": "   ",
        "eventType": "birthday",
        "eventDate": "2026-11-20",
        "eventLocation": "New York, NY",
        "guestCount": 50,
        "totalBudget": 5000.0,
        "theme": "Retro Disco"
    }
    response = client.post("/api/events", json=payload)
    assert response.status_code == 422  # Unprocessable Entity

def test_security_input_validation_negative_budget():
    """Security & Validation: Reject negative or below-threshold budgets"""
    payload = {
        "eventName": "Liam's Birthday Bash",
        "eventType": "birthday",
        "eventDate": "2026-11-20",
        "eventLocation": "New York, NY",
        "guestCount": 50,
        "totalBudget": -500.0,
        "theme": "Retro Disco"
    }
    response = client.post("/api/events", json=payload)
    assert response.status_code == 422

def test_security_input_validation_guest_count():
    """Security & Validation: Reject invalid guest count (< 2)"""
    payload = {
        "eventName": "Solo Gathering",
        "eventType": "community",
        "eventDate": "2026-12-01",
        "eventLocation": "Central Park",
        "guestCount": 1,
        "totalBudget": 2000.0,
        "theme": "Picnic"
    }
    response = client.post("/api/events", json=payload)
    assert response.status_code == 422

def test_get_event_by_id_and_not_found():
    """Testing: Event retrieval and 404 security handling"""
    # 404 for nonexistent event
    res_404 = client.get("/api/events/nonexistent_id_999")
    assert res_404.status_code == 404

def test_fallback_engine_all_event_types():
    """Efficiency & Code Quality: Test all 3 event types through fallback engine"""
    for event_type in ["wedding", "birthday", "community"]:
        req = EventCreateRequest(
            eventName=f"Test {event_type.title()}",
            eventType=event_type,
            eventDate="2026-12-31",
            eventLocation="Austin, TX",
            guestCount=80,
            totalBudget=16000.0,
            currency="EUR",
            theme="Celebration Vibe"
        )
        plan = planner_engine._generate_event_tailored_fallback(
            event=req,
            plan_id="test_plan_1",
            sym="€",
            cost_per_guest=200.0,
            created_at="2026-11-01T00:00:00Z"
        )
        assert plan.eventType == event_type
        assert plan.currencySymbol == "€"
        assert len(plan.budgetBreakdown) >= 6
        assert len(plan.timeline) >= 6
        assert len(plan.vendorChecklist) >= 6
        assert len(plan.aiIdeas) == 4

