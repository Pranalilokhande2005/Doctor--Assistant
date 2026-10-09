from database.db import get_connection
from fastapi import HTTPException

def create_patient(patients):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="DB connection failed")

    try:
        cursor = conn.cursor()
        sql = "INSERT INTO patients (name, age, gender, contact_info, address) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (patients.name, patients.age, patients.gender, patients.contact_info, patients.address))
        conn.commit()
        return {"message": "Patient created successfully", "patient_id": cursor.lastrowid}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
