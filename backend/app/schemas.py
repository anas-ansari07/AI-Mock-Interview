from pydantic import BaseModel


class StartInterviewRequest(BaseModel):
    role: str
    experience: str
    username: str
    duration: int


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

class FinishInterviewRequest(BaseModel):
    session_id: str

class InterviewReportResponse(BaseModel):

    overall_score: int

    technical_score: int

    communication_score: int

    confidence_score: int

    strengths: list[str]

    weaknesses: list[str]

    recommendations: list[str]

class DashboardSummary(BaseModel):
    total_interviews: int
    average_score: float
    highest_score: int


class RecentInterview(BaseModel):
    id: int
    username: str
    role: str
    overall_score: int


class DashboardResponse(BaseModel):
    summary: DashboardSummary
    recent_interviews: list[RecentInterview]