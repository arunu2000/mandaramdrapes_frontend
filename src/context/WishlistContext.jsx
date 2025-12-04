// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// // Assume this is your utility for authenticated API calls
// // You might need to adjust how your token is attached (e.g., using an interceptor or passing headers)
// const API = axios.create({
//     baseURL: 'http://192.168.29.217:5000/api', // Use the base URL with /api
//     // Include logic to attach JWT token here, e.g.,
//     // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
// });

// // A dummy function to get the token, replace with your actual logic
// const getAuthHeaders = () => {
//     const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
//     if (token) {
//         return {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };
//     }
//     return {};
// };


// // 1. Create the Context
// const WishlistContext = createContext();

// // 2. Custom hook for easy access
// export const useWishlist = () => useContext(WishlistContext);

// // 3. Provider Component
// export const WishlistProvider = ({ children, isAuthenticated }) => {
//     const [wishlistItems, setWishlistItems] = useState([]);
//     const [wishlistCount, setWishlistCount] = useState(0);
//     const [loading, setLoading] = useState(true);

//     // Function to fetch the current wishlist from the backend
//     const fetchWishlist = useCallback(async () => {
//         if (!isAuthenticated) {
//             setWishlistItems([]);
//             setWishlistCount(0);
//             setLoading(false);
//             return;
//         }

//         try {
//             setLoading(true);
//             const response = await API.get('/wishlist', getAuthHeaders());
//             // Backend returns: { items: [{...product}], count: N }
//             const items = response.data.items || [];
            
//             // Map the product objects to an array of product IDs for fast lookups
//             const itemIds = items.map(item => item._id); 

//             setWishlistItems(itemIds);
//             setWishlistCount(items.length);
//         } catch (error) {
//             console.error('Failed to fetch wishlist:', error);
//             // Optional: Show error toast
//             // toast.error('Could not load your wishlist.');
//             setWishlistItems([]);
//             setWishlistCount(0);
//         } finally {
//             setLoading(false);
//         }
//     }, [isAuthenticated]);

//     // Initial fetch and fetch on login/logout
//     useEffect(() => {
//         fetchWishlist();
//     }, [fetchWishlist, isAuthenticated]);


//     // Function to add or remove a product
//     const toggleWishlist = useCallback(async (productId, isCurrentlyInWishlist) => {
//         if (!isAuthenticated) {
//             // Your logic for unauthenticated users (e.g., show login modal or merge logic)
//             console.log('User not authenticated. Prompting login.');
//             // This is where you would navigate to login or show a modal
//             // For now, we'll just return.
//             // toast.info('Please log in to manage your wishlist.');
//             return false; 
//         }

//         // Optimistic UI Update: Assume success
//         const prevItems = wishlistItems;
//         const prevCount = wishlistCount;
//         let apiCall;
//         let successMessage;

//         if (isCurrentlyInWishlist) {
//             // REMOVE
//             setWishlistItems(prev => prev.filter(id => id !== productId));
//             setWishlistCount(prev => prev - 1);
//             apiCall = API.delete(`/wishlist/${productId}`, getAuthHeaders());
//             successMessage = 'Product removed from wishlist!';
//         } else {
//             // ADD
//             setWishlistItems(prev => [...prev, productId]);
//             setWishlistCount(prev => prev + 1);
//             apiCall = API.post('/wishlist', { productId }, getAuthHeaders());
//             successMessage = 'Product added to wishlist!';
//         }

//         try {
//             await apiCall;
//             // Successful response confirms optimistic update
//             // toast.success(successMessage);
//             console.log(successMessage);
//             return true;
//         } catch (error) {
//             console.error('Wishlist update failed:', error);
//             // Revert optimistic UI on failure
//             setWishlistItems(prevItems);
//             setWishlistCount(prevCount);
//             // toast.error(`Error: ${error.response?.data?.message || 'Failed to update wishlist. Please try again.'}`);
//             console.error('Reverting UI change due to API error.');
//             return false;
//         }
//     }, [isAuthenticated, wishlistItems, wishlistCount]);

//     // Function to check if a product ID is in the wishlist (for rendering the heart icon state)
//     const isProductInWishlist = (productId) => {
//         return wishlistItems.includes(productId);
//     };


//     const contextValue = {
//         wishlistItems,
//         wishlistCount,
//         loading,
//         fetchWishlist, // Expose fetch function for external use (e.g., Wishlist page)
//         toggleWishlist,
//         isProductInWishlist,
//     };

//     return (
//         <WishlistContext.Provider value={contextValue}>
//             {children}
//         </WishlistContext.Provider>
//     );
// };




// src/context/WishlistContext.jsx

// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useAuth } from "../context/AuthContext";  // <-- IMPORTANT

// import { domainUrl } from "../utils/constant";  // <-- ADD THIS

// const API = axios.create({
//     baseURL: domainUrl,   // <-- USE YOUR domainUrl HERE
//     timeout: 10000,
//     withCredentials: true,
// });


// const WishlistContext = createContext();
// export const useWishlist = () => useContext(WishlistContext);

// export const WishlistProvider = ({ children }) => {

//     const { user } = useAuth();  
//     const isAuthenticated = user?.isAuthenticated || false;  // <-- FIXED HERE

//     const [wishlistProducts, setWishlistProducts] = useState([]);
//     const [wishlistCount, setWishlistCount] = useState(0);
//     const [loading, setLoading] = useState(true);



// const clearWishlist = useCallback(async () => {
//         if (!isAuthenticated) return false;

//         // Optimistic UI update: Assume success and clear the UI immediately
//         const prevItems = wishlistProducts;
//         const prevCount = wishlistCount;
//         setWishlistProducts([]);
//         setWishlistCount(0);

//         try {
//             // API call to DELETE /api/wishlist (which your backend supports)
//             await API.delete('/wishlist');
//             console.log('Wishlist cleared successfully!');
//             // No need to re-fetch as the UI is already cleared optimistically
//             return true;
//         } catch (error) {
//             // Revert on failure
//             console.error('Failed to clear wishlist (reverting UI):', error.response?.data?.message || error.message);
//             setWishlistProducts(prevItems);
//             setWishlistCount(prevCount);
//             return false;
//         }
//     }, [isAuthenticated, wishlistProducts, wishlistCount]);

//     // Function to fetch the current wishlist from the backend
//     const fetchWishlist = useCallback(async () => {
//         if (!isAuthenticated) {
//             setWishlistProducts([]);
//             setWishlistCount(0);
//             setLoading(false);
//             return;
//         }

//         try {
//             setLoading(true);
//             // We do NOT pass getAuthHeaders() here because withCredentials handles auth
//             const response = await API.get('/wishlist'); 
            
//             // Backend returns: { items: [{...product}], count: N }
//             const items = response.data.items || [];
            
//             setWishlistProducts(items);
//             setWishlistCount(items.length);

//         } catch (error) {
//             console.error('Failed to fetch wishlist:', error.response?.data?.message || error.message);
//             // If fetching fails (e.g., 401 Unauthorized), reset the list
//             setWishlistProducts([]);
//             setWishlistCount(0);
//         } finally {
//             setLoading(false);
//         }
//     }, [isAuthenticated]);

//     // Initial fetch and fetch on login/logout
//     useEffect(() => {
//         fetchWishlist();
//     }, [fetchWishlist, isAuthenticated]);


//     // Function to add or remove a product
//     const toggleWishlist = useCallback(async (productId, isCurrentlyInWishlist) => {
//         console.log("wishhhhhh")
//         if (!isAuthenticated) {
//             console.log('User not authenticated. Prompting login.');
//             // Add user prompt/redirect to login here
//             return false; 
//         }

//         // --- Optimistic UI Update ---
//         const prevItems = wishlistProducts;
//         let apiCall;
//         let successMessage;

//         if (isCurrentlyInWishlist) {
//             // REMOVE: Filter out the product (optimistically)
//             setWishlistProducts(prev => prev.filter(item => item._id !== productId));
//             setWishlistCount(prev => prev - 1);
            
//             apiCall = API.delete(`/wishlist/${productId}`); 
//             successMessage = 'Product removed from wishlist!';
//         } else {
//             // ADD: Fetching the full product object for optimistic add is complex.
//             // For simplicity and immediate UI feedback, we rely on the backend being successful.
//             // NOTE: We only update the count optimistically here. 
//             setWishlistCount(prev => prev + 1);
            
//             apiCall = API.post('/wishlist');
//             successMessage = 'Product added to wishlist successfully!';
//         }

//         try {
//             await apiCall;
//             console.log(successMessage);
            
//             // After successful API call, RE-FETCH the full list to get the latest data
//             // (including the full product object for the new item, if added)
//             fetchWishlist();
//             return true;
//         } catch (error) {
//             // Revert optimistic UI on failure
//             console.error('Wishlist update failed (reverting UI):', error.response?.data?.message || error.message);
//             setWishlistProducts(prevItems);
//             setWishlistCount(prevItems.length);
//             return false;
//         }
//     }, [isAuthenticated, wishlistProducts, fetchWishlist]);

//     // Helper to check if an ID exists in the full product array
//     const isProductInWishlist = (productId) => {
//         return wishlistProducts.some(item => item._id === productId);
//     };


//     const contextValue = {
//         wishlistItems: wishlistProducts, // Expose full product data for WishlistPage
//         wishlistCount,
//         loading,
//         fetchWishlist, 
//         toggleWishlist,
//         isProductInWishlist,
//         clearWishlist,
//     };

//     return (
//         <WishlistContext.Provider value={contextValue}>
//             {children}
//         </WishlistContext.Provider>
//     );
// };




//unaiz codeeeeeeeeeee


// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { domainUrl } from "../utils/constant";

// const API = axios.create({
//   baseURL: domainUrl,
//   timeout: 10000,
//   withCredentials: true,
// });

// const WishlistContext = createContext();
// export const useWishlist = () => useContext(WishlistContext);

// export const WishlistProvider = ({ children }) => {
//   const { user } = useAuth();

//   const isAuthenticated = user?.isAuthenticated || false;
//   const isInitialLoad = user?.isInitialLoad;

//   const [wishlistProducts, setWishlistProducts] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Prevent wishlist actions before auth loads
//   if (isInitialLoad) {
//     return (
//       <WishlistContext.Provider
//         value={{
//           wishlistItems: [],
//           wishlistCount: 0,
//           loading: true,
//           fetchWishlist: () => {},
//           toggleWishlist: () => {},
//           isProductInWishlist: () => false,
//           clearWishlist: () => {},
//         }}
//       >
//         {children}
//       </WishlistContext.Provider>
//     );
//   }

//   /** ------------------------------
//    *  FETCH WISHLIST
//    * ------------------------------ */
//   const fetchWishlist = useCallback(async () => {
//     if (!isAuthenticated) {
//       setWishlistProducts([]);
//       setWishlistCount(0);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await API.get("/wishlist");
//       const items = response.data.items || [];

//       setWishlistProducts(items);
//       setWishlistCount(items.length);
//     } catch (error) {
//       console.error(
//         "Failed to fetch wishlist:",
//         error.response?.data?.message || error.message
//       );
//       setWishlistProducts([]);
//       setWishlistCount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     fetchWishlist();
//   }, [fetchWishlist, isAuthenticated]);

//   /** ------------------------------
//    *  ADD / REMOVE PRODUCT
//    * ------------------------------ */
//   const toggleWishlist = useCallback(
//     async (productId, isCurrentlyInWishlist) => {
//       if (!isAuthenticated) {
//         console.log("User not authenticated. Prompt login.");
//         return false;
//       }

//       const prevItems = wishlistProducts;
//       let apiCall;
//       let successMessage;

//       if (isCurrentlyInWishlist) {
//         // REMOVE
//         setWishlistProducts((prev) =>
//           prev.filter((item) => item._id !== productId)
//         );
//         setWishlistCount((prev) => prev - 1);

//         apiCall = API.delete(`/wishlist/${productId}`);
//         successMessage = "Product removed from wishlist!";
//       } else {
//         // ADD
//         setWishlistCount((prev) => prev + 1);

//         apiCall = API.post("/wishlist", { productId }); // IMPORTANT!!
//         successMessage = "Product added to wishlist!";
//       }

//       try {
//         await apiCall;
//         console.log(successMessage);

//         fetchWishlist(); // refresh with server truth
//         return true;
//       } catch (error) {
//         console.error(
//           "Wishlist update failed (reverting UI):",
//           error.response?.data?.message || error.message
//         );

//         // revert UI
//         setWishlistProducts(prevItems);
//         setWishlistCount(prevItems.length);

//         return false;
//       }
//     },
//     [isAuthenticated, wishlistProducts, fetchWishlist]
//   );

//   /** ------------------------------
//    * CLEAR WISHLIST
//    * ------------------------------ */
//   const clearWishlist = useCallback(async () => {
//     if (!isAuthenticated) return false;

//     const prevItems = wishlistProducts;
//     const prevCount = wishlistCount;

//     // optimistic clear
//     setWishlistProducts([]);
//     setWishlistCount(0);

//     try {
//       await API.delete("/wishlist");
//       console.log("Wishlist cleared!");
//       return true;
//     } catch (error) {
//       console.error(
//         "Failed to clear wishlist:",
//         error.response?.data?.message || error.message
//       );
//       setWishlistProducts(prevItems);
//       setWishlistCount(prevCount);
//       return false;
//     }
//   }, [isAuthenticated, wishlistProducts, wishlistCount]);

//   /** ------------------------------
//    * CHECK IF PRODUCT SAVED
//    * ------------------------------ */
//   const isProductInWishlist = (productId) => {
//     return wishlistProducts.some((item) => item._id === productId);
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistItems: wishlistProducts,
//         wishlistCount,
//         loading,
//         fetchWishlist,
//         toggleWishlist,
//         isProductInWishlist,
//         clearWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };


//////////////////////////////////////////////////working code with wishlist


// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { domainUrl } from "../utils/constant";
// import api from "../utils/api";

// // Axios Instance
// // const API = axios.create({
// //   baseURL: domainUrl,
// //   timeout: 10000,
// //   withCredentials: true,
// // });

// // --------------------------------------------------
// // CREATE CONTEXT + EXPORT HOOK  (IMPORTANT)
// // --------------------------------------------------
// const WishlistContext = createContext();

// export const useWishlist = () => useContext(WishlistContext);
// // --------------------------------------------------

// export const WishlistProvider = ({ children }) => {
//   const { user } = useAuth();

//   const isAuthenticated = user?.isAuthenticated || false;
//   const isInitialLoad = user?.isInitialLoad;

//   const [wishlistProducts, setWishlistProducts] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // --------------------------------------------------
//   // FETCH WISHLIST
//   // --------------------------------------------------
//   const fetchWishlist = useCallback(async () => {
//     console.log("fetching wishlist...");
//     if (!isAuthenticated) {
//       setWishlistProducts([]);
//       setWishlistCount(0);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await api.get("user/wishlist");
//       const items = response.data.items || [];
//       setWishlistProducts(items);
//       setWishlistCount(items.length);
//     } catch (error) {
//       setWishlistProducts([]);
//       setWishlistCount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     fetchWishlist();
//   }, [fetchWishlist, isAuthenticated]);

//   // --------------------------------------------------
//   // TOGGLE WISHLIST (ADD / REMOVE)
//   // --------------------------------------------------
//   const toggleWishlist = useCallback(
//     async (productId, isCurrentlyInWishlist) => {
//       console.log("wishhhhhh");
//       if (!isAuthenticated) return false;

//       const prevItems = wishlistProducts;
//       let apiCall;

//       if (isCurrentlyInWishlist) {
        
//         // REMOVE ITEM
//         setWishlistProducts((prev) =>
//           prev.filter((item) => item._id !== productId)
//         );
//         setWishlistCount((prev) => prev - 1);
//         apiCall = api.delete(`user/wishlist/${productId}`);
//       } else {
//         // ADD ITEM
//         setWishlistCount((prev) => prev + 1);
//         apiCall = api.post("user/wishlist", { productId });
//       }

//       try {
//         await apiCall;
//         fetchWishlist();
//         return true;
//       } catch (error) {
//         setWishlistProducts(prevItems);
//         setWishlistCount(prevItems.length);
//         return false;
//       }
//     },
//     [isAuthenticated, wishlistProducts, fetchWishlist]
//   );

//   // --------------------------------------------------
//   // CLEAR WISHLIST
//   // --------------------------------------------------
//   const clearWishlist = useCallback(async () => {
//     if (!isAuthenticated) return false;

//     const prevItems = wishlistProducts;
//     const prevCount = wishlistCount;

//     setWishlistProducts([]);
//     setWishlistCount(0);

//     try {
//       await api.delete("user/wishlist");
//       return true;
//     } catch (error) {
//       setWishlistProducts(prevItems);
//       setWishlistCount(prevCount);
//       return false;
//     }
//   }, [isAuthenticated, wishlistProducts, wishlistCount]);

//   // --------------------------------------------------
//   // CHECK IF PRODUCT EXISTS IN WISHLIST
//   // --------------------------------------------------
//   const isProductInWishlist = (productId) => {
//     return wishlistProducts.some((item) => item._id === productId);
//   };

//   // --------------------------------------------------
//   // IMPORTANT: EARLY RETURN MUST BE AT BOTTOM
//   // --------------------------------------------------
//  if (isInitialLoad) {
//     return children; 
// }


//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistItems: wishlistProducts,
//         wishlistCount,
//         loading,
//         fetchWishlist,
//         toggleWishlist,
//         isProductInWishlist,
//         clearWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };






import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const isAuthenticated = user?.isAuthenticated || false;
  const isInitialLoad = user?.isInitialLoad;

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------------------
  // FETCH WISHLIST
  // ----------------------------------------------------------------
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlistProducts([]);
      setWishlistCount(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get("user/wishlist");
      const items = response.data.items || [];
      setWishlistProducts(items);
      setWishlistCount(items.length);
    } catch (error) {
      setWishlistProducts([]);
      setWishlistCount(0);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist, isAuthenticated]);

  // ----------------------------------------------------------------
  // TOGGLE WISHLIST (Optimistic Update)
  // ----------------------------------------------------------------
  const toggleWishlist = useCallback(
    async (productId, isCurrentlyInWishlist) => {
      if (!isAuthenticated) return false;

      const prevItems = wishlistProducts;

      // ⭐ 1. Instant UI update
      if (isCurrentlyInWishlist) {
        setWishlistProducts((prev) =>
          prev.filter((item) => item._id !== productId)
        );
        setWishlistCount((prev) => prev - 1);
      } else {
        setWishlistProducts((prev) => [...prev, { _id: productId }]);
        setWishlistCount((prev) => prev + 1);
      }

      try {
        // ⭐ 2. API call (async)
        if (isCurrentlyInWishlist) {
          await api.delete(`user/wishlist/${productId}`);
        } else {
          await api.post("user/wishlist", { productId });
        }

        // ❌ No fetchWishlist() here → avoids GET call
        return true;
      } catch (error) {
        // ⭐ 3. Revert UI if failed
        setWishlistProducts(prevItems);
        setWishlistCount(prevItems.length);
        return false;
      }
    },
    [isAuthenticated, wishlistProducts]
  );

  // ----------------------------------------------------------------
  // CLEAR WISHLIST
  // ----------------------------------------------------------------
  const clearWishlist = useCallback(async () => {
    if (!isAuthenticated) return false;

    const prevItems = wishlistProducts;
    const prevCount = wishlistCount;

    setWishlistProducts([]);
    setWishlistCount(0);

    try {
      await api.delete("user/wishlist");
      return true;
    } catch (error) {
      setWishlistProducts(prevItems);
      setWishlistCount(prevCount);
      return false;
    }
  }, [isAuthenticated, wishlistProducts, wishlistCount]);

  // ----------------------------------------------------------------
  // CHECK PRODUCT EXISTS
  // ----------------------------------------------------------------
  const isProductInWishlist = (productId) => {
    return wishlistProducts.some((item) => item._id === productId);
  };

  // ----------------------------------------------------------------
  // Handle initial loading state
  // ----------------------------------------------------------------
  if (isInitialLoad) {
    return children;
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: wishlistProducts,
        wishlistCount,
        loading,
        fetchWishlist,
        toggleWishlist,
        isProductInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

