from fastapi import APIRouter, HTTPException
from database.models import PatientCreate
from services.patient_service import create_patient
from database.db import get_connection

router = APIRouter()

# --------------------------------------------------
# Get all patients
# --------------------------------------------------
@router.get("/patients")
def get_all_patients():
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM patients")
        patients = cursor.fetchall()
        return patients
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        cursor.close()
        conn.close()


# --------------------------------------------------
# Get patient by ID
# --------------------------------------------------
@router.get("/patients/{patient_id}")
def get_patient(patient_id: int):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM patients WHERE id = %s", (patient_id,))
        patient = cursor.fetchone()

        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")

        return patient
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        cursor.close()
        conn.close()


# --------------------------------------------------
# ✅ NEW: Get test reports for a patient
# --------------------------------------------------
@router.get("/patients/{patient_id}/reports")
def get_patient_reports(patient_id: int):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")

    try:
        cursor = conn.cursor(dictionary=True)

        # Check patient exists
        cursor.execute("SELECT id FROM patients WHERE id = %s", (patient_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Patient not found")

        # Fetch reports
        cursor.execute("""
            SELECT 
                id,
                patient_id,
                test_name,
                test_type,
                test_date,
                report_file
            FROM test_results
            WHERE patient_id = %s
            ORDER BY test_date DESC
        """, (patient_id,))

        reports = cursor.fetchall()
        return reports

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        cursor.close()
        conn.close()


# --------------------------------------------------
# Create a new patient
# --------------------------------------------------
@router.post("/patients")
def add_patient(patient: PatientCreate):
    return create_patient(patient)
