import uuid

from app.session import InterviewSession
from datetime import datetime

class SessionManager:

    def __init__(self):
        self.sessions = {}

    def create_session(self, role, experience,username,duration):

        session = InterviewSession(
            session_id=str(uuid.uuid4()),
            role=role,
            experience=experience,
            username=username,
            duration=duration,
            started_at=datetime.now
        )

        self.sessions[session.session_id] = session

        return session

    def get_session(self, session_id):

        return self.sessions.get(session_id)