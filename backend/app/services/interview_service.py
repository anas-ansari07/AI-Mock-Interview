from app.llm import client
from app.config import MODEL
from app.prompts.prompts import SYSTEM_PROMPT
from app.parsers.response_parsers import ResponseParser

class InterviewService:

    def ask_question(self, session):

        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT
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