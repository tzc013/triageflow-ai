import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "TRIAGEFLOW AI"
    TAGLINE: str = "Every email. The right action."
    VERSION: str = "1.0.0"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./triageflow.db")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    CONFIDENCE_THRESHOLD: float = float(os.getenv("CONFIDENCE_THRESHOLD", "0.85"))
    RAG_THRESHOLD: float = float(os.getenv("RAG_THRESHOLD", "0.70"))
    SPAM_THRESHOLD: float = float(os.getenv("SPAM_THRESHOLD", "0.90"))
    DEMO_MODE: bool = os.getenv("DEMO_MODE", "true").lower() in ("true", "1", "yes")
    DISCORD_HR_WEBHOOK_URL: str = os.getenv("DISCORD_HR_WEBHOOK_URL", "")
    DISCORD_MANAGER_WEBHOOK_URL: str = os.getenv("DISCORD_MANAGER_WEBHOOK_URL", "")
    DISCORD_URGENT_WEBHOOK_URL: str = os.getenv("DISCORD_URGENT_WEBHOOK_URL", "")

settings = Settings()
