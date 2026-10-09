from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import os

# Adjust your connection string for MySQL
DATABASE_URL = "mysql+pymysql://username:password@localhost:3306/your_db_name"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
