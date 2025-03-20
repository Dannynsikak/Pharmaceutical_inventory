from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.cache import get_cache, set_cache
from app.database import get_db
from sqlalchemy.sql import text




router = APIRouter()

@router.get("/sales-trends")
def sales_trends(db: Session = Depends(get_db)):
    cached_data = get_cache("sales_trends")
    if cached_data:
        return cached_data

    # Wrap the SQL query with text()
    results = db.execute(text("""
        SELECT DATE(date_sold) AS day, SUM(quantity) AS total_sales 
        FROM sales
        GROUP BY day
        ORDER BY day;
    """)).fetchall()
    
    for row in results:
        print(row, type(row))
    results_list = [dict(row._mapping) for row in results]
    return results_list

def update_sales_trends_cache():
    with get_db() as session:
        try:
            # Call the sales_trends function to get the aggregated results
            results = sales_trends(db=session)  # your function returns a list of dicts
            # Cache the result using a unique key, e.g., "sales_trends"
            set_cache("sales_trends", results)
            print("Sales trends cache updated")
        except Exception as e:
            print("Failed to update sales trends cache:", e)


# 🏥 Stock Levels: Returns medicines with stock below a threshold
@router.get("/stock-levels")
def stock_levels(threshold: int = 10, db: Session = Depends(get_db)):
    cached_data = get_cache(f"stock_levels_{threshold}")
    if cached_data:
        return cached_data

    results = db.execute(text("""
        SELECT name, stock 
        FROM medicines 
        WHERE stock < :threshold
        ORDER BY stock ASC;
    """), {"threshold": threshold}).fetchall()

    results_list = [dict(row._mapping) for row in results]
    set_cache(f"stock_levels_{threshold}", results_list)
    return results_list

def update_stock_levels_cache():
    with get_db() as session:
        try:
            # Call the stock_levels function to get the aggregated results
            results = stock_levels(db=session)  # your function returns a list of dicts
            # Cache the result using a unique key, e.g., "stock_levels"
            set_cache("stock_levels", results)
            print("Stock levels cache updated")
        except Exception as e:
            print("Failed to update stock levels cache:", e)

