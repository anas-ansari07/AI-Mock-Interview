from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from app.database.database import engine
from app.database.database import Base

import app.database.models

Base.metadata.create_all(bind=engine)
app = FastAPI(title="AI Mock Interview")

# Enabling CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




app.include_router(router, prefix="/interview")

