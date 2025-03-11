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

    class Config:
        from_attributes = True  # Fix: Replacing `orm_mode = True` (Deprecated in Pydantic v2)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class MedicineBase(BaseModel):
    name: str
    quantity: int
    price: float

class MedicineCreate(MedicineBase):
    pass

class MedicineResponse(MedicineBase):
    id: int

    class Config:
        from_attributes = True

class SaleBase(BaseModel):
    medicine_id: int
    quantity: int

class SaleCreate(SaleBase):
    pass

class SaleResponse(SaleBase):
    id: int
    total_price: float
    date_sold: datetime  # Fix: Use datetime.datetime instead of just datetime

    model_config = {
        "arbitrary_types_allowed": True  # Fix: Allows Pydantic to handle datetime types properly
    }

class PurchaseBase(BaseModel):
    medicine_id: int
    quantity: int

class PurchaseCreate(PurchaseBase):
    pass

class PurchaseResponse(PurchaseBase):
    id: int
    date_purchased: datetime  # Fix: Use datetime.datetime instead of just datetime

    model_config = {
        "arbitrary_types_allowed": True  # Fix: Ensures datetime works in Pydantic v2
    }
