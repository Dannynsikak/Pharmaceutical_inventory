"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockLevel from "../components/StockLevelChart";
import SalesTrendsChart from "../components/SalesTrendChart";

const AnalyticsDashboard = () => {
  return (
    <div className="w-full max-w-[1750px] mt-5">
      <div className="p-6 bg-white rounded-lg shadow-lg w-[80%]  mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          📊 Inventory Analytics
        </h1>
        <Tabs defaultValue="stock" className="w-full">
          <TabsList className="flex justify-center bg-gray-100 rounded-lg p-2">
            <TabsTrigger
              value="stock"
              className="px-4 py-2 text-sm font-medium"
            >
              Stock Levels
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="px-4 py-2 text-sm font-medium"
            >
              Sales Trends
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stock" className="mt-4">
            <StockLevel />
          </TabsContent>
          <TabsContent value="sales" className="mt-4">
            <SalesTrendsChart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
