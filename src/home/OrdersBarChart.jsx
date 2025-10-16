import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Orders: 30 },
  { name: 'Feb', Orders: 45 },
  { name: 'Mar', Orders: 60 },
  { name: 'Apr', Orders: 50 },
  { name: 'May', Orders: 80 },
  { name: 'Jun', Orders: 65 },
];

const OrdersBarChart = () => (
  <div className="bg-white shadow rounded p-6 mt-6">
    <h3 className="text-lg font-semibold mb-4">Orders Over Time</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Orders" fill="#5e785a" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default OrdersBarChart;
