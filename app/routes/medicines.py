from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Medicine
from app.utils.deps import get_current_user

router = APIRouter()

@router.get("/", dependencies=[Depends(get_current_user)])
def get_medicines(db: Session = Depends(get_db)):
    """Get all medicines (protected route)."""
    return db.query(Medicine).all()
