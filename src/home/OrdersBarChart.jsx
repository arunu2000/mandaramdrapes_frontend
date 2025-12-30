// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Jan', Orders: 30 },
//   { name: 'Feb', Orders: 45 },
//   { name: 'Mar', Orders: 60 },
//   { name: 'Apr', Orders: 50 },
//   { name: 'May', Orders: 80 },
//   { name: 'Jun', Orders: 65 },
// ];

// const OrdersBarChart = () => (
//   <div className="bg-white shadow rounded p-6 mt-6">
//     <h3 className="text-lg font-semibold mb-4">Orders Over Time</h3>
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="Orders" fill="#5e785a" radius={[8, 8, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// );

// export default OrdersBarChart;




import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Utility: format date like "12 Dec"
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const OrdersBarChart = ({ data = [] }) => {
  /**
   * Backend salesChart format:
   * [
   *   { _id: "2025-12-10", orders: 15, revenue: 12000 }
   * ]
   */

  const chartData = useMemo(() => {
    if (!data.length) return [];

    return data.map((item) => ({
      name: formatDate(item._id), // X-axis
      Orders: item.orders,        // Bar value
      Revenue: item.revenue,      // Tooltip usage
    }));
  }, [data]);

  return (
    <div className="bg-white shadow rounded p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Orders Over Time
      </h3>

      {chartData.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-sm text-gray-500">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip
              formatter={(value, name, props) => {
                if (name === "Orders") return [`${value}`, "Orders"];
                return value;
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Bar
              dataKey="Orders"
              fill="#5e785a"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OrdersBarChart;

