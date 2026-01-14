import React from "react";
// import toast from "react-hot-toast";
import toast, { Toaster, } from 'react-hot-toast';
import api from "../utils/api";
import { useNavigate } from "react-router-dom";


const OrderSummary = ({ cartItems, cartTotal, shippingCharge ,paymentMethod,setPaymentMethod,}) => {
    const navigate = useNavigate();


    const [loading, setLoading] = React.useState(false);


 const handlePlaceOrder = async () => {
  if (shippingCharge === 0) {
    toast.error("Please select delivery location");
    return;
  }

  try {
    if (paymentMethod === "COD") {
      const res = await api.post("/order/place-cod", {
        shippingCharge,
      });

      toast.success("Order placed with Cash on Delivery");
      navigate("/order-success");
    } else {
      toast.success("Redirecting to payment gateway");
      // Razorpay will be added next
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Order failed");
  }
};



  return (
    <div className="bg-gray-50 border rounded-lg p-6 h-fit sticky top-20">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <ul className="space-y-2 text-sm">
        {cartItems.map((item) => (
          <li key={item._id} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>


      <div className="mt-4 space-y-2">
  <h3 className="text-sm font-medium text-gray-700">Payment Method</h3>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="paymentMethod"
      value="ONLINE"
      checked={paymentMethod === "ONLINE"}
      onChange={() => setPaymentMethod("ONLINE")}
    />
    <span>Online Payment</span>
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="paymentMethod"
      value="COD"
      checked={paymentMethod === "COD"}
      onChange={() => setPaymentMethod("COD")}
    />
    <span>Cash on Delivery</span>
  </label>
</div>


      <div className="border-t mt-4 pt-4 space-y-2 text-sm">
  <div className="flex justify-between">
    <span>Subtotal</span>
    <span>₹{cartTotal}</span>
  </div>

  <div className="flex justify-between">
    <span>Shipping</span>
    <span>₹{shippingCharge}</span>
  </div>

  <div className="flex justify-between font-semibold text-base">
    <span>Total</span>
    <span>₹{cartTotal + shippingCharge}</span>
  </div>
</div>


     <button
  onClick={handlePlaceOrder}
  disabled={loading}
  className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
>
  {paymentMethod === "COD" ? "Place Order (COD)" : "Pay Now"}
</button>

<Toaster
                          position="top-right"
                          toastOptions={{
                            duration: 2000,
                            style: {
                              borderRadius: "10px",
                              fontFamily: "Inter, sans-serif",
                            },
                          }}
                        />

    </div>
    
  );
};

export default OrderSummary;
