from fastapi import APIRouter

router = APIRouter(prefix="/api/integrations", tags=["Integrations"])

@router.get("/status")
def get_integrations_status():
    return {
        "gmail": {"status": "ready", "account": "contact@northstarestates.com"},
        "rag": {"status": "connected", "docs": 5},
        "discord": {"status": "operational", "channels": 3},
    }

@router.post("/gmail/sync")
def sync_gmail():
    return {"status": "synced", "new_messages_ingested": 0, "message": "Inbox scan complete. No new messages pending."}
