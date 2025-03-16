"use client";
import { useState } from "react";
import SaleForm from "../components/SalesRecord";

const DisplaySalePage = () => {
  const [, setRefresh] = useState(false);
  const handleRefresh = () => {
    // Toggle refresh state to force re-fetching in InventoryList
    setRefresh((prev: boolean) => !prev);
  };

  return <SaleForm onSaleRecorded={handleRefresh} />;
};
export default DisplaySalePage;
