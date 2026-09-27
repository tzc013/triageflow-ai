from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AttachmentSchema(BaseModel):
    id: str
    filename: str
    content_type: str
    size: int

    class Config:
        from_attributes = True

class DecisionSchema(BaseModel):
    id: str
    category: str
    priority: str
    confidence: float
    requires_human: bool
    recommended_action: str
    reason: str
    model_name: str
    created_at: datetime

    class Config:
        from_attributes = True

class LogSchema(BaseModel):
    id: str
    event_type: str
    status: str
    details: str
    error_message: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class EmailListItem(BaseModel):
    id: str
    provider: str
    provider_message_id: str
    thread_id: Optional[str] = None
    sender_name: str
    sender_email: str
    subject: str
    clean_body: str
    timestamp: datetime
    category: str
    priority: str
    confidence: float
    requires_human: bool
    recommended_action: str
    reason: str
    status: str
    rag_used: bool
    response_sent: bool
    forwarded_to: Optional[str] = None
    discord_status: str

    class Config:
        from_attributes = True

class EmailDetail(EmailListItem):
    raw_body: str
    recipient: str
    cc: Optional[str] = None
    rag_sources: str
    generated_reply: Optional[str] = None
    attachments: List[AttachmentSchema] = []
    decisions: List[DecisionSchema] = []
    logs: List[LogSchema] = []

    class Config:
        from_attributes = True
