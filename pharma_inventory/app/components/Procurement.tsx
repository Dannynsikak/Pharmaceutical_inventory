"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface PurchaseFormProps {
  onPurchaseRecorded: () => void; // Callback to refresh inventory list
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onPurchaseRecorded }) => {
  const [medicineId, setMedicineId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/purchases/", {
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
      setSuccess("Purchase recorded successfully.");
      setMedicineId(0); // Reset medicineId
      setQuantity(0); // Reset quantity
      onPurchaseRecorded(); // Refresh inventory list
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to record purchase.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Record a Purchase
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-3">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="default" className="mb-3">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handlePurchase} className="space-y-4">
          <div>
            <label htmlFor="medicineId" className="text-sm font-medium">
              Medicine ID
            </label>
            <Input
              id="medicineId"
              type="number"
              value={medicineId}
              onChange={(e) => setMedicineId(Number(e.target.value))}
              className="mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity Purchased
            </label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1"
              required
            />
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <div className="flex">
                <Loader2 className="w-5 h-5 animate-spin" /> Recording...
              </div>
            ) : (
              "Record purchase"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PurchaseForm;
