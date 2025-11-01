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






import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {domainUrl} from '../utils/constant'
// FIX: The original path to '../utils/constant' could not be resolved.
// We are defining a placeholder domainUrl here to ensure the code compiles and runs.
 
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

// Helper function to get the status icon (already handles 'Cancelled')
const getStatusIcon = (status) => {
  switch (status) {
    case 'Processing':
      return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
    case 'Shipped':
      return <ClockIcon className="size-5 text-blue-500" aria-hidden="true" />;
    case 'Delivered':
      return <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />;
    case 'Cancelled':
      return <XCircleIcon className="size-5 text-red-500" aria-hidden="true" />;
    default:
      return <ClockIcon className="size-5 text-gray-500" aria-hidden="true" />;
  }
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to retrieve the authentication token
  const getToken = () => localStorage.getItem("token");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${domainUrl}/order/myOrders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // The backend returns { order: orders_array }
      setOrders(res.data.order || []); 
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Oops! Something went wrong while fetching orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <div className="text-center py-20 text-xl font-medium text-indigo-600">Loading order history...</div>;
  if (error) return <div className="text-center py-20 text-xl font-semibold text-red-600 border border-red-300 p-4 rounded-lg bg-red-50">{error}</div>;
  if (orders.length === 0) return <div className="text-center py-20 text-lg text-gray-500">No orders placed yet. Start shopping!</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">

        {/* Page Header */}
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 border-b pb-2">Your Order History</h1>
          <p className="mt-2 text-md text-gray-600">
            Check the status of your recent purchases.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {orders.map((order) => (
            <div key={order._id} className="shadow-lg rounded-xl overflow-hidden border border-gray-100">

              {/* Order Summary Block */}
              <div className="bg-indigo-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                
                <dl className="flex-auto divide-y divide-indigo-200 text-sm text-gray-700 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                  <div>
                    <dt className="font-semibold text-indigo-900">Date Placed</dt>
                    <dd className="sm:mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-indigo-900">Order ID</dt>
                    <dd className="sm:mt-1 font-mono text-xs text-indigo-800 bg-indigo-200 inline-block px-2 py-0.5 rounded-full">#{order._id}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-indigo-900">Total Amount</dt>
                    <dd className="font-extrabold text-indigo-900 sm:mt-1">₹{order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</dd>
                  </div>
                </dl>

                {/* Status Label */}
                <div className="mt-4 sm:mt-0 sm:text-right flex items-center justify-end">
                  {getStatusIcon(order.orderStatus)}
                  <span className={`ml-2 font-bold ${order.orderStatus === 'Cancelled' ? 'text-red-600' : order.orderStatus === 'Delivered' ? 'text-green-600' : 'text-indigo-600'}`}>{order.orderStatus}</span>
                </div>
              </div>

              {/* Product List */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h3>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items?.map((item, index) => {
                      // **CRITICAL LOGIC:** Check if product population failed (meaning the product was deleted).
                      // If the product was deleted, Mongoose populate returns 'null'.
                      const isProductUnavailable = item.product === null;

                      return (
                        <li key={index} className="flex py-6">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            {isProductUnavailable ? (
                                <div className="flex h-full w-full items-center justify-center bg-red-100 text-red-500 text-xs text-center font-bold p-1">
                                    <XCircleIcon className="size-5 mr-1" /> UNAVAILABLE
                                </div>
                            ) : (
                              <img
                                src={item.product.image || 'https://placehold.co/80x80/cccccc/333333?text=N/A'}
                                alt={item.product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            )}
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  {isProductUnavailable ? (
                                    <span className="text-red-600 font-bold">Product Unavailable</span>
                                  ) : (
                                    <span className="text-gray-900">{item.product.name}</span>
                                  )}
                                </h3>
                                {/* The 'item.price' is the price captured at the time of order, not the current product price */}
                                <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {!isProductUnavailable && `Unit Price: ₹${item.price.toFixed(2)}`}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty: {item.quantity}</p>
                              
                              {/* Display specific cancellation reason if applicable */}
                              {order.orderStatus === 'Cancelled' && isProductUnavailable && (
                                <div className="text-sm font-semibold text-red-500 flex items-center">
                                    <XCircleIcon className="size-4 mr-1" />
                                    <span className="bg-red-100 px-2 py-0.5 rounded-full">Reason: Product Deleted</span>
                                </div>
                              )}

                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
