from app.models import Supplier
from app.database import sessionLocal

def get_or_create_supplier(session, supplier_name="Ofonime", contact_info="zxyStores"):
    """
    Checks if a supplier exists in the database by name.
    If not, creates a new supplier with the provided contact_info.
    Returns the Supplier instance.
    """
    supplier = session.query(Supplier).filter(Supplier.name == supplier_name).first()
    if not supplier:
        supplier = Supplier(name=supplier_name, contact_info=contact_info)
        session.add(supplier)
        session.commit()   # Commit so the supplier gets an id
        session.refresh(supplier)
    return supplier

# Example usage:
if __name__ == "__main__":
    session = sessionLocal()
    supplier_name = "Acme Pharmaceuticals"
    supplier = get_or_create_supplier(session, supplier_name, contact_info="contact@acmepharma.com")
    print(f"Supplier ID: {supplier.id}, Name: {supplier.name}")
    session.close()
