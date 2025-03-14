from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import users, medicines, inventory
app = FastAPI(title="Pharmaceutical Inventory System")

# Set up CORS
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(medicines.router, prefix="/medicines", tags=["Medicines"])
app.include_router(inventory.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Welcome to the Pharmaceutical Inventory System"}
