from app.engine.interview_plan import INTERVIEW_PLANS


class InterviewEngine:

    def get_plan(self, session):
        return INTERVIEW_PLANS[session.role]

    def get_current_topic(self, session):
        plan = self.get_plan(session)

        if session.current_topic_index >= len(plan):
            return None

        return plan[session.current_topic_index]

    def get_current_difficulty(self, session):
        topic = self.get_current_topic(session)

        if topic is None:
            return None

        return topic.difficulty.value

    def get_completed_topics(self, session):
        return session.completed_topics