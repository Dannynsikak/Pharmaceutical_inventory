import type React from "react";
import { useState } from "react";

interface ProcurementItem {
  id: number;
  supplier: string;
  medicine: string;
  quantity: number;
}

const Procurement: React.FC = () => {
  const [orders] = useState<ProcurementItem[]>([
    { id: 1, supplier: "ABC Pharma", medicine: "Aspirin", quantity: 100 },
    { id: 2, supplier: "XYZ Meds", medicine: "Metformin", quantity: 50 },
  ]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">Procurement Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border-b p-2">
            {order.medicine} - {order.quantity} units from {order.supplier}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Procurement;
