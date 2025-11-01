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






import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Placeholder domain URL to prevent compilation errors.
// Replace this with your actual import: import { domainUrl } from '../utils/constant';
import { domainUrl } from '../utils/constant';
import { ClockIcon, CheckCircleIcon, XCircleIcon, UserIcon, TruckIcon } from '@heroicons/react/20/solid';

// --- API Endpoints ---
// These must match your backend 'routes/orderRoutes.js' configuration.
// We assume your orderRoutes.js maps:
// GET /all -> getOrdersForAdmin
// PUT /update/:id -> updateOrderStatus
const ADMIN_ALL_ORDERS_ENDPOINT = `${domainUrl}/order/all`;
const ADMIN_UPDATE_STATUS_ENDPOINT = `${domainUrl}/order/update`; 

// Helper function to get the status icon
const getStatusIcon = (status) => {
  switch (status) {
    case 'Processing':
      return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
    case 'Shipped':
      return <TruckIcon className="size-5 text-blue-500" aria-hidden="true" />;
    case 'Delivered':
      return <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />;
    case 'Cancelled':
      return <XCircleIcon className="size-5 text-red-500" aria-hidden="true" />;
    default:
      return <ClockIcon className="size-5 text-gray-500" aria-hidden="true" />;
  }
};

// Statuses admin can change to
const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get token (replace with your auth context if available)
  const getToken = () => localStorage.getItem("token"); 

  // --- 1. Fetch ALL Orders (Admin Endpoint) ---
  const fetchAllOrders = useCallback(async () => {
    
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching all orders for admin...");
      const token = getToken();
      if (!token) {
        setError("Admin token required. Please log in.");
        setLoading(false);
        return;
      }

      // Call the backend endpoint for fetching all orders
      const res = await axios.get(ADMIN_ALL_ORDERS_ENDPOINT, { 
        headers: { Authorization: `Bearer ${token}` }
      });

      // **FIX:** Access 'res.data.orders' (plural) to match your controller
      setOrders(res.data.order || []); 
    
    } catch (err) {
      console.error("Error fetching all orders:", err);
      const status = err.response?.status;
      if (status === 403) {
        setError("Failed to fetch orders: You do not have Admin permissions.");
      } else {
        setError("Failed to fetch orders. Check backend connection and API endpoint.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // --- 2. Order Status Update Logic ---
  const handleUpdateStatus = async (orderId, newStatus) => {
    // Find the current order to prevent redundant updates
    const currentOrder = orders.find(o => o._id === orderId);
    if (!currentOrder || currentOrder.orderStatus === newStatus) {
      return; // No change, or order not found
    }

    // Optimistic UI update: Show the change immediately
    const originalOrders = [...orders];
    setOrders(prevOrders => 
      prevOrders.map(order =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    try {
      const token = getToken();
      // Call the backend endpoint to update the status
      await axios.put(`${ADMIN_UPDATE_STATUS_ENDPOINT}/${orderId}`, 
        { orderStatus: newStatus }, // The body of the request
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Success! The optimistic update is now confirmed.
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert(`Failed to update status for order #${orderId.slice(-8)}. Reverting change.`);
      // If the API call fails, roll back the UI to its previous state
      setOrders(originalOrders); 
    }
  };

  // --- 3. Render States ---
  if (loading) return <div className="text-center py-20 text-xl font-medium text-indigo-600">Loading all orders for management...</div>;
  if (error) return <div className="text-center py-20 text-xl font-semibold text-red-600 border border-red-300 p-4 rounded-lg bg-red-50">{error}</div>;
  if (orders.length === 0) return <div className="text-center py-20 text-lg text-gray-500">No orders currently placed.</div>;

  // --- 4. Main Component Render ---
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">

        {/* Admin Page Header */}
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 border-b pb-2">Admin Order Management</h1>
          <p className="mt-2 text-md text-gray-600">
            View, track, and manage all placed customer orders.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {orders.map((order) => (
            <div key={order._id} className="shadow-xl rounded-lg overflow-hidden border border-gray-200">

              {/* Order Summary Block (Admin View) */}
              <div className="bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8 border-b border-gray-200">
                
                <dl className="flex-auto divide-y divide-gray-200 text-sm sm:grid sm:grid-cols-4 sm:gap-x-6 sm:divide-y-0 lg:w-3/4 lg:flex-none lg:gap-x-8">
                  <div>
                    <dt className="font-medium text-gray-500">Customer</dt>
                    {/* Check if user object is populated */}
                    <dd className="sm:mt-1 font-medium text-gray-900 flex items-center">
                        <UserIcon className="size-4 mr-1.5 text-gray-400"/> {order.user?.username || 'N/A'}
                    </dd>
                    <dd className="text-xs text-gray-500">{order.user?.email || 'No email'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Date Placed</dt>
                    <dd className="sm:mt-1 text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                   <div>
                    <dt className="font-medium text-gray-500">Order ID</dt>
                    <dd className="sm:mt-1 font-mono text-xs text-gray-700">#{order._id.slice(-8)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Total Amount</dt>
                    <dd className="font-bold text-indigo-600 sm:mt-1 text-base">₹{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</dd>
                  </div>
                </dl>

                {/* Status Label & Action */}
                <div className="mt-4 sm:mt-0 sm:text-right flex-shrink-0">
                  <label htmlFor={`status-select-${order._id}`} className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.orderStatus)}
                    <select
                      id={`status-select-${order._id}`}
                      value={order.orderStatus}
                      // Prevent changing status if order is Cancelled
                      disabled={order.orderStatus === 'Cancelled'}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className={`p-2 border rounded-md bg-white text-sm font-medium focus:ring-indigo-500 focus:border-indigo-500 ${
                        order.orderStatus === 'Cancelled' ? 'border-red-300 bg-red-50 text-red-700 cursor-not-allowed' : 'border-gray-300'
                      }`}
                      aria-label={`Update status for order ${order._id.slice(-8)}`}
                    >
                      {/* Show current status even if it's 'Cancelled' */}
                      {!statusOptions.includes(order.orderStatus) && (
                         <option key={order.orderStatus} value={order.orderStatus}>
                           {order.orderStatus}
                         </option>
                      )}
                      {statusOptions.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
          </div>))}
              {/* Product List */}
              <div className="p-4 sm:p-6 bg-white">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Order Items ({orders.length})</h3>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {orders.items?.map((item, index) => {
                      // **CRITICAL LOGIC**: Check if product population failed (product deleted)
                      const isProductUnavailable = item.product === null;

                      return (
                        <li key={index} className="flex py-6 transition duration-150 hover:bg-gray-50 rounded-lg px-2 -mx-2">
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            {isProductUnavailable ? (
                                <div className="flex h-full w-full items-center justify-center bg-red-50 text-red-600 text-xs text-center font-bold p-1 flex-col">
                                    <XCircleIcon className="size-6 mb-1" /> 
                                    <span>PRODUCT</span>
                                    <span>DELETED</span>
                                </div>
                            ) : (
                              <img
                                // Use backend-provided image URL (must be full URL or served statically)
                                src={item.product.image || 'https://placehold.co/96x96/f3f4f6/6b7280?text=No+Image'}
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
                                    <span className="text-red-700 font-bold">Product Unavailable</span>
                                  ) : (
                                    <span className="text-gray-900">{item.product.name}</span>
                                  )}
                                </h3>
                                <p className="ml-4 font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>

                            <div className="flex flex-1 items-end justify-between text-sm mt-2">
                              <div>
                                <p className="text-gray-500">Unit Price: ₹{item.price.toFixed(2)}</p>
                                <p className="text-gray-500 font-medium">Quantity: {item.quantity}</p>
                              </div>
                              
                              {/* Display specific cancellation reason if applicable */}
                              {orders.orderStatus === 'Cancelled' && isProductUnavailable && (
                                <div className="text-sm font-bold text-red-600 flex items-center border border-red-200 bg-red-50 p-2 rounded-md">
                                    <XCircleIcon className="size-5 mr-1.5" />
                                    <span>Auto-Cancelled: Product/Category Deleted</span>
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
          
        </div>
      </div>  
    
  );
}

