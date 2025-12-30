// import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
// import { ChevronUpIcon } from "@heroicons/react/20/solid";
// import React, { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import api from "../utils/api";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// const CheckoutPage = () => {
//   const { cartItems, cartTotal } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     house: "",
//     city: "",
//     state: "",
//     pincode: "",
//     lat: null,
//     lng: null,
//   });

//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("ONLINE");
//   const [loading, setLoading] = useState(false);
//   const [position, setPosition] = useState(null);

//   // Protect route
//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate("/cart");
//     }
//   }, [cartItems, navigate]);

//   // GEO LOCATION
//   const handleGetLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {

//             setPosition([pos.coords.latitude, pos.coords.longitude]);
//           const res = await api.post("/address/save-geo", {
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//           });

//           const { address: addr, shippingCharge } = res.data;

//           console.log("Geo address:", addr);

//         setAddress({
//   house: addr.fullAddress || "",
//   city:
//     addr.city ||
//     addr.town ||
//     addr.village ||
//     addr.county ||
//     "",
//   state: addr.state || "",
//   pincode:
//     addr.zipCode ||
//     addr.postcode ||
//     "",
//   lat: pos.coords.latitude,
//   lng: pos.coords.longitude,
// });

//           setShippingCharge(shippingCharge);
//           toast.success(`Shipping ₹${shippingCharge}`);
//         } catch {
//           toast.error("Failed to get location");
//         }
//       },
//       () => toast.error("Location permission denied"),

//     );
//   };

//   // PLACE ORDER
//   const handlePlaceOrder = async () => {
//     if (!shippingCharge) {
//       toast.error("Please select delivery location");
//       return;
//     }

//     try {
//       setLoading(true);

//       if (paymentMethod === "COD") {
//         await api.post("/order/place-cod", { shippingCharge });
//         toast.success("Order placed successfully");
//         navigate("/order-success");
//       } else {
//         toast.success("Redirecting to payment gateway");
//         // Razorpay later
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Order failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white">
//       {/* Background split */}
//       <div aria-hidden="true" className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block" />
//       <div aria-hidden="true" className="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block" />

//       <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
//         <h1 className="sr-only">Checkout</h1>

//         {/* ================= RIGHT : ORDER SUMMARY ================= */}
//         <section
//           aria-labelledby="summary-heading"
//           className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
//         >
//           <div className="mx-auto max-w-lg lg:max-w-none">
//             <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
//               Order summary
//             </h2>

//             <ul className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
//               {cartItems.map((item) => (
//                 <li key={item._id} className="flex items-start space-x-4 py-6">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="size-20 rounded-md object-cover"
//                   />
//                   <div className="flex-auto space-y-1">
//                     <h3>{item.name}</h3>
//                     <p className="text-gray-500">Qty: {item.quantity}</p>
//                   </div>
//                   <p className="flex-none text-base font-medium">
//                     ₹{item.price * item.quantity}
//                   </p>
//                 </li>
//               ))}
//             </ul>

//             {/* Totals (Desktop) */}
//             <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
//               <div className="flex justify-between">
//                 <dt className="text-gray-600">Subtotal</dt>
//                 <dd>₹{cartTotal}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-gray-600">Shipping</dt>
//                 <dd>₹{shippingCharge}</dd>
//               </div>
//               <div className="flex justify-between border-t pt-6 text-base">
//                 <dt>Total</dt>
//                 <dd>₹{cartTotal + shippingCharge}</dd>
//               </div>
//             </dl>

//             {/* Mobile summary */}
//             <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
//               <div className="relative z-10 border-t bg-white px-4 sm:px-6">
//                 <PopoverButton className="flex w-full items-center py-6">
//                   <span className="mr-auto text-base">Total</span>
//                   <span className="mr-2 text-base">
//                     ₹{cartTotal + shippingCharge}
//                   </span>
//                   <ChevronUpIcon className="size-5 text-gray-500" />
//                 </PopoverButton>
//               </div>

//               <PopoverBackdrop className="fixed inset-0 bg-black/25" />
//               <PopoverPanel className="bg-white px-4 py-6 sm:px-6">
//                 <dl className="space-y-6">
//                   <div className="flex justify-between">
//                     <dt>Subtotal</dt>
//                     <dd>₹{cartTotal}</dd>
//                   </div>
//                   <div className="flex justify-between">
//                     <dt>Shipping</dt>
//                     <dd>₹{shippingCharge}</dd>
//                   </div>
//                 </dl>
//               </PopoverPanel>
//             </Popover>
//           </div>
//         </section>

//         {/* ================= LEFT : ADDRESS ================= */}
//         <form className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
//           <div className="mx-auto max-w-lg lg:max-w-none">
//             <section aria-labelledby="shipping-heading">
//               <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
//                 Shipping address
//               </h2>

//               <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 gap-x-4">
//                 <div className="sm:col-span-3">
//                   <input
//                     placeholder="House / Street"
//                     value={address.house}
//                     onChange={(e) =>
//                       setAddress({ ...address, house: e.target.value })
//                     }
//                     className="block w-full rounded-md bg-white px-3 py-2 text-base outline-gray-300"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     placeholder="City"
//                     value={address.city}
//                     onChange={(e) =>
//                       setAddress({ ...address, city: e.target.value })
//                     }
//                     className="block w-full rounded-md bg-white px-3 py-2 text-base outline-gray-300"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     placeholder="State"
//                     value={address.state}
//                     onChange={(e) =>
//                       setAddress({ ...address, state: e.target.value })
//                     }
//                     className="block w-full rounded-md bg-white px-3 py-2 text-base outline-gray-300"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     placeholder="Pincode"
//                     value={address.pincode}
//                     onChange={(e) =>
//                       setAddress({ ...address, pincode: e.target.value })
//                     }
//                     className="block w-full rounded-md bg-white px-3 py-2 text-base outline-gray-300"
//                   />
//                 </div>

//                 <div className="sm:col-span-3">
//                   <button
//                     type="button"
//                     onClick={handleGetLocation}
//                     className="w-full rounded-md border px-4 py-2 text-sm"
//                   >
//                     📍 Use Current Location
//                   </button>
//                 </div>
//               </div>

//               {position && (
//   <div className="mt-4 h-64 rounded-md overflow-hidden border">
//     <MapContainer
//       center={position}
//       zoom={16}
//       className="h-full w-full"
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position} />
//     </MapContainer>
//   </div>
// )}

//             </section>

//             {/* PAYMENT */}
//             <div className="mt-10 space-y-3">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={paymentMethod === "ONLINE"}
//                   onChange={() => setPaymentMethod("ONLINE")}
//                 />
//                 Online Payment
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={paymentMethod === "COD"}
//                   onChange={() => setPaymentMethod("COD")}
//                 />
//                 Cash on Delivery
//               </label>
//             </div>

//             <div className="mt-10 border-t pt-6">
//               <button
//                 type="button"
//                 onClick={handlePlaceOrder}
//                 disabled={loading}
//                 className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
//               >
//                 {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

// import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
// import { ChevronUpIcon } from "@heroicons/react/20/solid";
// import React, { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import api from "../utils/api";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// const CheckoutPage = () => {
//   const { cartItems, cartTotal } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     house: "",
//     city: "",
//     state: "",
//     pincode: "",
//     lat: null,
//     lng: null,
//   });

//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("Online");

//   const [loading, setLoading] = useState(false);
//   const [position, setPosition] = useState(null);

//   // Protect route
//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate("/cart");
//     }
//   }, [cartItems, navigate]);

// const startOnlinePayment = async () => {
//   try {
//     const res = await api.post("/order/create");

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: res.data.rzpOrder.amount,
//       currency: "INR",
//       name: "Mandharam Drapes",
//       order_id: res.data.rzpOrder.id,

//       handler: async (response) => {
//         await api.post("/order/verify", response);
//         toast.success("Payment successful");
//         navigate("/order-success");
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err) {
//     toast.error("Payment failed");
//   }
// };

//   // GEO LOCATION
//   const handleGetLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {

//             setPosition([pos.coords.latitude, pos.coords.longitude]);
//           const res = await api.post("/address/save-geo", {
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//           });

//           const { address: addr, shippingCharge } = res.data;

//           console.log("Geo address:", addr);

//         setAddress({
//   house: addr.fullAddress || "",
//   city:
//     addr.city ||
//     addr.town ||
//     addr.village ||
//     addr.county ||
//     "",
//   state: addr.state || "",
//   pincode:
//     addr.zipCode ||
//     addr.postcode ||
//     "",
//   lat: pos.coords.latitude,
//   lng: pos.coords.longitude,
// });

//           setShippingCharge(shippingCharge);
//           toast.success(`Shipping ₹${shippingCharge}`);
//         } catch {
//           toast.error("Failed to get location");
//         }
//       },
//       () => toast.error("Location permission denied"),

//     );
//   };

//   // PLACE ORDER
//  const handlePlaceOrder = async () => {
//   if (!address.lat || !address.lng) {
//     toast.error("Please confirm delivery location");
//     return;
//   }

//   if (paymentMethod === "POD") {
//     // COD flow (already working)
//     await api.post("/order/placeOrderPOD");
//     toast.success("Order placed successfully");
//     navigate("/order-success");
//     return;
//   }

//   // ONLINE PAYMENT
//   startOnlinePayment();
// };

//   return (
//     <div className="bg-white">
//       {/* Background split */}
//       <div aria-hidden="true" className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block" />
//       <div aria-hidden="true" className="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block" />

//       <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
//         <h1 className="sr-only">Checkout</h1>

//         {/* ================= RIGHT : ORDER SUMMARY ================= */}
//         <section
//           aria-labelledby="summary-heading"
//           className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
//         >
//           <div className="mx-auto max-w-lg lg:max-w-none">
//             <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
//               Order summary
//             </h2>

//             <ul className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
//               {cartItems.map((item) => (
//                 <li key={item._id} className="flex items-start space-x-4 py-6">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="size-20 rounded-md object-cover"
//                   />
//                   <div className="flex-auto space-y-1">
//                     <h3>{item.name}</h3>
//                     <p className="text-gray-500">Qty: {item.quantity}</p>
//                   </div>
//                   <p className="flex-none text-base font-medium">
//                     ₹{item.price * item.quantity}
//                   </p>
//                 </li>
//               ))}
//             </ul>

//             {/* Totals (Desktop) */}
//             <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
//               <div className="flex justify-between">
//                 <dt className="text-gray-600">Subtotal</dt>
//                 <dd>₹{cartTotal}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-gray-600">Shipping</dt>
//                 <dd>₹{shippingCharge}</dd>
//               </div>
//               <div className="flex justify-between border-t pt-6 text-base">
//                 <dt>Total</dt>
//                 <dd>₹{cartTotal + shippingCharge}</dd>
//               </div>
//             </dl>

//             {/* Mobile summary */}
//             <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
//               <div className="relative z-10 border-t bg-white px-4 sm:px-6">
//                 <PopoverButton className="flex w-full items-center py-6">
//                   <span className="mr-auto text-base">Total</span>
//                   <span className="mr-2 text-base">
//                     ₹{cartTotal + shippingCharge}
//                   </span>
//                   <ChevronUpIcon className="size-5 text-gray-500" />
//                 </PopoverButton>
//               </div>

//               <PopoverBackdrop className="fixed inset-0 bg-black/25" />
//               <PopoverPanel className="bg-white px-4 py-6 sm:px-6">
//                 <dl className="space-y-6">
//                   <div className="flex justify-between">
//                     <dt>Subtotal</dt>
//                     <dd>₹{cartTotal}</dd>
//                   </div>
//                   <div className="flex justify-between">
//                     <dt>Shipping</dt>
//                     <dd>₹{shippingCharge}</dd>
//                   </div>
//                 </dl>
//               </PopoverPanel>
//             </Popover>
//           </div>
//         </section>

//         {/* ================= LEFT : ADDRESS ================= */}
//         <form className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
//           <div className="mx-auto max-w-lg lg:max-w-none">
//             <section aria-labelledby="shipping-heading">
//               <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
//                 Shipping address
//               </h2>

//               <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 gap-x-4">
//                 <div className="sm:col-span-3">
//                   <input
//                     placeholder="House / Street"
//                     value={address.house}
//                     onChange={(e) =>
//                       setAddress({ ...address, house: e.target.value })
//                     }
//                     className="block w-full rounded-md bg-white px-3 py-2 text-base outline-gray-300"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     placeholder="City"
//                     value={address.city}
//                     onChange={(e) =>
//                       setAddress({ ...address, city: e.target.value })
//                     }
//                     className="block w-full rounded-md bg-white px-3 py-2 text-base outline-gray-300"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     placeholder="State"
//                     value={address.state}
//                     onChange={(e) =>
//                       setAddress({ ...address, state: e.target.value })
//                     }
//                     className="block w-full rounded-md bg-white px-3 py-2 text-base outline-gray-300"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     placeholder="Pincode"
//                     value={address.pincode}
//                     onChange={(e) =>
//                       setAddress({ ...address, pincode: e.target.value })
//                     }
//                     className="block w-full rounded-md bg-white px-3 py-2 text-base outline-gray-300"
//                   />
//                 </div>

//                 <div className="sm:col-span-3">
//                   <button
//                     type="button"
//                     onClick={handleGetLocation}
//                     className="w-full rounded-md border px-4 py-2 text-sm"
//                   >
//                     📍 Use Current Location
//                   </button>
//                 </div>
//               </div>

//               {position && (
//   <div className="mt-4 h-64 rounded-md overflow-hidden border">
//     <MapContainer
//       center={position}
//       zoom={16}
//       className="h-full w-full"
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position} />
//     </MapContainer>
//   </div>
// )}

//             </section>

//             {/* PAYMENT */}
//             <div className="mt-10 space-y-3">
//               <label className="flex items-center gap-2">
//                 <input
//   type="radio"
//   checked={paymentMethod === "Online"}
//   onChange={() => setPaymentMethod("Online")}
// />

//                 Online Payment
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//   type="radio"
//   checked={paymentMethod === "POD"}
//   onChange={() => setPaymentMethod("POD")}
// />
// Cash on Delivery
//               </label>
//             </div>

//             <div className="mt-10 border-t pt-6">
//               <button
//                 type="button"
//                 onClick={handlePlaceOrder}
//                 disabled={loading}
//                 className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
//               >
//                 {paymentMethod === "POD" ? "Place Order" : "Pay Now"}

//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

//working with exact navigationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

// import { Popover, Transition } from "@headlessui/react";
// import { ChevronUpIcon, MapPinIcon, TruckIcon, CreditCardIcon, BanknotesIcon } from "@heroicons/react/24/outline";
// import React, { useEffect, useState, Fragment } from "react";
// import { useCart } from "../context/CartContext"; // Ensure path is correct
// import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// import api from "../utils/api"; // Ensure path is correct
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import toast, { Toaster, } from 'react-hot-toast';

// // Fix Leaflet Icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// const CheckoutPage = () => {
//   const { cartItems, cartTotal } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     house: "",
//     city: "",
//     state: "",
//     pincode: "",
//     lat: null,
//     lng: null,
//   });

//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("Online");
//   const [loading, setLoading] = useState(false); // Used in logic but wasn't fully utilized
//   const [position, setPosition] = useState(null);

//   // Protect route
//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate("/cart");
//     }
//   }, [cartItems, navigate]);

//   const startOnlinePayment = async () => {
//     setLoading(true);
//     try {
//       const res = await api.post("/order/create");
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: res.data.rzpOrder.amount,
//         currency: "INR",
//         name: "Mandharam Drapes",
//         order_id: res.data.rzpOrder.id,
//         handler: async (response) => {
//           await api.post("/order/verify", response);
//           toast.success("Payment successful");
//           navigate("/order-success");
//         },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGetLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }
//     const toastId = toast.loading("Fetching location...");
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);
//           const res = await api.post("/address/save-geo", {
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//           });

//           const { address: addr, shippingCharge } = res.data;
//           setAddress({
//             house: addr.fullAddress || "",
//             city: addr.city || addr.town || addr.village || addr.county || "",
//             state: addr.state || "",
//             pincode: addr.zipCode || addr.postcode || "",
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//           setShippingCharge(shippingCharge);
//           toast.dismiss(toastId);
//           toast.success(`Location set! Shipping: ₹${shippingCharge}`);
//         } catch (error) {
//           toast.dismiss(toastId);
//           toast.error("Failed to get location details");
//         }
//       },
//       () => {
//         toast.dismiss(toastId);
//         toast.error("Location permission denied");
//       }
//     );
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.lat || !address.lng) {
//       toast.error("Please confirm delivery location using the map/button");
//       return;
//     }

//     setLoading(true);
//     try {
//       if (paymentMethod === "POD") {
//         await api.post("/order/placeOrderPOD");
//         toast.success("Order placed successfully");
//         navigate("/order-success");
//       } else {
//         await startOnlinePayment();
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//        // Only stop loading if it was POD, otherwise Razorpay handles it
//        if(paymentMethod === "POD") setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900">
//       <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-24">

//         {/* ================= LEFT SIDE: FORM ================= */}
//         <div className="px-4 pb-24 pt-10 sm:px-6 lg:col-span-7 lg:px-12 lg:pb-12 xl:col-span-7">

//           {/* Breadcrumb / Header */}
//           <div className="mb-8 hidden lg:block">
//              <span className="text-gray-400">Cart</span>
//              <span className="mx-2 text-gray-300">/</span>
//              <span className="font-semibold text-black">Checkout</span>
//           </div>

//           <form>
//             {/* Section: Shipping Address */}
//             <div className="border-b border-gray-200 pb-10">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-medium text-gray-900">Shipping Address</h2>
//                 <button
//                   type="button"
//                   onClick={handleGetLocation}
//                   className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
//                 >
//                   <MapPinIcon className="h-3.5 w-3.5 text-blue-600" />
//                   Auto-Detect Location
//                 </button>
//               </div>

//               <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                 <div className="sm:col-span-2">
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                     House / Apartment / Street
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="address"
//                       value={address.house}
//                       onChange={(e) => setAddress({ ...address, house: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                       placeholder="e.g. Flat 402, Skyline Apartments"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="city"
//                       value={address.city}
//                       onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//                     State
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="state"
//                       value={address.state}
//                       onChange={(e) => setAddress({ ...address, state: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                     Pincode
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="pincode"
//                       value={address.pincode}
//                       onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                       className="block w-1/2 rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Map Visualization */}
//               {position && (
//                 <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
//                   <div className="h-48 w-full">
//                     <MapContainer center={position} zoom={16} className="h-full w-full">
//                       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                       <Marker position={position} />
//                     </MapContainer>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
//                     Location pinned: {position[0].toFixed(4)}, {position[1].toFixed(4)}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section: Payment Method */}
//             <div className="pt-10">
//               <h2 className="text-xl font-medium text-gray-900">Payment Method</h2>

//               <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 {/* Option 1: Online */}
//                 <div
//                   onClick={() => setPaymentMethod("Online")}
//                   className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
//                     paymentMethod === "Online"
//                       ? "border-black bg-gray-900 text-white"
//                       : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Pay Online</span>
//                     <CreditCardIcon className={`h-6 w-6 ${paymentMethod === "Online" ? "text-gray-300" : "text-gray-400"}`} />
//                   </div>
//                   <p className={`mt-2 text-sm ${paymentMethod === "Online" ? "text-gray-400" : "text-gray-500"}`}>
//                     Credit Card, UPI, Netbanking
//                   </p>
//                 </div>

//                 {/* Option 2: COD */}
//                 <div
//                   onClick={() => setPaymentMethod("POD")}
//                   className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
//                     paymentMethod === "POD"
//                       ? "border-black bg-gray-900 text-white"
//                       : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Cash on Delivery</span>
//                     <BanknotesIcon className={`h-6 w-6 ${paymentMethod === "POD" ? "text-gray-300" : "text-gray-400"}`} />
//                   </div>
//                   <p className={`mt-2 text-sm ${paymentMethod === "POD" ? "text-gray-400" : "text-gray-500"}`}>
//                     Pay when you receive
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button (Desktop) */}
//             <div className="mt-10 hidden border-t border-gray-200 pt-6 lg:block">
//               <button
//                 type="button"
//                 onClick={handlePlaceOrder}
//                 disabled={loading}
//                 className="w-full rounded-lg bg-black px-4 py-4 text-base font-semibold text-white shadow-md hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
//               >
//                 {loading ? "Processing..." : paymentMethod === "POD" ? `Place Order — ₹${cartTotal + shippingCharge}` : `Pay Now — ₹${cartTotal + shippingCharge}`}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* ================= RIGHT SIDE: SUMMARY (Desktop) ================= */}
//         <div className="hidden bg-gray-50 lg:col-span-5 lg:block lg:min-h-screen lg:border-l lg:border-gray-200 lg:px-8 lg:pt-10 xl:col-span-5 xl:pt-20">
//           <h2 className="sr-only">Order summary</h2>
//           <div className="sticky top-20">
//             <h2 className="text-lg font-medium text-gray-900 mb-6">Your Cart</h2>
//             <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
//               {cartItems.map((item) => (
//                 <li key={item._id} className="flex py-6">
//                   <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
//                     <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
//                   </div>
//                   <div className="ml-4 flex flex-1 flex-col">
//                     <div>
//                       <div className="flex justify-between text-base font-medium text-gray-900">
//                         <h3>{item.name}</h3>
//                         <p className="ml-4">₹{item.price * item.quantity}</p>
//                       </div>
//                       <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <dl className="space-y-4 pt-6 text-sm font-medium text-gray-900">
//               <div className="flex justify-between">
//                 <dt className="text-gray-500">Subtotal</dt>
//                 <dd>₹{cartTotal}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-gray-500 flex items-center gap-2">
//                     Shipping
//                     <TruckIcon className="h-4 w-4 text-gray-400" />
//                 </dt>
//                 <dd>{shippingCharge === 0 ? <span className="text-green-600">Free</span> : `₹${shippingCharge}`}</dd>
//               </div>
//               <div className="flex justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-base">Total</dt>
//                 <dd className="text-xl font-bold">₹{cartTotal + shippingCharge}</dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>

//       {/* ================= MOBILE BOTTOM SUMMARY & BUTTON ================= */}
//       {/* This replaces the Popover for a cleaner mobile experience */}
//       <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
//         <div className="mb-4 flex items-center justify-between text-base font-medium text-gray-900">
//            <span>Total</span>
//            <span className="text-xl">₹{cartTotal + shippingCharge}</span>
//         </div>
//         <button
//           type="button"
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className="w-full rounded-lg bg-black px-4 py-4 text-base font-bold text-white shadow-sm hover:bg-gray-800"
//         >
//           {loading ? "Processing..." : paymentMethod === "POD" ? "Place Order" : "Pay Now"}
//         </button>

//         {/* Simple details toggle for mobile */}
//         <Popover className="mt-2 flex justify-center">
//             {({ open }) => (
//                 <>
//                   <Popover.Button className="flex items-center gap-1 text-xs text-gray-500 underline">
//                      {open ? "Hide Order Details" : "View Order Details"}
//                      <ChevronUpIcon className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
//                   </Popover.Button>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-200"
//                     enterFrom="opacity-0 translate-y-1"
//                     enterTo="opacity-100 translate-y-0"
//                     leave="transition ease-in duration-150"
//                     leaveFrom="opacity-100 translate-y-0"
//                     leaveTo="opacity-0 translate-y-1"
//                   >
//                     <Popover.Panel className="absolute bottom-full left-0 right-0 mb-0 w-full bg-white border-t border-gray-200 px-4 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
//                         <ul className="divide-y divide-gray-100">
//                         {cartItems.map((item) => (
//                             <li key={item._id} className="flex py-3">
//                                 <img src={item.image} className="h-12 w-12 rounded object-cover" />
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium">{item.name}</p>
//                                     <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                                 </div>
//                                 <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
//                             </li>
//                         ))}
//                         </ul>
//                         <div className="mt-4 flex justify-between text-sm">
//                            <span className="text-gray-500">Subtotal</span>
//                            <span>₹{cartTotal}</span>
//                         </div>
//                         <div className="mt-1 flex justify-between text-sm">
//                            <span className="text-gray-500">Shipping</span>
//                            <span>₹{shippingCharge}</span>
//                         </div>
//                     </Popover.Panel>
//                   </Transition>
//                 </>
//             )}
//         </Popover>
//       </div>
//       <Toaster
//                           position="top-right"
//                           toastOptions={{
//                             duration: 2000,
//                             style: {
//                               borderRadius: "10px",
//                               fontFamily: "Inter, sans-serif",
//                             },
//                           }}
//                         />
//     </div>
//   );
// };

// export default CheckoutPage;

//working with payment but not accurate of location

// import React, { useEffect, useState, useMemo, useRef, Fragment } from "react";
// import { Popover, Transition } from "@headlessui/react";
// import {
//   ChevronUpIcon,
//   MapPinIcon,
//   TruckIcon,
//   CreditCardIcon,
//   BanknotesIcon
// } from "@heroicons/react/24/outline";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster, } from 'react-hot-toast';
// import api from "../utils/api";
// // LEAFLET IMPORTS
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // --- 1. LEAFLET ICON FIX ---
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// // --- 2. DRAGGABLE MARKER COMPONENT ---
// const DraggableMarker = ({ position, setPosition, setAddress }) => {
//   const markerRef = useRef(null);

//   const eventHandlers = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         if (marker != null) {
//           const newPos = marker.getLatLng();
//           setPosition([newPos.lat, newPos.lng]);
//           setAddress((prev) => ({
//             ...prev,
//             lat: newPos.lat,
//             lng: newPos.lng
//           }));
//           toast.success("Location pin updated!");
//         }
//       },
//     }),
//     [setPosition, setAddress]
//   );

//   return (
//     <Marker
//       draggable={true}
//       eventHandlers={eventHandlers}
//       position={position}
//       ref={markerRef}
//     />
//   );
// };

// // --- MAIN COMPONENT ---
// const CheckoutPage = () => {
//   const { cartItems, cartTotal } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     house: "",
//     city: "",
//     state: "",
//     pincode: "",
//     lat: null,
//     lng: null,
//   });

//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("Online");
//   const [loading, setLoading] = useState(false);
//   const [position, setPosition] = useState(null);

//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate("/cart");
//     }
//   }, [cartItems, navigate]);

//   // --- 3. ROBUST SCRIPT LOADER ---
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const startOnlinePayment = async () => {
//     setLoading(true);

//     // KEY CHECK: Looks for your specific ID variable first
//     const razorpayKey =
//       import.meta.env?.VITE_RAZORPAY_KEY_ID ||
//       import.meta.env?.VITE_RAZORPAY_KEY ||
//       process.env?.REACT_APP_RAZORPAY_KEY;

//     if (!razorpayKey) {
//         toast.error("Configuration Error: Razorpay Key is missing.");
//         setLoading(false);
//         return;
//     }

//     try {
//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         toast.error("Failed to load Razorpay SDK. Check your internet.");
//         setLoading(false);
//         return;
//       }

//       // Create Order on Backend
//       const res = await api.post("/order/place");

//       const options = {
//         key: razorpayKey,
//         amount: res.data.rzpOrder.amount,
//         currency: "INR",
//         name: "Mandharam Drapes",
//         order_id: res.data.rzpOrder.id,

//         // --- SUCCESS HANDLER ---
//         handler: async (response) => {
//           try {
//              const verifyRes = await api.post("/order/verify", response);
//              if(verifyRes.status === 200) {
//                 toast.success("Payment Successful!");

//                 // 1. CLEAR FORM FIELDS
//                 setAddress({
//                     house: "",
//                     city: "",
//                     state: "",
//                     pincode: "",
//                     lat: null,
//                     lng: null,
//                 });
//                 setShippingCharge(0);
//                 setPosition(null);

//                 // 2. REDIRECT TO MY ORDERS
//                 navigate("/my-orders");
//              }
//           } catch (err) {
//              console.error(err);
//              toast.error("Payment Verification Failed");
//           }
//         },
//         theme: { color: "#000000" }
//       };

//       if (!window.Razorpay) {
//           toast.error("Razorpay SDK error. Please refresh.");
//           return;
//       }

//      const rzp = new window.Razorpay(options);

// // ✅ PAYMENT FAILED → RESTORE STOCK
// rzp.on("payment.failed", async function (response) {
//   toast.error(response.error.description || "Payment failed");

//   try {
//     await api.post(`/orders/cancel/${res.data.order._id}`);
//     toast.error("Order cancelled. Stock restored.");
//   } catch (err) {
//     console.error("Failed to restore stock", err);
//   }
// });

// // ✅ USER CLOSES RAZORPAY POPUP
// options.modal = {
//   ondismiss: async function () {
//     try {
//       await api.post(`/orders/cancel/${res.data.order._id}`);
//       toast.error("Payment cancelled. Stock restored.");
//     } catch (err) {
//       console.error("Cancel failed", err);
//     }
//   },
// };

// rzp.open();

//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Payment initialization failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- 4. GEOLOCATION LOGIC (With Fallbacks) ---
//   const handleGetLocation = () => {

//     console.log("Fetching location");

//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }

//     const toastId = toast.loading("Locating you...");

//     const getPosition = (options) => {

//       console.log('Inside GetPosition');

//       return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, options);
//       });
//     };

//     const processPosition = async (pos) => {

//       console.log('Inside ProcessPosition');

//       try {
//         const { latitude, longitude } = pos.coords;
//         console.log("uuuuuuuuuuuuuuuuu", typeof latitude);

//         // const latitude =
//         setPosition([latitude, longitude]);

//         const res = await api.post("/address/save-geo", {
//             latitude,
//             longitude,
//         });

//         const { address: addr, shippingCharge } = res.data;

//         setAddress((prev) => ({
//           ...prev,
//           house: addr.fullAddress || prev.house || "",
//           city: addr.city || addr.town || addr.village || "",
//           state: addr.state || "",
//           pincode: addr.zipCode || "",
//           lat: latitude,
//           lng: longitude,
//         }));

//         setShippingCharge(shippingCharge);
//         toast.dismiss(toastId);
//         toast.success("Location found! Drag pin to adjust.");
//       } catch (err) {
//         console.error(err);
//         toast.dismiss(toastId);
//         toast.error("Found location, but failed to get address details.");
//       }
//     };

//     // STRATEGY: High Accuracy -> Low Accuracy -> Default Map
//     (async () => {
//       try {
//         console.log('Inside highaccuracy');

//         const pos = await getPosition({ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
//         await processPosition(pos);
//       } catch (highAccuracyError) {
//         try {
//           const pos = await getPosition({ enableHighAccuracy: false, timeout: 5000, maximumAge: 0 });
//           await processPosition(pos);
//         } catch (lowAccuracyError) {
//             toast.dismiss(toastId);
//             // Default to India Center if all GPS fails
//             const defaultLat = 20.5937;
//             const defaultLng = 78.9629;
//             setPosition([defaultLat, defaultLng]);
//             setAddress(prev => ({ ...prev, lat: defaultLat, lng: defaultLng }));
//             toast.error("GPS failed. Please enter address manually.");
//         }
//       }
//     })();
//   };

//   // --- 5. PLACE ORDER (With Manual Fallback) ---
//   const handlePlaceOrder = async () => {
//     let finalLat = address.lat;
//     let finalLng = address.lng;
//     const isManualAddressFilled = address.house && address.city && address.pincode;

//     // Fallback: If map wasn't used but address is typed, use dummy coords
//     if ((!finalLat || !finalLng) && isManualAddressFilled) {
//        finalLat = 20.5937;
//        finalLng = 78.9629;
//     }

//     if (!finalLat || !finalLng) {
//       toast.error("Please click 'Auto-Detect' OR fill address manually.");
//       return;
//     }

//     if (paymentMethod === "POD") {
//       try {
//         setLoading(true);
//         // Ensure backend has a lat/lng to avoid errors
//         if (!address.lat) {
//             try { await api.post("/address/save-geo", { latitude: finalLat, longitude: finalLng }); } catch(e){}
//         }

//         await api.post("/order/placeOrderPOD");
//         toast.success("Order Placed!");

//         // Clear & Redirect for POD too
//         setAddress({ house: "", city: "", state: "", pincode: "", lat: null, lng: null });
//         navigate("/my-orders");
//       } catch (e) {
//         toast.error("Order failed");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       // For Online Payment
//       if (!address.lat) {
//          try { await api.post("/address/save-geo", { latitude: finalLat, longitude: finalLng }); } catch(e){}
//       }
//       await startOnlinePayment();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900">
//       <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-24">

//         {/* LEFT: FORM */}
//         <div className="px-4 pb-24 pt-10 sm:px-6 lg:col-span-7 lg:px-12 lg:pb-12 xl:col-span-7">
//            <div className="mb-8 hidden lg:block">
//              <span className="text-gray-400">Cart</span>
//              <span className="mx-2 text-gray-300">/</span>
//              <span className="font-semibold text-black">Checkout</span>
//           </div>

//           {/* Address Section */}
//           <div className="border-b border-gray-200 pb-10">
//             <div className="flex items-center justify-between mb-4">
//                <h2 className="text-xl font-medium">Shipping Address</h2>
//                <button
//                 type="button"
//                 onClick={handleGetLocation}
//                 className="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors"
//                >
//                   <MapPinIcon className="h-3.5 w-3.5 text-blue-600" />
//                   Auto-Detect Location
//                </button>
//             </div>

//             {/* LEAFLET MAP */}
//             {position && (
//               <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200 relative z-0 mb-6">
//                  <MapContainer center={position} zoom={5} className="h-full w-full">
//                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                     <DraggableMarker
//                       position={position}
//                       setPosition={setPosition}
//                       setAddress={setAddress}
//                     />
//                  </MapContainer>
//                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold rounded shadow z-[400] text-gray-700 border">
//                     Drag pin to exact house
//                  </div>
//               </div>
//             )}

//             {/* Input Fields */}
//             <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                 <div className="sm:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">House / Flat / Building</label>
//                     <input
//                       type="text"
//                       placeholder="e.g. Flat 4B, Galaxy Apartments"
//                       value={address.house}
//                       onChange={e => setAddress({...address, house: e.target.value})}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black bg-gray-50/50"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                     <input
//                       type="text"
//                       value={address.city}
//                       onChange={e => setAddress({...address, city: e.target.value})}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black bg-gray-50/50"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
//                     <input
//                       type="text"
//                       value={address.state}
//                       onChange={e => setAddress({...address, state: e.target.value})}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black bg-gray-50/50"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
//                     <input
//                       type="text"
//                       value={address.pincode}
//                       onChange={e => setAddress({...address, pincode: e.target.value})}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black bg-gray-50/50"
//                     />
//                 </div>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="pt-10">
//               <h2 className="text-xl font-medium mb-6">Payment Method</h2>
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                  <div
//                     onClick={() => setPaymentMethod("Online")}
//                     className={`cursor-pointer rounded-xl border p-4 transition-all ${paymentMethod === "Online" ? "bg-gray-900 text-white border-black ring-1 ring-black" : "bg-white border-gray-200 hover:border-gray-300"}`}
//                  >
//                     <div className="flex justify-between items-center">
//                        <span className="font-medium">Pay Online</span>
//                        <CreditCardIcon className={`h-6 w-6 ${paymentMethod === "Online" ? "text-gray-300" : "text-gray-400"}`} />
//                     </div>
//                     <p className={`mt-2 text-sm ${paymentMethod === "Online" ? "text-gray-400" : "text-gray-500"}`}>UPI, Cards, Netbanking</p>
//                  </div>

//                  <div
//                     onClick={() => setPaymentMethod("POD")}
//                     className={`cursor-pointer rounded-xl border p-4 transition-all ${paymentMethod === "POD" ? "bg-gray-900 text-white border-black ring-1 ring-black" : "bg-white border-gray-200 hover:border-gray-300"}`}
//                  >
//                     <div className="flex justify-between items-center">
//                        <span className="font-medium">Cash on Delivery</span>
//                        <BanknotesIcon className={`h-6 w-6 ${paymentMethod === "POD" ? "text-gray-300" : "text-gray-400"}`} />
//                     </div>
//                     <p className={`mt-2 text-sm ${paymentMethod === "POD" ? "text-gray-400" : "text-gray-500"}`}>Pay upon delivery</p>
//                  </div>
//               </div>
//           </div>

//           {/* Desktop Button */}
//           <div className="mt-10 hidden lg:block border-t border-gray-200 pt-6">
//              <button
//                type="button"
//                onClick={handlePlaceOrder}
//                disabled={loading}
//                className="w-full rounded-lg bg-black px-4 py-4 text-base font-semibold text-white shadow-md hover:bg-gray-800 disabled:opacity-70 transition-all"
//              >
//                {loading ? "Processing..." : paymentMethod === "POD" ? `Place Order — ₹${cartTotal + shippingCharge}` : `Pay Now — ₹${cartTotal + shippingCharge}`}
//              </button>
//           </div>
//         </div>

//         {/* RIGHT: SUMMARY */}
//         <div className="hidden bg-gray-50 lg:col-span-5 lg:block lg:min-h-screen lg:px-8 lg:pt-10 border-l border-gray-200">
//            <div className="sticky top-20">
//                <h2 className="text-lg font-medium mb-6 text-gray-900">Order Summary</h2>
//                <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
//                   {cartItems.map(item => (
//                      <li key={item._id} className="flex py-6">
//                         <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
//                            <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
//                         </div>
//                         <div className="ml-4 flex flex-1 flex-col justify-center">
//                            <h3 className="font-medium text-gray-900">{item.name}</h3>
//                            <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
//                         </div>
//                         <div className="ml-4 flex items-center">
//                             <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
//                         </div>
//                      </li>
//                   ))}
//                </ul>
//                <dl className="space-y-4 pt-6 text-sm font-medium text-gray-900">
//                   <div className="flex justify-between">
//                       <dt className="text-gray-500">Subtotal</dt>
//                       <dd>₹{cartTotal}</dd>
//                   </div>
//                   <div className="flex justify-between">
//                     <dt className="text-gray-500 flex items-center gap-2">Shipping <TruckIcon className="h-4 w-4 text-gray-400" /></dt>
//                     <dd>{shippingCharge === 0 ? <span className="text-green-600">Free</span> : `₹${shippingCharge}`}</dd>
//                   </div>
//                   <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
//                      <dt className="text-base font-bold">Total</dt>
//                      <dd className="text-xl font-bold">₹{cartTotal + shippingCharge}</dd>
//                   </div>
//                </dl>
//            </div>
//         </div>
//       </div>

//       {/* MOBILE FOOTER */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
//          <div className="flex justify-between items-center mb-4">
//             <span className="font-medium text-gray-900">Total</span>
//             <span className="text-xl font-bold text-gray-900">₹{cartTotal + shippingCharge}</span>
//          </div>
//          <button
//            type="button"
//            onClick={handlePlaceOrder}
//            disabled={loading}
//            className="w-full rounded-lg bg-black py-4 text-white font-bold disabled:opacity-70 shadow-sm"
//          >
//             {loading ? "Processing..." : paymentMethod === "POD" ? "Place Order" : "Pay Now"}
//          </button>

//          {/* Mobile Details */}
//          <Popover className="mt-2 flex justify-center">
//             {({ open }) => (
//                 <>
//                   <Popover.Button className="flex items-center gap-1 text-xs text-gray-500 underline outline-none">
//                      {open ? "Hide Details" : "View Details"}
//                      <ChevronUpIcon className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
//                   </Popover.Button>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-200"
//                     enterFrom="opacity-0 translate-y-1"
//                     enterTo="opacity-100 translate-y-0"
//                     leave="transition ease-in duration-150"
//                     leaveFrom="opacity-100 translate-y-0"
//                     leaveTo="opacity-0 translate-y-1"
//                   >
//                     <Popover.Panel className="absolute bottom-full left-0 right-0 w-full bg-white border-t border-gray-200 px-4 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
//                         <ul className="divide-y divide-gray-100 mb-4">
//                             {cartItems.map((item) => (
//                                 <li key={item._id} className="flex py-3">
//                                     <img src={item.image} className="h-12 w-12 rounded object-cover" />
//                                     <div className="ml-3 flex-1">
//                                         <p className="text-sm font-medium">{item.name}</p>
//                                         <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                                     </div>
//                                     <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                         <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>₹{cartTotal}</span></div>
//                         <div className="flex justify-between text-sm text-gray-600 mt-1"><span>Shipping</span><span>₹{shippingCharge}</span></div>
//                     </Popover.Panel>
//                   </Transition>
//                 </>
//             )}
//         </Popover>
//       </div>
//       <Toaster
//                           position="top-right"
//                           toastOptions={{
//                             duration: 2000,
//                             style: {
//                               borderRadius: "10px",
//                               fontFamily: "Inter, sans-serif",
//                             },
//                           }}
//                         />
//     </div>
//   );
// };

// export default CheckoutPage;

///copy of workingg gps but payment failedddd

// import { Popover, Transition } from "@headlessui/react";
// import { ChevronUpIcon, MapPinIcon, TruckIcon, CreditCardIcon, BanknotesIcon } from "@heroicons/react/24/outline";
// import React, { useEffect, useState, Fragment } from "react";
// import { useCart } from "../context/CartContext"; // Ensure path is correct
// import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// import api from "../utils/api"; // Ensure path is correct
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import toast, { Toaster, } from 'react-hot-toast';

// // Fix Leaflet Icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// const CheckoutPage = () => {
//   const { cartItems, cartTotal } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     house: "",
//     city: "",
//     state: "",
//     pincode: "",
//     lat: null,
//     lng: null,
//   });

//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("Online");
//   const [loading, setLoading] = useState(false); // Used in logic but wasn't fully utilized
//   const [position, setPosition] = useState(null);

//   // Protect route
//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate("/cart");
//     }
//   }, [cartItems, navigate]);

//   // 🔹 Load Razorpay SDK safely
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (window.Razorpay) {
//       resolve(true);
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const startOnlinePayment = async () => {
//   setLoading(true);

//   try {
//     const razorpayKey =
//       import.meta.env.VITE_RAZORPAY_KEY ||
//       import.meta.env.VITE_RAZORPAY_KEY_ID ||
//       process.env.REACT_APP_RAZORPAY_KEY;

//     if (!razorpayKey) {
//       toast.error("Razorpay key missing");
//       setLoading(false);
//       return;
//     }

//     const isLoaded = await loadRazorpayScript();
//     if (!isLoaded) {
//       toast.error("Failed to load Razorpay");
//       setLoading(false);
//       return;
//     }

//     // ✅ USE THE ORIGINAL WORKING API
//     const res = await api.post("/order/create");

//     if (!res.data?.rzpOrder) {
//       toast.error("Order creation failed");
//       setLoading(false);
//       return;
//     }

//     const options = {
//       key: razorpayKey,
//       amount: res.data.rzpOrder.amount,
//       currency: "INR",
//       name: "Mandharam Drapes",
//       order_id: res.data.rzpOrder.id,

//       handler: async (response) => {
//         try {
//           await api.post("/order/verify", response);
//           toast.success("Payment successful");
//           navigate("/order-success");
//         } catch (err) {
//           toast.error("Payment verification failed");
//         }
//       },

//       theme: { color: "#000000" },
//     };

//     const rzp = new window.Razorpay(options);

//     // OPTIONAL: remove cancel for now (until backend returns order id)
//     rzp.open();

//   } catch (err) {
//     console.error(err);
//     toast.error("Payment initialization failed");
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleGetLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }
//     const toastId = toast.loading("Fetching location...");
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);
//           const res = await api.post("/address/save-geo", {
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//           });

//           const { address: addr, shippingCharge } = res.data;
//           setAddress({
//             house: addr.fullAddress || "",
//             city: addr.city || addr.town || addr.village || addr.county || "",
//             state: addr.state || "",
//             pincode: addr.zipCode || addr.postcode || "",
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//           setShippingCharge(shippingCharge);
//           toast.dismiss(toastId);
//           toast.success(`Location set! Shipping: ₹${shippingCharge}`);
//         } catch (error) {
//           toast.dismiss(toastId);
//           toast.error("Failed to get location details");
//         }
//       },
//       () => {
//         toast.dismiss(toastId);
//         toast.error("Location permission denied");
//       }
//     );
//   };

//   // const handlePlaceOrder = async () => {

//   //   if (!address.lat || !address.lng) {
//   //     toast.error("Please confirm delivery location using the map/button");
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     if (paymentMethod === "POD") {
//   //       await api.post("/order/placeOrderPOD");
//   //       toast.success("Order placed successfully");
//   //       navigate("/order-success");
//   //     } else {
//   //       await startOnlinePayment();
//   //     }
//   //   } catch (error) {
//   //     toast.error("Something went wrong");
//   //   } finally {
//   //      // Only stop loading if it was POD, otherwise Razorpay handles it
//   //      if(paymentMethod === "POD") setLoading(false);
//   //   }
//   // };

//   const handlePlaceOrder = async () => {
//     let finalLat = address.lat;
//     let finalLng = address.lng;
//     const isManualAddressFilled = address.house && address.city && address.pincode;

//     // Fallback: If map wasn't used but address is typed, use dummy coords
//     if ((!finalLat || !finalLng) && isManualAddressFilled) {
//        finalLat = 20.5937;
//        finalLng = 78.9629;
//     }

//     if (!finalLat || !finalLng) {
//       toast.error("Please click 'Auto-Detect' OR fill address manually.");
//       return;
//     }

//     if (paymentMethod === "POD") {
//       try {
//         setLoading(true);
//         // Ensure backend has a lat/lng to avoid errors
//         if (!address.lat) {
//             try { await api.post("/address/save-geo", { latitude: finalLat, longitude: finalLng }); } catch(e){}
//         }

//         await api.post("/order/placeOrderPOD");
//         toast.success("Order Placed!");

//         // Clear & Redirect for POD too
//         setAddress({ house: "", city: "", state: "", pincode: "", lat: null, lng: null });
//         navigate("/order-success");
//       } catch (e) {
//         toast.error("Order failed");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       // For Online Payment
//       if (!address.lat) {
//          try { await api.post("/address/save-geo", { latitude: finalLat, longitude: finalLng }); } catch(e){}
//       }
//       await startOnlinePayment();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900">
//       <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-24">

//         {/* ================= LEFT SIDE: FORM ================= */}
//         <div className="px-4 pb-24 pt-10 sm:px-6 lg:col-span-7 lg:px-12 lg:pb-12 xl:col-span-7">

//           {/* Breadcrumb / Header */}
//           <div className="mb-8 hidden lg:block">
//              {/* <span className="text-gray-400">Cart</span>
//              <span className="mx-2 text-gray-300">/</span> */}
//              <span className="font-bold text-black text-3xl ">Checkout</span>
//           </div>

//           <form>
//             {/* Section: Shipping Address */}
//             <div className="border-b border-gray-200 pb-10">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-medium text-gray-900">Shipping Address</h2>
//                 <button
//                   type="button"
//                   onClick={handleGetLocation}
//                   className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
//                 >
//                   <MapPinIcon className="h-3.5 w-3.5 text-blue-600" />
//                   Auto-Detect Location
//                 </button>
//               </div>

//               <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                 <div className="sm:col-span-2">
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                     House / Apartment / Street
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="address"
//                       value={address.house}
//                       onChange={(e) => setAddress({ ...address, house: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                       placeholder="e.g. Flat 402, Skyline Apartments"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="city"
//                       value={address.city}
//                       onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//                     State
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="state"
//                       value={address.state}
//                       onChange={(e) => setAddress({ ...address, state: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                     Pincode
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="pincode"
//                       value={address.pincode}
//                       onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                       className="block w-1/2 rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Map Visualization */}
//               {position && (
//                 <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
//                   <div className="h-48 w-full">
//                     <MapContainer center={position} zoom={16} className="h-full w-full">
//                       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                       <Marker position={position} />
//                     </MapContainer>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
//                     Location pinned: {position[0].toFixed(4)}, {position[1].toFixed(4)}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section: Payment Method */}
//             <div className="pt-10">
//               <h2 className="text-xl font-medium text-gray-900">Payment Method</h2>

//               <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 {/* Option 1: Online */}
//                 <div
//                   onClick={() => setPaymentMethod("Online")}
//                   className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
//                     paymentMethod === "Online"
//                       ? "border-black bg-gray-900 text-white"
//                       : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Pay Online</span>
//                     <CreditCardIcon className={`h-6 w-6 ${paymentMethod === "Online" ? "text-gray-300" : "text-gray-400"}`} />
//                   </div>
//                   <p className={`mt-2 text-sm ${paymentMethod === "Online" ? "text-gray-400" : "text-gray-500"}`}>
//                     Credit Card, UPI, Netbanking
//                   </p>
//                 </div>

//                 {/* Option 2: COD */}
//                 <div
//                   onClick={() => setPaymentMethod("POD")}
//                   className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
//                     paymentMethod === "POD"
//                       ? "border-black bg-gray-900 text-white"
//                       : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Cash on Delivery</span>
//                     <BanknotesIcon className={`h-6 w-6 ${paymentMethod === "POD" ? "text-gray-300" : "text-gray-400"}`} />
//                   </div>
//                   <p className={`mt-2 text-sm ${paymentMethod === "POD" ? "text-gray-400" : "text-gray-500"}`}>
//                     Pay when you receive
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button (Desktop) */}
//             <div className="mt-10 hidden border-t border-gray-200 pt-6 lg:block">
//               <button
//                 type="button"
//                 onClick={handlePlaceOrder}
//                 disabled={loading}
//                 className="w-full rounded-lg bg-black px-4 py-4 text-base font-semibold text-white shadow-md hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
//               >
//                 {loading ? "Processing..." : paymentMethod === "POD" ? `Place Order — ₹${cartTotal + shippingCharge}` : `Pay Now — ₹${cartTotal + shippingCharge}`}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* ================= RIGHT SIDE: SUMMARY (Desktop) ================= */}
//         <div className="hidden bg-gray-50 lg:col-span-5 lg:block lg:min-h-screen lg:border-l lg:border-gray-200 lg:px-8 lg:pt-10 xl:col-span-5 xl:pt-20">
//           <h2 className="sr-only">Order summary</h2>
//           <div className="sticky top-20">
//             <h2 className="text-lg font-medium text-gray-900 mb-6">Your Cart</h2>
//             <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
//               {cartItems.map((item) => (
//                 <li key={item._id} className="flex py-6">
//                   <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
//                     <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
//                   </div>
//                   <div className="ml-4 flex flex-1 flex-col">
//                     <div>
//                       <div className="flex justify-between text-base font-medium text-gray-900">
//                         <h3>{item.name}</h3>
//                         <p className="ml-4">₹{item.price * item.quantity}</p>
//                       </div>
//                       <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <dl className="space-y-4 pt-6 text-sm font-medium text-gray-900">
//               <div className="flex justify-between">
//                 <dt className="text-gray-500">Subtotal</dt>
//                 <dd>₹{cartTotal}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-gray-500 flex items-center gap-2">
//                     Shipping
//                     <TruckIcon className="h-4 w-4 text-gray-400" />
//                 </dt>
//                 <dd>{shippingCharge === 0 ? <span className="text-green-600">Free</span> : `₹${shippingCharge}`}</dd>
//               </div>
//               <div className="flex justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-base">Total</dt>
//                 <dd className="text-xl font-bold">₹{cartTotal + shippingCharge}</dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>

//       {/* ================= MOBILE BOTTOM SUMMARY & BUTTON ================= */}
//       {/* This replaces the Popover for a cleaner mobile experience */}
//       <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
//         <div className="mb-4 flex items-center justify-between text-base font-medium text-gray-900">
//            <span>Total</span>
//            <span className="text-xl">₹{cartTotal + shippingCharge}</span>
//         </div>
//         <button
//           type="button"
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className="w-full rounded-lg bg-black px-4 py-4 text-base font-bold text-white shadow-sm hover:bg-gray-800"
//         >
//           {loading ? "Processing..." : paymentMethod === "POD" ? "Place Order" : "Pay Now"}
//         </button>

//         {/* Simple details toggle for mobile */}
//         <Popover className="mt-2 flex justify-center">
//             {({ open }) => (
//                 <>
//                   <Popover.Button className="flex items-center gap-1 text-xs text-gray-500 underline">
//                      {open ? "Hide Order Details" : "View Order Details"}
//                      <ChevronUpIcon className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
//                   </Popover.Button>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-200"
//                     enterFrom="opacity-0 translate-y-1"
//                     enterTo="opacity-100 translate-y-0"
//                     leave="transition ease-in duration-150"
//                     leaveFrom="opacity-100 translate-y-0"
//                     leaveTo="opacity-0 translate-y-1"
//                   >
//                     <Popover.Panel className="absolute bottom-full left-0 right-0 mb-0 w-full bg-white border-t border-gray-200 px-4 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
//                         <ul className="divide-y divide-gray-100">
//                         {cartItems.map((item) => (
//                             <li key={item._id} className="flex py-3">
//                                 <img src={item.image} className="h-12 w-12 rounded object-cover" />
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium">{item.name}</p>
//                                     <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                                 </div>
//                                 <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
//                             </li>
//                         ))}
//                         </ul>
//                         <div className="mt-4 flex justify-between text-sm">
//                            <span className="text-gray-500">Subtotal</span>
//                            <span>₹{cartTotal}</span>
//                         </div>
//                         <div className="mt-1 flex justify-between text-sm">
//                            <span className="text-gray-500">Shipping</span>
//                            <span>₹{shippingCharge}</span>
//                         </div>
//                     </Popover.Panel>
//                   </Transition>
//                 </>
//             )}
//         </Popover>
//       </div>
//       <Toaster
//                           position="top-right"
//                           toastOptions={{
//                             duration: 2000,
//                             style: {
//                               borderRadius: "10px",
//                               fontFamily: "Inter, sans-serif",
//                             },
//                           }}
//                         />
//     </div>
//   );
// };

// export default CheckoutPage;

// import React, { useEffect, useState, Fragment } from "react";
// import { Popover, Transition } from "@headlessui/react";
// import { ChevronUpIcon, MapPinIcon, TruckIcon, CreditCardIcon, BanknotesIcon } from "@heroicons/react/24/outline";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import toast, { Toaster } from 'react-hot-toast';

// // --- LEAFLET ICON FIX ---
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// const CheckoutPage = () => {
//   const { cartItems, cartTotal } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     house: "",
//     city: "",
//     state: "",
//     pincode: "",
//     lat: null,
//     lng: null,
//   });

//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("Online");
//   const [loading, setLoading] = useState(false);
//   const [position, setPosition] = useState(null);

//   // Protect route
//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate("/cart");
//     }
//   }, [cartItems, navigate]);

//   // --- 1. SCRIPT LOADER ---
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // --- 2. ONLINE PAYMENT LOGIC (FIXED) ---
//   const startOnlinePayment = async () => {
//     setLoading(true);

//     const razorpayKey =
//       import.meta.env.VITE_RAZORPAY_KEY ||
//       import.meta.env.VITE_RAZORPAY_KEY_ID ||
//       process.env.REACT_APP_RAZORPAY_KEY;

//     if (!razorpayKey) {
//       toast.error("Configuration Error: Razorpay Key is missing.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         toast.error("Failed to load Razorpay SDK. Check your internet.");
//         setLoading(false);
//         return;
//       }

//       // ✅ FIX: Use the working endpoint from Code A
//       const res = await api.post("/order/place");

//       if (!res.data || !res.data.rzpOrder) {
//         throw new Error("Invalid response from server");
//       }

//       const options = {
//         key: razorpayKey,
//         amount: res.data.rzpOrder.amount,
//         currency: "INR",
//         name: "Mandharam Drapes",
//         order_id: res.data.rzpOrder.id,

//         // --- SUCCESS HANDLER ---
//         handler: async (response) => {
//           try {
//             const verifyRes = await api.post("/order/verify", response);
//             if (verifyRes.status === 200) {
//               toast.success("Payment Successful!");
//               // Clear fields
//               setAddress({ house: "", city: "", state: "", pincode: "", lat: null, lng: null });
//               setShippingCharge(0);
//               setPosition(null);
//               // Navigate to success page
//               navigate("/order-success");
//             }
//           } catch (err) {
//             console.error(err);
//             toast.error("Payment Verification Failed");
//           }
//         },
//         theme: { color: "#000000" },

//         // --- CANCEL/CLOSE HANDLER (Restores Stock) ---
//         modal: {
//           ondismiss: async function () {
//             try {
//               await api.post(`/orders/cancel/${res.data.order._id}`);
//               toast.error("Payment cancelled. Stock restored.");
//             } catch (err) {
//               console.error("Cancel failed", err);
//             }
//           },
//         },
//       };

//       if (!window.Razorpay) {
//           toast.error("Razorpay SDK error. Please refresh.");
//           return;
//       }

//       const rzp = new window.Razorpay(options);

//       // --- FAILURE HANDLER (Restores Stock) ---
//       rzp.on("payment.failed", async function (response) {
//         toast.error(response.error.description || "Payment failed");
//         try {
//           await api.post(`/orders/cancel/${res.data.order._id}`);
//           toast.error("Order cancelled. Stock restored.");
//         } catch (err) {
//           console.error("Failed to restore stock", err);
//         }
//       });

//       rzp.open();

//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Payment initialization failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- 3. GEOLOCATION LOGIC ---
//   const handleGetLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }
//     const toastId = toast.loading("Fetching location...");

//     // Simple Geolocation strategy
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);

//           const res = await api.post("/address/save-geo", {
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//           });

//           const { address: addr, shippingCharge } = res.data;

//           setAddress({
//             house: addr.fullAddress || "",
//             city: addr.city || addr.town || addr.village || addr.county || "",
//             state: addr.state || "",
//             pincode: addr.zipCode || addr.postcode || "",
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });

//           setShippingCharge(shippingCharge);
//           toast.dismiss(toastId);
//           toast.success(`Location set! Shipping: ₹${shippingCharge}`);
//         } catch (error) {
//           toast.dismiss(toastId);
//           toast.error("Failed to get address details from coordinates.");
//         }
//       },
//       () => {
//         toast.dismiss(toastId);
//         toast.error("Location permission denied or unavailable.");
//       },
//       { enableHighAccuracy: true }
//     );
//   };

//   // --- 4. PLACE ORDER HANDLER ---
//   const handlePlaceOrder = async () => {
//     let finalLat = address.lat;
//     let finalLng = address.lng;
//     const isManualAddressFilled = address.house && address.city && address.pincode;

//     // Fallback: If map wasn't used but address is typed, use dummy coords
//     if ((!finalLat || !finalLng) && isManualAddressFilled) {
//        finalLat = 20.5937; // Default India Center
//        finalLng = 78.9629;
//     }

//     if (!finalLat || !finalLng) {
//       toast.error("Please click 'Auto-Detect' OR fill address manually.");
//       return;
//     }

//     if (paymentMethod === "POD") {
//       try {
//         setLoading(true);
//         // Ensure backend has a lat/lng to avoid errors
//         if (!address.lat) {
//             try { await api.post("/address/save-geo", { latitude: finalLat, longitude: finalLng }); } catch(e){}
//         }

//         await api.post("/order/placeOrderPOD");
//         toast.success("Order Placed Successfully!");

//         // Clear & Redirect
//         setAddress({ house: "", city: "", state: "", pincode: "", lat: null, lng: null });
//         navigate("/order-success");
//       } catch (e) {
//         toast.error("Order failed. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       // For Online Payment
//       if (!address.lat) {
//          try { await api.post("/address/save-geo", { latitude: finalLat, longitude: finalLng }); } catch(e){}
//       }
//       await startOnlinePayment();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900">
//       <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-24">

//         {/* ================= LEFT SIDE: FORM ================= */}
//         <div className="px-4 pb-24 pt-10 sm:px-6 lg:col-span-7 lg:px-12 lg:pb-12 xl:col-span-7">

//           {/* Breadcrumb / Header */}
//           <div className="mb-8 hidden lg:block">
//              <span className="font-bold text-black text-3xl ">Checkout</span>
//           </div>

//           <form>
//             {/* Section: Shipping Address */}
//             <div className="border-b border-gray-200 pb-10">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-medium text-gray-900">Shipping Address</h2>
//                 <button
//                   type="button"
//                   onClick={handleGetLocation}
//                   className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
//                 >
//                   <MapPinIcon className="h-3.5 w-3.5 text-blue-600" />
//                   Auto-Detect Location
//                 </button>
//               </div>

//               <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                 <div className="sm:col-span-2">
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                     House / Apartment / Street
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="address"
//                       value={address.house}
//                       onChange={(e) => setAddress({ ...address, house: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                       placeholder="e.g. Flat 402, Skyline Apartments"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                     City
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="city"
//                       value={address.city}
//                       onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//                     State
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="state"
//                       value={address.state}
//                       onChange={(e) => setAddress({ ...address, state: e.target.value })}
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                     Pincode
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="pincode"
//                       value={address.pincode}
//                       onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                       className="block w-1/2 rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Map Visualization */}
//               {position && (
//                 <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
//                   <div className="h-48 w-full">
//                     <MapContainer center={position} zoom={16} className="h-full w-full">
//                       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                       <Marker position={position} />
//                     </MapContainer>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
//                     Location pinned: {position[0].toFixed(4)}, {position[1].toFixed(4)}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section: Payment Method */}
//             <div className="pt-10">
//               <h2 className="text-xl font-medium text-gray-900">Payment Method</h2>

//               <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 {/* Option 1: Online */}
//                 <div
//                   onClick={() => setPaymentMethod("Online")}
//                   className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
//                     paymentMethod === "Online"
//                       ? "border-black bg-gray-900 text-white"
//                       : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Pay Online</span>
//                     <CreditCardIcon className={`h-6 w-6 ${paymentMethod === "Online" ? "text-gray-300" : "text-gray-400"}`} />
//                   </div>
//                   <p className={`mt-2 text-sm ${paymentMethod === "Online" ? "text-gray-400" : "text-gray-500"}`}>
//                     Credit Card, UPI, Netbanking
//                   </p>
//                 </div>

//                 {/* Option 2: COD */}
//                 <div
//                   onClick={() => setPaymentMethod("POD")}
//                   className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
//                     paymentMethod === "POD"
//                       ? "border-black bg-gray-900 text-white"
//                       : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Cash on Delivery</span>
//                     <BanknotesIcon className={`h-6 w-6 ${paymentMethod === "POD" ? "text-gray-300" : "text-gray-400"}`} />
//                   </div>
//                   <p className={`mt-2 text-sm ${paymentMethod === "POD" ? "text-gray-400" : "text-gray-500"}`}>
//                     Pay when you receive
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button (Desktop) */}
//             <div className="mt-10 hidden border-t border-gray-200 pt-6 lg:block">
//               <button
//                 type="button"
//                 onClick={handlePlaceOrder}
//                 disabled={loading}
//                 className="w-full rounded-lg bg-black px-4 py-4 text-base font-semibold text-white shadow-md hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
//               >
//                 {loading ? "Processing..." : paymentMethod === "POD" ? `Place Order — ₹${cartTotal + shippingCharge}` : `Pay Now — ₹${cartTotal + shippingCharge}`}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* ================= RIGHT SIDE: SUMMARY (Desktop) ================= */}
//         <div className="hidden bg-gray-50 lg:col-span-5 lg:block lg:min-h-screen lg:border-l lg:border-gray-200 lg:px-8 lg:pt-10 xl:col-span-5 xl:pt-20">
//           <h2 className="sr-only">Order summary</h2>
//           <div className="sticky top-20">
//             <h2 className="text-lg font-medium text-gray-900 mb-6">Your Cart</h2>
//             <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
//               {cartItems.map((item) => (
//                 <li key={item._id} className="flex py-6">
//                   <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
//                     <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
//                   </div>
//                   <div className="ml-4 flex flex-1 flex-col">
//                     <div>
//                       <div className="flex justify-between text-base font-medium text-gray-900">
//                         <h3>{item.name}</h3>
//                         <p className="ml-4">₹{item.price * item.quantity}</p>
//                       </div>
//                       <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <dl className="space-y-4 pt-6 text-sm font-medium text-gray-900">
//               <div className="flex justify-between">
//                 <dt className="text-gray-500">Subtotal</dt>
//                 <dd>₹{cartTotal}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-gray-500 flex items-center gap-2">
//                     Shipping
//                     <TruckIcon className="h-4 w-4 text-gray-400" />
//                 </dt>
//                 <dd>{shippingCharge === 0 ? <span className="text-green-600">Free</span> : `₹${shippingCharge}`}</dd>
//               </div>
//               <div className="flex justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-base">Total</dt>
//                 <dd className="text-xl font-bold">₹{cartTotal + shippingCharge}</dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>

//       {/* ================= MOBILE BOTTOM SUMMARY & BUTTON ================= */}
//       <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
//         <div className="mb-4 flex items-center justify-between text-base font-medium text-gray-900">
//            <span>Total</span>
//            <span className="text-xl">₹{cartTotal + shippingCharge}</span>
//         </div>
//         <button
//           type="button"
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className="w-full rounded-lg bg-black px-4 py-4 text-base font-bold text-white shadow-sm hover:bg-gray-800 disabled:opacity-70"
//         >
//           {loading ? "Processing..." : paymentMethod === "POD" ? "Place Order" : "Pay Now"}
//         </button>

//         <Popover className="mt-2 flex justify-center">
//             {({ open }) => (
//                 <>
//                   <Popover.Button className="flex items-center gap-1 text-xs text-gray-500 underline outline-none">
//                       {open ? "Hide Order Details" : "View Order Details"}
//                       <ChevronUpIcon className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
//                   </Popover.Button>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-200"
//                     enterFrom="opacity-0 translate-y-1"
//                     enterTo="opacity-100 translate-y-0"
//                     leave="transition ease-in duration-150"
//                     leaveFrom="opacity-100 translate-y-0"
//                     leaveTo="opacity-0 translate-y-1"
//                   >
//                     <Popover.Panel className="absolute bottom-full left-0 right-0 mb-0 w-full bg-white border-t border-gray-200 px-4 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
//                         <ul className="divide-y divide-gray-100">
//                         {cartItems.map((item) => (
//                             <li key={item._id} className="flex py-3">
//                                 <img src={item.image} className="h-12 w-12 rounded object-cover" />
//                                 <div className="ml-3 flex-1">
//                                     <p className="text-sm font-medium">{item.name}</p>
//                                     <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                                 </div>
//                                 <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
//                             </li>
//                         ))}
//                         </ul>
//                         <div className="mt-4 flex justify-between text-sm">
//                            <span className="text-gray-500">Subtotal</span>
//                            <span>₹{cartTotal}</span>
//                         </div>
//                         <div className="mt-1 flex justify-between text-sm">
//                            <span className="text-gray-500">Shipping</span>
//                            <span>₹{shippingCharge}</span>
//                         </div>
//                     </Popover.Panel>
//                   </Transition>
//                 </>
//             )}
//         </Popover>
//       </div>
//       <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 2000,
//             style: {
//               borderRadius: "10px",
//               fontFamily: "Inter, sans-serif",
//             },
//           }}
//         />
//     </div>
//   );
// };

// export default CheckoutPage;


///// wrokingcode with Hari updatesss Changesssss

// import React, { useEffect, useState, useRef, Fragment } from "react";
// import { Popover, Transition } from "@headlessui/react";
// import {
//   ChevronUpIcon,
//   MapPinIcon,
//   TruckIcon,
//   CreditCardIcon,
//   BanknotesIcon,
// } from "@heroicons/react/24/outline";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import toast, { Toaster } from "react-hot-toast";
// import { useGeolocated } from "react-geolocated";

// // --- LEAFLET ICON FIX ---
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// const CheckoutPage = () => {
//   const { cartItems, cartTotal, clearCart } = useCart();
//   const navigate = useNavigate();
//   const isPaymentSuccess = useRef(false);

//   const [address, setAddress] = useState({
//     house: "",
//     city: "",
//     state: "",
//     pincode: "",
//     lat: null,
//     lng: null,
//   });

//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("Online");
//   const [loading, setLoading] = useState(false);
//   const [position, setPosition] = useState(null);

//   const API_KEY = "255aa77b6b9940f8a87505f8c7736bbe";
//   // Protect route
//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       if (!isPaymentSuccess.current) {
//         navigate("/cart", { replace: true });
//       }
//     }
//   }, [cartItems, navigate]);

//   const { coords, isGeolocationAvailable, isGeolocationEnabled } =
//     useGeolocated({
//       positionOptions: {
//         enableHighAccuracy: false,
//       },
//       userDecisionTimeout: 5000,
//     });

//   console.log("Coordinate", coords);

//   // --- 1. SCRIPT LOADER ---
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // --- 2. ONLINE PAYMENT LOGIC (UPDATED) ---
//   const startOnlinePayment = async () => {
//     setLoading(true);
//     isPaymentSuccess.current = false;

//     const razorpayKey =
//       import.meta.env.VITE_RAZORPAY_KEY || import.meta.env.VITE_RAZORPAY_KEY_ID;

//     if (!razorpayKey) {
//       toast.error("Razorpay Key is missing.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         toast.error("Razorpay SDK failed to load.");
//         setLoading(false);
//         return;
//       }

//       // 1. Create Order on Backend
//       const res = await api.post("/order/place");

//       if (!res.data || !res.data.rzpOrder) {
//         throw new Error("Invalid response from server");
//       }

//       const options = {
//         key: razorpayKey,
//         amount: res.data.rzpOrder.amount,
//         currency: "INR",
//         name: "Mandharam Drapes",
//         order_id: res.data.rzpOrder.id,

//         // --- UPDATED SUCCESS HANDLER ---
//         handler: async (response) => {
//           // A. Mark as success immediately so 'ondismiss' doesn't run
//           isPaymentSuccess.current = true;
//           toast.success("Payment Successful! Processing...");

//           try {
//             // B. Attempt Backend Verification
//             await api.post("/order/verify", response);
//             // If we get here, verification worked perfectly
//           } catch (err) {
//             // C. If verification fails (e.g., network error), LOG IT but DO NOT STOP.
//             // The user has already paid, so we must not keep them on Checkout.
//             console.error("Verification API Error:", err);
//             toast.success("Order Placed! Check 'My Orders' for status.");
//           }

//           // D. ALWAYS Clear Cart & Redirect (Even if verification had a hiccup)
//           if (clearCart) clearCart();

//           setAddress({
//             house: "",
//             city: "",
//             state: "",
//             pincode: "",
//             lat: null,
//             lng: null,
//           });
//           setShippingCharge(0);
//           setPosition(null);

//           // E. Navigate immediately
//           navigate("/order-success");
//         },

//         theme: { color: "#000000" },

//         // --- CANCEL HANDLER ---
//         modal: {
//           ondismiss: async function () {
//             if (isPaymentSuccess.current) return; // Don't cancel if successful

//             console.log("Payment popup closed");
//             try {
//               await api.post(`/order/cancel/${res.data.order._id}`);
//               toast.error("Payment cancelled.");
//             } catch (err) {
//               console.error("Cancel failed", err);
//             }
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       rzp.on("payment.failed", async function (response) {
//         toast.error("Payment Failed");
//         if (!isPaymentSuccess.current) {
//           try {
//             await api.post(`/order/cancel/${res.data.order._id}`);
//           } catch (err) {}
//         }
//       });

//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment initialization failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- 3. GEOLOCATION LOGIC ---
//   const handleGetLocation = async() => {
//     // if (!navigator.geolocation) {
//     //   toast.error("Geolocation not supported");
//     //   return;
//     // }
//     const toastId = toast.loading("Fetching location...");

//     // const success = async (pos) => {
//       try {
//         // console.log('POsition!!!',pos.coords.latitude,pos.coords.longitude);

//         setPosition([coords.latitude, coords.longitude]);

//         const res = await api.post("/address/save-geo", {
//           latitude: coords.latitude,
//           longitude: coords.longitude,
//         });

//         const { address: addr, shippingCharge } = res.data;

//         console.log('responseee',res.data);

//         setAddress({
//           house: addr.fullAddress || "",
//           city: addr.city || addr.town || addr.village || addr.county || "",
//           state: addr.state || "",
//           pincode: addr.zipCode || addr.postcode || "",
//           lat: coords.latitude,
//           lng: coords.longitude,
//         });

//         setShippingCharge(shippingCharge);
//         toast.dismiss(toastId);
//         toast.success(`Location set! Shipping: ₹${shippingCharge}`);
//       } catch (error) {
//         toast.dismiss(toastId);
//         toast.error("Failed to get address details.");
//       }
//     // };

//     // const error = (err) => {
//     //   toast.dismiss(toastId);
//     //   if (err.code === 1)
//     //     toast.error(
//     //       "Location permission denied. Allow access in browser settings."
//     //     );
//     //   else toast.error("Location unavailable.");
//     // };

//     // navigator.geolocation.getCurrentPosition(success, error, {
//     //   enableHighAccuracy: true,
//     // });
//   };

//   // --- 4. PLACE ORDER HANDLER ---

//   const handlePlaceOrder = async () => {
//     let finalLat = address.lat;
//     let finalLng = address.lng;
//     const isManualAddressFilled =
//       address.house && address.city && address.pincode;

//     if ((!finalLat || !finalLng) && isManualAddressFilled) {
//       finalLat = 20.5937;
//       finalLng = 78.9629;
//     }

//     if (!finalLat || !finalLng) {
//       toast.error("Please click 'Auto-Detect' OR fill address manually.");
//       return;
//     }

//     if (paymentMethod === "POD") {
//       try {
//         setLoading(true);
//         if (!address.lat) {
//           try {
//             await api.post("/address/save-geo", {
//               latitude: finalLat,
//               longitude: finalLng,
//             });
//           } catch (e) {}
//         }

//         await api.post("/order/placeOrderPOD");
//         toast.success("Order Placed Successfully!");

//         if (clearCart) clearCart();
//         setAddress({
//           house: "",
//           city: "",
//           state: "",
//           pincode: "",
//           lat: null,
//           lng: null,
//         });
//         navigate("/order-success");
//       } catch (e) {
//         toast.error("Order failed. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       if (!address.lat) {
//         try {
//           await api.post("/address/save-geo", {
//             latitude: finalLat,
//             longitude: finalLng,
//           });
//         } catch (e) {}
//       }
//       await startOnlinePayment();
//     }
//   };

//   // Ensure cart total handles strings (Context often returns strings like "1000.00")
//   const totalAmount = (Number(cartTotal) + Number(shippingCharge)).toFixed(2);

//   return (
//     // <div className="min-h-screen bg-white font-sans text-gray-900">
//     //   <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-24">

//     // <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//     <div className="min-h-screen bg-white font-sans text-gray-900 pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-14 lg:pb-14">

//   <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-24">

//         {/* ================= LEFT SIDE: FORM ================= */}
//         <div className="px-4 pb-24 pt-10 sm:px-6 lg:col-span-7 lg:px-12 lg:pb-12 xl:col-span-7">
//           <div className="mb-8 hidden lg:block">
//             <span className="font-bold text-black text-3xl ">Checkout</span>
//           </div>

//           <form>
//             {/* Section: Shipping Address */}
//             <div className="border-b border-gray-200 pb-10">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-medium text-gray-900">
//                   Shipping Address
//                 </h2>
//                 <button
//                   type="button"
//                   onClick={handleGetLocation}
//                   className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
//                 >
//                   <MapPinIcon className="h-3.5 w-3.5 text-blue-600" />
//                   Auto-Detect Location
//                 </button>
//               </div>

//               <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="address"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     House / Apartment / Street
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       value={address.house}
//                       onChange={(e) =>
//                         setAddress({ ...address, house: e.target.value })
//                       }
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50 border"
//                       placeholder="e.g. Flat 402, Skyline Apartments"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="city"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     City
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       value={address.city}
//                       onChange={(e) =>
//                         setAddress({ ...address, city: e.target.value })
//                       }
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50 border"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="state"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     State
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       value={address.state}
//                       onChange={(e) =>
//                         setAddress({ ...address, state: e.target.value })
//                       }
//                       className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50 border"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="pincode"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Pincode
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       value={address.pincode}
//                       onChange={(e) =>
//                         setAddress({ ...address, pincode: e.target.value })
//                       }
//                       className="block w-1/2 rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50 border"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Map Visualization */}
//               {position && (
//                 <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
//                   <div className="h-48 w-full">
//                     <MapContainer
//                       center={position}
//                       zoom={16}
//                       className="h-full w-full"
//                     >
//                       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                       <Marker position={position} />
//                     </MapContainer>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
//                     Location pinned: {position[0].toFixed(4)},{" "}
//                     {position[1].toFixed(4)}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Section: Payment Method */}
//             <div className="pt-10">
//               <h2 className="text-xl font-medium text-gray-900">
//                 Payment Method
//               </h2>

//               <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div
//                   onClick={() => setPaymentMethod("Online")}
//                   className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
//                     paymentMethod === "Online"
//                       ? "border-black bg-gray-900 text-white"
//                       : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Pay Online</span>
//                     <CreditCardIcon
//                       className={`h-6 w-6 ${
//                         paymentMethod === "Online"
//                           ? "text-gray-300"
//                           : "text-gray-400"
//                       }`}
//                     />
//                   </div>
//                   <p
//                     className={`mt-2 text-sm ${
//                       paymentMethod === "Online"
//                         ? "text-gray-400"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     Credit Card, UPI, Netbanking
//                   </p>
//                 </div>

//                 <div
//                   onClick={() => setPaymentMethod("POD")}
//                   className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
//                     paymentMethod === "POD"
//                       ? "border-black bg-gray-900 text-white"
//                       : "border-gray-200 bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Cash on Delivery</span>
//                     <BanknotesIcon
//                       className={`h-6 w-6 ${
//                         paymentMethod === "POD"
//                           ? "text-gray-300"
//                           : "text-gray-400"
//                       }`}
//                     />
//                   </div>
//                   <p
//                     className={`mt-2 text-sm ${
//                       paymentMethod === "POD"
//                         ? "text-gray-400"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     Pay when you receive
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button (Desktop) */}
//             <div className="mt-10 hidden border-t border-gray-200 pt-6 lg:block">
//               <button
//                 type="button"
//                 onClick={handlePlaceOrder}
//                 disabled={loading}
//                 className="w-full rounded-lg bg-black px-4 py-4 text-base font-semibold text-white shadow-md hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
//               >
//                 {loading
//                   ? "Processing..."
//                   : paymentMethod === "POD"
//                   ? `Place Order — ₹${totalAmount}`
//                   : `Pay Now — ₹${totalAmount}`}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* ================= RIGHT SIDE: SUMMARY (Desktop) ================= */}
//         <div className="hidden bg-gray-50 lg:col-span-5 lg:block lg:min-h-screen lg:border-l lg:border-gray-200 lg:px-8 lg:pt-10 xl:col-span-5 xl:pt-20">
//           <h2 className="sr-only">Order summary</h2>
//           <div className="sticky top-20">
//             <h2 className="text-lg font-medium text-gray-900 mb-6">
//               Your Cart
//             </h2>
//             <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
//               {cartItems.map((item) => (
//                 <li key={item._id} className="flex py-6">
//                   <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-full w-full object-cover object-center"
//                     />
//                   </div>
//                   <div className="ml-4 flex flex-1 flex-col">
//                     <div>
//                       <div className="flex justify-between text-base font-medium text-gray-900">
//                         <h3>{item.name}</h3>
//                         <p className="ml-4">₹{item.price * item.quantity}</p>
//                       </div>
//                       <p className="mt-1 text-sm text-gray-500">
//                         Qty {item.quantity}
//                       </p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <dl className="space-y-4 pt-6 text-sm font-medium text-gray-900">
//               <div className="flex justify-between">
//                 <dt className="text-gray-500">Subtotal</dt>
//                 <dd>₹{cartTotal}</dd>
//               </div>
//               <div className="flex justify-between">
//                 <dt className="text-gray-500 flex items-center gap-2">
//                   Shipping
//                   <TruckIcon className="h-4 w-4 text-gray-400" />
//                 </dt>
//                 <dd>
//                   {shippingCharge === 0 ? (
//                     <span className="text-green-600">Free</span>
//                   ) : (
//                     `₹${shippingCharge}`
//                   )}
//                 </dd>
//               </div>
//               <div className="flex justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-base">Total</dt>
//                 <dd className="text-xl font-bold">₹{totalAmount}</dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>

//       {/* ================= MOBILE BOTTOM SUMMARY & BUTTON ================= */}
//       <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
//         <div className="mb-4 flex items-center justify-between text-base font-medium text-gray-900">
//           <span>Total</span>
//           <span className="text-xl">₹{totalAmount}</span>
//         </div>
//         <button
//           type="button"
//           onClick={handlePlaceOrder}
//           disabled={loading}
//           className="w-full rounded-lg bg-black px-4 py-4 text-base font-bold text-white shadow-sm hover:bg-gray-800 disabled:opacity-70"
//         >
//           {loading
//             ? "Processing..."
//             : paymentMethod === "POD"
//             ? "Place Order"
//             : "Pay Now"}
//         </button>

//         <Popover className="mt-2 flex justify-center">
//           {({ open }) => (
//             <>
//               <Popover.Button className="flex items-center gap-1 text-xs text-gray-500 underline outline-none">
//                 {open ? "Hide Order Details" : "View Order Details"}
//                 <ChevronUpIcon
//                   className={`h-3 w-3 transition-transform ${
//                     open ? "rotate-180" : ""
//                   }`}
//                 />
//               </Popover.Button>
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-200"
//                 enterFrom="opacity-0 translate-y-1"
//                 enterTo="opacity-100 translate-y-0"
//                 leave="transition ease-in duration-150"
//                 leaveFrom="opacity-100 translate-y-0"
//                 leaveTo="opacity-0 translate-y-1"
//               >
//                 <Popover.Panel className="absolute bottom-full left-0 right-0 mb-0 w-full bg-white border-t border-gray-200 px-4 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
//                   <ul className="divide-y divide-gray-100">
//                     {cartItems.map((item) => (
//                       <li key={item._id} className="flex py-3">
//                         <img
//                           src={item.image}
//                           className="h-12 w-12 rounded object-cover"
//                         />
//                         <div className="ml-3 flex-1">
//                           <p className="text-sm font-medium">{item.name}</p>
//                           <p className="text-xs text-gray-500">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                         <p className="text-sm font-medium">
//                           ₹{item.price * item.quantity}
//                         </p>
//                       </li>
//                     ))}
//                   </ul>
//                   <div className="mt-4 flex justify-between text-sm">
//                     <span className="text-gray-500">Subtotal</span>
//                     <span>₹{cartTotal}</span>
//                   </div>
//                   <div className="mt-1 flex justify-between text-sm">
//                     <span className="text-gray-500">Shipping</span>
//                     <span>₹{shippingCharge}</span>
//                   </div>
//                 </Popover.Panel>
//               </Transition>
//             </>
//           )}
//         </Popover>
//       </div>
//       <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
//     </div>
//   );
// };

// export default CheckoutPage;



// updated above code with order summary modal


import React, { useEffect, useState, useRef, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronUpIcon,
  MapPinIcon,
  TruckIcon,
  CreditCardIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import toast, { Toaster } from "react-hot-toast";
import { useGeolocated } from "react-geolocated";

// --- LEAFLET ICON FIX ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const isPaymentSuccess = useRef(false);

  const [address, setAddress] = useState({
    house: "",
    city: "",
    state: "",
    pincode: "",
    lat: null,
    lng: null,
  });

  const [shippingCharge, setShippingCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const API_KEY = "255aa77b6b9940f8a87505f8c7736bbe";
  // Protect route
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      if (!isPaymentSuccess.current) {
        navigate("/cart", { replace: true });
      }
    }
  }, [cartItems, navigate]);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  console.log("Coordinate", coords);

  // --- 1. SCRIPT LOADER ---
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- 2. ONLINE PAYMENT LOGIC (UPDATED) ---
  const startOnlinePayment = async () => {
    setLoading(true);
    isPaymentSuccess.current = false;

    const razorpayKey =
      import.meta.env.VITE_RAZORPAY_KEY || import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      toast.error("Razorpay Key is missing.");
      setLoading(false);
      return;
    }

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load.");
        setLoading(false);
        return;
      }

      // 1. Create Order on Backend
      const res = await api.post("/order/place");

      if (!res.data || !res.data.rzpOrder) {
        throw new Error("Invalid response from server");
      }

      const options = {
        key: razorpayKey,
        amount: res.data.rzpOrder.amount,
        currency: "INR",
        name: "Mandharam Drapes",
        order_id: res.data.rzpOrder.id,

        // --- UPDATED SUCCESS HANDLER ---
        handler: async (response) => {
          // A. Mark as success immediately so 'ondismiss' doesn't run
          isPaymentSuccess.current = true;
          toast.success("Payment Successful! Processing...");

          try {
            // B. Attempt Backend Verification
            await api.post("/order/verify", response);
            // If we get here, verification worked perfectly
          } catch (err) {
            // C. If verification fails (e.g., network error), LOG IT but DO NOT STOP.
            // The user has already paid, so we must not keep them on Checkout.
            console.error("Verification API Error:", err);
            toast.success("Order Placed! Check 'My Orders' for status.");
          }

          // D. ALWAYS Clear Cart & Redirect (Even if verification had a hiccup)
          if (clearCart) clearCart();

          setAddress({
            house: "",
            city: "",
            state: "",
            pincode: "",
            lat: null,
            lng: null,
          });
          setShippingCharge(0);
          setPosition(null);
          setShowSuccessModal(true);

          // E. Navigate immediately
          
        },

        theme: { color: "#000000" },

        // --- CANCEL HANDLER ---
        modal: {
          ondismiss: async function () {
            if (isPaymentSuccess.current) return; // Don't cancel if successful

            console.log("Payment popup closed");
            try {
              await api.post(`/order/cancel/${res.data.order._id}`);
              toast.error("Payment cancelled.");
            } catch (err) {
              console.error("Cancel failed", err);
            }
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function (response) {
        toast.error("Payment Failed");
        if (!isPaymentSuccess.current) {
          try {
            await api.post(`/order/cancel/${res.data.order._id}`);
          } catch (err) {}
        }
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. GEOLOCATION LOGIC ---
  const handleGetLocation = async() => {
    // if (!navigator.geolocation) {
    //   toast.error("Geolocation not supported");
    //   return;
    // }
    const toastId = toast.loading("Fetching location...");

    // const success = async (pos) => {
      try {
        // console.log('POsition!!!',pos.coords.latitude,pos.coords.longitude);

        setPosition([coords.latitude, coords.longitude]);

        const res = await api.post("/address/save-geo", {
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        const { address: addr, shippingCharge } = res.data;

        console.log('responseee',res.data);

        setAddress({
          house: addr.fullAddress || "",
          city: addr.city || addr.town || addr.village || addr.county || "",
          state: addr.state || "",
          pincode: addr.zipCode || addr.postcode || "",
          lat: coords.latitude,
          lng: coords.longitude,
        });

        setShippingCharge(shippingCharge);
        toast.dismiss(toastId);
        toast.success(`Location set! Shipping: ₹${shippingCharge}`);
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Failed to get address details.");
      }
    // };

    // const error = (err) => {
    //   toast.dismiss(toastId);
    //   if (err.code === 1)
    //     toast.error(
    //       "Location permission denied. Allow access in browser settings."
    //     );
    //   else toast.error("Location unavailable.");
    // };

    // navigator.geolocation.getCurrentPosition(success, error, {
    //   enableHighAccuracy: true,
    // });
  };

  // --- 4. PLACE ORDER HANDLER ---

  // const handlePlaceOrder = async () => {
  //   let finalLat = address.lat;
  //   let finalLng = address.lng;
  //   const isManualAddressFilled =
  //     address.house && address.city && address.pincode;

  //   if ((!finalLat || !finalLng) && isManualAddressFilled) {
  //     finalLat = 20.5937;
  //     finalLng = 78.9629;
  //   }

  //   if (!finalLat || !finalLng) {
  //     toast.error("Please click 'Auto-Detect' OR fill address manually.");
  //     return;
  //   }

  //   if (paymentMethod === "POD") {
  //     try {
  //       setLoading(true);
  //       if (!address.lat) {
  //         try {
  //           await api.post("/address/save-geo", {
  //             latitude: finalLat,
  //             longitude: finalLng,
  //           });
  //         } catch (e) {}
  //       }

  //       await api.post("/order/placeOrderPOD");
  //       isPaymentSuccess.current = true;
  //       toast.success("Order Placed Successfully!");

  //       if (clearCart) clearCart();
  //       setAddress({
  //         house: "",
  //         city: "",
  //         state: "",
  //         pincode: "",
  //         lat: null,
  //         lng: null,
  //       });
  //       setShowSuccessModal(true);

  //     } catch (e) {
  //       toast.error("Order failed. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     if (!address.lat) {
  //       try {
  //         await api.post("/address/save-geo", {
  //           latitude: finalLat,
  //           longitude: finalLng,
  //         });
  //       } catch (e) {}
  //     }
  //     await startOnlinePayment();
  //   }
  // };
  const handlePlaceOrder = async () => {
  let finalLat = address.lat;
  let finalLng = address.lng;
  const isManualAddressFilled =
    address.house && address.city && address.pincode;

  if ((!finalLat || !finalLng) && isManualAddressFilled) {
    finalLat = 20.5937;
    finalLng = 78.9629;
  }

  if (!finalLat || !finalLng) {
    toast.error("Please click 'Auto-Detect' OR fill address manually.");
    return;
  }

  // ================= CASH ON DELIVERY =================
  if (paymentMethod === "POD") {
    let toastId;

    try {
      setLoading(true);

      // 🔄 Show processing toast
      toastId = toast.loading("Processing your order...");

      if (!address.lat) {
        try {
          await api.post("/address/save-geo", {
            latitude: finalLat,
            longitude: finalLng,
          });
        } catch (e) {}
      }

      // ⏳ Small UX delay (1.5 sec)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // ✅ Place COD order
      await api.post("/order/placeOrderPOD");

      // ✅ VERY IMPORTANT (prevents cart redirect bug)
      isPaymentSuccess.current = true;

      // ✅ Clear cart ONLY
      if (clearCart) clearCart();

      // ✅ Close loading toast
      toast.dismiss(toastId);
      toast.success("Order placed successfully!");

      // ✅ Show success modal
      setShowSuccessModal(true);

    } catch (e) {
      if (toastId) toast.dismiss(toastId);
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }

  // ================= ONLINE PAYMENT =================
  } else {
    if (!address.lat) {
      try {
        await api.post("/address/save-geo", {
          latitude: finalLat,
          longitude: finalLng,
        });
      } catch (e) {}
    }
    await startOnlinePayment();
  }
};


  // Ensure cart total handles strings (Context often returns strings like "1000.00")
  const totalAmount = (Number(cartTotal) + Number(shippingCharge)).toFixed(2);

  return (
    // <div className="min-h-screen bg-white font-sans text-gray-900">
    //   <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-24">

    // <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-14 lg:pb-14">

  <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-24">

        {/* ================= LEFT SIDE: FORM ================= */}
        <div className="px-4 pb-24 pt-10 sm:px-6 lg:col-span-7 lg:px-12 lg:pb-12 xl:col-span-7">
          <div className="mb-8 hidden lg:block">
            <span className="font-bold text-black text-3xl ">Checkout</span>
          </div>

          <form>
            {/* Section: Shipping Address */}
            <div className="border-b border-gray-200 pb-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-gray-900">
                  Shipping Address
                </h2>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <MapPinIcon className="h-3.5 w-3.5 text-blue-600" />
                  Auto-Detect Location
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    House / Apartment / Street
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={address.house}
                      onChange={(e) =>
                        setAddress({ ...address, house: e.target.value })
                      }
                      className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50 border"
                      placeholder="e.g. Flat 402, Skyline Apartments"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50 border"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      className="block w-full rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50 border"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pincode
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      className="block w-1/2 rounded-md border-gray-300 px-3 py-3 shadow-sm focus:border-black focus:ring-black sm:text-sm bg-gray-50/50 border"
                    />
                  </div>
                </div>
              </div>

              {/* Map Visualization */}
              {position && (
                <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <div className="h-48 w-full">
                    <MapContainer
                      center={position}
                      zoom={16}
                      className="h-full w-full"
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={position} />
                    </MapContainer>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
                    Location pinned: {position[0].toFixed(4)},{" "}
                    {position[1].toFixed(4)}
                  </div>
                </div>
              )}
            </div>

            {/* Section: Payment Method */}
            <div className="pt-10">
              <h2 className="text-xl font-medium text-gray-900">
                Payment Method
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  onClick={() => setPaymentMethod("Online")}
                  className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
                    paymentMethod === "Online"
                      ? "border-black bg-gray-900 text-white"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Pay Online</span>
                    <CreditCardIcon
                      className={`h-6 w-6 ${
                        paymentMethod === "Online"
                          ? "text-gray-300"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      paymentMethod === "Online"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Credit Card, UPI, Netbanking
                  </p>
                </div>

                <div
                  onClick={() => setPaymentMethod("POD")}
                  className={`relative cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${
                    paymentMethod === "POD"
                      ? "border-black bg-gray-900 text-white"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Cash on Delivery</span>
                    <BanknotesIcon
                      className={`h-6 w-6 ${
                        paymentMethod === "POD"
                          ? "text-gray-300"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      paymentMethod === "POD"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Pay when you receive
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button (Desktop) */}
            <div className="mt-10 hidden border-t border-gray-200 pt-6 lg:block">
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full rounded-lg bg-black px-4 py-4 text-base font-semibold text-white shadow-md hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "POD"
                  ? `Place Order — ₹${totalAmount}`
                  : `Pay Now — ₹${totalAmount}`}
              </button>
            </div>
          </form>
        </div>

        {/* ================= RIGHT SIDE: SUMMARY (Desktop) ================= */}
        <div className="hidden bg-gray-50 lg:col-span-5 lg:block lg:min-h-screen lg:border-l lg:border-gray-200 lg:px-8 lg:pt-10 xl:col-span-5 xl:pt-20">
          <h2 className="sr-only">Order summary</h2>
          <div className="sticky top-20">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Your Cart
            </h2>
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cartItems.map((item) => (
                <li key={item._id} className="flex py-6">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₹{item.price * item.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="space-y-4 pt-6 text-sm font-medium text-gray-900">
              <div className="flex justify-between">
                <dt className="text-gray-500">Subtotal</dt>
                <dd>₹{cartTotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 flex items-center gap-2">
                  Shipping
                  <TruckIcon className="h-4 w-4 text-gray-400" />
                </dt>
                <dd>
                  {shippingCharge === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${shippingCharge}`
                  )}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <dt className="text-base">Total</dt>
                <dd className="text-xl font-bold">₹{totalAmount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM SUMMARY & BUTTON ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
        <div className="mb-4 flex items-center justify-between text-base font-medium text-gray-900">
          <span>Total</span>
          <span className="text-xl">₹{totalAmount}</span>
        </div>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-4 text-base font-bold text-white shadow-sm hover:bg-gray-800 disabled:opacity-70"
        >
          {loading
            ? "Processing..."
            : paymentMethod === "POD"
            ? "Place Order"
            : "Pay Now"}
        </button>

        <Popover className="mt-2 flex justify-center">
          {({ open }) => (
            <>
              <Popover.Button className="flex items-center gap-1 text-xs text-gray-500 underline outline-none">
                {open ? "Hide Order Details" : "View Order Details"}
                <ChevronUpIcon
                  className={`h-3 w-3 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute bottom-full left-0 right-0 mb-0 w-full bg-white border-t border-gray-200 px-4 py-6 shadow-2xl max-h-[60vh] overflow-y-auto">
                  <ul className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <li key={item._id} className="flex py-3">
                        <img
                          src={item.image}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          ₹{item.price * item.quantity}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>₹{shippingCharge}</span>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>

      {showSuccessModal && (
 <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">

      {/* Icon */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-pink-500">
        <svg
          className="h-8 w-8 text-pink-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-gray-900">
        Your Order is Confirmed!
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        We’ll send you a shipping confirmation as soon as your order ships.
      </p>

      <button
        onClick={() => navigate("/myorders")}
        className="mt-6 w-full rounded-lg bg-pink-600 px-4 py-3 font-semibold text-white hover:bg-pink-700 transition"
      >
        CHECK STATUS
      </button>
    </div>
  </div>
)}

      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </div>
  );
};

export default CheckoutPage;
