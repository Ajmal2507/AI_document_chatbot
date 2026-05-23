from fastapi import APIRouter
import state

router = APIRouter(tags=["Health"])


@router.get("/")
async def health_check():
    return {"status": "healthy", "service": "PDF Chatbot API"}


@router.get("/status")
async def get_status():
    return {
        "pdf_loaded": state.is_pdf_loaded(),
        "vectorstore_size": state.get_vectorstore_size(),
    }
