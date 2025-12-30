// // src/pages/MyOrdersPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { domainUrl } from '../utils/constant';


// // NOTE: In a real app, you would get this ID from an Auth Context 
// // (e.g., const { userId, token } = useAuth();)
// const DUMMY_USER_ID = '60c72b2f9a2e3b0015f3e9d8'; 

// const MyOrdersPage = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 // API call to fetch orders for a specific user
//                 // You must ensure your backend has an endpoint like this:
//                 const res = await axios.get(
//                     `${domainUrl}/orders/myorders/${DUMMY_USER_ID}`
//                     // In the future, you'll pass a Bearer Token for authorization instead of the ID in the URL.
//                 );

//                 // Assuming the backend returns an array of orders in res.data
//                 setOrders(res.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching orders:", err);
//                 setError("Failed to load your orders. Are you logged in?");
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     if (loading) return <div className="text-center py-20 text-xl font-medium">Loading Orders...</div>;
//     if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

//     return (
//         <div className="bg-gray-50">
//             <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//                 <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
//                     My Orders ({orders.length})
//                 </h1>

//                 {orders.length === 0 ? (
//                     <div className="text-center py-10 border border-gray-200 p-8 rounded-lg bg-white">
//                         <p className="text-lg text-gray-700 mb-4">You haven't placed any orders yet.</p>
//                         <Link 
//                             to="/shop" 
//                             className="text-base font-medium text-indigo-600 hover:text-indigo-500"
//                         >
//                             Start Shopping &rarr;
//                         </Link>
//                     </div>
//                 ) : (
//                     <div className="space-y-6">
//                         {orders.map((order) => (
//                             <div key={order._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex justify-between items-center">
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-900">
//                                         Order ID: <span className="text-indigo-600">{order._id}</span>
//                                     </p>
//                                     <p className="text-sm text-gray-500 mt-1">
//                                         Date Placed: {new Date(order.createdAt).toLocaleDateString()}
//                                     </p>
//                                     <p className="text-lg font-bold text-gray-900 mt-2">
//                                         Total: ${order.totalPrice ? order.totalPrice.toFixed(2) : 'N/A'}
//                                     </p>
//                                 </div>
//                                 <Link 
//                                     to={`/order/${order._id}`} 
//                                     className="text-sm font-medium text-white bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 transition"
//                                 >
//                                     View Details
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyOrdersPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant'; 
// import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

// const getStatusIcon = (status) => {
//     switch (status) {
//         case 'Processing':
//             return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
//         case 'Delivered':
//             return <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />;
//         case 'Cancelled':
//             return <XCircleIcon className="size-5 text-red-500" aria-hidden="true" />;
//         default:
//             return <ClockIcon className="size-5 text-gray-500" aria-hidden="true" />;
//     }
// };


// export default function MyOrdersPage() {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const getToken = () => localStorage.getItem("token");

//     const fetchOrders = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const token = getToken();
//             if (!token) {
//                 setError("Please log in to view your orders.");
//                 setLoading(false);
//                 return;
//             }
//             //  API route must match your backend setup: /api/order/list
//             const res = await axios.get(`${domainUrl}/order/myOrders`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
            
//             // Note: Your backend getOrders uses findById, which finds by ID, not user ID.
//             // If backend is fixed to use find({user: userid}), this will work:
//             setOrders(res.data.order || []); 
//             console.log("response of my orders" , res.data.order)
            
//         } catch (err) {
//             console.error("Error fetching orders:", err);
//             setError("Failed to load orders. Please check your network.");
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchOrders();
//     }, [fetchOrders]);

//     if (loading) return <div className="text-center py-20 text-lg">Loading Orders...</div>;
//     if (error) return <div className="text-center py-20 text-red-600">⚠️ {error}</div>;
//     if (orders.length === 0) return <div className="text-center py-20 text-gray-500">You haven't placed any orders yet.</div>;
    
//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//                 <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Orders</h1>
                
//                 {orders.map((order) => (
//                     <div key={order._id} className="mt-8 border-b border-gray-200 pb-8">
//                         <div className="sm:flex sm:justify-between sm:items-baseline">
//                             <h2 className="text-lg font-medium text-gray-900">Order ID: {order._id.slice(-8)}</h2>
//                             <p className="mt-2 text-sm text-gray-500 sm:mt-0">
//                                 Order Placed: {new Date(order.createdAt).toLocaleDateString()}
//                             </p>
//                         </div>

//                         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
//                             <div className="border-t border-gray-200 pt-4">
//                                 <dt className="font-medium text-gray-900">Total Amount</dt>
//                                 <dd className="mt-1 text-sm text-gray-500 font-semibold">₹{order.totalAmount.toFixed(2)}</dd>
//                             </div>
//                             <div className="border-t border-gray-200 pt-4">
//                                 <dt className="font-medium text-gray-900">Order Status</dt>
//                                 <dd className="mt-1 flex items-center text-sm text-gray-500">
//                                     {getStatusIcon(order.orderStatus)}
//                                     <span className="ml-2">{order.orderStatus}</span>
//                                 </dd>
//                             </div>
//                             <div className="border-t border-gray-200 pt-4">
//                                 <dt className="font-medium text-gray-900">Payment Status</dt>
//                                 <dd className="mt-1 text-sm text-gray-500">{order.paymentStatus}</dd>
//                             </div>
//                             <div className="border-t border-gray-200 pt-4">
//                                 <dt className="font-medium text-gray-900">Items</dt>
//                                 <dd className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
//                                     View Details ({order.items.length})
//                                 </dd>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }





// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';
// // Removed unused icons, keeping only those for status
// import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

// // Helper function to render status icons and text
// const getStatusElement = (status) => {
//     let icon, color;
//     switch (status) {
//         case 'Processing':
//             icon = ClockIcon;
//             color = 'text-yellow-500';
//             break;
//         case 'Delivered':
//             icon = CheckCircleIcon;
//             color = 'text-green-500';
//             break;
//         case 'Cancelled':
//             icon = XCircleIcon;
//             color = 'text-red-500';
//             break;
//         default:
//             icon = ClockIcon;
//             color = 'text-gray-500';
//     }
//     const IconComponent = icon;

//     return (
//         <div className={`flex items-center space-x-2 text-sm ${color}`}>
//             <IconComponent className="size-5 shrink-0" aria-hidden="true" />
//             <span>{status}</span>
//         </div>
//     );
// };

// // Function to map a product status date if available, otherwise use Order status
// const getProductStatus = (orderStatus, deliveryDate) => {
//     if (deliveryDate) {
//         return `Delivered ${new Date(deliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
//     }
//     return orderStatus;
// };


// export default function MyOrdersPage() {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const getToken = () => localStorage.getItem("token");

//     const fetchOrders = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const token = getToken();
//             if (!token) {
//                 setError("Please log in to view your orders.");
//                 setLoading(false);
//                 return;
//             }
//             // Ensure this URL is correct based on your fixed backend routing
//             const res = await axios.get(`${domainUrl}/order/myOrders`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
            
//             // Assuming res.data.order is an array of orders from the backend
//             setOrders(res.data.order || []); 
            
//         } catch (err) {
//             console.error("Error fetching orders:", err);
//             setError("Failed to load orders. Please check your network.");
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchOrders();
//     }, [fetchOrders]);

//     if (loading) return <div className="text-center py-20 text-lg text-indigo-600">Loading Orders...</div>;
//     if (error) return <div className="text-center py-20 text-red-600">⚠️ {error}</div>;
//     if (orders.length === 0) return <div className="text-center py-20 text-gray-500">You haven't placed any orders yet.</div>;
    
//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
//                 <div className="max-w-xl">
//                     <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
//                     <p className="mt-2 text-sm text-gray-500">
//                         Check the status of recent orders.
//                     </p>
//                 </div>

//                 <div className="mt-16">
//                     <h2 className="sr-only">Recent orders</h2>

//                     {/* Use orders.map to iterate over the fetched data */}
//                     <div className="space-y-20">
//                         {orders.map((order) => (
//                             <div key={order._id}>
//                                 <h3 className="sr-only">
//                                     Order placed on <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString()}</time>
//                                 </h3>

//                                 {/* Order Header Block (Date, Order Number, Total Amount) */}
//                                 <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
//                                     <dl className="flex-auto divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                        
//                                         {/* Date Placed */}
//                                         <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
//                                             <dt className="font-medium text-gray-900">Date placed</dt>
//                                             <dd className="sm:mt-1">
//                                                 <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString()}</time>
//                                             </dd>
//                                         </div>
                                        
//                                         {/* Order Number */}
//                                         <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
//                                             <dt className="font-medium text-gray-900">Order number</dt>
//                                             <dd className="sm:mt-1">{order._id.slice(-8)}</dd>
//                                         </div>
                                        
//                                         {/* Total Amount */}
//                                         <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
//                                             <dt className="font-medium text-gray-900">Total amount</dt>
//                                             <dd className="font-medium text-gray-900 sm:mt-1">₹{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</dd>
//                                         </div>
//                                     </dl>
                                    
//                                     {/* View Invoice Button (Ignoring functionality as requested) */}
//                                     <button
//                                         type="button"
//                                         className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden sm:mt-0 sm:w-auto"
//                                     >
//                                         View Details
//                                     </button>
//                                 </div>

//                                 {/* Products Table */}
//                                 <table className="mt-4 w-full text-gray-500 sm:mt-6">
//                                     <caption className="sr-only">Products</caption>
//                                     <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
//                                         <tr>
//                                             <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
//                                                 Product
//                                             </th>
//                                             <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
//                                                 Price
//                                             </th>
//                                             <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
//                                                 Status
//                                             </th>
//                                             {/* Info/View Product Column - Retained for layout */}
//                                             <th scope="col" className="w-0 py-3 text-right font-normal">
//                                                 Info
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
//                                         {/* Map over the items array inside the current order */}
//                                         {order.items.map((item) => (
//                                             <tr key={item._id}> 
//                                                 <td className="py-6 pr-8">
//                                                     <div className="flex items-center">
//                                                         {/* Product Image */}
//                                                         <img
//                                                             alt={item.product.name}
//                                                             src={item.product.image || 'https://via.placeholder.com/64'}
//                                                             className="mr-6 size-16 rounded-sm object-cover"
//                                                         />
//                                                         <div>
//                                                             {/* Product Name & Quantity */}
//                                                             <div className="font-medium text-gray-900">{item.product.name}</div>
//                                                             <div className="text-gray-500">Qty: {item.quantity}</div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
                                                
//                                                 {/* Price */}
//                                                 <td className="hidden py-6 pr-8 sm:table-cell">₹{item.price ? item.price.toFixed(2) : '0.00'}</td>
                                                
//                                                 {/* Status (Using the Order's main status for the item) */}
//                                                 <td className="hidden py-6 pr-8 sm:table-cell">
//                                                     {getStatusElement(order.orderStatus)}
//                                                     {/* If you have item-level status, replace the line above */}
//                                                     {/* <div>{getProductStatus(order.orderStatus, item.deliveryDate)}</div> */}
//                                                 </td>
                                                
//                                                 {/* Info/View Product */}
//                                                 <td className="py-6 text-right font-medium whitespace-nowrap">
//                                                     <button type="button" className="text-indigo-600 hover:text-indigo-500">
//                                                         View Product 
//                                                         <span className="sr-only">, {item.product.name}</span>
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }





// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';
// import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

// const getStatusIcon = (status) => {
//   switch (status) {
//     case 'Processing':
//       return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
//     case 'Delivered':
//       return <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />;
//     case 'Cancelled':
//       return <XCircleIcon className="size-5 text-red-500" aria-hidden="true" />;
//     default:
//       return <ClockIcon className="size-5 text-gray-500" aria-hidden="true" />;
//   }
// };

// export default function MyOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getToken = () => localStorage.getItem("token");

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = getToken();
//       if (!token) {
//         setError("Please log in to view your orders.");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(`${domainUrl}/order/myOrders`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       console.log("Fetched Orders:", res.data.order);

//       setOrders(res.data.order || []);
//     } catch (err) {
//       setError("Ooops! Something Went Wrong");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   if (loading) return <div className="text-center py-20 text-lg">Loading orders...</div>;
//   if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
//   if (orders.length === 0) return <div className="text-center py-20 text-gray-500">No orders placed yet.</div>;

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">

//         {/* Page Header */}
//         <div className="max-w-xl">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order History</h1>
//           <p className="mt-2 text-sm text-gray-500">
//             Check status of your orders and review purchased products.
//           </p>
//         </div>

//         <div className="mt-16 space-y-16">
//           {orders.map((order) => (
//             <div key={order._id}>

//               {/* Order Summary Block */}
//               <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
//                 <dl className="flex-auto divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
//                   <div>
//                     <dt className="font-medium text-gray-900">Date placed</dt>
//                     <dd className="sm:mt-1">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </dd>
//                   </div>
//                   <div>
//                     <dt className="font-medium text-gray-900">Order ID</dt>
//                     <dd className="sm:mt-1">#{order._id.slice(-8)}</dd>
//                   </div>
//                   <div>
//                     <dt className="font-medium text-gray-900">Total amount</dt>
//                     <dd className="font-medium text-gray-900 sm:mt-1">₹{order.totalAmount.toFixed(2)}</dd>
//                   </div>
//                 </dl>

//                 {/* Status Label */}
//                 <div className="mt-4 sm:mt-0 sm:text-right flex items-center">
//                   {getStatusIcon(order.orderStatus)}
//                   <span className="ml-2 font-medium text-gray-900">{order.orderStatus}</span>
//                 </div>
//               </div>

//               {/* Product Table */}
//               <table className="mt-4 w-full text-gray-500 sm:mt-6">
//                 <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
//                   <tr>
//                     <th className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">Product</th>
//                     <th className="hidden py-3 pr-8 font-normal sm:table-cell">Price</th>
//                     <th className="hidden py-3 pr-8 font-normal sm:table-cell">Quantity</th>
//                     <th className="hidden py-3 pr-8 font-normal sm:table-cell">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
//                   {order.items?.map((item, index) => (
//                     <tr key={index}>
//                       <td className="py-6 pr-8">
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
// import {domainUrl} from '../utils/constant'
// // FIX: The original path to '../utils/constant' could not be resolved.
// // We are defining a placeholder domainUrl here to ensure the code compiles and runs.
 
// import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
// import { Navigate } from 'react-router-dom';

// // Helper function to get the status icon (already handles 'Cancelled')
// const getStatusIcon = (status) => {
//   switch (status) {
//     case 'Processing':
//       return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
//     case 'Shipped':
//       return <ClockIcon className="size-5 text-blue-500" aria-hidden="true" />;
//     case 'Delivered':
//       return <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />;
//     case 'Cancelled':
//       return <XCircleIcon className="size-5 text-red-500" aria-hidden="true" />;
//     default:
//       return <ClockIcon className="size-5 text-gray-500" aria-hidden="true" />;
//   }
// };

// export default function MyOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to retrieve the authentication token
//   const getToken = () => localStorage.getItem("token");

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = getToken();
//       if (!token) {
//         setError("Please Login To See Your Order History");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(`${domainUrl}/order/myOrders`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       // The backend returns { order: orders_array }
//       setOrders(res.data.order || []); 
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError("Oops! Something went wrong while fetching orders.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   if (loading) return <div className="text-center py-20 text-xl font-medium text-indigo-600">Loading order history...</div>;
//   if (error) return <div className="text-center py-20 text-xl font-semibold   p-4 rounded-lg text-red-500">{error}</div>;
//   if (orders.length === 0) return <div className="text-center py-20 text-lg text-gray-500">No orders placed yet. Start shopping!</div>;

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">

//         {/* Page Header */}
//         <div className="max-w-xl">
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 border-b pb-2">Your Order History</h1>
//           <p className="mt-2 text-md text-gray-600">
//             Check the status of your recent purchases.
//           </p>
//         </div>

//         <div className="mt-12 space-y-16">
//           {orders.map((order) => (
//             <div key={order._id} className="shadow-lg rounded-xl overflow-hidden border border-gray-100">

//               {/* Order Summary Block */}
//               <div className="bg-indigo-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                
//                 <dl className="flex-auto divide-y divide-indigo-200 text-sm text-gray-700 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
//                   <div>
//                     <dt className="font-semibold text-indigo-900">Date Placed</dt>
//                     <dd className="sm:mt-1">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </dd>
//                   </div>
//                   <div>
//                     <dt className="font-semibold text-indigo-900">Order ID</dt>
//                     <dd className="sm:mt-1 font-mono text-xs text-indigo-800 bg-indigo-200 inline-block px-2 py-0.5 rounded-full">#{order._id}</dd>
//                   </div>
//                   <div>
//                     <dt className="font-semibold text-indigo-900">Total Amount</dt>
//                     <dd className="font-extrabold text-indigo-900 sm:mt-1">₹{order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</dd>
//                   </div>
//                 </dl>

//                 {/* Status Label */}
//                 <div className="mt-4 sm:mt-0 sm:text-right flex items-center justify-end">
//                   {getStatusIcon(order.orderStatus)}
//                   <span className={`ml-2 font-bold ${order.orderStatus === 'Cancelled' ? 'text-red-600' : order.orderStatus === 'Delivered' ? 'text-green-600' : 'text-indigo-600'}`}>{order.orderStatus}</span>
//                 </div>
//               </div>

//               {/* Product List */}
//               <div className="p-4 sm:p-6">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h3>
//                 <div className="flow-root">
//                   <ul role="list" className="-my-6 divide-y divide-gray-200">
//                     {order.items?.map((item, index) => {
//                       // **CRITICAL LOGIC:** Check if product population failed (meaning the product was deleted).
//                       // If the product was deleted, Mongoose populate returns 'null'.
//                       const isProductUnavailable = item.product === null;

//                       return (
//                         <li key={index} className="flex py-6">
//                           <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                             {isProductUnavailable ? (
//                                 <div className="flex h-full w-full items-center justify-center bg-red-100 text-red-500 text-xs text-center font-bold p-1">
//                                     <XCircleIcon className="size-5 mr-1" /> UNAVAILABLE
//                                 </div>
//                             ) : (
//                               <img
//                                 src={item.product.image || 'https://placehold.co/80x80/cccccc/333333?text=N/A'}
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
//                                     <span className="text-red-600 font-bold">Product Unavailable</span>
//                                   ) : (
//                                     <span className="text-gray-900">{item.product.name}</span>
//                                   )}
//                                 </h3>
//                                 {/* The 'item.price' is the price captured at the time of order, not the current product price */}
//                                 <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
//                               </div>
//                               <p className="mt-1 text-sm text-gray-500">
//                                 {!isProductUnavailable && `Unit Price: ₹${item.price.toFixed(2)}`}
//                               </p>
//                             </div>
//                             <div className="flex flex-1 items-end justify-between text-sm">
//                               <p className="text-gray-500">Qty: {item.quantity}</p>
                              
//                               {/* Display specific cancellation reason if applicable */}
//                               {order.orderStatus === 'Cancelled' && isProductUnavailable && (
//                                 <div className="text-sm font-semibold text-red-500 flex items-center">
//                                     <XCircleIcon className="size-4 mr-1" />
//                                     <span className="bg-red-100 px-2 py-0.5 rounded-full">Reason: Product Deleted</span>
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
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//updateed code with deepseek ui




// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';
// import { 
//   ClockIcon, 
//   CheckCircleIcon, 
//   XCircleIcon,
//   TruckIcon,
//   ArchiveBoxIcon,
//   ShoppingBagIcon,
//   CalendarIcon,
//   CurrencyRupeeIcon,
//   TagIcon,
//   ExclamationTriangleIcon,
//   ChevronRightIcon,
//   MapPinIcon,
//   CreditCardIcon
// } from '@heroicons/react/20/solid';
// import { motion, AnimatePresence } from 'framer-motion';

// // Helper function to get the status icon with enhanced styling
// const getStatusIcon = (status) => {
//   switch (status) {
//     case 'Processing':
//       return <ClockIcon className="size-6 text-amber-500" />;
//     case 'Shipped':
//       return <TruckIcon className="size-6 text-blue-500" />;
//     case 'Delivered':
//       return <CheckCircleIcon className="size-6 text-emerald-500" />;
//     case 'Cancelled':
//       return <XCircleIcon className="size-6 text-rose-500" />;
//     default:
//       return <ClockIcon className="size-6 text-gray-400" />;
//   }
// };

// // Status badge component
// const StatusBadge = ({ status }) => {
//   const statusConfig = {
//     Processing: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: <ClockIcon className="size-4" /> },
//     Shipped: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <TruckIcon className="size-4" /> },
//     Delivered: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: <CheckCircleIcon className="size-4" /> },
//     Cancelled: { color: 'bg-rose-100 text-rose-800 border-rose-200', icon: <XCircleIcon className="size-4" /> }
//   };

//   const config = statusConfig[status] || statusConfig.Processing;

//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.color} font-medium text-sm`}>
//       {config.icon}
//       {status}
//     </span>
//   );
// };

// // Loading skeleton component
// const OrderSkeleton = () => (
//   <div className="animate-pulse">
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
//       <div className="flex justify-between items-center mb-6">
//         <div className="space-y-3">
//           <div className="h-6 bg-gray-200 rounded w-48"></div>
//           <div className="h-4 bg-gray-100 rounded w-32"></div>
//         </div>
//         <div className="h-8 bg-gray-200 rounded w-24"></div>
//       </div>
//       <div className="space-y-4">
//         {[1, 2].map((item) => (
//           <div key={item} className="flex items-center space-x-4">
//             <div className="h-20 w-20 bg-gray-200 rounded-lg"></div>
//             <div className="flex-1 space-y-2">
//               <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//               <div className="h-3 bg-gray-100 rounded w-1/2"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default function MyOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   const getToken = () => localStorage.getItem("token");

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = getToken();
//       if (!token) {
//         setError("Authentication required. Please login to view your orders.");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(`${domainUrl}/order/myOrders`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setOrders(res.data.order || []);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError("Unable to load orders. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Empty state component
//   const EmptyState = () => (
//     <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
//       <div className="text-center max-w-md">
//         <div className="mx-auto size-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//           <ShoppingBagIcon className="size-12 text-gray-400" />
//         </div>
//         <h3 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
//         <p className="text-gray-600 mb-6">
//           Your order history will appear here once you start shopping.
//         </p>
//         <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
//           Start Shopping
//           <ChevronRightIcon className="size-4" />
//         </button>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 lg:p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <div className="h-10 bg-gray-200 rounded w-64 mb-2"></div>
//             <div className="h-4 bg-gray-100 rounded w-96"></div>
//           </div>
//           <div className="space-y-6">
//             <OrderSkeleton />
//             <OrderSkeleton />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
//         <div className="max-w-md text-center">
//           <div className="mx-auto size-20 bg-rose-100 rounded-full flex items-center justify-center mb-6">
//             <ExclamationTriangleIcon className="size-10 text-rose-600" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h3>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
//         <EmptyState />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 lg:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-10 lg:mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//                 Order History
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 Track and manage your purchases
//               </p>
//             </div>
//             <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
//               <ArchiveBoxIcon className="size-5" />
//               <span>{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
//             </div>
//           </div>
          
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Total Orders</p>
//                   <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
//                 </div>
//                 <div className="p-2 bg-indigo-50 rounded-lg">
//                   <ShoppingBagIcon className="size-6 text-indigo-600" />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Active</p>
//                   <p className="text-2xl font-bold text-emerald-600">
//                     {orders.filter(o => !['Delivered', 'Cancelled'].includes(o.orderStatus)).length}
//                   </p>
//                 </div>
//                 <div className="p-2 bg-emerald-50 rounded-lg">
//                   <TruckIcon className="size-6 text-emerald-600" />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Total Spent</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     ₹{orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0).toLocaleString('en-IN')}
//                   </p>
//                 </div>
//                 <div className="p-2 bg-amber-50 rounded-lg">
//                   <CurrencyRupeeIcon className="size-6 text-amber-600" />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Last Order</p>
//                   <p className="text-lg font-bold text-gray-900">
//                     {orders.length > 0 ? formatDate(orders[0].createdAt).split(',')[0] : 'N/A'}
//                   </p>
//                 </div>
//                 <div className="p-2 bg-blue-50 rounded-lg">
//                   <CalendarIcon className="size-6 text-blue-600" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Orders List */}
//         <div className="space-y-6">
//           <AnimatePresence>
//             {orders.map((order) => (
//               <motion.div
//                 key={order._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
//               >
//                 {/* Order Header */}
//                 <div 
//                   className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
//                   onClick={() => toggleOrderDetails(order._id)}
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-4 mb-3">
//                         <div className="flex items-center gap-2">
//                           <TagIcon className="size-5 text-gray-400" />
//                           <span className="font-mono text-sm text-gray-600">#{order._id.slice(-8)}</span>
//                         </div>
//                         <StatusBadge status={order.orderStatus} />
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <CalendarIcon className="size-4" />
//                           <span>{formatDate(order.createdAt)}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <CreditCardIcon className="size-4" />
//                           <span className="font-medium">₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <ShoppingBagIcon className="size-4" />
//                           <span>{order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <button className="text-indigo-600 hover:text-indigo-800 font-medium">
//                         {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
//                       </button>
//                       <ChevronRightIcon 
//                         className={`size-5 text-gray-400 transition-transform ${expandedOrder === order._id ? 'rotate-90' : ''}`}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Expandable Details */}
//                 <AnimatePresence>
//                   {expandedOrder === order._id && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="border-t border-gray-100"
//                     >
//                       <div className="p-6">
//                         <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                           <ArchiveBoxIcon className="size-5" />
//                           Order Items
//                         </h4>
                        
//                         <div className="space-y-4">
//                           {order.items?.map((item, index) => {
//                             const isProductUnavailable = item.product === null;
                            
//                             return (
//                               <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
//                                 <div className="flex-shrink-0">
//                                   <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-gray-200">
//                                     {isProductUnavailable ? (
//                                       <div className="flex h-full w-full items-center justify-center bg-rose-50">
//                                         <XCircleIcon className="size-8 text-rose-400" />
//                                       </div>
//                                     ) : (
//                                       <img
//                                         src={item.product.image || 'https://placehold.co/80x80/e5e7eb/6b7280?text=Product'}
//                                         alt={item.product.name}
//                                         className="h-full w-full object-cover"
//                                       />
//                                     )}
//                                   </div>
//                                 </div>
                                
//                                 <div className="ml-4 flex-1">
//                                   <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//                                     <div>
//                                       <h5 className="font-medium text-gray-900">
//                                         {isProductUnavailable ? (
//                                           <span className="text-rose-600">Product Unavailable</span>
//                                         ) : (
//                                           item.product.name
//                                         )}
//                                       </h5>
//                                       {!isProductUnavailable && (
//                                         <p className="text-sm text-gray-500 mt-1">
//                                           Unit Price: ₹{item.price?.toFixed(2) || '0.00'}
//                                         </p>
//                                       )}
//                                     </div>
                                    
//                                     <div className="flex items-center gap-4 mt-2 sm:mt-0">
//                                       <div className="text-right">
//                                         <p className="text-lg font-bold text-gray-900">
//                                           ₹{(item.price * item.quantity).toFixed(2)}
//                                         </p>
//                                         <p className="text-sm text-gray-500">
//                                           {item.quantity} × ₹{item.price?.toFixed(2) || '0.00'}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   </div>
                                  
//                                   {order.orderStatus === 'Cancelled' && isProductUnavailable && (
//                                     <div className="mt-3 flex items-center gap-2 text-sm text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg">
//                                       <ExclamationTriangleIcon className="size-4" />
//                                       <span>Product was removed from catalog</span>
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
                        
//                         {/* Order Summary */}
//                         <div className="mt-6 pt-6 border-t border-gray-200">
//                           <div className="flex justify-end">
//                             <div className="w-full sm:w-64 space-y-2">
//                               <div className="flex justify-between text-gray-600">
//                                 <span>Subtotal</span>
//                                 <span>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
//                               </div>
//                               <div className="flex justify-between text-gray-600">
//                                 <span>Shipping</span>
//                                 <span className="text-emerald-600">Free</span>
//                               </div>
//                               <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
//                                 <span>Total</span>
//                                 <span>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-12 text-center">
//           <p className="text-gray-500 text-sm">
//             Need help with an order? <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Contact Support</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect, useCallback } from "react";
// import api from "../utils/api"; // ✅ UPDATED (use shared axios instance)
// import { ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

// // Helper function to get the status icon
// const getStatusIcon = (status) => {
//   switch (status) {
//     case "Processing":
//       return <ClockIcon className="size-5 text-yellow-500" />;
//     case "Shipped":
//       return <ClockIcon className="size-5 text-blue-500" />;
//     case "Delivered":
//       return <CheckCircleIcon className="size-5 text-green-500" />;
//     case "Cancelled":
//       return <XCircleIcon className="size-5 text-red-500" />;
//     default:
//       return <ClockIcon className="size-5 text-gray-500" />;
//   }
// };

// export default function MyOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // ✅ UPDATED: No token, cookies sent automatically
//       const res = await api.get("/order/myOrders");

//       setOrders(res.data.order || []);
//     } catch (err) {
//       console.error("Error fetching orders:", err);

//       // ✅ Better auth error handling
//       if (err.response?.status === 401) {
//         setError("Please login to view your orders");
//       } else {
//         setError("Oops! Something went wrong while fetching orders.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   if (loading)
//     return (
//       <div className="text-center py-20 text-xl font-medium text-indigo-600">
//         Loading order history...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-xl font-semibold text-red-500">
//         {error}
//       </div>
//     );

//   if (orders.length === 0)
//     return (
//       <div className="text-center py-20 text-lg text-gray-500">
//         No orders placed yet. Start shopping!
//       </div>
//     );

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
//         {/* Header */}
//         <div className="max-w-xl">
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 border-b pb-2">
//             Your Order History
//           </h1>
//           <p className="mt-2 text-md text-gray-600">
//             Check the status of your recent purchases.
//           </p>
//         </div>

//         <div className="mt-12 space-y-16">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="shadow-lg rounded-xl overflow-hidden border border-gray-100"
//             >
//               {/* Order Summary */}
//               <div className="bg-indigo-50 px-4 py-6 sm:flex sm:justify-between sm:px-6">
//                 <dl className="flex-auto sm:grid sm:grid-cols-3 gap-x-6 text-sm text-gray-700">
//                   <div>
//                     <dt className="font-semibold text-indigo-900">
//                       Date Placed
//                     </dt>
//                     <dd>{new Date(order.createdAt).toLocaleDateString()}</dd>
//                   </div>

//                   <div>
//                     <dt className="font-semibold text-indigo-900">Order ID</dt>
//                     <dd className="font-mono text-xs bg-indigo-200 px-2 py-0.5 rounded-full inline-block">
//                       #{order._id}
//                     </dd>
//                   </div>

//                   <div>
//                     <dt className="font-semibold text-indigo-900">
//                       Total Amount
//                     </dt>
//                     <dd className="font-extrabold text-indigo-900">
//                       ₹{order.totalAmount?.toFixed(2)}
//                     </dd>
//                   </div>
//                 </dl>

//                 <div className="flex items-center mt-4 sm:mt-0">
//                   {getStatusIcon(order.orderStatus)}
//                   <span className="ml-2 font-bold text-indigo-600">
//                     {order.orderStatus}
//                   </span>
//                 </div>
//               </div>

//               {/* Items */}
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold mb-4">Order Items</h3>
//                 <ul className="divide-y">
//                   {order.items.map((item, index) => {
//                     const isUnavailable = item.product === null;

//                     return (
//                       <li key={index} className="flex py-6">
//                         <div className="h-20 w-20 rounded-md border flex items-center justify-center">
//                           {isUnavailable ? (
//                             <XCircleIcon className="size-6 text-red-500" />
//                           ) : (
//                             <img
//                               src={item.product.image}
//                               alt={item.product.name}
//                               className="h-full w-full object-cover"
//                             />
//                           )}
//                         </div>

//                         <div className="ml-4 flex-1">
//                           <div className="flex justify-between">
//                             <h3 className="font-medium">
//                               {isUnavailable
//                                 ? "Product Unavailable"
//                                 : item.product.name}
//                             </h3>
//                             <p>
//                               ₹{(item.price * item.quantity).toFixed(2)}
//                             </p>
//                           </div>
//                           <p className="text-sm text-gray-500">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useCallback } from "react";
import api from "../utils/api";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

// Helper function to get the status icon
const getStatusIcon = (status) => {
  switch (status) {
    case "Processing":
      return <ClockIcon className="size-5 text-yellow-500" />;
    case "Shipped":
      return <ClockIcon className="size-5 text-blue-500" />;
    case "Delivered":
      return <CheckCircleIcon className="size-5 text-green-500" />;
    case "Cancelled":
      return <XCircleIcon className="size-5 text-red-500" />;
    default:
      return <ClockIcon className="size-5 text-gray-500" />;
  }
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/order/myOrders");
      setOrders(res.data.order || []);
    } catch (err) {
      console.error("Error fetching orders:", err);

      if (err.response?.status === 401) {
        setError("Please login to view your orders");
      } else {
        setError("Oops! Something went wrong while fetching orders.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-medium text-indigo-600">
        Loading order history...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-xl font-semibold text-red-500">
        {error}
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        No orders placed yet. Start shopping!
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
   

      {/* 🔥 FULL WIDTH CONTAINER (side space fixed) */}
      <div className="w-full px-4 sm:px-6 lg:px-20 py-12">
        {/* Header */}
        <div className="w-full mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900  ">
            Your Order History
          </h1>
          <p className="mt-2 text-md text-gray-600 border-b border-gray-300 pb-2">
            Check the status of your recent purchases.
          </p>
        </div>

        <div className="space-y-14">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl overflow-hidden shadow-md border border-gray-100"
            >
              {/* Order Summary */}
              <div className="bg-indigo-50 px-4 py-6 sm:flex sm:justify-between sm:px-6">
                <dl className="flex-auto sm:grid sm:grid-cols-3 gap-x-6 text-sm text-gray-700">
                  <div>
                    <dt className="font-semibold text-indigo-900">
                      Date Placed
                    </dt>
                    <dd>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-indigo-900">Order ID</dt>
                    <dd className="font-mono text-xs bg-indigo-200 px-2 py-0.5 rounded-full inline-block">
                      #{order._id}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-indigo-900">
                      Total Amount
                    </dt>
                    <dd className="font-extrabold text-indigo-900">
                      ₹{order.totalAmount?.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="flex items-center mt-4 sm:mt-0">
                  {getStatusIcon(order.orderStatus)}
                  <span className="ml-2 font-bold text-indigo-600">
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>

                {/* ❌ divider removed */}
                <ul>
                  {order.items.map((item, index) => {
                    const isUnavailable = item.product === null;

                    return (
                      <li key={index} className="flex py-5">
                        {/* ❌ image border removed */}
                        <div className="h-20 w-20 rounded-md flex items-center justify-center bg-gray-50">
                          {isUnavailable ? (
                            <XCircleIcon className="size-6 text-red-500" />
                          ) : (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover rounded-md"
                            />
                          )}
                        </div>

                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-900">
                              {isUnavailable
                                ? "Product Unavailable"
                                : item.product.name}
                            </h3>
                            <p className="font-medium">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          <p className="text-sm text-gray-500 mt-1">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

