from pydantic import BaseModel
from typing import Optional, List
from datetime import date

# -----------------------------
# Test Result (Report) Model
# -----------------------------
class TestResultOut(BaseModel):
    id: int
    patient_id: int
    test_name: Optional[str]
    test_type: Optional[str]
    test_date: Optional[date]
    report_file: Optional[str]


# -----------------------------
# Patient Create Model
# -----------------------------
class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    contact_info: str
    address: Optional[str] = None


# -----------------------------
# Patient Output Model
# (with reports)
# -----------------------------
class PatientOut(PatientCreate):
    id: int
    reports: Optional[List[TestResultOut]] = []
