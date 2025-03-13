import type React from "react";
import { useState } from "react";

// sample stock data type
interface StockItem {
  id: number;
  name: string;
  quantity: number;
  expiryDate: string;
}

const StockComponent: React.FC = () => {
  const [stock] = useState<StockItem[]>([
    { id: 1, name: "Paracetamol", quantity: 50, expiryDate: "2025-06-01" },
    { id: 2, name: "Ibuprofen", quantity: 30, expiryDate: "2024-12-15" },
    { id: 3, name: "Aspirin", quantity: 20, expiryDate: "2025-09-10" },
  ]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Stock Inventory</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Medicine Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.id} className="text-center border">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockComponent;
