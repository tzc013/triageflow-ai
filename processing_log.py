import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class ProcessingLog(Base):
    __tablename__ = "processing_logs"

    id = Column(String, primary_key=True, index=True)
    email_id = Column(String, ForeignKey("emails.id"), index=True)
    event_type = Column(String, index=True) # received, parsed, cleaned, duplicate_check, thread_check, classified, decision_made, rag_queried, response_generated, email_sent, forwarded, discord_alert, human_escalated, archived, spammed
    status = Column(String, default="success") # success, warning, error, info
    details = Column(Text, default="")
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    email = relationship("Email", back_populates="logs")
