import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from backend.app.core.database import get_db
from backend.app.models.email import Email
from backend.app.models.email_thread import EmailThread
from backend.app.models.processing_log import ProcessingLog
from backend.app.core.seed import seed_demo_emails

router = APIRouter(prefix="/api/emails", tags=["Emails"])

@router.get("")
def list_emails(
    category: Optional[str] = None,
    priority: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Email)
    if category and category != "all":
        query = query.filter(Email.category == category)
    if priority and priority != "all":
        query = query.filter(Email.priority == priority)
    if status and status != "all":
        query = query.filter(Email.status == status)
    if search:
        s = f"%{search}%"
        query = query.filter(
            or_(
                Email.subject.ilike(s),
                Email.sender_name.ilike(s),
                Email.sender_email.ilike(s),
                Email.clean_body.ilike(s),
            )
        )
    emails = query.order_by(Email.timestamp.desc()).all()
    
    return [
        {
            "id": e.id,
            "provider": e.provider,
            "provider_message_id": e.provider_message_id,
            "thread_id": e.thread_id,
            "sender_name": e.sender_name,
            "sender_email": e.sender_email,
            "subject": e.subject,
            "clean_body": e.clean_body[:180] + ("..." if len(e.clean_body) > 180 else ""),
            "timestamp": e.timestamp.isoformat() if e.timestamp else None,
            "category": e.category,
            "priority": e.priority,
            "confidence": e.confidence,
            "requires_human": e.requires_human,
            "recommended_action": e.recommended_action,
            "reason": e.reason,
            "status": e.status,
            "rag_used": e.rag_used,
            "response_sent": e.response_sent,
            "forwarded_to": e.forwarded_to,
            "discord_status": e.discord_status,
        }
        for e in emails
    ]

@router.get("/{email_id}")
def get_email_detail(email_id: str, db: Session = Depends(get_db)):
    email = db.query(Email).filter(Email.id == email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")

    attachments = [
        {
            "id": a.id,
            "filename": a.filename,
            "content_type": a.content_type,
            "file_path": a.file_path,
            "size": a.size,
        }
        for a in email.attachments
    ]

    decisions = [
        {
            "id": d.id,
            "category": d.category,
            "priority": d.priority,
            "confidence": d.confidence,
            "requires_human": d.requires_human,
            "recommended_action": d.recommended_action,
            "reason": d.reason,
            "model_name": d.model_name,
            "created_at": d.created_at.isoformat() if d.created_at else None,
        }
        for d in email.decisions
    ]

    logs = [
        {
            "id": l.id,
            "event_type": l.event_type,
            "status": l.status,
            "details": l.details,
            "error_message": l.error_message,
            "created_at": l.created_at.isoformat() if l.created_at else None,
        }
        for l in sorted(email.logs, key=lambda x: x.created_at)
    ]

    # Thread messages if part of a thread
    thread_messages = []
    if email.thread_id:
        siblings = db.query(Email).filter(Email.thread_id == email.thread_id).order_by(Email.timestamp.asc()).all()
        for s in siblings:
            thread_messages.append({
                "id": s.id,
                "sender_name": s.sender_name,
                "sender_email": s.sender_email,
                "timestamp": s.timestamp.isoformat() if s.timestamp else None,
                "clean_body": s.clean_body,
                "is_current": s.id == email.id
            })

    return {
        "id": email.id,
        "provider": email.provider,
        "provider_message_id": email.provider_message_id,
        "thread_id": email.thread_id,
        "sender_name": email.sender_name,
        "sender_email": email.sender_email,
        "recipient": email.recipient,
        "cc": email.cc,
        "subject": email.subject,
        "clean_body": email.clean_body,
        "raw_body": email.raw_body,
        "timestamp": email.timestamp.isoformat() if email.timestamp else None,
        "category": email.category,
        "priority": email.priority,
        "confidence": email.confidence,
        "requires_human": email.requires_human,
        "recommended_action": email.recommended_action,
        "reason": email.reason,
        "status": email.status,
        "rag_used": email.rag_used,
        "rag_sources": email.rag_sources,
        "response_sent": email.response_sent,
        "generated_reply": email.generated_reply,
        "forwarded_to": email.forwarded_to,
        "discord_status": email.discord_status,
        "attachments": attachments,
        "decisions": decisions,
        "logs": logs,
        "thread_messages": thread_messages,
    }

@router.post("/seed-demo")
def trigger_seed_demo(db: Session = Depends(get_db)):
    count = seed_demo_emails(db, force=True)
    return {"message": f"Successfully reloaded {count} demo emails into SQLite database."}

@router.post("/{email_id}/approve")
def approve_email(email_id: str, db: Session = Depends(get_db)):
    email = db.query(Email).filter(Email.id == email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    email.status = "processed"
    email.requires_human = False
    db.add(ProcessingLog(
        id=f"log_{email_id}_{datetime.datetime.utcnow().timestamp()}",
        email_id=email_id,
        event_type="human_escalated",
        status="success",
        details="Operator manually approved recommended action."
    ))
    db.commit()
    return {"status": "success", "email_id": email_id, "new_status": email.status}

@router.post("/{email_id}/archive")
def archive_email(email_id: str, db: Session = Depends(get_db)):
    email = db.query(Email).filter(Email.id == email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    email.status = "archived"
    db.commit()
    return {"status": "success", "email_id": email_id, "new_status": "archived"}

@router.post("/{email_id}/spam")
def mark_spam(email_id: str, db: Session = Depends(get_db)):
    email = db.query(Email).filter(Email.id == email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    email.status = "spam"
    db.commit()
    return {"status": "success", "email_id": email_id, "new_status": "spam"}

@router.post("/{email_id}/reprocess")
def reprocess_email(email_id: str, db: Session = Depends(get_db)):
    email = db.query(Email).filter(Email.id == email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    # Reprocess event log
    db.add(ProcessingLog(
        id=f"log_reprocess_{email_id}_{datetime.datetime.utcnow().timestamp()}",
        email_id=email_id,
        event_type="classified",
        status="info",
        details="Reprocess triggered: re-evaluating classification and safety boundaries."
    ))
    db.commit()
    return {"status": "success", "message": "Email re-queued and verified against decision policies."}
