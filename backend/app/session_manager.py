import uuid

from app.session import InterviewSession
from datetime import datetime
from app.engine.interview_plan import INTERVIEW_PLANS

class SessionManager:

    def __init__(self):
        self.sessions = {}

    def create_session(self, role, experience,username,duration):

        print(f"Role received: '{role}'")
        print(INTERVIEW_PLANS.keys())
        plan = INTERVIEW_PLANS[role]

        session = InterviewSession(
            session_id=str(uuid.uuid4()),
            role=role,
            experience=experience,
            username=username,
            duration=duration,
            started_at=datetime.now,
            current_topic_index=0,
            questions_asked_in_topic=0,
        )

        self.sessions[session.session_id] = session

        print(session)
        return session

    def get_session(self, session_id):

        return self.sessions.get(session_id)