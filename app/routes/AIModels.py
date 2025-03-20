import numpy as np
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter()

# 🧠 AI Model for Stock Prediction
def predict_restock(sales_data):
    """
    Given a list of sales quantities, compute the 7-day average of the most recent 7 days,
    then predict the number of days until restock based on the last day's sales.
    """
    avg_sales = np.mean(sales_data[-7:])  # Last 7 days average
    current_stock = sales_data[-1]
    if avg_sales <= 0:
        return None  # No valid sales average
    days_left = current_stock / avg_sales
    return days_left

@router.get("/predict-restock/{medicine_id}")
def predict_restock_time(medicine_id: int, db: Session = Depends(get_db)):
    # 1. Get all sales for this medicine
    sales = db.query(models.Sale).filter(models.Sale.medicine_id == medicine_id).all()
    sales_data = [sale.quantity for sale in sales]

    # 2. Check if there's enough data
    if len(sales_data) < 7:
        return {"message": "Not enough data for prediction"}
    
    # 3. Predict days until restock
    days_until_restock = predict_restock(sales_data)
    if days_until_restock is None:
        return {"message": "Insufficient sales trend to predict"}
    
    return {
        "medicine_id": medicine_id,
        "days_until_restock": days_until_restock
    }

# Function to check if a product is expired
def is_expired(expiry_date_input) -> bool:
    print(f"Received expiry_date_input: {expiry_date_input}")  # Debugging print
    # Ensure the input is a datetime object
    if isinstance(expiry_date_input, datetime):
        expiry_date = expiry_date_input
    else:
        expiry_date = datetime.fromisoformat(expiry_date_input)

    print(f"Converted expiry_date: {expiry_date}")  # Debugging print
    print(f"Current UTC time: {datetime.utcnow()}")  # Debugging print

    expired = datetime.utcnow() > expiry_date
    print(f"Expired? {expired}")  # Debugging print

    return expired

@router.get("/check-expiry/{medicine_id}")
def check_medicine_expiry(medicine_id: int, db: Session = Depends(get_db)):
    medicine = db.query(models.Medicine).filter(models.Medicine.id == medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    expired = is_expired(medicine.expiry_date)
    return {
        "medicine_id": medicine_id,
        "expired": expired,
        "expiry_date": medicine.expiry_date.isoformat() if isinstance(medicine.expiry_date, datetime) else medicine.expiry_date
    }
