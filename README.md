# PlanCraft GenAI Event Planning Assistant

A full-stack GenAI-powered planning platform designed for Weddings, Birthdays, and Community Events with tailored budgets, timelines, vendor checklists, and personalized ideas.

## Project Architecture

```text
hack2skill/
├── backend/                  # Python FastAPI Backend
│   ├── main.py               # FastAPI application with REST endpoints & CORS
│   ├── schemas.py            # Pydantic models for request validation & response contracts
│   ├── planner_engine.py     # AI event blueprint synthesis engine
│   └── requirements.txt      # Python dependencies (fastapi, uvicorn, pydantic)
│
├── frontend/                 # React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx           # App bar & navigation
│   │   │   ├── HomeDashboard.jsx    # Common dashboard with 3 event selection cards
│   │   │   ├── EventConfigPage.jsx  # Configuration form with comprehensive validation
│   │   │   ├── PlanHeader.jsx       # Plan summary header & tab navigation
│   │   │   ├── OverviewTab.jsx      # High-level event cards
│   │   │   ├── BudgetTab.jsx        # Smart budget distribution bars
│   │   │   ├── TimelineTab.jsx      # Run of show agenda
│   │   │   ├── VendorTab.jsx        # Vendor master checklist
│   │   │   └── IdeasTab.jsx         # Creative viral ideas
│   │   ├── services/
│   │   │   └── aiPlanner.js         # API client connecting React to FastAPI backend
│   │   ├── App.jsx                  # Main view controller
│   │   └── index.css                # Pastel blush & lavender theme
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Getting Started

### 1. Run the Python FastAPI Backend

Open a terminal and run:
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```
- API Server: `http://127.0.0.1:8000`
- Interactive OpenAPI / Swagger Docs: `http://127.0.0.1:8000/docs`

#### Available Backend Endpoints:
- `POST /api/events`: Validates payload and generates a complete event plan blueprint.
- `GET /api/events`: Retrieves all synthesized event plans.
- `GET /api/events/{event_id}`: Retrieves a specific event plan by ID.

### 2. Run the React Frontend

Open a second terminal and run:
```bash
cd frontend
npm run dev
```
Open your browser at `http://localhost:3000` (or `http://localhost:5173`).
