from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
import uvicorn

from schemas import EventCreateRequest, EventPlanResponse
from planner_engine import generate_ai_event_blueprint

app = FastAPI(
    title="PlanCraft GenAI Event Planning API",
    description="Python FastAPI backend for validating, generating, and orchestrating event plans.",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite runs on localhost:3000 / localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for generated events
EVENTS_DATABASE: Dict[str, EventPlanResponse] = {}

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "message": "PlanCraft GenAI Event Planning Backend is Running ✨",
        "endpoints": {
            "create_event": "POST /api/events",
            "list_events": "GET /api/events",
            "get_event": "GET /api/events/{event_id}"
        }
    }

@app.post(
    "/api/events",
    response_model=EventPlanResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Validate, process event details and synthesize an AI event blueprint"
)
def create_event_plan(payload: EventCreateRequest):
    """
    Validates event details (name, date, budget, guest count, location, theme)
    and processes the AI blueprint with dynamic budget allocations, timeline,
    vendor checklist, and personalized ideas.
    """
    try:
        blueprint = generate_ai_event_blueprint(payload)
        EVENTS_DATABASE[blueprint.id] = blueprint
        return blueprint
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate event blueprint: {str(e)}"
        )

@app.get(
    "/api/events",
    response_model=List[EventPlanResponse],
    summary="List all previously synthesized event blueprints"
)
def list_events():
    return list(EVENTS_DATABASE.values())

@app.get(
    "/api/events/{event_id}",
    response_model=EventPlanResponse,
    summary="Retrieve an event blueprint by its unique ID"
)
def get_event_by_id(event_id: str):
    if event_id not in EVENTS_DATABASE:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event plan with id '{event_id}' not found."
        )
    return EVENTS_DATABASE[event_id]

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

