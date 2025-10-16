import React from 'react';
import OrdersBarChart from './OrdersBarChart';
import { UsersIcon, CurrencyDollarIcon, ArchiveBoxIcon, ShoppingCartIcon, ChartBarIcon, ChartPieIcon, ArrowTrendingDownIcon, StarIcon } from '@heroicons/react/24/outline';
    const Home = () => {
  return (
  <div className="min-h-screen  p-6 flex flex-col items-center">
      {/* Header */}
  <div className="w-full max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#5e785a]  mb-1">Admin Dashboard</h2>
          <p className="text-gray-500 text-sm">Overview &amp; analytics at a glance</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="bg-[#364633]  text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-[#556d50]  transition">Export</button>
          
        </div>
      </div>

      {/* Stat Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#EEFFEB] shadow-md rounded-2xl p-6 flex flex-col justify-between relative">
          <UsersIcon className="absolute top-4 right-4 h-8 w-8 text-gray-300" />
          <h4 className="text-blue-600 font-semibold">Users</h4>
          <p className="text-gray-500 text-xs mb-2">Total number of users</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-blue-700">1,245</span>
            <span className="text-green-600 text-sm font-semibold">+5%</span>
          </div>
          <span className="text-green-500 text-xs mt-2">● Growth this month</span>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between relative">
          <CurrencyDollarIcon className="absolute top-4 right-4 h-8 w-8 text-gray-300" />
          <h4 className="text-gray-800 font-semibold">Profit</h4>
          <p className="text-gray-500 text-xs mb-2">View total profit</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">$320,000</span>
            <span className="text-green-600 text-sm font-semibold">+12%</span>
          </div>
          <span className="text-green-500 text-xs mt-2">● Growth this month</span>
        </div>
        <div className="bg-[#EEFFEB] shadow-md rounded-2xl  p-6 flex flex-col justify-between relative">
          <ArchiveBoxIcon className="absolute top-4 right-4 h-8 w-8 text-gray-300" />
          <h4 className="text-yellow-600 font-semibold">Total Products</h4>
          <p className="text-gray-500 text-xs mb-2">Total number of products</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-yellow-700">1,500</span>
            <span className="text-green-600 text-sm font-semibold">+2%</span>
          </div>
          <span className="text-green-500 text-xs mt-2">● Growth this month</span>
        </div>
        <div className="bg-white shadow-md rounded-2xl  p-6 flex flex-col justify-between relative">
          <ShoppingCartIcon className="absolute top-4 right-4 h-8 w-8 text-gray-300" />
          <h4 className="text-purple-600 font-semibold">Orders</h4>
          <p className="text-gray-500 text-xs mb-2">Total orders this month</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-purple-700">2,300</span>
            <span className="text-green-600 text-sm font-semibold">+8%</span>
          </div>
          <span className="text-green-500 text-xs mt-2">● Growth this month</span>
        </div>
      </div>

       {/* //Charts Section */}

         {/* <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <ChartBarIcon className="h-6 w-6 text-blue-400" /> Monthly Overview
          </h3> 
          {/* Replace with your multi-line chart component */}
          {/* <div className="h-64 flex items-center justify-center text-gray-400">[Line Chart Here]</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-cyan-700 mb-4 flex items-center gap-2">
            <ChartPieIcon className="h-6 w-6 text-cyan-400" /> Monthly Revenue
          </h3>
          <OrdersBarChart />
      //   </div> */}
      {/* // </div>`````````````````````````````````````````````````````````````````````````````````` */} 

      {/* //  <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
      //   <div className="bg-white rounded-2xl shadow p-6">
      //     <h3 className="text-lg font-semibold text-pink-700 mb-4 flex items-center gap-2">
      //       <ArrowTrendingDownIcon className="h-6 w-6 text-pink-400" /> Monthly Returns
      //     </h3>
      //     <div className="h-64 flex items-center justify-center text-gray-400">[Returns Chart Here]</div>
      //   </div>
      //   <div className="bg-white rounded-2xl shadow p-6">
      //     <h3 className="text-lg font-semibold text-yellow-700 mb-4 flex items-center gap-2">
      //       <StarIcon className="h-6 w-6 text-yellow-400" /> Avg. Customer Rating
      //     </h3>
      //     <div className="h-64 flex items-center justify-center text-gray-400">[Rating Chart Here]</div>
      //   </div>
      // </div>  */}
     </div> 
  );
};

export default Home;




