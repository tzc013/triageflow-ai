from fastapi import APIRouter
from backend.app.core.config import settings

router = APIRouter(prefix="/api/health", tags=["Health"])

@router.get("")
def get_health():
    return {
        "status": "healthy",
        "product": "TRIAGEFLOW AI",
        "tagline": "Every email. The right action.",
        "architecture": "FastAPI + SQLite + React JSX",
        "color_identity": "RED / GREY / SAGE / GREEN",
        "demo_mode": settings.DEMO_MODE,
        "database": "SQLite (triageflow.db)",
        "rag_service": "Connected (Task 5 ChromaDB RAG)",
        "version": settings.VERSION
    }
