from dataclasses import dataclass
from enum import Enum

class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"

@dataclass
class Topic:
    name: str
    question: int
    difficulty: str



DOTNET_BACKEND_PLAN = [

    Topic(
        "Introduction",
        1,
        difficulty=Difficulty.EASY
    ),

    Topic(
        "C#",
        2,
        difficulty=Difficulty.EASY
    ),

    Topic(
        "OOP",
        2,
        difficulty=Difficulty.EASY
    ),

    Topic(
        "SOLID",
        2,
        difficulty=Difficulty.MEDIUM
    ),

    Topic(
        "Dependency Injection",
        2,
        difficulty=Difficulty.MEDIUM
    ),

    Topic(
        "ASP.NET Core",
        2,
        difficulty=Difficulty.MEDIUM
    ),

    Topic(
        "Entity Framework",
        2,
        difficulty=Difficulty.MEDIUM
    ),

    Topic(
        "SQL",
        2,
        difficulty=Difficulty.MEDIUM
    ),

    Topic(
        "Docker",
        2,
        difficulty=Difficulty.HARD
    ),

    Topic(
        "System Design",
        2,
        difficulty=Difficulty.HARD
    ),
]

INTERVIEW_PLANS = {

    ".Net Backend Developer":
        DOTNET_BACKEND_PLAN,

}