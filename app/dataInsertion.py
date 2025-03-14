import pandas as pd
from datetime import datetime
from app.database import sessionLocal
from app.models import Medicine
from app.supplierFunction import get_or_create_supplier  # adjust the import as needed

def add_dataset_to_db(csv_file="medicine_dataset_cleaned.csv"):
    df = pd.read_csv(csv_file)
    session = sessionLocal()

    for index, row in df.iterrows():
        try:
            expiry_date = pd.to_datetime(row['expiry_date'])
            supplier_name = row.get('supplier', 'Unknown')
            supplier = get_or_create_supplier(session, supplier_name)

            medicine = Medicine(
                name=row['name'],
                batch_no=row['batch_no'],
                stock=int(row['stock']),
                expiry_date=expiry_date,
                supplier_id=supplier.id,
                reorder_level=int(row['reorder_level'])
            )

            session.add(medicine)
            print(f"✅ Added: {medicine.name} (ID: {medicine.id})")  # Print the medicine before committing

        except Exception as e:
            print(f"❌ Error inserting {row['name']}: {e}")

    session.commit()  # Commit all at once

add_dataset_to_db()
