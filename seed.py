import json
import os
import datetime
from sqlalchemy.orm import Session
from backend.app.models.email import Email
from backend.app.models.email_thread import EmailThread
from backend.app.models.email_attachment import EmailAttachment
from backend.app.models.email_decision import EmailDecision
from backend.app.models.processing_log import ProcessingLog
from backend.app.models.human_review import HumanReview

def get_sample_emails_path():
    candidate_paths = [
        os.path.join(os.getcwd(), "demo_data", "emails", "sample_emails.json"),
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))), "demo_data", "emails", "sample_emails.json"),
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "demo_data", "emails", "sample_emails.json"),
        "/demo_data/emails/sample_emails.json",
        "/app/applet/demo_data/emails/sample_emails.json",
    ]
    for p in candidate_paths:
        if os.path.exists(p):
            return p
    return candidate_paths[0]

def seed_demo_emails(db: Session, force: bool = False):
    existing_count = db.query(Email).count()
    if existing_count > 0 and not force:
        return existing_count

    if force:
        db.query(HumanReview).delete()
        db.query(ProcessingLog).delete()
        db.query(EmailDecision).delete()
        db.query(EmailAttachment).delete()
        db.query(Email).delete()
        db.query(EmailThread).delete()
        db.commit()

    sample_path = get_sample_emails_path()
    if not os.path.exists(sample_path):
        print(f"[TRIAGEFLOW] Sample emails file not found: {sample_path}")
        return 0

    with open(sample_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    now = datetime.datetime.utcnow()

    threads_created = set()

    for idx, item in enumerate(data):
        # Create or reuse thread
        thread_id = item.get("thread_id") or f"thread_{item['id']}"
        if thread_id not in threads_created:
            db_thread = db.query(EmailThread).filter(EmailThread.id == thread_id).first()
            if not db_thread:
                db_thread = EmailThread(
                    id=thread_id,
                    provider_thread_id=thread_id,
                    subject=item["subject"],
                    last_message_at=now - datetime.timedelta(minutes=(len(data) - idx) * 12)
                )
                db.add(db_thread)
            threads_created.add(thread_id)

        # Create email
        email_timestamp = now - datetime.timedelta(minutes=(len(data) - idx) * 12)
        email = Email(
            id=item["id"],
            provider="demo",
            provider_message_id=item["provider_message_id"],
            thread_id=thread_id,
            sender_name=item["sender_name"],
            sender_email=item["sender_email"],
            recipient=item.get("recipient", "contact@northstarestates.com"),
            cc=item.get("cc", ""),
            subject=item["subject"],
            clean_body=item["clean_body"],
            raw_body=item["raw_body"],
            timestamp=email_timestamp,
            category=item["category"],
            priority=item["priority"],
            confidence=item["confidence"],
            requires_human=item["requires_human"],
            recommended_action=item["recommended_action"],
            reason=item["reason"],
            status=item["status"],
            rag_used=item["rag_used"],
            rag_sources=item.get("rag_sources", "[]"),
            response_sent=item["response_sent"],
            generated_reply=item.get("generated_reply"),
            forwarded_to=item.get("forwarded_to"),
            discord_status=item.get("discord_status", "none"),
            created_at=email_timestamp,
            updated_at=email_timestamp,
        )
        db.add(email)

        # Attachments for specific emails
        if item["id"] == "email_03":
            db.add(EmailAttachment(
                id=f"att_{item['id']}_1",
                email_id=item["id"],
                filename="Ayesha_Bilal_AI_Engineer_CV.pdf",
                content_type="application/pdf",
                file_path="/uploads/Ayesha_Bilal_AI_Engineer_CV.pdf",
                size=284500
            ))
        elif item["id"] == "email_04":
            db.add(EmailAttachment(
                id=f"att_{item['id']}_1",
                email_id=item["id"],
                filename="Margalla_View_Soil_Inspection_Report.pdf",
                content_type="application/pdf",
                file_path="/uploads/Margalla_View_Soil_Inspection_Report.pdf",
                size=1420000
            ))

        # Email Decision
        db.add(EmailDecision(
            id=f"dec_{item['id']}",
            email_id=item["id"],
            category=item["category"],
            priority=item["priority"],
            confidence=item["confidence"],
            requires_human=item["requires_human"],
            recommended_action=item["recommended_action"],
            reason=item["reason"],
            model_name="gemini-3.8-flash",
            created_at=email_timestamp + datetime.timedelta(seconds=2)
        ))

        # Processing timeline logs
        stages = [
            ("received", "success", "Email payload ingested via Demo Provider"),
            ("parsed", "success", "Headers, recipients, and multipart payload parsed"),
            ("cleaned", "success", "Signatures, quoted replies, and markup removed"),
            ("duplicate_check", "success", "Provider ID uniqueness verified; 0 duplicates"),
            ("thread_check", "success", f"Thread context resolved: {thread_id}"),
            ("classified", "success", f"Classified as '{item['category']}' with {int(item['confidence']*100)}% confidence"),
            ("decision_made", "success", f"Action: {item['recommended_action']} | Human: {item['requires_human']}"),
        ]

        if item["rag_used"]:
            stages.append(("rag_queried", "success", "Task 5 ChromaDB retrieved verified chunks"))
        if item["response_sent"]:
            stages.append(("email_sent", "success", "Automated grounded reply dispatched"))
        if item.get("forwarded_to"):
            stages.append(("forwarded", "success", f"Forwarded to {item['forwarded_to']}"))
        if item.get("discord_status") == "sent":
            stages.append(("discord_alert", "success", "Discord notification webhook delivered"))
        if item["requires_human"]:
            stages.append(("human_escalated", "warning", "Assigned to Human Review queue"))

        for s_idx, (event_type, status, details) in enumerate(stages):
            db.add(ProcessingLog(
                id=f"log_{item['id']}_{s_idx}",
                email_id=item["id"],
                event_type=event_type,
                status=status,
                details=details,
                created_at=email_timestamp + datetime.timedelta(seconds=s_idx + 1)
            ))

        # Human Review queue entry if required
        if item["requires_human"] or item["status"] == "needs_review":
            db.add(HumanReview(
                id=f"rev_{item['id']}",
                email_id=item["id"],
                assigned_to="Workspace Admin",
                status="pending" if item["status"] == "needs_review" else "processed",
                notes=f"Auto-routed: {item['reason']}",
                created_at=email_timestamp + datetime.timedelta(seconds=3)
            ))

    db.commit()
    return len(data)
