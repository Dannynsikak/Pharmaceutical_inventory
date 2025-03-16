import pandas as pd
from datetime import datetime

# Load the CSV dataset (adjust the path if needed)
df = pd.read_csv('medicine_dataset_cleaned.csv')

# Inspect the original data (optional)
print("Original Data:")
print(df.head())

# Rename columns to match our project’s field names
df.rename(columns={
    'Name': 'name',
    'Manufacturer': 'supplier',
    'Dosage Form': 'dosage_form',
    'Strength': 'strength',
    'Category': 'category',
    'Indication': 'indication',
    'Classification': 'classification'
}, inplace=True)

# Add missing fields for our Medicine model

# Generate a dummy batch number using the row index (e.g., BATCH_0001, BATCH_0002, ...)
df['batch_no'] = df.index.to_series().apply(lambda x: f"BATCH_{x+1:04d}")

# Set a default stock value (0 units, for example)
df['stock'] = 10

# Set a default expiry_date; using a placeholder date far in the future ("2100-01-01")
df['expiry_date'] = pd.to_datetime("2100-01-01")

# Set a default reorder_level
df['reorder_level'] = 10

df['price'] = 100.0  # Set as a float value


# Reorder the columns to match your model and also include the extra details
final_columns = [
    'name', 'batch_no', 'stock', 'expiry_date', 'supplier', 'reorder_level',
    'category', 'dosage_form', 'strength', 'indication', 'classification', 'price'
]
df = df[final_columns]

# Save the cleaned DataFrame to a new CSV file
output_file = "medicine_dataset_cleaned2.csv"
df.to_csv(output_file, index=False)

print(f"Cleaned data saved to {output_file}")
