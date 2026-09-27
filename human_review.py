import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class HumanReview(Base):
    __tablename__ = "human_reviews"

    id = Column(String, primary_key=True, index=True)
    email_id = Column(String, ForeignKey("emails.id"), index=True)
    assigned_to = Column(String, default="Unassigned")
    status = Column(String, default="pending", index=True) # pending, approved, rejected, edited, resolved
    reviewer_decision = Column(String, nullable=True)
    notes = Column(Text, default="", nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    email = relationship("Email", back_populates="human_reviews")
