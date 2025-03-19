"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Medicine {
  id: number;
  name: string;
  stock: number;
  expiry_date: string;
  batch_no: string;
  price: number;
}

const StockComponent = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [restockPredictions, setRestockPredictions] = useState<
    Record<number, string>
  >({});

  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchMedicines = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/medicines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          console.log("Unauthorized: Redirecting to login");
          router.push("/login");
          return;
        }

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setMedicines(data);

        // For each medicine, check stock and set prediction
        for (const med of data) {
          if (med.stock >= 50) {
            // If stock is sufficient, no need for prediction
            setRestockPredictions((prev) => ({
              ...prev,
              [med.id]: "Stock is sufficient",
            }));
          } else {
            // Otherwise, fetch the AI prediction
            fetchRestockPrediction(med.id);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load medicines.");
      }
    };

    fetchMedicines();
  }, [router]);

  const fetchRestockPrediction = async (medicineId: number) => {
    try {
      const res = await fetch(
        `http://localhost:8000/aimodel/predict-restock/${medicineId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch prediction");
      }
      const data = await res.json();

      if (data.message) {
        // E.g. "Not enough data for prediction"
        setRestockPredictions((prev) => ({
          ...prev,
          [medicineId]: data.message,
        }));
      } else if (data.days_until_restock !== undefined) {
        const formatted = formatRestockTime(data.days_until_restock);
        setRestockPredictions((prev) => ({ ...prev, [medicineId]: formatted }));
      }
    } catch (error) {
      setRestockPredictions((prev) => ({
        ...prev,
        [medicineId]: "No prediction",
      }));
      console.error(`Error fetching restock for ID ${medicineId}:`, error);
    }
  };

  // Convert days to a readable string
  const formatRestockTime = (days: number) => {
    // If days is NaN or negative
    if (!days || days < 0) return "No data";

    if (days >= 1) {
      // Round to integer or 1 decimal
      const rounded = Math.round(days);
      return `${rounded} days`;
    }
    const hours = Math.round(days * 24);
    return `${hours} hours`;
  };

  // Decide if "Still in stock" or "Needs to restock"
  const displayStockStatus = (stock: number) => {
    if (stock > 50) return "Still in stock";
    if (stock < 30) return "Needs to restock";
    return "";
  };

  const totalPages = Math.ceil(medicines.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = medicines.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Stock Inventory</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Medicine Name</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Expiry Date</th>
            <th className="border p-2">Batch No</th>
            <th className="border p-2">Price ($)</th>
            <th className="border p-2">Restock In</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentMedicines.map((med) => (
            <tr key={med.id} className="text-center border">
              <td className="border p-2">{med.name}</td>
              <td className="border p-2">{med.stock}</td>
              <td className="border p-2">
                {new Date(med.expiry_date).toLocaleDateString()}
              </td>
              <td className="border p-2">{med.batch_no}</td>
              <td className="border p-2">${med.price.toFixed(2)}</td>
              <td className="border p-2">
                {restockPredictions[med.id] || "Loading..."}
              </td>
              <td className="border p-2">{displayStockStatus(med.stock)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <Button
          variant="outline"
          type="button"
          className={`px-4 py-2 mx-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <span className="mx-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          type="button"
          className={`px-4 py-2 mx-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StockComponent;
