from app.prompts.report_prompts import REPORT_PROMPT
from app.llm import client
from app.config import MODEL
from app.parsers.response_parsers import ResponseParser

class ReportService:

    def generate_report(self, history):

        messages = [
            {
                "role":"system",
                "content":REPORT_PROMPT
            }
        ]

        messages.extend(history)

        response = client.chat.completions.create(
            model=MODEL,
            messages=messages
        )

        #print(response.choices[0].message.content)
        reply=response.choices[0].message.content
        return ResponseParser.parse(reply)
