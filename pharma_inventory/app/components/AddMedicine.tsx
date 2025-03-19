"use client";

import { useState, useEffect } from "react";

interface Supplier {
  id: number;
  name: string;
}

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: "",
    batch_no: "",
    stock: 0,
    expiry_date: "",
    reorder_level: 10,
    category: "",
    dosage_form: "",
    strength: "",
    indication: "",
    classification: "",
    price: 0,
    supplier_id: "",
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch suppliers from API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/suppliers/");
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const data = await response.json();
        setSuppliers(data);
      } catch (err) {
        setError("Error fetching suppliers");
      }
    };
    fetchSuppliers();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:8000/api/medicines/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicine),
      });

      if (!response.ok) {
        throw new Error("Failed to add medicine");
      }

      setSuccess("Medicine added successfully!");
      setMedicine({
        name: "",
        batch_no: "",
        stock: 0,
        expiry_date: "",
        reorder_level: 10,
        category: "",
        dosage_form: "",
        strength: "",
        indication: "",
        classification: "",
        price: 0,
        supplier_id: "",
      });
    } catch (err) {
      setError("Error adding medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add New Medicine</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Medicine Name */}
        <label className="block">
          Medicine Name:
          <input
            type="text"
            name="name"
            placeholder="Enter medicine name"
            value={medicine.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
            title="Enter the name of the medicine"
          />
        </label>

        {/* Batch No */}
        <label className="block">
          Batch No:
          <input
            type="text"
            name="batch_no"
            placeholder="Enter batch number"
            value={medicine.batch_no}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        {/* Stock */}
        <label className="block">
          Stock:
          <input
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            value={medicine.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        {/* Expiry Date */}
        <label className="block">
          Expiry Date:
          <input
            type="date"
            name="expiry_date"
            value={medicine.expiry_date}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        {/* Price */}
        <label className="block">
          Price:
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={medicine.price}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        {/* Supplier Selection */}
        <label className="block">
          Supplier:
          <select
            name="supplier_id"
            value={medicine.supplier_id}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded mt-2"
        >
          {loading ? "Adding..." : "Add Medicine"}
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
