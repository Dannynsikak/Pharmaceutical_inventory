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
    days_left = current_stock / avg_sales if avg_sales > 0 else 0
    return days_left

@router.get("/predict-restock/{medicine_id}")
def predict_restock_time(medicine_id: int, db: Session = Depends(get_db)):
    sales = db.query(models.Sale).filter(models.Sale.medicine_id == medicine_id).all()
    sales_data = [sale.quantity for sale in sales]
    
    if len(sales_data) < 7:
        return {"message": "Not enough data for prediction"}

    days_until_restock = predict_restock(medicine_id, sales_data)
    return {"medicine_id": medicine_id, "days_until_restock": days_until_restock}
