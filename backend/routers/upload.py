import os
import tempfile

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

import state
from auth import get_current_user
from services.pdf_service import process_pdf

router = APIRouter(tags=["Upload"])


@router.post("/upload_pdf/")
async def upload_pdf(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            contents = await file.read()
            temp_file.write(contents)
            temp_path = temp_file.name

        vectorstore, chunk_count = process_pdf(temp_path)
        state.set_vectorstore(vectorstore)

        return {
            "message": f"'{file.filename}' uploaded and processed successfully!",
            "chunks_processed": chunk_count,
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

    finally:
        if temp_path and os.path.exists(temp_path):
            os.unlink(temp_path)
