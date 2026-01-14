///workinggg

// import React, { useState, useEffect, useCallback } from "react";
// import api from "../utils/api";
// import {
//   ClockIcon,
//   CheckCircleIcon,
//   XCircleIcon,
// } from "@heroicons/react/20/solid";

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
//       const res = await api.get("/order/myOrders");
      
//       setOrders(res.data.order || []);
//     } catch (err) {
//       console.error("Error fetching orders:", err);

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
   

//       {/* 🔥 FULL WIDTH CONTAINER (side space fixed) */}
//       <div className="w-full px-4 sm:px-6 lg:px-20 py-12">
//         {/* Header */}
//         <div className="w-full mb-10">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900  ">
//             Your Order History
//           </h1>
//           <p className="mt-2 text-md text-gray-600 border-b border-gray-300 pb-2">
//             Check the status of your recent purchases.
//           </p>
//         </div>

//         <div className="space-y-14">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="rounded-xl overflow-hidden shadow-md border border-gray-100"
//             >
//               {/* Order Summary */}
//               <div className="bg-indigo-50 px-4 py-6 sm:flex sm:justify-between sm:px-6">
//                 <dl className="flex-auto sm:grid sm:grid-cols-3 gap-x-6 text-sm text-gray-700">
//                   <div>
//                     <dt className="font-semibold text-indigo-900">
//                       Date Placed
//                     </dt>
//                     <dd>
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </dd>
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

//               {/* Order Items */}
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold mb-4">Order Items</h3>

//                 {/* ❌ divider removed */}
//                 <ul>
//                   {order.items.map((item, index) => {
//                     const isUnavailable = item.product === null;

//                     return (
//                       <li key={index} className="flex py-5">
//                         {/* ❌ image border removed */}
//                         <div className="h-20 w-20 rounded-md flex items-center justify-center bg-gray-50">
//                           {isUnavailable ? (
//                             <XCircleIcon className="size-6 text-red-500" />
//                           ) : (
//                             <img
//                               src={item.product.image}
//                               alt={item.product.name}
//                               className="h-full w-full object-cover rounded-md"
//                             />
//                           )}
//                         </div>

//                         <div className="ml-4 flex-1">
//                           <div className="flex justify-between">
//                             <h3 className="font-medium text-gray-900">
//                               {isUnavailable
//                                 ? "Product Unavailable"
//                                 : item.product.name}
//                             </h3>
//                             <p className="font-medium">
//                               ₹{(item.price * item.quantity).toFixed(2)}
//                             </p>
//                           </div>

//                           <p className="text-sm text-gray-500 mt-1">
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
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  ArrowLeft, 
  ShoppingBag, 
  Package,
  Calendar,
  CreditCard
} from "lucide-react";
import { BeatLoader } from "react-spinners";

// --- HELPER: Status Badge (Themed) ---
const getStatusBadge = (status) => {
  const styles = {
    Processing: "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-600/10",
    Shipped: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/10",
    Delivered: "bg-green-50 text-green-700 border-green-200 ring-green-600/20",
    Cancelled: "bg-red-50 text-red-700 border-red-200 ring-red-600/10",
    default: "bg-gray-50 text-gray-600 border-gray-200 ring-gray-500/10"
  };

  const icons = {
    Processing: <Clock className="w-3.5 h-3.5 "/>,
    Shipped: <Truck className="w-3.5 h-3.5" />,
    Delivered: <CheckCircle className="w-3.5 h-3.5" />,
    Cancelled: <XCircle className="w-3.5 h-3.5" />,
    default: <Package className="w-3.5 h-3.5" />
  };

  const styleClass = styles[status] || styles.default;
  const Icon = icons[status] || icons.default;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ring-1 ring-inset ${styleClass}`}>
      {Icon} {status}
    </span>
  );
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setError("Unable to load your order history.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // --- RENDER STATES ---
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <BeatLoader color="#000" size={15} />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">Loading Orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
            <XCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Access Error</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-black text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-900 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 pt-28 font-sans">
      
      {/* Decorative Background Blob */}
      <div className="fixed top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>

      {/* CHANGED: max-w-5xl to max-w-7xl for wider layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-600 hover:bg-black hover:text-white transition-all duration-300 mb-8 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shopping
          </button>

          <div className="text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 sm:text-5xl mb-3"
            >
              Order History
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 font-medium"
            >
              Tracking your {orders.length} past purchases
            </motion.p>
          </div>
        </div>

        {/* --- Empty State --- */}
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-gray-50 rounded-[2.5rem] border border-gray-100"
          >
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide">No orders yet</h3>
            <p className="mt-2 text-gray-500 font-light max-w-xs mx-auto">
              You haven't placed any orders yet. Discover our collection to get started.
            </p>
            <button
                onClick={() => navigate('/products')}
                className="mt-8 px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
                Start Shopping
            </button>
          </motion.div>
        ) : (
          /* --- Orders List --- */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {orders.map((order) => (
              <motion.div
                key={order._id}
                variants={itemVariants}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-500"
              >
                {/* Card Header (Summary) */}
                <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full text-gray-400 shadow-sm">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Placed On</p>
                            <p className="text-sm font-bold text-gray-900">
                                {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full text-gray-400 shadow-sm">
                            <Package className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Order ID</p>
                            <p className="text-sm font-mono text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-100">
                                #{order._id.slice(-8).toUpperCase()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full text-gray-400 shadow-sm">
                            <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Total</p>
                            <p className="text-sm font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
                        </div>
                    </div>

                  </div>
                  
                  <div className="flex items-center self-start md:self-center">
                    {getStatusBadge(order.orderStatus)}
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-2 divide-y divide-gray-50">
                  {order.items.map((item, index) => {
                    const isUnavailable = item.product === null;
                    const productName = isUnavailable ? "Product Unavailable" : item.product.name;
                    const productImage = isUnavailable ? null : item.product.image;

                    return (
                      <div key={index} className="flex flex-col sm:flex-row items-center py-6 gap-6">
                        
                        {/* Image - Rounded & Aspect Ratio Match */}
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm group-hover:shadow-md transition-shadow">
                          {isUnavailable ? (
                            <div className="h-full w-full flex items-center justify-center">
                                <XCircle className="h-8 w-8 text-gray-300" />
                            </div>
                          ) : (
                            <img
                              src={productImage}
                              alt={productName}
                              className="h-full w-full object-cover object-center"
                            />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between w-full text-center sm:text-left">
                          <div>
                            <h4 className={`text-lg font-bold tracking-tight ${isUnavailable ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                              {productName}
                            </h4>
                            <p className="mt-1 text-xs text-gray-500 font-medium uppercase tracking-wide">
                              Qty: <span className="text-gray-900 font-bold">{item.quantity}</span>
                            </p>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 sm:text-right flex flex-col items-center sm:items-end gap-2">
                            <p className="text-base font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                            
                            {/* 'View' Action */}
                            {!isUnavailable && (
                                <button 
                                    onClick={() => navigate(`/products/${item.product._id}`)}
                                    className="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 border-b border-transparent hover:border-indigo-800 transition-all"
                                >
                                    View Product
                                </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
