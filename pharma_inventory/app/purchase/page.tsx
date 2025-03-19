"use client";
import { useState } from "react";
import PurchaseForm from "../components/Procurement";

const PurchaseDisplay = () => {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    // Toggle refresh state to force re-fetching in InventoryList
    setRefresh((prev) => !prev);
  };
  return (
    <div>
      <PurchaseForm onPurchaseRecorded={handleRefresh} />
    </div>
  );
};
export default PurchaseDisplay;
