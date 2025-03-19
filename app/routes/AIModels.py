import numpy as np
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter()

# 🧠 AI Model for Stock Prediction
def predict_restock(medicine_id, sales_data):
    avg_sales = np.mean(sales_data[-7:])  # Last 7 days avg
    current_stock = sales_data[-1]
    if avg_sales <= 0:
        return None # no valid sales average
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
    days_until_restock = predict_restock(medicine_id, sales_data)
    if days_until_restock is None:
        return {"message": "Insufficient sales trend to predict"}
    
    return {
        "medicine_id": medicine_id,
        "days_until_restock": days_until_restock
    }