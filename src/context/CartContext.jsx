// import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';

// // 1. Create the Context object
// const CartContext = createContext();

// // 2. Custom Hook: The main way components consume the cart data.
// //    ***CRITICAL FIX: Exporting the hook is mandatory.***
// export const useCart = () => {
//     const context = useContext(CartContext);
    
//     // Safety check: Throws a descriptive error if the hook is used outside the provider.
//     if (context === undefined) {
//         throw new Error('useCart must be used within a CartProvider. Please wrap your application (e.g., in App.jsx or main.jsx) with <CartProvider>.');
//     }
    
//     return context;
// };

// // 3. The Provider Component: Manages the cart state and logic.1    
// //    ***CRITICAL FIX: Exporting the provider is mandatory.***
// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);
//     const navigate = useNavigate();

//     // Logic to add an item to the cart, handling duplicates (same ID AND size/variant)
//     const addToCart = useCallback((itemToAdd) => {
//         setCartItems(prevItems => {
//             // Check if an item with the same ID AND selected size already exists
//             // We use 'selectedSize' to differentiate between S and M of the same shoe/shirt
//             const exists = prevItems.find(i => 
//                 i._id === itemToAdd._id && i.selectedSize === itemToAdd.selectedSize
//             );

//             if (exists) {
//                 // If it exists, update its quantity
//                 return prevItems.map(i =>
//                     i === exists 
//                         ? { ...i, quantity: i.quantity + itemToAdd.quantity } 
//                         : i
//                 );
//             } else {
//                 // If it's new, add it to the cart list
//                 return [...prevItems, itemToAdd];
//             }
//         });
        
//         // Navigate to the cart page immediately after adding the item
//         navigate('/cart');
//     }, [navigate]);
    
//     // Function to remove an item completely from the cart
//     const removeFromCart = useCallback((id, size) => {
//         setCartItems(prevItems => 
//             // Filter out the item that matches both the product ID and the selected size
//             prevItems.filter(item => !(item._id === id && item.selectedSize === size))
//         );
//     }, []);
    
//     // Function to adjust the quantity of an item
//     const updateQuantity = useCallback((id, size, newQuantity) => {
//         setCartItems(prevItems => {
//             return prevItems.map(item => {
//                 if (item._id === id && item.selectedSize === size) {
//                     const finalQuantity = Math.max(1, newQuantity); // Ensure quantity is >= 1
//                     return { ...item, quantity: finalQuantity };
//                 }
//                 return item;
//             });
//         });
//     }, []);
    
//     // Calculate the total number of unique items and total price (optional, but useful)
//     const totalItems = useMemo(() => 
//         cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]
//     );

//     const cartTotal = useMemo(() => 
//         cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2), [cartItems]
//     );

//     // Provide the state and functions to all consumers
//     const contextValue = useMemo(() => ({
//         cartItems,
//         totalItems,
//         cartTotal,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//     }), [cartItems, totalItems, cartTotal, addToCart, removeFromCart, updateQuantity]);

//     return (
//         <CartContext.Provider value={contextValue}>
//             {children}
//         </CartContext.Provider>
//     );
// };


// import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'; // Added useEffect
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios for API calls

// // NOTE: You will replace this with your actual Authentication Context hook (e.g., useAuth)
// // For now, we'll use a placeholder for the backend to identify the user.
// const BACKEND_BASE_URL = "http://192.168.29.217:5000";
// const AUTH_TOKEN = 'YOUR_JWT_TOKEN_HERE'; // Replace with dynamic token from authentication
// const USER_ID = 'DUMMY_USER_ID'; // Replace with actual user ID

// const CartContext = createContext();

// export const useCart = () => {
//     // ... (rest of your useCart hook remains the same)
//     const context = useContext(CartContext);
//     if (context === undefined) {
//         throw new Error('useCart must be used within a CartProvider.');
//     }
//     return context;
// };

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);
//     const navigate = useNavigate();

//     // ----------------------------------------------------
//     //  NEW: Function to synchronize state with the server
//     // ----------------------------------------------------
//     const syncServerCart = async (cartItems) => {
//         try {
//             // Your API might expect the cart content in a certain format
//             const cartData = {
//                 userId: USER_ID, 
//                 items: cartItems.map(item => ({
//                     productId: item._id,
//                     quantity: item.quantity,
//                     size: item.selectedSize // or whatever variant data you use
//                 }))
//             };

//             await axios.post(
//                 `${BACKEND_BASE_URL}/api/cart`,
//                 cartData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${AUTH_TOKEN}` // Essential for auth
//                     }
//                 }
//             );
//             // Success: Server cart is updated
//         } catch (error) {
//             console.error("Failed to sync cart with backend:", error);
//             // Optional: Show error to user or log out
//         }
//     };
    
//     // ----------------------------------------------------
//     // 🔑 UPDATED: AddToCart - Updates local state, then syncs server
//     // ----------------------------------------------------
//     const addToCart = useCallback(async (itemToAdd) => {
//         let updatedItems;

//         setCartItems(prevItems => {
//             const exists = prevItems.find(i => 
//                 i._id === itemToAdd._id && i.selectedSize === itemToAdd.selectedSize
//             );

//             if (exists) {
//                 updatedItems = prevItems.map(i =>
//                     i === exists 
//                         ? { ...i, quantity: i.quantity + itemToAdd.quantity } 
//                         : i
//                 );
//             } else {
//                 updatedItems = [...prevItems, itemToAdd];
//             }
            
//             // Return the new state locally for immediate UI update
//             return updatedItems;
//         });
        
//         // Wait for state to be updated and then sync the new cart content to the server
//         if(updatedItems) {
//             await syncServerCart(updatedItems);
//         }

//         navigate('/cart');
//     }, [navigate]);

//     // ----------------------------------------------------
//     //  NEW: Fetch Cart on Mount (for persistence across refreshes)
//     // ----------------------------------------------------
//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 // Fetch the cart content for the user from the backend
//                 const res = await axios.get(
//                     `${BACKEND_BASE_URL}/api/cart`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${AUTH_TOKEN}`
//                         }
//                     }
//                 );
                
//                 // Assuming backend returns an array of cart items: res.data.items
//                 // Map the backend data structure to your frontend cartItems structure
//                 setCartItems(res.data.items.map(item => ({
//                     _id: item.productId,
//                     name: item.name, // Assuming backend includes product details
//                     price: item.price,
//                     image: item.image,
//                     quantity: item.quantity,
//                     selectedSize: item.size // Matching the key used in your frontend logic
//                 })));

//             } catch (error) {
//                 console.warn("Could not fetch user cart, starting with empty cart.");
//                 setCartItems([]);
//             }
//         };

//         // You should only fetch if the user is authenticated (logged in)
//         // if (AUTH_TOKEN) {
//              fetchCart();
//         // }
//     }, []); 

//     // ----------------------------------------------------
//     //  UPDATED: RemoveFromCart - Updates local state, then syncs server
//     // ----------------------------------------------------
//     const removeFromCart = useCallback(async (id, size) => {
//         let updatedItems;
        
//         setCartItems(prevItems => {
//             updatedItems = prevItems.filter(item => !(item._id === id && item.selectedSize === size));
//             return updatedItems;
//         });
        
//         // Wait for state to be updated and then sync the new cart content to the server
//         if(updatedItems) {
//             await syncServerCart(updatedItems);
//         }
//     }, []);
    
//     // ... (rest of updateQuantity, useMemo for totals, and Provider return remain the same)
// };

// import React, { createContext, useState, useContext } from 'react';

// const CartContext = createContext();

// // Custom Hook to simplify using the cart state
// export const useCart = () => useContext(CartContext);

// // Provider Component
// export const CartProvider = ({ children }) => {
//     // State to hold the array of cart items
//     const [cartItems, setCartItems] = useState([]);

//     const addToCart = (product) => {
//         setCartItems(prevItems => {
//             // Check if the item already exists in the cart
//             const existingItem = prevItems.find(item => item.productId === product._id);

//             if (existingItem) {
//                 // If it exists, increase the quantity by 1
//                 return prevItems.map(item =>
//                     item.productId === product._id
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//             } else {
//                 // If it's a new item, add it with quantity 1
//                 return [
//                     ...prevItems,
//                     { 
//                         productId: product._id,
//                         name: product.name,
//                         price: product.price,
//                         image: product.image,
//                         quantity: 1 
//                     }
//                 ];
//             }
//         });
//     };

//     const removeFromCart = (productId) => {
//         setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
//     };

//     const updateQuantity = (productId, newQuantity) => {
//         if (newQuantity <= 0 || isNaN(newQuantity)) {
//             removeFromCart(productId);
//             return;
//         }
//         setCartItems(prevItems => prevItems.map(item =>
//             item.productId === productId
//                 ? { ...item, quantity: newQuantity }
//                 : item
//         ));
//     };

//     const clearCart = () => setCartItems([]);

//     // Calculate total price
//     const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { domainUrl } from '../utils/constant';
// Assuming domainUrl is defined globally or imported from a config file


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Provider Component
export const CartProvider = ({ children }) => {
    // 1. STATE MANAGEMENT (Now includes loading/error)
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(true); // Tracks initial fetch/actions
    const [error, setError] = useState(null);

    // Helper to get the auth token
    const getToken = () => localStorage.getItem("token");

    // 2. FETCH FUNCTION (The core function to get data from the backend)
    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            if (!token) {
                // Handle case where user isn't logged in (cart is locally empty)
                setCartItems([]);
                setCartTotal(0);
                setLoading(false);
                return;
            }

            const res = await axios.get(`${domainUrl}/cart/list`, { 

        //                             ^-- ADD /api HERE
            headers: { Authorization: `Bearer ${token}` }
        });
     
        

            // The backend returns populated items in res.data.cart.items
            const backendCart = res.data.cart;
            
            // Map backend structure to a cleaner frontend structure
            const newCartItems = backendCart.items.map(item => ({

                _id: item._id, // This is the unique Mongoose Cart Line Item ID
                productId: item.product._id, // Add the original product ID for convenience
                name: item.product.name,
                price: item.product.price,
                image: item.product.image,
                quantity: item.quantity,
                selectedSize: item.selectedSize || null,
               
                // Assuming selectedSize isn't used in your Mongoose schema yet, 
                // but keep it if you add it later: selectedSize: item.selectedSize, 
            }));

            // console.log("aaaaaaaaaaaaa",newCartItems)
    // Use the populated product details (item.product.propertyName)
    
    // Use the Mongoose Cart Item ID (line item ID) for the key, as it's truly unique
    // If you need the original product ID for routing, add it as a separate property.
    
    // We will use the line item ID for now to fix the key issue (see section 2)
     // Include size if your Mongoose model supports it


            setCartItems(newCartItems);
            setCartTotal(res.data.cart.totalAmount.toFixed(2)); // Use total from backend
            // console.log("total amount",res.data.cart.totalAmount)
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            setError("Could not load cart data. Please try again.");
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    }, []); 
    
    // 3. EFFECT: Fetch cart on component mount
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);


    // 4. ACTION: Add to Cart (Used by ProductDetailPage)
    // NOTE: ProductDetailPage already does the API call, but we MUST re-fetch 
    // the cart afterwards to update the state.
    const syncCartAfterAction = async () => {
        // You can add more optimistic UI updates here, but for simplicity, we re-fetch everything
        await fetchCart();
    };

    // 5. ACTION: Remove from Cart
    const removeFromCart = async (productId) => {
        setLoading(true);
        // Implement the backend API call to remove the item here
        try {
            const token = getToken();
            await axios.delete(`${domainUrl}/cart/remove/${productId}`, { // Assume you create a /cart/remove/:id route
                 headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCart(); // Re-fetch the updated list
        } catch(err) {
            console.error("Error removing item:", err);
            setLoading(false);
        }
    };
    
    // 6. ACTION: Update Quantity
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity <= 0) {
             removeFromCart(productId);
             return;
        }
        setLoading(true);
        // Implement the backend API call to update quantity here
        try {
            const token = getToken();
            await axios.put(`${domainUrl}/cart/update`, { // Assume you create a /cart/update route
                productId, 
                quantity: newQuantity
            }, {
                 headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCart(); // Re-fetch the updated list
        } catch(err) {
            console.error("Error updating quantity:", err);
            setLoading(false);
        }
    };

    const placeOrder = async () => {
    setLoading(true);
    setError(null);
    try {
        const token = getToken();
        if (!token) {
            throw new Error("User not authenticated.");
        }

        // ⚠️ API route must match your backend setup: /api/cart/place
        const response = await axios.post(`${domainUrl}/order/place`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        // After placing the order, clear the frontend cart state
        setCartItems([]);
        setCartTotal(0);
        console.log("order res",response.data)
        return response.data; // Return order details
    } catch (err) {
        console.error("Error placing order:", err);
        setError("Failed to place order. Please try again.");
        throw err;
    } finally {
        setLoading(false);
    }
};


    return (
        <CartContext.Provider value={{ 
            cartItems, 
            loading, 
            error,
            cartTotal,
            fetchCart, // Expose fetchCart so other components can refresh the cart
            syncCartAfterAction, // Use this in ProductDetailPage after successful add
            removeFromCart, 
            updateQuantity,
            placeOrder
        }}>
            {children}
        </CartContext.Provider>
    );
};