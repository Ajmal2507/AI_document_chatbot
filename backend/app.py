from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import chat, health, upload

app = FastAPI(
    title="PDF Chatbot API",
    description="RAG-based PDF question-answering API powered by Groq LLaMA.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(upload.router)
app.include_router(chat.router)