from dataclasses import dataclass, field

@dataclass
class InterviewSession:
    session_id: str
    role: str
    experience: str
    history: list = field(default_factory=list)