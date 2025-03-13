import type React from "react";
import { useState } from "react";

interface DistributionItems {
  id: number;
  destination: string;
  medicine: string;
  quantity: number;
}
const Distribution: React.FC = () => {
  const [distributions] = useState<DistributionItems[]>([
    {
      id: 1,
      destination: "City Hospital",
      medicine: "Paracetamol",
      quantity: 20,
    },
    {
      id: 2,
      destination: "Health Clinic",
      medicine: "Ibuprofen",
      quantity: 15,
    },
  ]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">Distribution Records</h2>
      <ul>
        {distributions.map((distribution) => (
          <li key={distribution.id} className="border-b p-2">
            {distribution.medicine} - {distribution.quantity} units to{" "}
            {distribution.destination}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Distribution;
