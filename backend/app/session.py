from dataclasses import dataclass, field
from datetime import datetime

from enum import Enum

class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"

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
    current_topic_index: int = 0
    questions_asked_in_topic: int = 0
    completed_topics: list[str] = field(default_factory=list)
    difficulty: Difficulty = Difficulty.EASY

    

