from app.llm import client
from app.config import MODEL
#from app.prompts.prompts import SYSTEM_PROMPT
from app.parsers.response_parsers import ResponseParser
from app.engine.interview_engine import InterviewEngine
from app.prompts.prompts import build_interview_prompt


engine = InterviewEngine()

class InterviewService:


    def ask_question(self, session):

        topic = engine.get_current_topic(session)

        prompt = build_interview_prompt(
            role=session.role,
            topic=topic.name,
            difficulty=topic.difficulty.value,
            completed_topics=session.completed_topics,
        )

        #print("Prompt from engine: ",prompt)

        messages = [
                    {
                        "role": "system",
                        "content": prompt
                    }
                ]

        messages.extend(session.history)

        if not session.history:
            messages.append({
                "role": "user",
                "content": f"Start a mock interview for a {session.role} with {session.experience} experience."
            })

        response = client.chat.completions.create(
            model=MODEL,
            messages=messages
        )

        #print(response)
        #print("ChoicesL ", response.choices)

        reply = response.choices[0].message.content
        return ResponseParser.parse(reply)