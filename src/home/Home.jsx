// import React from 'react';
// import OrdersBarChart from './OrdersBarChart';
// import { UsersIcon, CurrencyDollarIcon, ArchiveBoxIcon, ShoppingCartIcon, ChartBarIcon, ChartPieIcon, ArrowTrendingDownIcon, StarIcon } from '@heroicons/react/24/outline';
//     const Home = () => {
//   return (
//   <div className="min-h-screen  p-6 flex flex-col items-center">
//       {/* Header */}
//   <div className="w-full max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-[#5e785a]  mb-1">Admin Dashboard</h2>
//           <p className="text-gray-500 text-sm">Overview &amp; analytics at a glance</p>
//         </div>
//         <div className="flex gap-3 mt-4 md:mt-0">
//           <button className="bg-[#364633]  text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-[#556d50]  transition">Export</button>
          
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-[#EEFFEB] shadow-md rounded-2xl p-6 flex flex-col justify-between relative">
//           <UsersIcon className="absolute top-4 right-4 h-8 w-8 text-gray-300" />
//           <h4 className="text-blue-600 font-semibold">Users</h4>
//           <p className="text-gray-500 text-xs mb-2">Total number of users</p>
//           <div className="flex items-end gap-2">
//             <span className="text-2xl font-bold text-blue-700">1,245</span>
//             <span className="text-green-600 text-sm font-semibold">+5%</span>
//           </div>
//           <span className="text-green-500 text-xs mt-2">● Growth this month</span>
//         </div>
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between relative">
//           <CurrencyDollarIcon className="absolute top-4 right-4 h-8 w-8 text-gray-300" />
//           <h4 className="text-gray-800 font-semibold">Profit</h4>
//           <p className="text-gray-500 text-xs mb-2">View total profit</p>
//           <div className="flex items-end gap-2">
//             <span className="text-2xl font-bold text-gray-900">$320,000</span>
//             <span className="text-green-600 text-sm font-semibold">+12%</span>
//           </div>
//           <span className="text-green-500 text-xs mt-2">● Growth this month</span>
//         </div>
//         <div className="bg-[#EEFFEB] shadow-md rounded-2xl  p-6 flex flex-col justify-between relative">
//           <ArchiveBoxIcon className="absolute top-4 right-4 h-8 w-8 text-gray-300" />
//           <h4 className="text-yellow-600 font-semibold">Total Products</h4>
//           <p className="text-gray-500 text-xs mb-2">Total number of products</p>
//           <div className="flex items-end gap-2">
//             <span className="text-2xl font-bold text-yellow-700">1,500</span>
//             <span className="text-green-600 text-sm font-semibold">+2%</span>
//           </div>
//           <span className="text-green-500 text-xs mt-2">● Growth this month</span>
//         </div>
//         <div className="bg-white shadow-md rounded-2xl  p-6 flex flex-col justify-between relative">
//           <ShoppingCartIcon className="absolute top-4 right-4 h-8 w-8 text-gray-300" />
//           <h4 className="text-purple-600 font-semibold">Orders</h4>
//           <p className="text-gray-500 text-xs mb-2">Total orders this month</p>
//           <div className="flex items-end gap-2">
//             <span className="text-2xl font-bold text-purple-700">2,300</span>
//             <span className="text-green-600 text-sm font-semibold">+8%</span>
//           </div>
//           <span className="text-green-500 text-xs mt-2">● Growth this month</span>
//         </div>
//       </div>

//        {/* //Charts Section */}

//           <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
//             <ChartBarIcon className="h-6 w-6 text-blue-400" /> Monthly Overview
//           </h3> 
//           {/* Replace with your multi-line chart component */}
//           <div className="h-64 flex items-center justify-center text-gray-400">[Line Chart Here]</div>
//         </div>
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h3 className="text-lg font-semibold text-cyan-700 mb-4 flex items-center gap-2">
//             <ChartPieIcon className="h-6 w-6 text-cyan-400" /> Monthly Revenue
//           </h3>
//           <OrdersBarChart />
//       //   </div>
//       </div>

//       //  <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
//       //   <div className="bg-white rounded-2xl shadow p-6">
//       //     <h3 className="text-lg font-semibold text-pink-700 mb-4 flex items-center gap-2">
//       //       <ArrowTrendingDownIcon className="h-6 w-6 text-pink-400" /> Monthly Returns
//       //     </h3>
//       //     <div className="h-64 flex items-center justify-center text-gray-400">[Returns Chart Here]</div>
//       //   </div>
//       //   <div className="bg-white rounded-2xl shadow p-6">
//       //     <h3 className="text-lg font-semibold text-yellow-700 mb-4 flex items-center gap-2">
//       //       <StarIcon className="h-6 w-6 text-yellow-400" /> Avg. Customer Rating
//       //     </h3>
//       //     <div className="h-64 flex items-center justify-center text-gray-400">[Rating Chart Here]</div>
//       //   </div>
//       // </div> 
//      </div> 
//   );
// };

// export default Home;



// import React from 'react';
// import OrdersBarChart from './OrdersBarChart'; // Assuming this component is updated or works with the new styling
// import { UsersIcon, CurrencyDollarIcon, ArchiveBoxIcon, ShoppingCartIcon, ChartBarIcon, ChartPieIcon, ArrowTrendingUpIcon, StarIcon } from '@heroicons/react/24/outline';

// const Home = () => {
//     // Define a consistent, professional color palette
//     const primaryColor = 'text-[#4A6458]'; // Deep Elegant Green
//     const primaryBg = 'bg-[#4A6458]';
//     const accentColor = 'text-[#A08855]'; // Muted Gold/Bronze
//     const cardBg = 'bg-white';
//     const darkText = 'text-gray-800';
//     const lightText = 'text-gray-500';

//     // Helper component for Stat Cards
//     const StatCard = ({ title, value, subText, icon: Icon, colorClass, growth }) => (
//         <div className={`${cardBg} shadow-xl border border-gray-100 rounded-xl p-6 flex flex-col justify-between relative transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] transform`}>
//             {/* Icon positioned top-right with a subtle background */}
//             <div className="absolute top-4 right-4 p-2 rounded-full bg-gray-50">
//                 <Icon className={`h-6 w-6 ${colorClass}`} />
//             </div>

//             <h4 className={`text-sm font-semibold ${lightText} tracking-wider uppercase mb-1`}>{title}</h4>
            
//             <div className="flex items-end gap-2 my-2">
//                 <span className={`text-4xl font-extrabold ${darkText}`}>{value}</span>
//                 <span className={`text-sm font-semibold ${growth.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{growth}</span>
//             </div>
            
//             <p className={`text-xs ${lightText} mb-4`}>{subText}</p>

//             <div className="h-1 w-full rounded-full overflow-hidden">
//                 {/* Subtle progress bar look for visual interest */}
//                 <div className={`h-full ${colorClass.replace('text', 'bg')} w-1/3 opacity-50`}></div>
//             </div>
//         </div>
//     );

//     return (
//         // Use a sophisticated dark background for the entire dashboard area
//         <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex flex-col items-center">
            
//             {/* Header */}
//             <div className="w-full max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between mb-10">
//                 <div>
//                     <h2 className={`text-4xl font-extrabold ${primaryColor} mb-1`}>Mandharam Drapes Analytics</h2>
//                     <p className={`${lightText} text-md font-light`}>Comprehensive business overview and key performance indicators.</p>
//                 </div>
//                 <div className="flex gap-4 mt-4 md:mt-0">
//                     <button className={`border border-gray-300 ${lightText} px-5 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-100 transition duration-300`}>Settings</button>
//                     <button className={`${primaryBg} text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300`}>
//                         Export Report
//                     </button>
//                 </div>
//             </div>

//             <hr className="w-full max-w-7xl border-t border-gray-200 mb-10" />
            
//             {/* Stat Cards */}
//             <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                
//                 <StatCard 
//                     title="Total Users"
//                     value="1,245"
//                     subText="Active members on the platform"
//                     icon={UsersIcon}
//                     colorClass="text-blue-600"
//                     growth="+5.0% (30 days)"
//                 />

//                 <StatCard 
//                     title="Total Profit"
//                     value="$320K"
//                     subText="Total profit generated this quarter"
//                     icon={CurrencyDollarIcon}
//                     colorClass="text-green-600"
//                     growth="+12.0% (30 days)"
//                 />

//                 <StatCard 
//                     title="Product Catalog"
//                     value="1,500"
//                     subText="Number of unique items in stock"
//                     icon={ArchiveBoxIcon}
//                     colorClass="text-yellow-600"
//                     growth="+2.0% (30 days)"
//                 />

//                 <StatCard 
//                     title="Total Orders"
//                     value="2,300"
//                     subText="Completed orders in the last month"
//                     icon={ShoppingCartIcon}
//                     colorClass="text-purple-600"
//                     growth="+8.0% (30 days)"
//                 />
//             </div>

//             <hr className="w-full max-w-7xl border-t border-gray-200 mb-10" />

//             {/* Charts Section - Using better, uniform containers */}
//             <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                
//                 {/* Monthly Overview (Larger Span) */}
//                 <div className="lg:col-span-2 bg-white rounded-xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
//                     <h3 className={`text-xl font-bold ${darkText} mb-2 flex items-center gap-2`}>
//                         <ChartBarIcon className={`h-6 w-6 ${primaryColor}`} /> Sales & Traffic Overview
//                     </h3>
//                     <p className={`text-sm ${lightText} mb-6`}>Performance metrics over the last year.</p>
                    
//                     {/* Placeholder for a Line/Area Chart */}
//                     <div className="h-80 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-400 font-medium">
//                         [Advanced Multi-Line/Area Chart Component Here]
//                     </div>
//                 </div>

//                 {/* Monthly Revenue (Smaller Span) */}
//                 <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
//                     <h3 className={`text-xl font-bold ${darkText} mb-2 flex items-center gap-2`}>
//                         <ChartPieIcon className={`h-6 w-6 ${accentColor}`} /> Revenue by Category
//                     </h3>
//                     <p className={`text-sm ${lightText} mb-6`}>Distribution of monthly revenue sources.</p>
                    
//                     {/* Placeholder for the OrdersBarChart or a Pie Chart */}
//                     <OrdersBarChart /> 
//                 </div>
//             </div>

//             {/* Secondary Metrics Section - Un-commented and styled */}
//             <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-8">
                
//                 {/* Monthly Returns */}
//                 <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
//                     <h3 className={`text-xl font-bold ${darkText} mb-2 flex items-center gap-2`}>
//                         <ArrowTrendingUpIcon className="h-6 w-6 text-red-500" /> Monthly Returns Rate
//                     </h3>
//                     <p className={`text-sm ${lightText} mb-6`}>Tracking product returns and refund rate.</p>
//                     <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-400 font-medium">
//                         [Returns Gauge or Line Chart Here]
//                     </div>
//                 </div>

//                 {/* Avg. Customer Rating */}
//                 <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
//                     <h3 className={`text-xl font-bold ${darkText} mb-2 flex items-center gap-2`}>
//                         <StarIcon className="h-6 w-6 text-yellow-500" /> Avg. Customer Rating
//                     </h3>
//                     <p className={`text-sm ${lightText} mb-6`}>Average satisfaction score.</p>
//                     <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-400 font-medium">
//                         [Rating Metric or Chart Here]
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default Home;




// import React from "react";
// import OrdersBarChart from "./OrdersBarChart";
// import {
//   UsersIcon,
//   CurrencyDollarIcon,
//   ArchiveBoxIcon,
//   ShoppingCartIcon,
//   ChartBarIcon,
//   ChartPieIcon,
//   ArrowTrendingDownIcon,
//   StarIcon,
// } from "@heroicons/react/24/outline";

// const statCards = [
//   {
//     label: "Total Users",
//     value: "1,245",
//     change: "+5.2%",
//     trend: "up",
//     helper: "vs last month",
//     icon: UsersIcon,
//   },
//   {
//     label: "Net Revenue",
//     value: "₹ 3.2L",
//     change: "+12.1%",
//     trend: "up",
//     helper: "after discounts",
//     icon: CurrencyDollarIcon,
//   },
//   {
//     label: "Active Products",
//     value: "1,500",
//     change: "+2.0%",
//     trend: "up",
//     helper: "live on store",
//     icon: ArchiveBoxIcon,
//   },
//   {
//     label: "Orders (This Month)",
//     value: "2,300",
//     change: "+8.4%",
//     trend: "up",
//     helper: "completed orders",
//     icon: ShoppingCartIcon,
//   },
// ];

// const quickInsights = [
//   { label: "Conversion Rate", value: "3.8%", helper: "Storewide" },
//   { label: "Average Order Value", value: "₹ 1,420", helper: "Last 30 days" },
//   { label: "Repeat Customers", value: "41%", helper: "Returning buyers" },
// ];

// const Home = () => {
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-[#f7faf7] via-[#f4f7f2] to-[#e2eee3] px-4 py-6 md:px-8 flex justify-center">
//       <div className="w-full max-w-7xl space-y-8">
//         {/* Top Header */}
//         <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <p className="text-xs uppercase tracking-[0.22em] text-[#7f8f7a]">
//               Mandharam Drapes · Admin
//             </p>
//             <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#263526]">
//               Analytics Overview
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Key performance insights for your ecommerce store.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             {/* Date range pill (dummy) */}
//             <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur">
//               <span className="h-2 w-2 rounded-full bg-emerald-500" />
//               <span className="font-medium text-gray-800">Last 30 days</span>
//             </div>

//             {/* Action buttons */}
//             <button
//               type="button"
//               className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs font-medium text-gray-700 shadow-sm backdrop-blur hover:bg-white"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               className="rounded-full bg-[#364633] px-5 py-2 text-xs font-semibold text-white shadow-md shadow-[#364633]/30 transition hover:bg-[#2b372a]"
//             >
//               Export Report
//             </button>
//           </div>
//         </header>

//         {/* Stat Cards */}
//         <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
//           {statCards.map((item) => {
//             const Icon = item.icon;
//             const isUp = item.trend === "up";
//             return (
//               <div
//                 key={item.label}
//                 className="group relative overflow-hidden rounded-2xl border border-emerald-50/70 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
//               >
//                 {/* Soft gradient strip */}
//                 <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-lime-400 opacity-70" />

//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
//                       {item.label}
//                     </p>
//                     <p className="mt-2 text-2xl font-semibold text-[#263526]">
//                       {item.value}
//                     </p>
//                     <p className="mt-1 text-[11px] text-gray-500">
//                       {item.helper}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <div
//                       className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
//                         isUp
//                           ? "bg-emerald-50 text-emerald-600"
//                           : "bg-rose-50 text-rose-600"
//                       }`}
//                     >
//                       <span>{item.change}</span>
//                       <span className="text-[9px] uppercase tracking-wide">
//                         {isUp ? "Increase" : "Drop"}
//                       </span>
//                     </div>
//                     <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white">
//                       <Icon className="h-5 w-5" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Subtle background accent */}
//                 <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 translate-x-6 translate-y-6 rounded-full bg-gradient-to-br from-emerald-100/90 to-transparent opacity-70" />
//               </div>
//             );
//           })}
//         </section>

//         {/* Charts + Insights */}
//         <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* Main Chart Card */}
//           <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm backdrop-blur">
//             <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
//                   <ChartBarIcon className="h-5 w-5 text-emerald-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-sm font-semibold text-[#263526]">
//                     Orders & Revenue (Monthly)
//                   </h2>
//                   <p className="text-xs text-gray-500">
//                     Track order volume and revenue trends over time.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 text-[11px] text-gray-500">
//                 <div className="flex items-center gap-1">
//                   <span className="h-2 w-2 rounded-full bg-emerald-500" />
//                   <span>Orders</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <span className="h-2 w-2 rounded-full bg-sky-500" />
//                   <span>Revenue</span>
//                 </div>
//               </div>
//             </div>

//             <div className="h-72 rounded-xl bg-gradient-to-b from-gray-50 to-white p-3">
//               <OrdersBarChart />
//             </div>
//           </div>

//           {/* Right side – Quick Insights */}
//           <div className="space-y-4">
//             {/* Quick Insights Card */}
//             <div className="rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm backdrop-blur">
//               <div className="mb-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50">
//                     <ChartPieIcon className="h-4 w-4 text-sky-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-semibold text-[#263526]">
//                       Store Pulse
//                     </h3>
//                     <p className="text-[11px] text-gray-500">
//                       Snapshot of key ecommerce metrics.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-3">
//                 {quickInsights.map((item) => (
//                   <div
//                     key={item.label}
//                     className="flex items-center justify-between rounded-xl bg-gray-50/60 px-3 py-2.5"
//                   >
//                     <div>
//                       <p className="text-xs text-gray-500">{item.label}</p>
//                       <p className="mt-0.5 text-sm font-semibold text-[#263526]">
//                         {item.value}
//                       </p>
//                     </div>
//                     <p className="text-[11px] text-gray-400">{item.helper}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Returns & Rating Mini Cards */}
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <div className="rounded-2xl border border-rose-50 bg-white/90 p-4 shadow-sm backdrop-blur">
//                 <div className="mb-2 flex items-center justify-between">
//                   <p className="text-xs font-semibold text-[#7e2a3a]">
//                     Monthly Returns
//                   </p>
//                   <ArrowTrendingDownIcon className="h-4 w-4 text-rose-400" />
//                 </div>
//                 <p className="text-xl font-semibold text-[#2d2830]">3.2%</p>
//                 <p className="mt-1 text-[11px] text-gray-500">
//                   Of total orders · Stable
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-amber-50 bg-white/90 p-4 shadow-sm backdrop-blur">
//                 <div className="mb-2 flex items-center justify-between">
//                   <p className="text-xs font-semibold text-[#8a5a12]">
//                     Avg. Rating
//                   </p>
//                   <StarIcon className="h-4 w-4 text-amber-400" />
//                 </div>
//                 <p className="text-xl font-semibold text-[#2d2830]">4.6 / 5</p>
//                 <p className="mt-1 text-[11px] text-gray-500">
//                   Based on recent reviews
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Bottom Section – Example table / segment performance */}
//         <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
//           {/* Category Performance */}
//           <div className="rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm backdrop-blur ">
//             <h3 className="text-sm font-semibold text-[#263526] ">
//               Category Performance
//             </h3>
//             <p className="text-[11px] text-gray-500 mb-4">
//               Top categories driving revenue this month.
//             </p>
//             <div className="space-y-3">
//               {[
//                 { name: "Sarees", value: 62, amount: "₹ 2.1L" },
//                 { name: "Kurtis", value: 21, amount: "₹ 0.7L" },
//                 { name: "Kids Wear", value: 11, amount: "₹ 0.3L" },
//                 { name: "Others", value: 6, amount: "₹ 0.1L" },
//               ].map((row) => (
//                 <div key={row.name} className="space-y-1">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="font-medium text-gray-700">
//                       {row.name}
//                     </span>
//                     <span className="text-gray-500">{row.amount}</span>
//                   </div>
//                   <div className="h-2 w-full rounded-full bg-gray-100">
//                     <div
//                       className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400"
//                       style={{ width: `${row.value}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recent Signals (dummy list) */}
//           <div className="rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm backdrop-blur mt-50">
//             <h3 className="text-sm font-semibold text-[#263526]">
//               Recent Signals
//             </h3>
//             <p className="text-[11px] text-gray-500 mb-4">
//               Quick highlights detected from recent activity.
//             </p>

//             <ul className="space-y-3 text-xs">
//               <li className="flex items-start gap-3">
//                 <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
//                 <div>
//                   <p className="font-medium text-gray-800">
//                     Weekend spike in saree orders.
//                   </p>
//                   <p className="text-[11px] text-gray-500">
//                     32% higher than the weekday average.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
//                 <div>
//                   <p className="font-medium text-gray-800">
//                     COD conversion improved.
//                   </p>
//                   <p className="text-[11px] text-gray-500">
//                     Drop in cart abandonment for COD orders.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
//                 <div>
//                   <p className="font-medium text-gray-800">
//                     High repeat buyers in Kerala.
//                   </p>
//                   <p className="text-[11px] text-gray-500">
//                     Region driving majority of repeat orders.
//                   </p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;





import React from "react";
// Assuming OrdersBarChart is a component that renders the bar chart
import OrdersBarChart from "./OrdersBarChart";
import {
  UsersIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  ChartPieIcon,
  ArrowTrendingDownIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const statCards = [
  {
    label: "Total Users",
    value: "1,245",
    change: "+5.2%",
    trend: "up",
    helper: "vs last month",
    icon: UsersIcon,
  },
  {
    label: "Net Revenue",
    value: "₹ 3.2L",
    change: "+12.1%",
    trend: "up",
    helper: "after discounts",
    icon: CurrencyDollarIcon,
  },
  {
    label: "Active Products",
    value: "1,500",
    change: "+2.0%",
    trend: "up",
    helper: "live on store",
    icon: ArchiveBoxIcon,
  },
  {
    label: "Orders (This Month)",
    value: "2,300",
    change: "+8.4%",
    trend: "up",
    helper: "completed orders",
    icon: ShoppingCartIcon,
  },
];

const quickInsights = [
  { label: "Conversion Rate", value: "3.8%", helper: "Storewide" },
  { label: "Average Order Value", value: "₹ 1,420", helper: "Last 30 days" },
  { label: "Repeat Customers", value: "41%", helper: "Returning buyers" },
];

// Data moved out of the render function for cleanliness
const categoryData = [
  { name: "Sarees", value: 62, amount: "₹ 2.1L" },
  { name: "Kurtis", value: 21, amount: "₹ 0.7L" },
  { name: "Kids Wear", value: 11, amount: "₹ 0.3L" },
  { name: "Others", value: 6, amount: "₹ 0.1L" },
];

const recentSignals = [
  {
    color: "bg-emerald-500",
    title: "Weekend spike in saree orders.",
    detail: "32% higher than the weekday average.",
  },
  {
    color: "bg-sky-500",
    title: "COD conversion improved.",
    detail: "Drop in cart abandonment for COD orders.",
  },
  {
    color: "bg-amber-400",
    title: "High repeat buyers in Kerala.",
    detail: "Region driving majority of repeat orders.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f7faf7] via-[#f4f7f2] to-[#e2eee3] px-4 py-6 md:px-8 flex justify-center">
      <div className="w-full max-w-7xl space-y-8">
        
        {/* Top Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#7f8f7a]">
              Mandharam Drapes · Admin
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#263526]">
              Analytics Overview
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Key performance insights for your ecommerce store.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date range pill (dummy) */}
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-gray-800">Last 30 days</span>
            </div>

            {/* Action buttons */}
            <button
              type="button"
              className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs font-medium text-gray-700 shadow-sm backdrop-blur hover:bg-white"
            >
              Refresh
            </button>
            <button
              type="button"
              className="rounded-full bg-[#364633] px-5 py-2 text-xs font-semibold text-white shadow-md shadow-[#364633]/30 transition hover:bg-[#2b372a]"
            >
              Export Report
            </button>
          </div>
        </header>

        {/* Stat Cards */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;
            const isUp = item.trend === "up";
            return (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-emerald-50/70 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Soft gradient strip */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-lime-400 opacity-70" />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[#263526]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      {item.helper}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div
                      className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
                        isUp
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      <span>{item.change}</span>
                      <span className="text-[9px] uppercase tracking-wide">
                        {isUp ? "Increase" : "Drop"}
                      </span>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Subtle background accent */}
                <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 translate-x-6 translate-y-6 rounded-full bg-gradient-to-br from-emerald-100/90 to-transparent opacity-70" />
              </div>
            );
          })}
        </section>

        {/* Charts + Insights (Main Layout Grid) */}
        {/* This section uses a 3-column grid on large screens: 2/3 for the Chart, 1/3 for Insights */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
          
          {/* Column 1 & 2: Orders Chart and Category Performance (lg:col-span-2) */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                  <ChartBarIcon className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#263526]">
                    Orders & Revenue (Monthly)
                  </h2>
                  <p className="text-xs text-gray-500">
                    Track order volume and revenue trends over time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Orders</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  <span>Revenue</span>
                </div>
              </div>
            </div>

            <div className="">
              <OrdersBarChart />
            </div>

            {/* Category Performance - Placed directly below the chart in the same card */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-[#263526] ">
                Category Performance
              </h3>
              <p className="text-[11px] text-gray-500 mb-4">
                Top categories driving revenue this month.
              </p>
              <div className="space-y-3">
                {categoryData.map((row) => (
                  <div key={row.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-700">
                        {row.name}
                      </span>
                      <span className="text-gray-500">{row.amount}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400"
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3A: Quick Insights Card (Store Pulse) - Flows first in the third column */}
          <div className="rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm backdrop-blur h-fit">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50">
                  <ChartPieIcon className="h-4 w-4 text-sky-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#263526]">
                    Store Pulse
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Snapshot of key ecommerce metrics.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {quickInsights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-gray-50/60 px-3 py-2.5"
                >
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#263526]">
                      {item.value}
                    </p>
                  </div>
                  <p className="text-[11px] text-gray-400">{item.helper}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3B: Returns & Rating Mini Cards - Flows directly after Store Pulse */}
          {/* Uses a nested grid: side-by-side on small screens, stacked on large screens (lg:grid-cols-1) */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {/* Returns */}
            <div className="rounded-2xl border border-rose-50 bg-white/90 p-4 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-[#7e2a3a]">
                  Monthly Returns
                </p>
                <ArrowTrendingDownIcon className="h-4 w-4 text-rose-400" />
              </div>
              <p className="text-xl font-semibold text-[#2d2830]">3.2%</p>
              <p className="mt-1 text-[11px] text-gray-500">
                Of total orders · Stable
              </p>
            </div>

            {/* Rating */}
            <div className="rounded-2xl border border-amber-50 bg-white/90 p-4 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-[#8a5a12]">
                  Avg. Rating
                </p>
                <StarIcon className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-xl font-semibold text-[#2d2830]">4.6 / 5</p>
              <p className="mt-1 text-[11px] text-gray-500">
                Based on recent reviews
              </p>
            </div>
          </div>


          {/* Column 3C: Recent Signals - Flows directly after Returns/Rating */}
          <div className="rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm backdrop-blur h-fit">
            <h3 className="text-sm font-semibold text-[#263526]">
              Recent Signals
            </h3>
            <p className="text-[11px] text-gray-500 mb-4">
              Quick highlights detected from recent activity.
            </p>

            <ul className="space-y-3 text-xs">
              {recentSignals.map((signal) => (
                <li key={signal.title} className="flex items-start gap-3">
                  <span
                    className={`mt-1 h-2 w-2 rounded-full ${signal.color}`}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {signal.title}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {signal.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;







