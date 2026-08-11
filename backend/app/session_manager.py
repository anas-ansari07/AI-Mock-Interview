import uuid

from app.session import InterviewSession

class SessionManager:

    def __init__(self):
        self.sessions = {}

    def create_session(self, role, experience):

        session = InterviewSession(
            session_id=str(uuid.uuid4()),
            role=role,
            experience=experience
        )

        self.sessions[session.session_id] = session

        return session

    def get_session(self, session_id):

        return self.sessions.get(session_id)