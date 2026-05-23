from fastapi import APIRouter, Depends, Form, HTTPException

import state
from auth import get_current_user
from services.chat_service import generate_answer

router = APIRouter(tags=["Chat"])


@router.post("/chat/")
async def chat(
    query: str = Form(...),
    user: dict = Depends(get_current_user),
):
    retriever = state.get_retriever()
    if retriever is None:
        raise HTTPException(
            status_code=400,
            detail="No PDF loaded. Please upload a PDF before asking questions.",
        )

    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    try:
        result = generate_answer(query, retriever)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")
