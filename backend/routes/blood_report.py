from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_connection
import shutil
import os
from uuid import uuid4
from services import gemini_service

router = APIRouter(prefix="/blood-reports", tags=["Blood Test Reports"])

UPLOAD_DIR = "uploaded_reports"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-image/")
def upload_blood_report_image(
    patient_id: int = Form(...),
    test_date: str = Form(...),
    report_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_connection),
):
    # ✅ Validate image format
    if not file.filename.lower().endswith((".jpg", ".jpeg")):
        raise HTTPException(status_code=400, detail="Only .jpg/.jpeg files allowed")

    # ✅ Save file with unique name
    file_id = f"{uuid4()}.jpg"
    file_path = os.path.join(UPLOAD_DIR, file_id)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ✅ Optional: Analyze image using Gemini
    summary = gemini_service.analyze_image(file_path)

    # ✅ Save summary & metadata to DB (you can expand this)
    # For now, just return success
    return {
        "message": "Image uploaded successfully",
        "summary": summary,
        "path": file_path,
    }
