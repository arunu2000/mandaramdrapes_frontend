import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { domainUrl } from '../utils/constant';
import { ClockIcon, CheckCircleIcon, XCircleIcon, TruckIcon } from '@heroicons/react/20/solid';

// Define the Admin-specific API endpoint
// NOTE: You must confirm this endpoint with your backend developer.
const ADMIN_ALL_ORDERS_ENDPOINT = `${domainUrl}/order/allOrders`;
const ADMIN_UPDATE_STATUS_ENDPOINT = `${domainUrl}/order/updateStatus`;

const getStatusIcon = (status) => {
  switch (status) {
    case 'Processing': // Customer's initial status
    case 'Order Confirmed': // Admin's first step
      return <ClockIcon className="size-5 text-yellow-500" aria-hidden="true" />;
    case 'Shipped':
      return <TruckIcon className="size-5 text-indigo-500" aria-hidden="true" />;
    case 'Delivered':
      return <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />;
    case 'Cancelled':
      return <XCircleIcon className="size-5 text-red-500" aria-hidden="true" />;
    default:
      return <ClockIcon className="size-5 text-gray-500" aria-hidden="true" />;
  }
};

const statusOptions = ['Order Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem("token");

  // --- 1. Fetch ALL Orders (Admin Endpoint) ---
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      // Assume the backend validates the token and role (must be 'admin')
      if (!token) {
        setError("Admin login required.");
        setLoading(false);
        return;
      }

      const res = await axios.get(ADMIN_ALL_ORDERS_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Assuming the API returns an array of all orders
      setOrders(res.data.orders || []); 
    } catch (err) {
      console.error(err);
      setError("Failed to fetch all customer orders. Check API endpoint and permissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  // --- 2. Order Status Update Logic ---
  const handleUpdateStatus = async (orderId, newStatus) => {
    // Optimistic UI update (optional, but good for user experience)
    const originalOrders = [...orders];
    setOrders(prevOrders => 
      prevOrders.map(order =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    try {
      const token = getToken();
      await axios.put(`${ADMIN_UPDATE_STATUS_ENDPOINT}/${orderId}`, 
        { orderStatus: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Status updated successfully. No further action needed.
      
    } catch (err) {
      console.error("Failed to update order status:", err);
      setError(`Failed to update status for order #${orderId.slice(-8)}. Rolled back.`);
      setOrders(originalOrders); // Rollback state on error
    }
  };

  if (loading) return <div className="text-center py-20 text-lg">Loading all customer orders...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (orders.length === 0) return <div className="text-center py-20 text-gray-500">No customer orders found.</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">

        {/* Admin Page Header */}
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Customer Order Management</h1>
          <p className="mt-2 text-sm text-gray-500">
            View, track, and update the status of all customer orders.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg shadow-sm">

              {/* Order Summary Block (with Customer Name) */}
              <div className="rounded-t-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                <dl className="flex-auto divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:divide-y-0 lg:w-4/5 lg:flex-none lg:gap-x-8">
                  {/* Customer Name ADDED */}
                  <div className='col-span-2'> 
                    <dt className="font-medium text-gray-900">Customer Name</dt>
                    <dd className="sm:mt-1 font-semibold text-gray-800">
                       {/* Assumes your order object has a 'customer' field with a 'name' property */}
                      {order.customer?.name || 'N/A'} 
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Date placed</dt>
                    <dd className="sm:mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Total</dt>
                    <dd className="font-medium text-gray-900 sm:mt-1">₹{order.totalAmount.toFixed(2)}</dd>
                  </div>
                </dl>

                {/* Status Update Dropdown (Admin Action) */}
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                    {/* Current Status Display */}
                    <div className="flex items-center">
                        {getStatusIcon(order.orderStatus)}
                        <span className="ml-2 font-medium text-gray-900">{order.orderStatus}</span>
                    </div>

                    {/* Status Select Dropdown */}
                    <select
                        value={order.orderStatus}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        className="p-2 border border-gray-300 rounded-md bg-white text-sm font-medium focus:ring-[#5e785a] focus:border-[#5e785a]"
                        aria-label={`Update status for order ${order._id.slice(-8)}`}
                    >
                        <option disabled>Change Status</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
              </div>

              {/* Product Table (Item Details) */}
              <table className="w-full text-gray-500 text-sm">
                <caption className="sr-only">Products in order #{order._id.slice(-8)}</caption>
                <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pl-4 pr-8 font-normal sm:w-2/5 lg:w-1/3 sm:pl-6 lg:pl-8">Product</th>
                    <th className="hidden py-3 pr-8 font-normal sm:table-cell">Price</th>
                    <th className="hidden py-3 pr-8 font-normal sm:table-cell">Quantity</th>
                    <th className="hidden py-3 pr-8 font-normal sm:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm">
                  {order.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="py-6 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div className="flex items-center">
                          <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="mr-6 w-16 h-16 rounded-sm object-cover bg-gray-200"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.product?.name}
                            </div>
                            <div className="mt-1 sm:hidden">₹{item.product?.price}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">₹{item.product?.price}</td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{item.quantity}</td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{order.orderStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}