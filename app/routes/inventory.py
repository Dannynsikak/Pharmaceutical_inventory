from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.schemas import PriceUpdateRequest  # ✅ Import the new schema


router = APIRouter()

# 🏥 Create a new medicine entry
@router.post("/medicines/", response_model=schemas.MedicineResponse)
def create_medicine(medicine: schemas.MedicineCreate, db: Session = Depends(get_db)):
    db_medicine = models.Medicine(**medicine.model_dump())
    db.add(db_medicine)
    db.commit()
    db.refresh(db_medicine)
    return db_medicine

# 🔍 Get all medicines
@router.get("/medicines/", response_model=list[schemas.MedicineResponse])
def get_medicines(db: Session = Depends(get_db)):
    return db.query(models.Medicine).all()

# ✏️ Update medicine details
@router.put("/medicines/{medicine_id}", response_model=schemas.MedicineResponse)
def update_medicine(medicine_id: int, updated_data: schemas.MedicineCreate, db: Session = Depends(get_db)):
    db_medicine = db.query(models.Medicine).filter(models.Medicine.id == medicine_id).first()
    if not db_medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    db_medicine.name = updated_data.name
    db_medicine.stock = updated_data.stock  # ✅ Fixed: Changed from `quantity` to `stock`
    db_medicine.price = updated_data.price

    db.commit()
    db.refresh(db_medicine)
    return db_medicine

# ❌ Delete a medicine entry
@router.delete("/medicines/{medicine_id}")
def delete_medicine(medicine_id: int, db: Session = Depends(get_db)):
    db_medicine = db.query(models.Medicine).filter(models.Medicine.id == medicine_id).first()
    if not db_medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    db.delete(db_medicine)
    db.commit()
    return {"message": "Medicine deleted successfully"}

# 💰 Register a sale
@router.post("/sales/", response_model=schemas.SaleResponse)
def create_sale(sale: schemas.SaleCreate, db: Session = Depends(get_db)):
    medicine = db.query(models.Medicine).filter(models.Medicine.id == sale.medicine_id).first()
    if not medicine or medicine.stock < sale.quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    medicine.stock -= sale.quantity
    total_price = sale.quantity * medicine.price
    db_sale = models.Sale(
        medicine_id=sale.medicine_id,
        quantity=sale.quantity,
        total_price=total_price,
        date_sold=datetime.utcnow()  # ✅ Fixed: Added date_sold
    )
    
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

# 🛒 Register a purchase (restock)
@router.post("/purchases/", response_model=schemas.PurchaseResponse)
def create_purchase(purchase: schemas.PurchaseCreate, db: Session = Depends(get_db)):
    medicine = db.query(models.Medicine).filter(models.Medicine.id == purchase.medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")

    medicine.stock += purchase.quantity
    db_purchase = models.Purchase(
        medicine_id=purchase.medicine_id,
        quantity=purchase.quantity,
        date_purchased=datetime.utcnow()  # ✅ Fixed: Added date_purchased
    )
    
    db.add(db_purchase)
    db.commit()
    db.refresh(db_purchase)
    return db_purchase

# 💲 Update the price of a medicine
@router.put("/medicines/{medicine_id}/price", response_model=schemas.MedicineResponse)
def update_medicine_price(
    medicine_id: int, price_update: PriceUpdateRequest, db: Session = Depends(get_db)
):
    db_medicine = db.query(models.Medicine).filter(models.Medicine.id == medicine_id).first()
    if not db_medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")

    db_medicine.price = price_update.new_price  # ✅ Use the validated Pydantic schema
    db.commit()
    db.refresh(db_medicine)
    return db_medicine
