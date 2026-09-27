import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.core.database import engine, Base, SessionLocal
from backend.app.core.seed import seed_demo_emails
from backend.app.api.health import router as health_router
from backend.app.api.dashboard import router as dashboard_router
from backend.app.api.emails import router as emails_router
from backend.app.api.review import router as review_router
from backend.app.api.workflows import router as workflows_router
from backend.app.api.settings import router as settings_router
from backend.app.api.integrations import router as integrations_router

# Initialize tables
Base.metadata.create_all(bind=engine)

# Auto-seed demo dataset on startup
try:
    with SessionLocal() as db:
        count = seed_demo_emails(db)
        print(f"[TRIAGEFLOW] SQLite verified with {count} emails.")
except Exception as ex:
    print(f"[TRIAGEFLOW] Seed warning: {ex}")

app = FastAPI(
    title="TRIAGEFLOW AI API",
    description="AI Email Triage & RAG Assistant — Every email. The right action.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routers
app.include_router(health_router)
app.include_router(dashboard_router)
app.include_router(emails_router)
app.include_router(review_router)
app.include_router(workflows_router)
app.include_router(settings_router)
app.include_router(integrations_router)

@app.get("/")
def root():
    return {
        "service": "TRIAGEFLOW AI Backend",
        "status": "online",
        "tagline": "Every email. The right action.",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
