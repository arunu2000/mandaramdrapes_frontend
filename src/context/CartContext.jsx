
/// working code 


import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
// import { toast } from "react-toastify"; // Note: CheckoutPage uses 'react-hot-toast'. Try to stick to one library.
import api from "../utils/api";
import toast, { Toaster, } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- FETCH CART ---
  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/cart/list");
      const backendCart = res.data.cart || { items: [], totalAmount: 0 };

      const newCartItems = backendCart?.items
        ?.map((item) => ({
          _id: item._id,
          productId: item.product?._id,
          name: item.product?.name,
          price: item.product?.price,
          image: item.product?.image,
          stock: item.product?.stock ?? 0,
          quantity: item.quantity,
          selectedSize: item.selectedSize || null,
        }))
        .filter((item) => item.productId) || [];

      setCartItems(newCartItems);
      setCartTotal(parseFloat(backendCart?.totalAmount || 0).toFixed(2));
    } catch (err) {
      console.log("Cart fetch error: ", err.response?.status);
      if (err.response?.status === 401) {
        setCartItems([]);
        setCartTotal(0);
      }
      setError("Could not load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // --- ADD TO CART ---
  const addToCart = useCallback(async (productId, options = {}) => {
    const { quantity = 1, selectedSize = null } = options;
    setLoading(true);
    try {
      const resp = await api.post("/cart/add", {
        productId,
        quantity,
        selectedSize,
      });

      if (resp.data)
        //  {
        // toast.success("Added to cart 🛒", {
        //   autoClose: 1500,
        //   position: "top-right",
        // });
      // }
      await fetchCart();
      return resp;
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to add to cart"),{id:"faileed to add cart"};
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  // --- REMOVE FROM CART ---
  const removeFromCart = useCallback(async (productId) => {
    setLoading(true);
    try {
      await api.delete(`/cart/remove/${productId}`);
      await fetchCart();
      toast.info("Item removed"),{id:"item removed"};
    } catch (err) {
      console.error("Remove error:", err.response?.data);
      setLoading(false);
    }
  }, [fetchCart]);

  // --- UPDATE QUANTITY ---
  // const updateQuantity = useCallback(async (productId, newQuantity) => {
  //   if (newQuantity <= 0) return;

  //   // Optimistic UI update for speed
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.productId === productId ? { ...item, quantity: newQuantity } : item
  //     )
  //   );

  //   try {
  //     await api.put(`/cart/updateQuantity/${productId}`, {
  //       quantity: newQuantity,
  //     });
  //     // We fetch cart again to ensure totals are correct from backend logic
  //     fetchCart();
  //   } catch (err) {
  //     console.error("Update qty error:", err.response);
  //     fetchCart(); // Revert on error
  //   }
  // }, [fetchCart]);


  const updateQuantity = useCallback(async (productId, newQuantity) => {
  if (newQuantity <= 0) return;

  // 1️⃣ Optimistic UI update (FAST)
  setCartItems((prev) =>
    prev.map((item) =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    )
  );

  // 2️⃣ Update total locally (NO LOADING)
  setCartTotal((prevTotal) => {
    const item = cartItems.find(i => i.productId === productId);
    if (!item) return prevTotal;

    const diff = (newQuantity - item.quantity) * item.price;
    return (parseFloat(prevTotal) + diff).toFixed(2);
  });

  try {
    // 3️⃣ Silent backend sync
    await api.put(`/cart/updateQuantity/${productId}`, {
      quantity: newQuantity,
    });
  } catch (err) {
    console.error("Update qty error:", err.response);
    // 4️⃣ Rollback ONLY on error
    fetchCart();
  }
}, [cartItems, fetchCart]);


  // --- CLEAR CART (Used in CheckoutPage) ---
  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartTotal(0);
    // Optionally: If your backend has a specific 'clear cart' endpoint, call it here.
    // Usually, placing an order automatically clears the backend cart, 
    // so we just clear the Frontend UI here.
  }, []);

  const contextValue = useMemo(
    () => ({
      cartItems,
      cartTotal,
      loading,
      error,
      fetchCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart, // <--- Exposed to the app
    }),
    [
      cartItems,
      cartTotal,
      loading,
      error,
      fetchCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
