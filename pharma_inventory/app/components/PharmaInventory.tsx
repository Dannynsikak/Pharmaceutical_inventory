"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Medicine {
  id: number;
  name: string;
  stock: number;
  batch_no: string;
  price: number;
}

const StockComponent = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [restockPredictions, setRestockPredictions] = useState<
    Record<number, string>
  >({});
  const [expiredMedicines, setExpiredMedicines] = useState<
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
        const res = await fetch("http://localhost:8000/api/medicines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Fetched medicines:", data);

        data.sort((a: Medicine, b: Medicine) => b.id - a.id);
        setMedicines(data);

        for (const med of data) {
          fetchExpiryStatus(med.id);
          if (med.stock < 50) {
            fetchRestockPrediction(med.id);
          } else {
            setRestockPredictions((prev) => ({
              ...prev,
              [med.id]: "Stock is sufficient",
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load medicines:", err);
        setError("Failed to load medicines.");
      }
    };

    fetchMedicines();
  }, [router]);

  // Fetch AI model to check expiry status
  const fetchExpiryStatus = async (medicineId: number) => {
    try {
      console.log(`Fetching expiry status for medicine ID: ${medicineId}`);
      const res = await fetch(
        `http://localhost:8000/aimodel/check-expiry/${medicineId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch expiry status");
      }

      const data = await res.json();

      setExpiredMedicines((prev) => {
        const updated = {
          ...prev,
          [medicineId]: data.expired ? "Expired" : "Not Expired",
        };
        return updated;
      });
    } catch (error) {
      console.error(`Error fetching expiry for medicine ${medicineId}:`, error);
      setExpiredMedicines((prev) => ({
        ...prev,
        [medicineId]: "Unknown",
      }));
    }
  };

  // Fetch AI model prediction for restock
  const fetchRestockPrediction = async (medicineId: number) => {
    try {
      console.log(`Fetching restock prediction for medicine ID: ${medicineId}`);
      const res = await fetch(
        `http://localhost:8000/aimodel/predict-restock/${medicineId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await res.json();
      console.log(`Restock response for ${medicineId}:`, data);

      if (data.days_until_restock !== undefined) {
        const formatted = formatRestockTime(data.days_until_restock);
        setRestockPredictions((prev) => ({
          ...prev,
          [medicineId]: formatted,
        }));
      }
    } catch (error) {
      console.error(
        `Error fetching restock prediction for medicine ${medicineId}:`,
        error
      );
      setRestockPredictions((prev) => ({
        ...prev,
        [medicineId]: "No prediction",
      }));
    }
  };

  const deleteMedicine = async (medicineId: number) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/medicines/${medicineId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete medicine");
      }

      setMedicines((prev) => prev.filter((med) => med.id !== medicineId));
      alert("Medicine deleted successfully");
    } catch (error) {
      alert("Failed to delete medicine");
    }
  };

  // Format predicted restock time
  const formatRestockTime = (days: number) => {
    if (!days || days < 0) return "No data";
    if (days >= 1) return `${Math.round(days)} days`;
    return `${Math.round(days * 24)} hours`;
  };

  // Pagination logic
  const totalPages = Math.ceil(medicines.length / itemsPerPage);
  const currentMedicines = medicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Stock Inventory</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Medicine Name</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Expiry Status</th>
            <th className="border p-2">Batch No</th>
            <th className="border p-2">Price ($)</th>
            <th className="border p-2">Restock In</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMedicines.map((med) => (
            <tr key={med.id} className="text-center border">
              <td className="border p-2">{med.name}</td>
              <td className="border p-2">{med.stock}</td>
              <td
                className={`border p-2 font-semibold ${expiredMedicines[med.id] === "Expired" ? "text-red-500" : ""}`}
              >
                {expiredMedicines[med.id] || "Checking..."}
              </td>
              <td className="border p-2">{med.batch_no}</td>
              <td className="border p-2">${med.price.toFixed(2)}</td>
              <td className="border p-2">
                {restockPredictions[med.id] || "Loading..."}
              </td>
              <td className="border p-2">
                {expiredMedicines[med.id] === "Expired" && (
                  <Button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteMedicine(med.id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <Button
          variant="outline"
          type="button"
          className={`px-4 py-2 mx-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
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
          className={`px-4 py-2 mx-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
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
