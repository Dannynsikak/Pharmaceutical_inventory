"use client";
import { useState } from "react";

const UpdatePrice = () => {
  const [medicine_id, setMedicine_id] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleUpdatePrice = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setMessage("Unauthorized: Please log in.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/medicines/${medicine_id}/price`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ new_price: newPrice }),
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to update price: ${res.statusText}`);
      }

      setMessage("Price updated successfully!");
    } catch (err) {
      console.error("Error updating price:", err);
      setMessage("Failed to update price.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Medicine Price</h2>
      {message && <p className="text-green-600">{message}</p>}
      <div className="mb-4">
        <label htmlFor="medicine-id" className="block mb-2">
          Medicine ID:
        </label>
        <input
          id="medicine-id"
          type="number"
          value={medicine_id}
          onChange={(e) => setMedicine_id(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="new-price" className="block mb-2">
          New Price:
        </label>
        <input
          id="new-price"
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="button"
        onClick={handleUpdatePrice}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Price
      </button>
    </div>
  );
};

export default UpdatePrice;
