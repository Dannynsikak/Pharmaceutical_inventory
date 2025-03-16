from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    model_config = { "from_attributes": True }  # Pydantic v2


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Updated Medicine schemas reflecting the new fields
class MedicineBase(BaseModel):
    name: str
    batch_no: str
    stock: int
    expiry_date: datetime
    reorder_level: int
    category: Optional[str] = None
    dosage_form: Optional[str] = None
    strength: Optional[str] = None
    indication: Optional[str] = None
    classification: Optional[str] = None
    price: float

class MedicineCreate(MedicineBase):
    pass

class MedicineResponse(MedicineBase):
    id: int
    supplier_id: int

    model_config = { "from_attributes": True }  # Pydantic v2


class SaleBase(BaseModel):
    medicine_id: int
    quantity: int

class SaleCreate(SaleBase):
    pass

class SaleResponse(SaleBase):
    id: int
    total_price: float
    date_sold: datetime

    model_config = {
        "arbitrary_types_allowed": True, "from_attributes": True
    }

class PurchaseBase(BaseModel):
    medicine_id: int
    quantity: int

class PurchaseCreate(PurchaseBase):
    pass

class PurchaseResponse(PurchaseBase):
    id: int
    date_purchased: datetime

    model_config = {
        "arbitrary_types_allowed": True, "from_attributes": True
    }

class PriceUpdateRequest(BaseModel):
    new_price: float
