"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface SaleFormProps {
  onSaleRecorded: () => void;
}

const SaleForm: React.FC<SaleFormProps> = ({ onSaleRecorded }) => {
  const [medicineId, setMedicineId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSale = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/sales/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ medicine_id: medicineId, quantity }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }
      // Reset quantity
      setTimeout(() => {
        onSaleRecorded();
        setMedicineId(0); // Reset medicineId
        setQuantity(0); // Refresh inventory list after a delay
        setLoading(false);
        setSuccess("Sale recorded successfully.");
      }, 2000); // 2 seconds delay
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to record sale.");
      } else {
        setError("Failed to record sale.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-2">Record a Sale</h3>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSale} className="space-y-4">
        <div>
          <label htmlFor="medicineId" className="block">
            Medicine ID:
          </label>
          <input
            id="medicineId"
            type="number"
            value={medicineId}
            onChange={(e) => setMedicineId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block">
            Quantity Sold:
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <Button
          variant={"outline"}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? (
            <div className="flex gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Recording...
            </div>
          ) : (
            "Record Sales"
          )}
        </Button>
      </form>
    </div>
  );
};

export default SaleForm;
