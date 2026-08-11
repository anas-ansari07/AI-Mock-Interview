from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.database import Base


class InterviewReportModel(Base):

    __tablename__ = "interview_reports"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    username: Mapped[str] = mapped_column(
        String,
    )

    role: Mapped[str] = mapped_column(
        String,
    )

    experience: Mapped[str] = mapped_column(
        String,
    )

    duration: Mapped[int] = mapped_column(
        Integer,
    )

    overall_score: Mapped[int] = mapped_column(
        Integer,
    )

    technical_score: Mapped[int] = mapped_column(
        Integer,
    )

    communication_score: Mapped[int] = mapped_column(
        Integer,
    )

    confidence_score: Mapped[int] = mapped_column(
        Integer,
    )