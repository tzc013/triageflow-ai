from fastapi import APIRouter
from backend.app.core.config import settings

router = APIRouter(prefix="/api/settings", tags=["Settings"])

@router.get("")
def get_settings():
    return {
        "ai": {
            "provider": "Google Gemini",
            "model": "gemini-3.8-flash",
            "status": "connected" if bool(settings.GEMINI_API_KEY) else "ready (demo grounded mode)",
            "temperature": 0.1,
        },
        "email_integration": {
            "active_provider": "Demo Provider" if settings.DEMO_MODE else "Gmail API (OAuth2)",
            "status": "connected",
            "inbox_address": "contact@northstarestates.com",
            "sync_interval_seconds": 30,
        },
        "rag_integration": {
            "service": "Task 5 Grounded RAG Pipeline",
            "vector_store": "ChromaDB (384-d dense vectors)",
            "documents_indexed": 5,
            "status": "connected",
            "threshold": settings.RAG_THRESHOLD,
        },
        "discord": {
            "hr_channel": "Configured (#talent-alerts)" if settings.DISCORD_HR_WEBHOOK_URL else "Simulated Webhook",
            "manager_channel": "Configured (#management-alerts)" if settings.DISCORD_MANAGER_WEBHOOK_URL else "Simulated Webhook",
            "urgent_channel": "Configured (#critical-incident-room)" if settings.DISCORD_URGENT_WEBHOOK_URL else "Simulated Webhook",
            "status": "operational",
        },
        "thresholds": {
            "confidence_threshold": settings.CONFIDENCE_THRESHOLD,
            "rag_threshold": settings.RAG_THRESHOLD,
            "spam_threshold": settings.SPAM_THRESHOLD,
        },
        "demo_mode": {
            "enabled": settings.DEMO_MODE,
            "sample_cases": 10,
        },
        "system_health": {
            "backend": "healthy (FastAPI)",
            "database": "connected (SQLite)",
            "uptime_seconds": 3600,
        }
    }

@router.post("/toggle-demo")
def toggle_demo_mode():
    settings.DEMO_MODE = not settings.DEMO_MODE
    return {"demo_mode": settings.DEMO_MODE, "message": f"Demo mode {'enabled' if settings.DEMO_MODE else 'disabled'}"}
