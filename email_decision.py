import datetime
from sqlalchemy import Column, String, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class EmailDecision(Base):
    __tablename__ = "email_decisions"

    id = Column(String, primary_key=True, index=True)
    email_id = Column(String, ForeignKey("emails.id"), index=True)
    category = Column(String, index=True)
    priority = Column(String, index=True)
    confidence = Column(Float, default=0.0)
    requires_human = Column(Boolean, default=False)
    recommended_action = Column(String)
    reason = Column(Text, default="")
    model_name = Column(String, default="gemini-3.8-flash")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    email = relationship("Email", back_populates="decisions")
