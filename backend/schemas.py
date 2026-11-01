from pydantic import BaseModel, Field, validator
from typing import Optional, List, Literal

class EventCreateRequest(BaseModel):
    eventName: str = Field(..., min_length=3, max_length=150, description="Name of the celebration")
    eventType: Literal["wedding", "birthday", "community"] = Field(..., description="Category of event")
    eventDate: str = Field(..., description="Target date in YYYY-MM-DD")
    eventLocation: str = Field(..., min_length=2, max_length=150, description="City or venue name")
    guestCount: int = Field(..., ge=2, le=50000, description="Total expected guests")
    totalBudget: float = Field(..., ge=50.0, description="Total allocated budget")
    currency: Literal["USD", "EUR", "GBP", "INR", "CAD", "AUD"] = Field(default="USD")
    theme: str = Field(..., min_length=2, max_length=150, description="Theme or aesthetic vibe")
    venueType: Literal["indoor", "outdoor", "hybrid"] = Field(default="hybrid")
    foodPreferences: Optional[str] = Field(default="", max_length=500)
    decorationPreferences: Optional[str] = Field(default="", max_length=500)
    additionalRequirements: Optional[str] = Field(default="", max_length=500)

    @validator("eventName")
    def validate_name_not_blank(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Event name cannot be blank.")
        return trimmed

    @validator("eventLocation")
    def validate_location_not_blank(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Event location cannot be blank.")
        return trimmed


class BudgetItem(BaseModel):
    category: str
    amount: float
    percentage: int
    status: str
    notes: str


class TimelineSlot(BaseModel):
    time: str
    title: str
    description: str
    milestone: str


class VendorChecklistItem(BaseModel):
    id: str
    task: str
    category: str
    deadline: str
    status: str


class AiIdeaItem(BaseModel):
    title: str
    desc: str


class EventPlanResponse(BaseModel):
    id: str
    title: str
    tagline: str
    overview: str
    eventName: str
    eventType: str
    eventDate: str
    eventLocation: str
    guestCount: int
    totalBudget: float
    costPerGuest: float
    currency: str
    currencySymbol: str
    venueType: str
    foodPreferences: str
    decorationPreferences: str
    additionalRequirements: str
    budgetBreakdown: List[BudgetItem]
    timeline: List[TimelineSlot]
    vendorChecklist: List[VendorChecklistItem]
    aiIdeas: List[AiIdeaItem]
    createdAt: str
