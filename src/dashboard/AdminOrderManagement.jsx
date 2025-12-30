// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';
// import { ClockIcon, CheckCircleIcon, XCircleIcon, TruckIcon } from '@heroicons/react/20/solid';

// // Define the Admin-specific API endpoint
// // NOTE: You must confirm this endpoint with your backend developer.
// const ADMIN_ALL_ORDERS_ENDPOINT = `${domainUrl}/order/all`;
// const ADMIN_UPDATE_STATUS_ENDPOINT = `${domainUrl}/order/update`;

// const getStatusIcon = (status) => {
//   switch (status) {
//     case 'Processing': // Customer's initial status
//     case 'Order Confirmed': // Admin's first step
//       return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
//     case 'Shipped':
//       return <TruckIcon className="size-5 text-indigo-500" aria-hidden="true" />;
//     case 'Delivered':
//       return <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />;
//     case 'Cancelled':
//       return <XCircleIcon className="size-5 text-red-500" aria-hidden="true" />;
//     default:
//       return <ClockIcon className="size-5 text-gray-500" aria-hidden="true" />;
//   }
// };

// const statusOptions = ['Processing', 'Shipped', 'Delivered'];

// export default function AdminOrderManagement() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getToken = () => localStorage.getItem("token");

//   // --- 1. Fetch ALL Orders (Admin Endpoint) ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = getToken();
//       // Assume the backend validates the token and role (must be 'admin')
//       if (!token) {
//         setError("Admin login required.");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(ADMIN_ALL_ORDERS_ENDPOINT, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       console.log("responseeeeeeeeeeeeeeeeeeeeeeee ", res.data.order);
      

//       // Assuming the API returns an array of all orders
//       setOrders(res.data.order || []); 
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch all customer orders. Check API endpoint and permissions.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);


//   // --- 2. Order Status Update Logic ---
//   const handleUpdateStatus = async (orderId, newStatus) => {
//     // Optimistic UI update (optional, but good for user experience)
//     const originalOrders = [...orders];
//     setOrders(prevOrders => 
//       prevOrders.map(order =>
//         order._id === orderId ? { ...order, orderStatus: newStatus } : order
//       )
//     );

//     try {
//       const token = getToken();
//       await axios.put(`${ADMIN_UPDATE_STATUS_ENDPOINT}/${orderId}`, 
//         { orderStatus: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       // Status updated successfully. No further action needed.
      
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       setError(`Failed to update status for order #${orderId.slice(-8)}. Rolled back.`);
//       setOrders(originalOrders); // Rollback state on error
//     }
//   };

//   if (loading) return <div className="text-center py-20 text-lg">Loading all customer orders...</div>;
//   if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
//   if (orders.length === 0) return <div className="text-center py-20 text-gray-500">No customer orders found.</div>;

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">

//         {/* Admin Page Header */}
//         <div className="max-w-xl">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Customer Order Management</h1>
//           <p className="mt-2 text-sm text-gray-500">
//             View, track, and update the status of all customer orders.
//           </p>
//         </div>

//         <div className="mt-16 space-y-16">
//           {orders.map((order) => (
//             <div key={order._id} className="border border-gray-200 rounded-lg shadow-sm">

//               {/* Order Summary Block (with Customer Name) */}
//               <div className="rounded-t-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
//                 <dl className="flex-auto divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:divide-y-0 lg:w-4/5 lg:flex-none lg:gap-x-8">
//                   {/* Customer Name ADDED */}
//                   <div className='col-span-2'> 
//                     <dt className="font-medium text-gray-900">{order.user.username}</dt>
                    
//                   </div>
//                   <div>
//                     <dt className="font-medium text-gray-900">Date placed</dt>
//                     <dd className="sm:mt-1">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </dd>
//                   </div>
//                   <div>
//                     <dt className="font-medium text-gray-900">Total</dt>
//                     <dd className="font-medium text-gray-900 sm:mt-1">₹{order.totalAmount.toFixed(2)}</dd>
//                   </div>
//                 </dl>

//                 {/* Status Update Dropdown (Admin Action) */}
//                 <div className="mt-4 sm:mt-0 flex items-center space-x-4">
//                     {/* Current Status Display */}
//                     <div className="flex items-center">
//                         {getStatusIcon(order.orderStatus)}
//                         <span className="ml-2 font-medium text-gray-900">{order.orderStatus}</span>
//                     </div>

//                     {/* Status Select Dropdown */}
//                     <select
//                         value={order.orderStatus}
//                         onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
//                         className="p-2 border border-gray-300 rounded-md bg-white text-sm font-medium focus:ring-[#5e785a] focus:border-[#5e785a]"
//                         aria-label={`Update status for order ${order._id.slice(-8)}`}
//                     >
//                         <option disabled>Change Status</option>
//                         {statusOptions.map(status => (
//                             <option key={status} value={status}>
//                                 {status}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//               </div>

//               {/* Product Table (Item Details) */}
//               <table className="w-full text-gray-500 text-sm">
//                 <caption className="sr-only">Products in order #{order._id.slice(-8)}</caption>
//                 <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
//                   <tr className="border-b border-gray-200">
//                     <th className="py-3 pl-4 pr-8 font-normal sm:w-2/5 lg:w-1/3 sm:pl-6 lg:pl-8">Product</th>
//                     <th className="hidden py-3 pr-8 font-normal sm:table-cell">Price</th>
//                     <th className="hidden py-3 pr-8 font-normal sm:table-cell">Quantity</th>
//                     <th className="hidden py-3 pr-8 font-normal sm:table-cell">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm">
//                   {order.items?.map((item, index) => (
//                     <tr key={index}>
//                       <td className="py-6 pl-4 pr-8 sm:pl-6 lg:pl-8">
//                         <div className="flex items-center">
//                           <img
//                             src={item.product?.image}
//                             alt={item.product?.name}
//                             className="mr-6 w-16 h-16 rounded-sm object-cover bg-gray-200"
//                           />
//                           <div>
//                             <div className="font-medium text-gray-900">
//                               {item.product?.name}
//                             </div>
//                             <div className="mt-1 sm:hidden">₹{item.product?.price}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="hidden py-6 pr-8 sm:table-cell">₹{item.product?.price}</td>
//                       <td className="hidden py-6 pr-8 sm:table-cell">{item.quantity}</td>
//                       <td className="hidden py-6 pr-8 sm:table-cell">{order.orderStatus}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// // Placeholder domain URL to prevent compilation errors.
// // Replace this with your actual import: import { domainUrl } from '../utils/constant';
// import { domainUrl } from '../utils/constant';
// import { ClockIcon, CheckCircleIcon, XCircleIcon, UserIcon, TruckIcon } from '@heroicons/react/20/solid';

// // --- API Endpoints ---
// // These must match your backend 'routes/orderRoutes.js' configuration.
// // We assume your orderRoutes.js maps:
// // GET /all -> getOrdersForAdmin
// // PUT /update/:id -> updateOrderStatus
// const ADMIN_ALL_ORDERS_ENDPOINT = `${domainUrl}/order/all`;
// const ADMIN_UPDATE_STATUS_ENDPOINT = `${domainUrl}/order/update`; 

// // Helper function to get the status icon
// const getStatusIcon = (status) => {
//   switch (status) {
//     case 'Processing':
//       return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
//     case 'Shipped':
//       return <TruckIcon className="size-5 text-blue-500" aria-hidden="true" />;
//     case 'Delivered':
//       return <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />;
//     case 'Cancelled':
//       return <XCircleIcon className="size-5 text-red-500" aria-hidden="true" />;
//     default:
//       return <ClockIcon className="size-5 text-gray-500" aria-hidden="true" />;
//   }
// };

// // Statuses admin can change to
// const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

// export default function AdminOrderManagementPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Helper to get token (replace with your auth context if available)
  

//   // --- 1. Fetch ALL Orders (Admin Endpoint) ---
//  const fetchAllOrders = useCallback(async () => {
//   setLoading(true);
//   setError(null);
//   try {
//     const res = await axios.get(ADMIN_ALL_ORDERS_ENDPOINT, {
//       withCredentials: true
//     });

//     setOrders(res.data.order || []);
//   } catch (err) {
//     console.error("Error fetching all orders:", err);
//     const status = err.response?.status;
//     if (status === 403) {
//       setError("Failed to fetch orders: You do not have Admin permissions.");
//     } else {
//       setError("Failed to fetch orders. Check backend connection and API endpoint.");
//     }
//   } finally {
//     setLoading(false);
//   }
// }, []);

//   useEffect(() => {
//     fetchAllOrders();
//   }, [fetchAllOrders]);

//   // --- 2. Order Status Update Logic ---
//  const handleUpdateStatus = async (orderId, newStatus) => {
//   const currentOrder = orders.find(o => o._id === orderId);
//   if (!currentOrder || currentOrder.orderStatus === newStatus) return;

//   const originalOrders = [...orders];
//   setOrders(prev =>
//     prev.map(order =>
//       order._id === orderId ? { ...order, orderStatus: newStatus } : order
//     )
//   );

//   try {
//     await axios.put(
//       `${ADMIN_UPDATE_STATUS_ENDPOINT}/${orderId}`,
//       { orderStatus: newStatus },
//       { withCredentials: true }
//     );
//   } catch (err) {
//     console.error("Failed to update order status:", err);
//     alert(`Failed to update status for order #${orderId.slice(-8)}. Reverting change.`);
//     setOrders(originalOrders);
//   }
// };


//   // --- 3. Render States ---
//   if (loading) return <div className="text-center py-20 text-xl font-medium text-indigo-600">Loading all orders for management...</div>;
//   if (error) return <div className="text-center py-20 text-xl font-semibold text-red-600 border border-red-300 p-4 rounded-lg bg-red-50">{error}</div>;
//   if (orders.length === 0) return <div className="text-center py-20 text-lg text-gray-500">No orders currently placed.</div>;

//   // --- 4. Main Component Render ---
//   return (
//     <div className="bg-white min-h-screen">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">

//         {/* Admin Page Header */}
//         <div className="max-w-3xl">
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 border-b pb-2">Admin Order Management</h1>
//           <p className="mt-2 text-md text-gray-600">
//             View, track, and manage all placed customer orders.
//           </p>
//         </div>

//         <div className="mt-12 space-y-12">
//           {orders.map((order) => (
//             <div key={order._id} className="shadow-xl rounded-lg overflow-hidden border border-gray-200">

//               {/* Order Summary Block (Admin View) */}
//               <div className="bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8 border-b border-gray-200">
                
//                 <dl className="flex-auto divide-y divide-gray-200 text-sm sm:grid sm:grid-cols-4 sm:gap-x-6 sm:divide-y-0 lg:w-3/4 lg:flex-none lg:gap-x-8">
//                   <div>
//                     <dt className="font-medium text-gray-500">Customer</dt>
//                     {/* Check if user object is populated */}
//                     <dd className="sm:mt-1 font-medium text-gray-900 flex items-center">
//                         <UserIcon className="size-4 mr-1.5 text-gray-400"/> {order.user?.username || 'N/A'}
//                     </dd>
//                     <dd className="text-xs text-gray-500">{order.user?.email || 'No email'}</dd>
//                   </div>
//                   <div>
//                     <dt className="font-medium text-gray-500">Date Placed</dt>
//                     <dd className="sm:mt-1 text-gray-900">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </dd>
//                   </div>
//                    <div>
//                     <dt className="font-medium text-gray-500">Order ID</dt>
//                     <dd className="sm:mt-1 font-mono text-xs text-gray-700">#{order._id.slice(-8)}</dd>
//                   </div>
//                   <div>
//                     <dt className="font-medium text-gray-500">Total Amount</dt>
//                     <dd className="font-bold text-indigo-600 sm:mt-1 text-base">₹{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</dd>
//                   </div>
//                 </dl>

//                 {/* Status Label & Action */}
//                 <div className="mt-4 sm:mt-0 sm:text-right flex-shrink-0">
//                   <label htmlFor={`status-select-${order._id}`} className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
//                   <div className="flex items-center space-x-2">
//                     {getStatusIcon(order.orderStatus)}
//                     <select
//                       id={`status-select-${order._id}`}
//                       value={order.orderStatus}
//                       // Prevent changing status if order is Cancelled
//                       disabled={order.orderStatus === 'Cancelled'}
//                       onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
//                       className={`p-2 border rounded-md bg-white text-sm font-medium focus:ring-indigo-500 focus:border-indigo-500 ${
//                         order.orderStatus === 'Cancelled' ? 'border-red-300 bg-red-50 text-red-700 cursor-not-allowed' : 'border-gray-300'
//                       }`}
//                       aria-label={`Update status for order ${order._id.slice(-8)}`}
//                     >
//                       {/* Show current status even if it's 'Cancelled' */}
//                       {!statusOptions.includes(order.orderStatus) && (
//                          <option key={order.orderStatus} value={order.orderStatus}>
//                            {order.orderStatus}
//                          </option>
//                       )}
//                       {statusOptions.map(status => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//           </div>))}
//               {/* Product List */}
//               <div className="p-4 sm:p-6 bg-white">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-900">Order Items ({orders.length})</h3>
//                 <div className="flow-root">
//                   <ul role="list" className="-my-6 divide-y divide-gray-200">
//                     {orders.items?.map((item, index) => {
//                       // **CRITICAL LOGIC**: Check if product population failed (product deleted)
//                       const isProductUnavailable = item.product === null;

//                       return (
//                         <li key={index} className="flex py-6 transition duration-150 hover:bg-gray-50 rounded-lg px-2 -mx-2">
//                           <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                             {isProductUnavailable ? (
//                                 <div className="flex h-full w-full items-center justify-center bg-red-50 text-red-600 text-xs text-center font-bold p-1 flex-col">
//                                     <XCircleIcon className="size-6 mb-1" /> 
//                                     <span>PRODUCT</span>
//                                     <span>DELETED</span>
//                                 </div>
//                             ) : (
//                               <img
//                                 // Use backend-provided image URL (must be full URL or served statically)
//                                 src={item.product.image || 'https://placehold.co/96x96/f3f4f6/6b7280?text=No+Image'}
//                                 alt={item.product.name}
//                                 className="h-full w-full object-cover object-center"
//                               />
//                             )}
//                           </div>
                          


//                           <div className="ml-4 flex flex-1 flex-col">
//                             <div>
//                               <div className="flex justify-between text-base font-medium text-gray-900">
//                                 <h3>
//                                   {isProductUnavailable ? (
//                                     <span className="text-red-700 font-bold">Product Unavailable</span>
//                                   ) : (
//                                     <span className="text-gray-900">{item.product.name}</span>
//                                   )}
//                                 </h3>
//                                 <p className="ml-4 font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
//                               </div>
//                             </div>

//                             <div className="flex flex-1 items-end justify-between text-sm mt-2">
//                               <div>
//                                 <p className="text-gray-500">Unit Price: ₹{item.price.toFixed(2)}</p>
//                                 <p className="text-gray-500 font-medium">Quantity: {item.quantity}</p>
//                               </div>
                              
//                               {/* Display specific cancellation reason if applicable */}
//                               {orders.orderStatus === 'Cancelled' && isProductUnavailable && (
//                                 <div className="text-sm font-bold text-red-600 flex items-center border border-red-200 bg-red-50 p-2 rounded-md">
//                                     <XCircleIcon className="size-5 mr-1.5" />
//                                     <span>Auto-Cancelled: Product/Category Deleted</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </div>
//             </div>
          
//         </div>
//       </div>  
    
//   );
// }



// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';
// import { 
//   ClockIcon, 
//   CheckCircleIcon, 
//   XCircleIcon, 
//   UserIcon, 
//   TruckIcon,
//   ExclamationCircleIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   EllipsisVerticalIcon,
//   ArrowPathIcon,
//   EyeIcon,
//   PrinterIcon,
//   EnvelopeIcon,
//   CalendarIcon,
//   CreditCardIcon,
//   MapPinIcon,
//   PhoneIcon
// } from '@heroicons/react/20/solid';
// import { 
//   ChartBarIcon,
//   BellIcon,
//   Cog6ToothIcon,
//   QuestionMarkCircleIcon
// } from '@heroicons/react/24/outline';

// const ADMIN_ALL_ORDERS_ENDPOINT = `${domainUrl}/order/all`;
// const ADMIN_UPDATE_STATUS_ENDPOINT = `${domainUrl}/order/update`;

// const statusColors = {
//   'Processing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
//   'Shipped': 'bg-blue-100 text-blue-800 border-blue-200',
//   'Delivered': 'bg-green-100 text-green-800 border-green-200',
//   'Cancelled': 'bg-red-100 text-red-800 border-red-200',
//   'Pending': 'bg-orange-100 text-orange-800 border-orange-200',
// };

// const statusIcons = {
//   'Processing': ClockIcon,
//   'Shipped': TruckIcon,
//   'Delivered': CheckCircleIcon,
//   'Cancelled': XCircleIcon,
//   'Pending': ClockIcon,
// };

// const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

// export default function AdminOrderManagementPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [expandedOrders, setExpandedOrders] = useState({});
//   const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

//   const fetchAllOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(ADMIN_ALL_ORDERS_ENDPOINT, {
//         withCredentials: true
//       });
//       setOrders(res.data.order || []);
//     } catch (err) {
//       console.error("Error fetching all orders:", err);
//       const status = err.response?.status;
//       if (status === 403) {
//         setError("Access Denied: Admin permissions required.");
//       } else {
//         setError("Unable to connect to server. Please check your connection.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllOrders();
//   }, [fetchAllOrders]);

//   const handleUpdateStatus = async (orderId, newStatus) => {
//     const currentOrder = orders.find(o => o._id === orderId);
//     if (!currentOrder || currentOrder.orderStatus === newStatus) return;

//     const originalOrders = [...orders];
//     setOrders(prev =>
//       prev.map(order =>
//         order._id === orderId ? { ...order, orderStatus: newStatus } : order
//       )
//     );

//     try {
//       await axios.put(
//         `${ADMIN_UPDATE_STATUS_ENDPOINT}/${orderId}`,
//         { orderStatus: newStatus },
//         { withCredentials: true }
//       );
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert(`Update failed for order #${orderId.slice(-8)}`);
//       setOrders(originalOrders);
//     }
//   };

//   const toggleOrderExpansion = (orderId) => {
//     setExpandedOrders(prev => ({
//       ...prev,
//       [orderId]: !prev[orderId]
//     }));
//   };

//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   const filteredAndSortedOrders = orders
//     .filter(order => {
//       const matchesSearch = 
//         order.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order._id.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
//       return matchesSearch && matchesStatus;
//     })
//     .sort((a, b) => {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];
      
//       if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });

//   const getStatusStats = () => {
//     const stats = {
//       Processing: 0,
//       Shipped: 0,
//       Delivered: 0,
//       Cancelled: 0,
//       Total: orders.length
//     };
    
//     orders.forEach(order => {
//       if (stats[order.orderStatus] !== undefined) {
//         stats[order.orderStatus]++;
//       }
//     });
    
//     return stats;
//   };

//   const statusStats = getStatusStats();

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2
//     }).format(amount);
//   };

//   const getStatusIcon = (status) => {
//     const Icon = statusIcons[status] || ClockIcon;
//     return <Icon className="size-4" />;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading order dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
//           <div className="text-red-500 mb-4">
//             <ExclamationCircleIcon className="size-12 mx-auto" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Connection Error</h3>
//           <p className="text-gray-600 mb-6 text-center">{error}</p>
//           <button
//             onClick={fetchAllOrders}
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
//           >
//             Retry Connection
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
//               <p className="text-sm text-gray-600 mt-1">Monitor and manage customer orders</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={fetchAllOrders}
//                 className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
//               >
//                 <ArrowPathIcon className="size-5" />
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           {Object.entries(statusStats).map(([status, count]) => (
//             status !== 'Total' && (
//               <div key={status} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">{status}</p>
//                     <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
//                   </div>
//                   <div className={`p-3 rounded-full ${statusColors[status].split(' ')[0]}`}>
//                     {getStatusIcon(status)}
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className={`h-full ${statusColors[status].split(' ')[0]}`}
//                       style={{ width: `${(count / statusStats.Total) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             )
//           ))}
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-indigo-100">Total Orders</p>
//                 <p className="text-2xl font-bold mt-2">{statusStats.Total}</p>
//               </div>
//               <ChartBarIcon className="size-8 text-indigo-200" />
//             </div>
//             <p className="text-sm text-indigo-200 mt-4">Active this month</p>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
//                 <input
//                   type="text"
//                   placeholder="Search orders by ID, customer, or email..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <FunnelIcon className="size-5 text-gray-400" />
//                 <select
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="All">All Status</option>
//                   {statusOptions.map(status => (
//                     <option key={status} value={status}>{status}</option>
//                   ))}
//                 </select>
//               </div>
//               <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
//                 <PrinterIcon className="size-5" />
//                 <span>Export</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   {[
//                     { key: 'createdAt', label: 'Date' },
//                     { key: '_id', label: 'Order ID' },
//                     { key: 'user', label: 'Customer' },
//                     { key: 'totalAmount', label: 'Amount' },
//                     { key: 'orderStatus', label: 'Status' },
//                     { key: 'actions', label: 'Actions' }
//                   ].map(({ key, label }) => (
//                     <th
//                       key={key}
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                       onClick={() => key !== 'actions' && handleSort(key)}
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>{label}</span>
//                         {sortConfig.key === key && (
//                           sortConfig.direction === 'asc' ? 
//                             <ChevronUpIcon className="size-4" /> : 
//                             <ChevronDownIcon className="size-4" />
//                         )}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredAndSortedOrders.map((order) => (
//                   <React.Fragment key={order._id}>
//                     <tr className="hover:bg-gray-50 transition duration-150">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {new Date(order.createdAt).toLocaleDateString('en-IN')}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {new Date(order.createdAt).toLocaleTimeString('en-IN', { 
//                             hour: '2-digit', 
//                             minute: '2-digit' 
//                           })}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-mono text-sm font-medium text-gray-900">
//                           #{order._id.slice(-8)}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
//                             <UserIcon className="size-4 text-indigo-600" />
//                           </div>
//                           <div className="ml-3">
//                             <div className="text-sm font-medium text-gray-900">
//                               {order.user?.username || 'Guest User'}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {order.user?.email || 'No email provided'}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-semibold text-gray-900">
//                           {formatCurrency(order.totalAmount || 0)}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center space-x-2">
//                           <select
//                             value={order.orderStatus}
//                             disabled={order.orderStatus === 'Cancelled'}
//                             onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
//                             className={`text-sm px-3 py-1 rounded-full border font-medium ${
//                               order.orderStatus === 'Cancelled' 
//                                 ? 'bg-red-50 text-red-700 border-red-200 cursor-not-allowed'
//                                 : statusColors[order.orderStatus]
//                             } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
//                           >
//                             {statusOptions.map(status => (
//                               <option key={status} value={status}>{status}</option>
//                             ))}
//                           </select>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex items-center space-x-3">
//                           <button
//                             onClick={() => toggleOrderExpansion(order._id)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                           >
//                             <EyeIcon className="size-5" />
//                           </button>
//                           <button className="text-gray-400 hover:text-gray-600">
//                             <EllipsisVerticalIcon className="size-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
                    
//                     {/* Expanded Details */}
//                     {expandedOrders[order._id] && (
//                       <tr>
//                         <td colSpan="6" className="px-6 py-4 bg-gray-50">
//                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             {/* Order Items */}
//                             <div>
//                               <h4 className="text-sm font-semibold text-gray-900 mb-4">Order Items</h4>
//                               <div className="space-y-3">
//                                 {(order.items || []).map((item, index) => (
//                                   <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
//                                     <div className="flex items-center space-x-3">
//                                       <div className="h-12 w-12 rounded-md border border-gray-200 overflow-hidden">
//                                         {item.product?.image ? (
//                                           <img
//                                             src={item.product.image}
//                                             alt={item.product.name}
//                                             className="h-full w-full object-cover"
//                                           />
//                                         ) : (
//                                           <div className="h-full w-full bg-gray-100 flex items-center justify-center">
//                                             <QuestionMarkCircleIcon className="size-6 text-gray-400" />
//                                           </div>
//                                         )}
//                                       </div>
//                                       <div>
//                                         <p className="text-sm font-medium text-gray-900">
//                                           {item.product?.name || 'Product Unavailable'}
//                                         </p>
//                                         <p className="text-xs text-gray-500">
//                                           Qty: {item.quantity} × {formatCurrency(item.price)}
//                                         </p>
//                                       </div>
//                                     </div>
//                                     <div className="text-sm font-semibold text-gray-900">
//                                       {formatCurrency(item.price * item.quantity)}
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>

//                             {/* Order Details */}
//                             <div>
//                               <h4 className="text-sm font-semibold text-gray-900 mb-4">Order Details</h4>
//                               <div className="space-y-4">
//                                 <div className="flex items-center text-sm">
//                                   <CalendarIcon className="size-4 text-gray-400 mr-2" />
//                                   <span className="text-gray-600">Placed:</span>
//                                   <span className="ml-auto font-medium">
//                                     {new Date(order.createdAt).toLocaleString('en-IN')}
//                                   </span>
//                                 </div>
//                                 {order.shippingAddress && (
//                                   <div className="flex items-start text-sm">
//                                     <MapPinIcon className="size-4 text-gray-400 mr-2 mt-0.5" />
//                                     <div className="flex-1">
//                                       <span className="text-gray-600">Shipping Address:</span>
//                                       <p className="text-gray-900 font-medium mt-1">
//                                         {order.shippingAddress}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 )}
//                                 <div className="flex items-center text-sm">
//                                   <CreditCardIcon className="size-4 text-gray-400 mr-2" />
//                                   <span className="text-gray-600">Payment Method:</span>
//                                   <span className="ml-auto font-medium">
//                                     {order.paymentMethod || 'Not specified'}
//                                   </span>
//                                 </div>
//                                 {order.phone && (
//                                   <div className="flex items-center text-sm">
//                                     <PhoneIcon className="size-4 text-gray-400 mr-2" />
//                                     <span className="text-gray-600">Contact:</span>
//                                     <span className="ml-auto font-medium">{order.phone}</span>
//                                   </div>
//                                 )}
//                                 <div className="pt-4 border-t border-gray-200">
//                                   <div className="flex justify-between text-sm">
//                                     <span className="text-gray-600">Subtotal</span>
//                                     <span className="font-medium">{formatCurrency(order.totalAmount || 0)}</span>
//                                   </div>
//                                   <div className="flex justify-between text-sm mt-2">
//                                     <span className="text-gray-600">Tax</span>
//                                     <span className="font-medium">Calculated at checkout</span>
//                                   </div>
//                                   <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-gray-200">
//                                     <span>Total</span>
//                                     <span>{formatCurrency(order.totalAmount || 0)}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Empty State */}
//           {filteredAndSortedOrders.length === 0 && (
//             <div className="text-center py-12">
//               <div className="mx-auto h-12 w-12 text-gray-400">
//                 <MagnifyingGlassIcon className="size-12" />
//               </div>
//               <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 {searchTerm || statusFilter !== 'All' 
//                   ? 'Try adjusting your search or filter' 
//                   : 'No orders have been placed yet'}
//               </p>
//             </div>
//           )}
//         </div>

//       </main>
//     </div>
//   );
// }






import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { domainUrl } from "../utils/constant";
import api from "../utils/api";

import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";

import {
  ChevronRightIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

// --- API Endpoints ---
const ADMIN_ALL_ORDERS_ENDPOINT = '/order/all';
const ADMIN_UPDATE_STATUS_ENDPOINT = '/order/update';

// Helper: Status icon
const getStatusIcon = (status) => {
  switch (status) {
    case "Processing":
      return <ClockIcon className="size-4" aria-hidden="true" />;
    case "Shipped":
      return <TruckIcon className="size-4" aria-hidden="true" />;
    case "Delivered":
      return <CheckCircleIcon className="size-4" aria-hidden="true" />;
    case "Cancelled":
      return <XCircleIcon className="size-4" aria-hidden="true" />;
    default:
      return <ClockIcon className="size-4" aria-hidden="true" />;
  }
};

// Helper: Status badge styles & animation
const getStatusClasses = (status) => {
  switch (status) {
    case "Processing":
      return {
        container:
          "inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 shadow-sm",
        dot: "h-2 w-2 rounded-full bg-amber-400 animate-pulse",
      };
    case "Shipped":
      return {
        container:
          "inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 shadow-sm",
        dot: "h-2 w-2 rounded-full bg-sky-400 animate-pulse",
      };
    case "Delivered":
      return {
        container:
          "inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 shadow-sm",
        dot: "h-2 w-2 rounded-full bg-emerald-400",
      };
    case "Cancelled":
      return {
        container:
          "inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 shadow-sm",
        dot: "h-2 w-2 rounded-full bg-rose-400",
      };
    default:
      return {
        container:
          "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm",
        dot: "h-2 w-2 rounded-full bg-slate-400",
      };
  }
};

const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

const formatDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminOrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // --- Fetch ALL Orders (Admin, cookie-based) ---
  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(ADMIN_ALL_ORDERS_ENDPOINT, {
        // withCredentials: true,
      });
      setOrders(res.data.order || []);
    } catch (err) {
      console.error("Error fetching all orders:", err);
      const status = err.response?.status;
      if (status === 403) {
        setError("Failed to fetch orders: You do not have Admin permissions.");
      } else {
        setError(
          "Failed to fetch orders. Please check backend connection and API endpoint."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // --- Update status (cookie-based) ---
  const handleUpdateStatus = async (orderId, newStatus) => {
    const currentOrder = orders.find((o) => o._id === orderId);
    if (!currentOrder || currentOrder.orderStatus === newStatus) return;

    const originalOrders = [...orders];
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    // Also update in drawer if currently open for this order
    setSelectedOrder((prev) =>
      prev && prev._id === orderId ? { ...prev, orderStatus: newStatus } : prev
    );

    try {
      await api.put(
        `${ADMIN_UPDATE_STATUS_ENDPOINT}/${orderId}`,
        { orderStatus: newStatus },
        // { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert(
        `Failed to update status for order #${orderId.slice(
          -8
        )}. Reverting change.`
      );
      setOrders(originalOrders);
      const revertOrder = originalOrders.find((o) => o._id === orderId);
      setSelectedOrder((prev) =>
        prev && prev._id === orderId ? revertOrder : prev
      );
    }
  };

  // --- Metrics (for header cards) ---
  const metrics = useMemo(() => {
    if (!orders.length) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        delivered: 0,
        processing: 0,
      };
    }

    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.totalAmount || 0),
      0
    );
    const delivered = orders.filter((o) => o.orderStatus === "Delivered")
      .length;
    const processing = orders.filter((o) => o.orderStatus === "Processing")
      .length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      delivered,
      processing,
    };
  }, [orders]);

  const openDrawer = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedOrder(null);
  };

  // --- Render states ---
  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="animate-pulse space-y-3">
              <div className="h-7 w-48 rounded-md bg-slate-200" />
              <div className="h-4 w-72 rounded-md bg-slate-200" />
            </div>
            <div className="hidden md:flex gap-3 animate-pulse">
              <div className="h-10 w-32 rounded-lg bg-slate-200" />
              <div className="h-10 w-32 rounded-lg bg-slate-200" />
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-pulse"
              >
                <div className="h-4 w-20 rounded-md bg-slate-200" />
                <div className="mt-3 h-7 w-24 rounded-md bg-slate-200" />
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="h-5 w-40 rounded-md bg-slate-200 animate-pulse" />
            </div>
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4 animate-pulse"
                >
                  <div className="h-4 w-24 rounded-md bg-slate-200" />
                  <div className="h-4 w-40 rounded-md bg-slate-200" />
                  <div className="h-4 w-32 rounded-md bg-slate-200" />
                  <div className="h-4 w-20 rounded-md bg-slate-200" />
                  <div className="ml-auto h-8 w-24 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center shadow-sm">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-3">
            <XCircleIcon className="size-6" />
          </div>
          <h2 className="text-lg font-semibold text-rose-800 mb-1">
            Something went wrong
          </h2>
          <p className="text-sm text-rose-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <InformationCircleIcon className="size-6" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            No orders yet
          </h2>
          <p className="text-sm text-slate-600">
            There are currently no orders placed. New orders will appear here
            automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-[1600px] px-3 py-8 sm:px-4 lg:px-6 xl:px-8 2xl:px-12 lg:pb-16">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Admin Order Management
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Monitor, track and update every order in real time with a
              centralized overview.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={fetchAllOrders}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <ClockIcon className="mr-1.5 size-4 text-slate-400" />
              Refresh Orders
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="
  mt-6 
  grid gap-4

  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4

  xl:gap-6 
">

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Total Orders
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {metrics.totalOrders}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Revenue
            </p>
            <p className="mt-2 text-2xl font-semibold text-emerald-900">
              ₹{metrics.totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
              Processing
            </p>
            <p className="mt-2 text-2xl font-semibold text-amber-900">
              {metrics.processing}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Delivered
            </p>
            <p className="mt-2 text-2xl font-semibold text-emerald-900">
              {metrics.delivered}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                All Orders
              </h2>
              <p className="text-xs text-slate-500">
                Click a row to view customer details and items.
              </p>
            </div>
          </div>

         <div className="overflow-x-auto max-w-full">

            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                    Order
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                    Customer
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                    Placed At
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                    Total
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                    Update
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {orders.map((order) => {
                  const shortId = `#${order._id.slice(-8)}`;
                  const statusStyle = getStatusClasses(order.orderStatus);

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td
                        className="whitespace-nowrap px-4 py-3 text-xs font-mono text-slate-700 cursor-pointer"
                        onClick={() => openDrawer(order)}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <span className="font-semibold">{shortId}</span>
                        </span>
                      </td>

                      <td
                        className="whitespace-nowrap px-4 py-3 cursor-pointer"
                        onClick={() => openDrawer(order)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <UserIcon className="size-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {order.user?.username || "N/A"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {order.user?.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">
                        {formatDateTime(order.createdAt)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">
                        ₹{order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-xs">
                        <div className={statusStyle.container}>
                          <span className={statusStyle.dot} />
                          {getStatusIcon(order.orderStatus)}
                          <span className="capitalize">
                            {order.orderStatus || "Unknown"}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-xs">
                        <select
                          value={order.orderStatus}
                          disabled={order.orderStatus === "Cancelled"}
                          onChange={(e) =>
                            handleUpdateStatus(order._id, e.target.value)
                          }
                          className={`rounded-full border px-3 py-1 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                            order.orderStatus === "Cancelled"
                              ? "cursor-not-allowed border-rose-200 bg-rose-50 text-rose-700"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {!statusOptions.includes(order.orderStatus) && (
                            <option value={order.orderStatus}>
                              {order.orderStatus}
                            </option>
                          )}
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => openDrawer(order)}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
                        >
                          View
                          <ChevronRightIcon className="ml-1.5 size-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drawer: Customer & Order Details */}
        {drawerOpen && selectedOrder && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
              onClick={closeDrawer}
            />
            {/* Panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-200 ease-out">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Order
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      #{selectedOrder._id.slice(-8)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  >
                    <XMarkIcon className="size-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
                  {/* Customer */}
                  <section className="mb-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-slate-900 text-slate-50">
                        <UserIcon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedOrder.user?.username || "N/A"}
                        </p>
                        <p className="text-xs text-slate-600">
                          {selectedOrder.user?.email || "No email provided"}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div>
                        <p className="font-medium text-slate-500">
                          Placed At
                        </p>
                        <p className="mt-0.5">
                          {formatDateTime(selectedOrder.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-500">
                          Total Amount
                        </p>
                        <p className="mt-0.5 font-semibold text-slate-900">
                          ₹
                          {selectedOrder.totalAmount
                            ? selectedOrder.totalAmount.toFixed(2)
                            : "0.00"}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Status controls */}
                  <section className="mb-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Order Status
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        {(() => {
                          const s = getStatusClasses(
                            selectedOrder.orderStatus
                          );
                          return (
                            <div className={s.container}>
                              <span className={s.dot} />
                              {getStatusIcon(selectedOrder.orderStatus)}
                              <span className="capitalize">
                                {selectedOrder.orderStatus}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                      <select
                        value={selectedOrder.orderStatus}
                        disabled={selectedOrder.orderStatus === "Cancelled"}
                        onChange={(e) =>
                          handleUpdateStatus(selectedOrder._id, e.target.value)
                        }
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                          selectedOrder.orderStatus === "Cancelled"
                            ? "cursor-not-allowed border-rose-200 bg-rose-50 text-rose-700"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {!statusOptions.includes(selectedOrder.orderStatus) && (
                          <option value={selectedOrder.orderStatus}>
                            {selectedOrder.orderStatus}
                          </option>
                        )}
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>

                  {/* Items */}
                  <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Order Items
                      </p>
                      <p className="text-xs text-slate-500">
                        {selectedOrder.items?.length || 0} items
                      </p>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {selectedOrder.items?.map((item, index) => {
                        const isProductUnavailable = !item.product;
                        const subtotal =
                          (item.price || 0) * (item.quantity || 0);

                        return (
                          <div
                            key={index}
                            className="flex gap-3 py-3 first:pt-0 last:pb-0"
                          >
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                              {isProductUnavailable ? (
                                <div className="flex h-full w-full flex-col items-center justify-center bg-rose-50 text-[10px] font-semibold text-rose-700">
                                  <XCircleIcon className="mb-1 size-5" />
                                  <span>PRODUCT</span>
                                  <span>DELETED</span>
                                </div>
                              ) : (
                                <img
                                  src={
                                    item.product.image ||
                                    "https://placehold.co/96x96/f3f4f6/6b7280?text=No+Image"
                                  }
                                  alt={item.product.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              )}
                            </div>
                            <div className="flex flex-1 flex-col justify-between text-xs">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="text-[13px] font-medium text-slate-900">
                                    {isProductUnavailable
                                      ? "Product Unavailable"
                                      : item.product.name}
                                  </p>
                                  <p className="mt-0.5 text-[11px] text-slate-500">
                                    Unit: ₹{(item.price || 0).toFixed(2)} · Qty:{" "}
                                    {item.quantity}
                                  </p>
                                </div>
                                <p className="text-[13px] font-semibold text-slate-900">
                                  ₹{subtotal.toFixed(2)}
                                </p>
                              </div>

                              {selectedOrder.orderStatus === "Cancelled" &&
                                isProductUnavailable && (
                                  <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-1 text-[11px] font-medium text-rose-700 border border-rose-200">
                                    <XCircleIcon className="size-3" />
                                    <span>
                                      Auto-cancelled: Product/Category deleted
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
