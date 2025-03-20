"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SalesTrendsChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchSalesTrends = async () => {
      try {
        const res = await fetch("http://localhost:8000/analytics/sales-trends");
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching sales trends:", error);
      }
    };

    fetchSalesTrends();
  }, []);

  if (chartData.length === 0) return <p>Loading chart...</p>;

  return (
    <Card className="p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sales Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total_sales"
              stroke="#4F46E5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesTrendsChart;
