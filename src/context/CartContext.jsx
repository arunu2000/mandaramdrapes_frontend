// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';
// // Assuming domainUrl is defined globally or imported from a config file


// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// // Provider Component
// export const CartProvider = ({ children }) => {
//     // 1. STATE MANAGEMENT (Now includes loading/error)
//     const [cartItems, setCartItems] = useState([]);
//     const [cartTotal, setCartTotal] = useState(0);
//     const [loading, setLoading] = useState(true); // Tracks initial fetch/actions
//     const [error, setError] = useState(null);

//     // Helper to get the auth token
//     const getToken = () => localStorage.getItem("token");

//     // 2. FETCH FUNCTION (The core function to get data from the backend)
//     const fetchCart = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const token = getToken();
//             if (!token) {
//                 // Handle case where user isn't logged in (cart is locally empty)
//                 setCartItems([]);
//                 setCartTotal(0);
//                 setLoading(false);
//                 return;
//             }

//             const res = await axios.get(`${domainUrl}/cart/list`, { 

//         //                             ^-- ADD /api HERE
//             headers: { Authorization: `Bearer ${token}` }
//         });
     
        

//             // The backend returns populated items in res.data.cart.items
//             const backendCart = res.data.cart;
            
//             // Map backend structure to a cleaner frontend structure
//             const newCartItems = backendCart.items.map(item => ({

//                 _id: item._id, // This is the unique Mongoose Cart Line Item ID
//                 productId: item.product._id, // Add the original product ID for convenience
//                 name: item.product.name,
//                 price: item.product.price,
//                 image: item.product.image,
//                 quantity: item.quantity,
//                 selectedSize: item.selectedSize || null,
               
//                 // Assuming selectedSize isn't used in your Mongoose schema yet, 
//                 // but keep it if you add it later: selectedSize: item.selectedSize, 
//             }));

//             // console.log("aaaaaaaaaaaaa",newCartItems)
//     // Use the populated product details (item.product.propertyName)
    
//     // Use the Mongoose Cart Item ID (line item ID) for the key, as it's truly unique
//     // If you need the original product ID for routing, add it as a separate property.
    
//     // We will use the line item ID for now to fix the key issue (see section 2)
//      // Include size if your Mongoose model supports it


//             setCartItems(newCartItems);
//             setCartTotal(res.data.cart.totalAmount.toFixed(2)); // Use total from backend
//             // console.log("total amount",res.data.cart.totalAmount)
//         } catch (err) {
//             console.error("Failed to fetch cart:", err);
//             setError("Could not load cart data. Please try again.");
//             setCartItems([]);
//         } finally {
//             setLoading(false);
//         }
//     }, []); 
    
//     // 3. EFFECT: Fetch cart on component mount
//     useEffect(() => {
//         fetchCart();
//     }, [fetchCart]);


//     // 4. ACTION: Add to Cart (Used by ProductDetailPage)
//     // NOTE: ProductDetailPage already does the API call, but we MUST re-fetch 
//     // the cart afterwards to update the state.
//     const syncCartAfterAction = async () => {
//         // You can add more optimistic UI updates here, but for simplicity, we re-fetch everything
//         await fetchCart();
//     };

//     // 5. ACTION: Remove from Cart
//     const removeFromCart = async (productId) => {
//         setLoading(true);
//         // Implement the backend API call to remove the item here
//         try {
//             const token = getToken();
//             await axios.delete(`${domainUrl}/cart/remove/${productId}`, { // Assume you create a /cart/remove/:id route
//                  headers: { Authorization: `Bearer ${token}` }
//             });
//             await fetchCart(); // Re-fetch the updated list
//         } catch(err) {
//             console.error("Error removing item:", err);
//             setLoading(false);
//         }
//     };
    
//     // 6. ACTION: Update Quantity
//     const updateQuantity = async (productId, newQuantity) => {
//         if (newQuantity <= 0) {
//              removeFromCart(productId);
//              return;
//         }
//         setLoading(true);
//         // Implement the backend API call to update quantity here
//         try {
//             const token = getToken();
//             await axios.put(`${domainUrl}/cart/update`, { // Assume you create a /cart/update route
//                 productId, 
//                 quantity: newQuantity
//             }, {
//                  headers: { Authorization: `Bearer ${token}` }
//             });
//             await fetchCart(); // Re-fetch the updated list
//         } catch(err) {
//             console.error("Error updating quantity:", err);
//             setLoading(false);
//         }
//     };

//     const placeOrder = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//         const token = getToken();
//         if (!token) {
//             throw new Error("User not authenticated.");
//         }

//         //  API route must match your backend setup: /api/cart/place
//         const response = await axios.post(`${domainUrl}/order/place`, {}, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
        
//         // After placing the order, clear the frontend cart state
//         setCartItems([]);
//         setCartTotal(0);
//         console.log("order res",response.data)
//         return response.data; // Return order details
//     } catch (err) {
//         console.error("Error placing order:", err);
//         setError("Failed to place order. Please try again.");
//         throw err;
//     } finally {
//         setLoading(false);
//     }
// };


//     return (
//         <CartContext.Provider value={{ 
//             cartItems, 
//             loading, 
//             error,
//             cartTotal,
//             fetchCart, // Expose fetchCart so other components can refresh the cart
//             syncCartAfterAction, // Use this in ProductDetailPage after successful add
//             removeFromCart, 
//             updateQuantity,
//             placeOrder
//         }}>
//             {children}
//         </CartContext.Provider>
//     );
// };


// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// // Provider Component
// export const CartProvider = ({ children }) => {
//     // 1. STATE MANAGEMENT
//     const [cartItems, setCartItems] = useState([]);
//     const [cartTotal, setCartTotal] = useState(0);
//     const [loading, setLoading] = useState(true); 
//     const [error, setError] = useState(null);

//     const getToken = () => localStorage.getItem("token");

//     // 2. FETCH FUNCTION (The core function to get data from the backend)
//     const fetchCart = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const token = getToken();
//             if (!token) {
//                 setCartItems([]);
//                 setCartTotal(0);
//                 setLoading(false);
//                 return;
//             }
            
//             // NOTE: URL path adjusted based on your common API structure
//             const res = await axios.get(`${domainUrl}/cart/list`, { 
//                 headers: { Authorization: token }
//             });
          
//             // const backendCart = res.data.cart;

//             const backendCart = res.data.cart || { items: [], totalAmount: 0 };

            
//             // Map backend structure to a cleaner frontend structure
//             // 
//             const newCartItems = backendCart?.items?.map(item => ({
//                 _id: item._id, // Mongoose Cart Line Item ID (unique for React key)
//                 productId: item.product._id, // Product ID (used for API calls)
//                 name: item.product.name,
//                 price: item.product.price,
//                 image: item.product.image,
//                 quantity: item.quantity,
//                 selectedSize: item.selectedSize || null,
//             }));

//             setCartItems(newCartItems);
//             // Ensure cartTotal is a string representation of a float for display
//             // setCartTotal(parseFloat(backendCart.totalAmount).toFixed(2)); 
//             setCartTotal(parseFloat(backendCart?.totalAmount || 0).toFixed(2));

//         } catch (err) {
//             console.error("Failed to fetch cart:", err.response?.data || err.message);
//             setError("Could not load cart data. Please ensure you are logged in.");
//             setCartItems([]);
//         } finally {
//             setLoading(false);
//         }
//     }, []); 
    
//     // 3. EFFECT: Fetch cart on component mount
//     useEffect(() => {
//         fetchCart();
//     }, [fetchCart]);


//     // 4. ACTION: Remove from Cart
//     // Accepts the Product ID which is required by your assumed backend route: /cart/remove/:productId
//     const removeFromCart = async (productId) => { 
//         setLoading(true);
//         try {
//             const token = getToken();
//             // Assuming backend route is /api/cart/remove/:productId
//             await axios.delete(`${domainUrl}/cart/remove/${productId}`, { 
//                  headers: { Authorization: `Bearer ${token}` }
//             });
//             await fetchCart(); // Re-fetch the updated list
//         } catch(err) {
//             console.log("Error removing item:", err.response?.data || err.message);
    
//             setLoading(false);
//         }
//     };
    
//     // 5. ACTION: Update Quantity
//     // Accepts the Product ID and the new quantity
//     const updateQuantity = async (productId, newQuantity) => { 
//         if (newQuantity <= 0) {
//               removeFromCart(productId);
//               return;
//         }
//         setLoading(true);
//         // Optimistic update for faster UI response (optional, but good practice)
//         setCartItems(currentItems => currentItems.map(item => 
//             item.productId === productId ? { ...item, quantity: newQuantity } : item
//         ));

//         try {
//             const token = getToken();
//             // Assuming backend route is /api/cart/update
//             await axios.put(`${domainUrl}/cart/updateQuantity/${productId}`, { 
                
//                 quantity: newQuantity
//             }, {
//                  headers: { Authorization: token }
//             });
//             // Re-fetch to get the official, recalculated total amount from the backend
//             await fetchCart(); 
//         } catch(err) {
//             console.log("Error updating quantity:", err.response);
            
//             setLoading(false);
//             // Re-fetch to revert to the correct server state if the update failed
//             fetchCart(); 
//         }
//     };

//     const placeOrder = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const token = getToken();
//             if (!token) {
//                 throw new Error("User not authenticated.");
//             }

//             // Assuming API route is /api/order/place
//             const response = await axios.post(`${domainUrl}/order/place`, {}, {
//                 headers: { Authorization: token }
//             });
            
//             // After placing the order, clear the frontend cart state
//             setCartItems([]);
//             setCartTotal(0);
//             console.log("response of placeOrder",response.data)
//             return response.data;
            

//         } catch (err) {
//             console.error("Error placing order:", err.response?.data || err.message);
//             setError("Failed to place order. Please try again.");
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <CartContext.Provider value={{ 
//             cartItems, 
//             loading, 
//             error,
//             cartTotal,
//             fetchCart, 
//             removeFromCart, 
//             updateQuantity,
//             placeOrder
//         }}>
//             {children}
//         </CartContext.Provider>
//     );
// };



// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// // Provider Component
// export const CartProvider = ({ children }) => {
//     // 1. STATE MANAGEMENT
//     const [cartItems, setCartItems] = useState([]);
//     const [cartTotal, setCartTotal] = useState(0);
//     const [loading, setLoading] = useState(true); 
//     const [error, setError] = useState(null);

//     const getToken = () => localStorage.getItem("token");

//     // 2. FETCH FUNCTION
//     const fetchCart = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const token = getToken();
//             if (!token) {
//                 setCartItems([]);
//                 setCartTotal(0);
//                 setLoading(false);
//                 return;
//             }
            
//             const res = await axios.get(`${domainUrl}/cart/list`, { 
//                 headers: { Authorization: token }
//             });
          
//             const backendCart = res.data.cart || { items: [], totalAmount: 0 };

//             const newCartItems = backendCart?.items?.map(item => ({
//                 _id: item._id, 
//                 productId: item.product._id, 
//                 name: item.product.name,
//                 price: item.product.price,
//                 image: item.product.image,
//                 quantity: item.quantity,
//                 selectedSize: item.selectedSize || null,
//             }));

//             setCartItems(newCartItems);
//             setCartTotal(parseFloat(backendCart?.totalAmount || 0).toFixed(2));

//         } catch (err) {
//             console.error("Failed to fetch cart:", err.response?.data || err.message);
//             setError("Could not load cart data. Please ensure you are logged in.");
//             setCartItems([]);
//         } finally {
//             setLoading(false);
//         }
//     }, []); 
    
//     // 3. EFFECT: Fetch cart on component mount
//     useEffect(() => {
//         fetchCart();
//     }, [fetchCart]);


//     // 4. ACTION: Remove from Cart
//     const removeFromCart = async (productId) => { 
//         setLoading(true);
//         try {
//             const token = getToken();
//             await axios.delete(`${domainUrl}/cart/remove/${productId}`, { 
//                  headers: { Authorization: `Bearer ${token}` }
//             });
//             await fetchCart(); 
//         } catch(err) {
//             console.log("Error removing item:", err.response?.data || err.message);
//             setLoading(false);
//         }
//     };
    
//     // 5. ACTION: Update Quantity 
//     const updateQuantity = async (productId, newQuantity) => { 
//         if (newQuantity <= 0) {
//             removeFromCart(productId);
//             return;
//         }
        
//         setCartItems(currentItems => currentItems.map(item => 
//             item.productId === productId ? { ...item, quantity: newQuantity } : item
//         ));

//         try {
//             const token = getToken();
//             await axios.put(`${domainUrl}/cart/updateQuantity/${productId}`, { 
//                 quantity: newQuantity
//             }, {
//                 headers: { Authorization: token }
//             });
            
//             fetchCart(); 
            
//         } catch(err) {
//             console.log("Error updating quantity:", err.response);
//             fetchCart(); 
//         }
//     };

//     // 6. ACTION: Place Order (FIXED: Removed local state clearing)
//     const placeOrder = async () => {
//         try {
//             const token = getToken();
//             if (!token) {
//                 throw { message: "User not authenticated." }; 
//             }

//             const response = await axios.post(`${domainUrl}/order/place`, {}, {
//                 headers: { Authorization: token }
//             });
            
//             // State clearing removed to prevent the "Empty Cart" message flash 
//             // while the success toast is still visible.
            
//             return response.data; 

//         } catch (err) {
//             console.error("Error placing order:", err.response?.data || err.message);
//             throw err.response?.data || err; 
//         }
//     };

//     return (
//         <CartContext.Provider value={{ 
//             cartItems, 
//             loading, 
//             error,
//             cartTotal,
//             fetchCart, 
//             removeFromCart, 
//             updateQuantity,
//             placeOrder
//         }}>
//             {children}
//         </CartContext.Provider>
//     );
// };



// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// // Provider Component
// export const CartProvider = ({ children }) => {
//     // 1. STATE MANAGEMENT
//     const [cartItems, setCartItems] = useState([]);
//     const [cartTotal, setCartTotal] = useState(0);
//     const [loading, setLoading] = useState(true); 
//     const [error, setError] = useState(null);

//     const getToken = () => localStorage.getItem("token");

//     // 2. FETCH FUNCTION
//     const fetchCart = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const token = getToken();
//             if (!token) {
//                 setCartItems([]);
//                 setCartTotal(0);
//                 setLoading(false);
//                 return;
//             }
            
//             const res = await axios.get(`${domainUrl}/cart/list`, { 
//                 headers: { Authorization: token }
//             });
          
//             const backendCart = res.data.cart || { items: [], totalAmount: 0 };

//             const newCartItems = backendCart?.items?.map(item => ({
//                 _id: item._id, 
//                 productId: item.product._id, 
//                 name: item.product.name,
//                 price: item.product.price,
//                 image: item.product.image,
//                 quantity: item.quantity,
//                 selectedSize: item.selectedSize || null,
//             }));

//             setCartItems(newCartItems);
//             setCartTotal(parseFloat(backendCart?.totalAmount || 0).toFixed(2));

//         } catch (err) {
//             console.error("Failed to fetch cart:", err.response?.data || err.message);
//             setError("Could not load cart data. Please ensure you are logged in.");
//             setCartItems([]);
//         } finally {
//             setLoading(false);
//         }
//     }, []); 
    
//     // 3. EFFECT: Fetch cart on component mount
//     useEffect(() => {
//         fetchCart();
//     }, [fetchCart]);


//     // 4. ACTION: Remove from Cart
//     const removeFromCart = async (productId) => { 
//         setLoading(true);
//         try {
//             const token = getToken();
//             await axios.delete(`${domainUrl}/cart/remove/${productId}`, { 
//                  headers: { Authorization: `Bearer ${token}` }
//             });
//             await fetchCart(); 
//         } catch(err) {
//             console.log("Error removing item:", err.response?.data || err.message);
//             setLoading(false);
//         }
//     };
    
//     // 5. ACTION: Update Quantity 
//     const updateQuantity = async (productId, newQuantity) => { 
//         if (newQuantity <= 0) {
//             removeFromCart(productId);
//             return;
//         }
        
//         setCartItems(currentItems => currentItems.map(item => 
//             item.productId === productId ? { ...item, quantity: newQuantity } : item
//         ));

//         try {
//             const token = getToken();
//             await axios.put(`${domainUrl}/cart/updateQuantity/${productId}`, { 
//                 quantity: newQuantity
//             }, {
//                 headers: { Authorization: token }
//             });
            
//             fetchCart(); 
            
//         } catch(err) {
//             console.log("Error updating quantity:", err.response);
//             fetchCart(); 
//         }
//     };

//     // 6. ACTION: Place Order 
//     const placeOrder = async () => {
//         try {
//             const token = getToken();
//             if (!token) {
//                 throw { message: "User not authenticated." }; 
//             }

//             const response = await axios.post(`${domainUrl}/order/place`, {}, {
//                 headers: { Authorization: token }
//             });
            
//             return response.data; 

//         } catch (err) {
//             console.error("Error placing order:", err.response?.data || err.message);
//             throw err.response?.data || err; 
//         }
//     };
    
//     // 7. ACTION: Clear Cart Locally (NEW)
//     const clearCart = () => {
//         setCartItems([]);
//         setCartTotal(0);
//     };

//     return (
//         <CartContext.Provider value={{ 
//             cartItems, 
//             loading, 
//             error,
//             cartTotal,
//             fetchCart, 
//             removeFromCart, 
//             updateQuantity,
//             placeOrder,
//             clearCart // <--- EXPORTED
//         }}>
//             {children}
//         </CartContext.Provider>
//     );
// };









import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { domainUrl } from '../utils/constant';

// NOTE: Since this code is presented in isolation, we must define the imports
// that would typically come from external files/packages.
// const domainUrl = "https://your-api-domain.com"; // Mocked external constant
const useAuth = () => ({ userId: 'mock-user-id' }); // Mocked auth hook for context purposes

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Provider Component
export const CartProvider = ({ children }) => {
    // Utility to read token
    const getToken = () => localStorage.getItem("token");

    // 1. STATE MANAGEMENT
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    
    // --- FIX: REACTIVITY TRIGGER STATE ---
    // Tracks the current authentication status to trigger useEffect re-runs.
    const [tokenStatus, setTokenStatus] = useState(getToken() ? 'ready' : 'none');
    // ------------------------------------

    // --- FIX: REACTIVITY TRIGGER FUNCTION ---
    /**
     * MUST be called by the login/logout components after they change the token 
     * in localStorage to force a cart refresh.
     */
    const notifyAuthChange = useCallback(() => {
        const tokenExists = !!getToken();
        setTokenStatus(tokenExists ? 'ready' : 'none');
    }, []);
    // ----------------------------------------


    // 2. FETCH FUNCTION
    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        const token = getToken();

        // 1. Check for token availability first
        if (!token) {
            console.log("No token found. Setting cart to empty.");
            setCartItems([]);
            setCartTotal(0);
            setLoading(false);
            return;
        }

        console.log("Token found. Attempting to fetch cart...");
        
        try {
            const res = await axios.get(`${domainUrl}/cart/list`, { 
                headers: { Authorization: `Bearer ${token}` } // Added 'Bearer ' which is standard
            });
            
            const backendCart = res.data.cart || { items: [], totalAmount: 0 };

            const newCartItems = backendCart?.items?.map(item => ({
                _id: item._id, 
                // Ensure you handle potential null product objects (e.g., if a product was deleted)
                productId: item.product?._id, 
                name: item.product?.name,
                price: item.product?.price,
                image: item.product?.image,
                quantity: item.quantity,
                selectedSize: item.selectedSize || null,
            })).filter(item => item.productId); // Filter out items with deleted products

            setCartItems(newCartItems);
            setCartTotal(parseFloat(backendCart?.totalAmount || 0).toFixed(2));

        } catch (err) {
            console.error("Failed to fetch cart:", err.response?.data || err.message);
            setError("Could not load cart data. Please ensure you are logged in.");
            setCartItems([]);
            // On failure, if the error is 401/403, you might want to force a logout/token clear
        } finally {
            setLoading(false);
        }
    }, []); // fetchCart now has no dependencies, making it stable

    // 3. EFFECT: Fetch cart on component mount AND whenever authentication status changes.
    useEffect(() => {
        // This effect will run on mount, and whenever notifyAuthChange is called.
        fetchCart();
    }, [fetchCart, tokenStatus]); // <-- FIX: DEPENDENCY ADDED

    
    // 4. ACTION: Remove from Cart
    const removeFromCart = async (productId) => { 
        setLoading(true);
        try {
            const token = getToken();
            await axios.delete(`${domainUrl}/cart/remove/${productId}`, { 
                 headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCart(); 
        } catch(err) {
            console.log("Error removing item:", err.response?.data || err.message);
            setLoading(false);
        }
    };
    
    // 5. ACTION: Update Quantity 
    const updateQuantity = async (productId, newQuantity) => { 
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        // Optimistic UI Update (optional but good practice)
        setCartItems(currentItems => currentItems.map(item => 
            item.productId === productId ? { ...item, quantity: newQuantity } : item
        ));

        try {
            const token = getToken();
            await axios.put(`${domainUrl}/cart/updateQuantity/${productId}`, { 
                quantity: newQuantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Re-fetch to get the official, recalculated total from the backend
            fetchCart(); 
            
        } catch(err) {
            console.log("Error updating quantity:", err.response);
            // Revert optimistic update and fetch old data on error
            fetchCart(); 
        }
    };

    // 6. ACTION: Place Order 
    const placeOrder = async () => {
        try {
            const token = getToken();
            if (!token) {
                throw { message: "User not authenticated." }; 
            }

            const response = await axios.post(`${domainUrl}/order/place`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            return response.data; 

        } catch (err) {
            console.error("Error placing order:", err.response?.data || err.message);
            throw err.response?.data || err; 
        }
    };
    
    // 7. ACTION: Clear Cart Locally (NEW)
    const clearCart = () => {
        setCartItems([]);
        setCartTotal(0);
    };

    const contextValue = useMemo(() => ({
        cartItems, 
        loading, 
        error,
        cartTotal,
        fetchCart, 
        removeFromCart, 
        updateQuantity,
        placeOrder,
        clearCart,
        notifyAuthChange, // <-- EXPORTED FIX
    }), [cartItems, loading, error, cartTotal, fetchCart, removeFromCart, updateQuantity, placeOrder, clearCart, notifyAuthChange]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

