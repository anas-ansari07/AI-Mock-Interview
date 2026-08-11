from dataclasses import dataclass, field
from datetime import datetime

from enum import Enum

class InterviewStatus(str, Enum):
    ACTIVE = "ACTIVE"
    COMPLETED = "COMPLETED"

@dataclass
class InterviewSession:
    session_id: str
    role: str
    experience: str
    username: str
    duration: int
    started_at: datetime
    history: list = field(default_factory=list)
    status: InterviewStatus = InterviewStatus.ACTIVE

    

