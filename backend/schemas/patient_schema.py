from pydantic import BaseModel

class CreatePatient(BaseModel):
    name: str
    age: int
    gender: str
    diagnosis: str
