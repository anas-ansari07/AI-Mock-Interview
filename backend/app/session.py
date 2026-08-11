from dataclasses import dataclass, field
from datetime import datetime
@dataclass
class InterviewSession:
    session_id: str
    role: str
    experience: str
    username: str
    duration: int
    started_at: datetime
    history: list = field(default_factory=list)

    

