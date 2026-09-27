from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db
from backend.app.models.email import Email

router = APIRouter(prefix="/api/workflows", tags=["Workflows"])

@router.get("/hr")
def get_hr_workflow(db: Session = Depends(get_db)):
    emails = db.query(Email).filter(
        (Email.category == "job_application") | (Email.forwarded_to.ilike("%hr%"))
    ).order_by(Email.timestamp.desc()).all()

    return {
        "title": "HR Routing Workflow",
        "description": "Candidate CV submissions and employment inquiries automatically preserved and forwarded to HR. AI strictly observes policy: NEVER makes hiring or rejection decisions.",
        "discord_webhook": "Active (#talent-alerts)",
        "items": [
            {
                "id": e.id,
                "candidate": e.sender_name,
                "email": e.sender_email,
                "position": "AI Engineering Intern" if "intern" in e.subject.lower() else "General Application",
                "subject": e.subject,
                "priority": e.priority,
                "timestamp": e.timestamp.isoformat() if e.timestamp else None,
                "reason": e.reason,
                "forwarding_status": f"Forwarded to {e.forwarded_to or 'hr@northstarestates.com'}",
                "discord_status": e.discord_status,
                "attachments_count": len(e.attachments),
                "attachments": [a.filename for a in e.attachments],
            }
            for e in emails
        ]
    }

@router.get("/manager")
def get_manager_workflow(db: Session = Depends(get_db)):
    emails = db.query(Email).filter(
        (Email.category.in_(["project_related", "complaint"])) | 
        (Email.forwarded_to.ilike("%manager%")) |
        (Email.recommended_action == "forward_to_manager")
    ).order_by(Email.timestamp.desc()).all()

    return {
        "title": "Manager Routing Workflow",
        "description": "Project updates, site milestones, architectural revisions, and client disputes routed with full context to project and executive management.",
        "discord_webhook": "Active (#management-alerts)",
        "items": [
            {
                "id": e.id,
                "sender_name": e.sender_name,
                "sender_email": e.sender_email,
                "subject": e.subject,
                "category": e.category,
                "priority": e.priority,
                "timestamp": e.timestamp.isoformat() if e.timestamp else None,
                "reason": e.reason,
                "forwarding_status": f"Forwarded to {e.forwarded_to or 'projects.manager@northstarestates.com'}",
                "discord_status": e.discord_status,
                "attachments_count": len(e.attachments),
            }
            for e in emails
        ]
    }

@router.get("/urgent")
def get_urgent_workflow(db: Session = Depends(get_db)):
    emails = db.query(Email).filter(
        (Email.priority == "critical") | 
        (Email.category == "urgent_request") | 
        (Email.recommended_action == "immediate_urgent_alert")
    ).order_by(Email.timestamp.desc()).all()

    return {
        "title": "Urgent Alerts Protocol",
        "description": "Critical emergency signals, security threats, or severe facility failures. Highlighted in reserved RED with high-priority Discord alert dispatch.",
        "discord_webhook": "Active (#critical-incident-room)",
        "items": [
            {
                "id": e.id,
                "sender_name": e.sender_name,
                "sender_email": e.sender_email,
                "subject": e.subject,
                "category": e.category,
                "priority": e.priority,
                "timestamp": e.timestamp.isoformat() if e.timestamp else None,
                "reason": e.reason,
                "status": e.status,
                "notification_status": "Emergency Discord Webhook Broadcast Dispatched",
                "human_acknowledged": e.status == "resolved",
            }
            for e in emails
        ]
    }
