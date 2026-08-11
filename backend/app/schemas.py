from pydantic import BaseModel


class StartInterviewRequest(BaseModel):
    role: str
    experience: str


class AnswerRequest(BaseModel):
    session_id: str
    answer: str

class Feedback(BaseModel):
    score: int | None = None
    strengths: list[str]
    improvements: list[str]


class AIInterviewResponse(BaseModel):
    session_id: str
    feedback: Feedback
    next_question: str