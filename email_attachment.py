from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class EmailAttachment(Base):
    __tablename__ = "email_attachments"

    id = Column(String, primary_key=True, index=True)
    email_id = Column(String, ForeignKey("emails.id"), index=True)
    filename = Column(String)
    content_type = Column(String, default="application/octet-stream")
    file_path = Column(String, default="")
    size = Column(Integer, default=0)

    email = relationship("Email", back_populates="attachments")
