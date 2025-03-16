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
  category?: string;
  dosage_form?: string;
  strength?: string;
  indication?: string;
  classification?: string;
  supplier_id: number;
  price: number;
}

const StockComponent = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
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
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load medicines.");
      }
    };

    checkAuthentication();
  }, [router]);

  // Calculate total pages
  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  // Get medicines for the current page
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

        <button
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
        </button>
      </div>
    </div>
  );
};

export default StockComponent;
