"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface Supplier {
  id: number;
  name: string;
}

const AddMedicine = () => {
  // Initialize supplier_id as number (0 means "not selected")
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
    supplier_id: 0,
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

  // Handle input changes for text and number fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // If updating supplier_id, convert value to number
    if (name === "supplier_id") {
      setMedicine({ ...medicine, supplier_id: Number(value) });
    } else {
      setMedicine({ ...medicine, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Check if a valid supplier is selected
    if (medicine.supplier_id === 0) {
      setError("Please select a supplier.");
      setLoading(false);
      return;
    }

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
      // Reset form
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
        supplier_id: 0,
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
        <div className="space-y-2">
          <Label htmlFor="name">Medicine Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Enter medicine name"
            value={medicine.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Batch No */}
        <div className="space-y-2">
          <Label htmlFor="batch_no">Batch No</Label>
          <Input
            id="batch_no"
            type="text"
            name="batch_no"
            placeholder="Enter batch number"
            value={medicine.batch_no}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            value={medicine.stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Expiry Date */}
        <div className="space-y-2">
          <Label htmlFor="expiry_date">Expiry Date</Label>
          <Input
            id="expiry_date"
            type="date"
            name="expiry_date"
            value={medicine.expiry_date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            placeholder="Enter price"
            value={medicine.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Supplier Selection */}
        <div className="space-y-2">
          <Label htmlFor="supplier_id">Supplier</Label>
          <Select
            name="supplier_id"
            value={medicine.supplier_id ? medicine.supplier_id.toString() : ""}
            onValueChange={(value) =>
              setMedicine({ ...medicine, supplier_id: Number(value) })
            }
          >
            <SelectTrigger id="supplier_id">
              <SelectValue placeholder="Select Supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id.toString()}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Medicine"}
        </Button>
      </form>
    </div>
  );
};

export default AddMedicine;
