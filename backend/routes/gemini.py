from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import ask_gemini

router = APIRouter()

class AskRequest(BaseModel):
    question: str

@router.post("/ask")
def ask_gemini_route(request: AskRequest):
    try:
        response = ask_gemini(request.question)
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
