import sys
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Path setup
sys.path.append(os.path.dirname(__file__))
sys.path.append(os.path.join(os.path.dirname(__file__), "services"))

# Routers
from routes.patients import router as patient_router
from routes.blood_report import router as blood_report_router
from routes.gemini import router as gemini_router

# App init
app = FastAPI(title="Doctor's Assistant API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # use ["http://localhost:5173"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# API ROUTES
# -----------------------------
app.include_router(patient_router, prefix="/api", tags=["Patients"])
app.include_router(blood_report_router, prefix="/api/reports", tags=["Reports"])
app.include_router(gemini_router, prefix="/api/gemini", tags=["Gemini AI"])

# -----------------------------
# ROOT
# -----------------------------
@app.get("/")
def root():
    return {"message": "Doctor's Assistant API is running"}

# -----------------------------
# STATIC FILES (optional)
# -----------------------------
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
