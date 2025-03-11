from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="pharmacist")  # Admin, Pharmacist, Store Manager

class Medicine(Base):
    __tablename__ = "medicines"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    batch_no = Column(String, unique=True, nullable=False)
    stock = Column(Integer, default=0)
    expiry_date = Column(DateTime, nullable=False)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    reorder_level = Column(Integer, default=10)

    supplier = relationship("Supplier", back_populates="medicines")

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)
    
    medicines = relationship("Medicine", back_populates="supplier")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    medicine_id = Column(Integer, ForeignKey("medicines.id"))
    quantity_sold = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    date = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))

    medicine = relationship("Medicine")

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    medicine_id = Column(Integer, ForeignKey("medicines.id"))
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    date_sold = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))

    medicine = relationship("Medicine")

class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True, index=True)
    medicine_id = Column(Integer, ForeignKey("medicines.id"))
    quantity = Column(Integer, nullable=False)
    date_purchased = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))

    medicine = relationship("Medicine")