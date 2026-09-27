from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from backend.app.schemas.email import EmailListItem

class ReviewResolveRequest(BaseModel):
    decision: str # approved, rejected, edited, archived
    notes: Optional[str] = ""
    assigned_to: Optional[str] = "Workspace Admin"
    edited_reply: Optional[str] = None

class ReviewAssignRequest(BaseModel):
    assigned_to: str
