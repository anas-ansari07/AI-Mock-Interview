from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.database.models import InterviewReportModel


class ReportRepository:

    def __init__(self):
        self.db: Session = SessionLocal()

    def save_report(
        self,
        session,
        report,
    ):

        report_model = InterviewReportModel(

            username=session.username,

            role=session.role,

            experience=session.experience,

            duration=session.duration,

            overall_score=report["overall_score"],

            technical_score=report["technical_score"],

            communication_score=report["communication_score"],

            confidence_score=report["confidence_score"],

        )

        self.db.add(report_model)

        self.db.commit()

        self.db.refresh(report_model)

        return report_model