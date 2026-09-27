from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class DashboardStats(BaseModel):
    emails_processed: int
    rag_answered: int
    human_escalated: int
    urgent_issues: int
    processing_success_rate: float
    average_confidence: float
    automation_rate: float

class ActivityItem(BaseModel):
    id: str
    time: str
    email_id: str
    subject: str
    sender_name: str
    sender_email: str
    category: str
    priority: str
    action: str
    status: str
    confidence: float
    rag_used: bool

class CategoryMetric(BaseModel):
    name: str
    count: int
    percentage: float
    color_class: str
