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

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { domainUrl } from '../utils/constant'; 
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

const getStatusIcon = (status) => {
    switch (status) {
        case 'Processing':
            return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
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
            // ⚠️ API route must match your backend setup: /api/order/list
            const res = await axios.get(`${domainUrl}/api/order/list`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Note: Your backend getOrders uses findById, which finds by ID, not user ID.
            // If backend is fixed to use find({user: userid}), this will work:
            setOrders(res.data.order || []); 
            
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders. Please check your network.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (loading) return <div className="text-center py-20 text-lg">Loading Orders...</div>;
    if (error) return <div className="text-center py-20 text-red-600">⚠️ {error}</div>;
    if (orders.length === 0) return <div className="text-center py-20 text-gray-500">You haven't placed any orders yet.</div>;
    
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Orders</h1>
                
                {orders.map((order) => (
                    <div key={order._id} className="mt-8 border-b border-gray-200 pb-8">
                        <div className="sm:flex sm:justify-between sm:items-baseline">
                            <h2 className="text-lg font-medium text-gray-900">Order ID: {order._id.slice(-8)}</h2>
                            <p className="mt-2 text-sm text-gray-500 sm:mt-0">
                                Order Placed: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">Total Amount</dt>
                                <dd className="mt-1 text-sm text-gray-500 font-semibold">${order.totalAmount.toFixed(2)}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">Order Status</dt>
                                <dd className="mt-1 flex items-center text-sm text-gray-500">
                                    {getStatusIcon(order.orderStatus)}
                                    <span className="ml-2">{order.orderStatus}</span>
                                </dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">Payment Status</dt>
                                <dd className="mt-1 text-sm text-gray-500">{order.paymentStatus}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">Items</dt>
                                <dd className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                    View Details ({order.items.length})
                                </dd>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}