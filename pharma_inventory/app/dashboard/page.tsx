"use client";
import React, { useState, useEffect } from "react";
import StockComponent from "../components/PharmaInventory";
import Navbar2 from "../components/Navbar2";
import UpdatePrice from "../components/UpdatePrice";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Replace this with your actual authentication check logic
    const checkAuth = () => {
      const user = localStorage.getItem("userToken");
      if (user) {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center">
          User needs to be registered before you can access the dashboard
        </h1>
      </div>
    );
  }
  const handleRefresh = () => {
    // Toggle refresh state to force re-fetching in InventoryList
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <Navbar2 />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">
          Pharmaceutical Inventory Dashboard
        </h1>
        <StockComponent key={refresh ? "refresh" : "no-refresh"} />
        {/* <SaleForm onSaleRecorded={handleRefresh} /> */}
        {/* <PurchaseForm onPurchaseRecorded={handleRefresh} /> */}
        <UpdatePrice />
        {/* <AddMedicine /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
