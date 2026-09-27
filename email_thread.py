import datetime
from sqlalchemy import Column, String, DateTime
from backend.app.core.database import Base

class EmailThread(Base):
    __tablename__ = "email_threads"

    id = Column(String, primary_key=True, index=True)
    provider_thread_id = Column(String, unique=True, index=True)
    subject = Column(String, default="")
    last_message_at = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
