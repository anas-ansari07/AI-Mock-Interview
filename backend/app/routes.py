from fastapi import APIRouter
from app.session_manager import SessionManager
from app.services.interview_service import InterviewService
from app.schemas import(
    StartInterviewRequest,
    AnswerRequest,
    AIInterviewResponse
)

router = APIRouter()
session_manager = SessionManager()
service = InterviewService()

# My Fist Post Request to Start the interview and store everything 
# in session to have a history
# Take InterviewRequest Model to generate the Questions

@router.post("/start", response_model=AIInterviewResponse)
def start_interview(request: StartInterviewRequest):

    session = session_manager.create_session(
        request.role,
        request.experience,
        request.username,
        request.duration
    )

    result = service.ask_question(session)

    session.history.append({
        "role": "assistant",
        "content": result["next_question"]
    })

    return {
        "session_id": session.session_id,
        "feedback" : result["feedback"],
        "next_question" : result["next_question"]
    }
    
# Model Response if the result is expected provide
# feedback else ask the next question
# have everything in session to maintain history

@router.post("/answer", response_model=AIInterviewResponse)
def answer(request: AnswerRequest):

    session = session_manager.get_session(request.session_id)

    if session is None:
        return {
            "error": "Session not found"
        }

    session.history.append({
        "role": "user",
        "content": request.answer
    })

    reply = service.ask_question(session)

    session.history.append({
        "role": "assistant",
        "content": reply["next_question"]
    })

    return {
    "session_id": session.session_id,
    "feedback": reply["feedback"],
    "next_question": reply["next_question"]
    }