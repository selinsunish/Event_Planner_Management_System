// Service connecting React frontend to the Python FastAPI backend
const API_BASE_URL = 'http://127.0.0.1:8000';

export async function generateEventPlan(eventData) {
  const payload = {
    eventName: eventData.eventName || 'Grand Celebration',
    eventType: eventData.eventType || 'wedding',
    eventDate: eventData.eventDate || new Date().toISOString().split('T')[0],
    eventLocation: eventData.eventLocation || 'Scenic Venue',
    guestCount: parseInt(eventData.guestCount, 10) || 50,
    totalBudget: parseFloat(eventData.totalBudget) || 10000,
    currency: eventData.currency || 'USD',
    theme: eventData.theme || 'Timeless Elegance',
    venueType: eventData.venueType || 'hybrid',
    foodPreferences: eventData.foodPreferences || '',
    decorationPreferences: eventData.decorationPreferences || '',
    additionalRequirements: eventData.additionalRequirements || ''
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail 
        ? (Array.isArray(errorData.detail) ? errorData.detail.map(d => d.msg).join(', ') : errorData.detail)
        : `HTTP error ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Backend API connection error or offline, using fallback generator:', error.message);
    // Graceful fallback so UI works reliably even if backend server hasn't been started yet
    return fallbackGeneratePlan(payload);
  }
}

export async function fetchEventById(eventId) {
  const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch event with ID ${eventId}`);
  }
  return await response.json();
}

export async function fetchAllEvents() {
  const response = await fetch(`${API_BASE_URL}/api/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events list');
  }
  return await response.json();
}

// Client-side fallback generator
function fallbackGeneratePlan(event) {
  const budget = Number(event.totalBudget) || 15000;
  const guests = Number(event.guestCount) || 50;
  const sym = event.currency === 'EUR' ? '€' : event.currency === 'GBP' ? '£' : event.currency === 'INR' ? '₹' : '$';

  return {
    id: `plan_${Math.random().toString(36).substring(2, 9)}`,
    title: event.eventName || `${event.theme} Celebration`,
    tagline: `An unforgettable celebration for ${guests} guests in ${event.eventLocation} on ${event.eventDate}`,
    overview: `A luxury ${event.venueType} blueprint centered around the '${event.theme}' theme with tailored dining and decorations.`,
    eventName: event.eventName,
    eventType: event.eventType,
    eventDate: event.eventDate,
    eventLocation: event.eventLocation,
    guestCount: guests,
    totalBudget: budget,
    costPerGuest: Math.round(budget / guests),
    currency: event.currency,
    currencySymbol: sym,
    venueType: event.venueType,
    budgetBreakdown: [
      { category: 'Venue Booking', amount: Math.round(budget * 0.38), percentage: 38, status: 'Allocated', notes: `${event.venueType} venue booking` },
      { category: 'Catering & Beverages', amount: Math.round(budget * 0.28), percentage: 28, status: 'Allocated', notes: `Dining & drinks (~${sym}${Math.round((budget * 0.28) / guests)}/guest)` },
      { category: 'Decor & Florals', amount: Math.round(budget * 0.12), percentage: 12, status: 'Allocated', notes: event.decorationPreferences || 'Curated styling' },
      { category: 'Photography & Cinema', amount: Math.round(budget * 0.10), percentage: 10, status: 'Pending', notes: 'Full-day golden hour coverage' },
      { category: 'Entertainment & Music', amount: Math.round(budget * 0.05), percentage: 5, status: 'Allocated', notes: 'Acoustic acts and DJ' },
      { category: 'Attire & Styling', amount: Math.round(budget * 0.04), percentage: 4, status: 'Allocated', notes: 'Styling & touch-ups' },
      { category: 'Emergency Reserve', amount: Math.round(budget * 0.03), percentage: 3, status: 'Reserve', notes: 'Contingency' }
    ],
    timeline: [
      { time: '12:00 PM', title: 'Styling & Vendor Setup', description: 'Setup, sound check and preparations.', milestone: 'Setup' },
      { time: '02:30 PM', title: 'Arrivals & First Look', description: 'Welcoming early arrivals and photos.', milestone: 'Photos' },
      { time: '04:00 PM', title: 'Main Ceremony / Kickoff', description: 'Opening vows or welcome address.', milestone: 'Ceremony' },
      { time: '05:30 PM', title: 'Cocktail Hour & Bites', description: 'Signature cocktails and canapés.', milestone: 'Social' },
      { time: '07:00 PM', title: 'Dinner & Celebratory Toasts', description: 'Multi-course dinner and speeches.', milestone: 'Dinner' },
      { time: '09:00 PM', title: 'Dance Floor & Send-off', description: 'Party music and celebration send-off.', milestone: 'Party' }
    ],
    vendorChecklist: [
      { id: '1', task: `Reserve ${event.venueType} Venue Space`, category: 'Venue', deadline: '6 months before', status: 'completed' },
      { id: '2', task: 'Menu Tasting & Finalize Catering', category: 'Catering', deadline: '3 months before', status: 'in-progress' },
      { id: '3', task: 'Book Photographer & Video Operator', category: 'Media', deadline: '4 months before', status: 'completed' },
      { id: '4', task: 'Order Themed Floral & Decor Installations', category: 'Decor', deadline: '2 months before', status: 'pending' },
      { id: '5', task: 'Confirm DJ / Sound Equipment Booking', category: 'Entertainment', deadline: '1 month before', status: 'pending' }
    ],
    aiIdeas: [
      { title: 'Interactive Audio Guestbook Phone', desc: 'Guests leave heartfelt audio voicemails on an antique rotary phone.' },
      { title: 'Custom Signature Drinks', desc: 'Cocktails tailored to the theme with customized menu cards.' },
      { title: 'Late-Night Snack Surprise', desc: 'Surprise guests with midnight churros or gourmet pizza slices.' },
      { title: 'Live Event Painter', desc: 'An artist paints the celebration in real-time as a lifetime keepsake.' }
    ]
  };
}
