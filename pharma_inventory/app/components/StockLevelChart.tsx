"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";

const StockLevel = () => {
  const [data, setData] = useState<
    { medicine_name: string; stock_quantity: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [threshold, setThreshold] = useState(10); // Default threshold

  useEffect(() => {
    const fetchStockLevels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/analytics/stock-levels?threshold=${threshold}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching stock levels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockLevels();
  }, [threshold]); // Refetch when threshold changes

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">📉 Stock Levels</h2>

      {/* Threshold Input */}
      <div className="mb-4">
        <label htmlFor="threshold-input" className="mr-2">
          Threshold:
        </label>
        <input
          id="threshold-input"
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="border p-2 rounded-md"
        />
      </div>

      {loading ? (
        <p>Loading stock data...</p>
      ) : data.length === 0 ? (
        <p>No medicines below the threshold.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="medicine_name" angle={-45} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="stock_quantity"
              fill="#FF5733"
              name="Stock Quantity"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StockLevel;
