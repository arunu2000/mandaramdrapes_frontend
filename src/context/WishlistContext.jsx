//working code 

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// import { useAuth } from "../context/AuthContext";
// import api from "../utils/api";

// // CREATE CONTEXT
// const WishlistContext = createContext(null);

// // SAFE HOOK
// export const useWishlist = () => {
//   const context = useContext(WishlistContext);

//   if (!context) {
//     return {
//       wishlistItems: [],
//       wishlistCount: 0,
//       loading: false,
//       fetchWishlist: () => {},
//       toggleWishlist: async () => false,
//       isProductInWishlist: () => false,
//       clearWishlist: async () => false,
//     };
//   }

//   return context;
// };

// // PROVIDER
// export const WishlistProvider = ({ children }) => {
//   const { user } = useAuth();
//   // Ensure we check strict boolean true
//   const isAuthenticated = user?.isAuthenticated === true;

//   const [wishlistProducts, setWishlistProducts] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // 1. FETCH WISHLIST
//   const fetchWishlist = useCallback(async () => {
//     if (!isAuthenticated) return;

//     try {
//       // Don't set loading true here if you want background updates
//       // only set it for initial loads if needed
//       const response = await api.get("user/wishlist");
//       const items = response.data.items || [];
      
//       setWishlistProducts(items);
//       setWishlistCount(items.length);
//     } catch (error) {
//       console.error("Failed to fetch wishlist", error);
//     }
//   }, [isAuthenticated]);

//   // 2. LISTEN FOR AUTH CHANGES (Fixes Logout Issue)
//   // This ensures that the moment you log out, the wishlist is wiped INSTANTLY.
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchWishlist();
//     } else {
//       setWishlistProducts([]);
//       setWishlistCount(0);
//     }
//   }, [isAuthenticated, fetchWishlist]);

//   // 3. TOGGLE WISHLIST (Fixes "Heart not updating" Issue)
//   const toggleWishlist = useCallback(
//     async (productId) => {
//       if (!isAuthenticated) return false;

//       // Check current status based on State, not passed argument
//       // This prevents UI sync issues
//       const isCurrentlyInWishlist = wishlistProducts.some(
//         (item) => item._id === productId
//       );

//       // Snapshot previous state for rollback
//       const prevProducts = [...wishlistProducts];
//       const prevCount = wishlistCount;

//       try {
//         if (isCurrentlyInWishlist) {
//           // OPTIMISTIC REMOVE
//           setWishlistProducts((prev) =>
//             prev.filter((item) => item._id !== productId)
//           );
//           setWishlistCount((prev) => Math.max(0, prev - 1));

//           // API Call
//           await api.delete(`user/wishlist/${productId}`);
//         } else {
//           // OPTIMISTIC ADD
//           // We push a temporary object with just the _id so the heart turns red immediately
//           setWishlistProducts((prev) => [...prev, { _id: productId }]);
//           setWishlistCount((prev) => prev + 1);

//           // API Call
//           await api.post("user/wishlist", { productId });
//         }

//         // Fetch properly to get full product details (images, prices) from server
//         // We do this silently in the background
//         fetchWishlist();
//         return true;

//       } catch (error) {
//         // ROLLBACK ON ERROR
//         console.error("Wishlist toggle failed:", error);
//         setWishlistProducts(prevProducts);
//         setWishlistCount(prevCount);
//         return false;
//       }
//     },
//     [isAuthenticated, wishlistProducts, wishlistCount, fetchWishlist]
//   );

//   // 4. CLEAR WISHLIST
//   const clearWishlist = useCallback(async () => {
//     if (!isAuthenticated) return false;

//     try {
//       setWishlistProducts([]);
//       setWishlistCount(0);
//       await api.delete("user/wishlist");
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }, [isAuthenticated]);

//   // 5. CHECK PRODUCT
//   const isProductInWishlist = useCallback((productId) => {
//     return wishlistProducts.some((item) => item._id === productId);
//   }, [wishlistProducts]);

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

import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

// CREATE CONTEXT
const WishlistContext = createContext(null);

// SAFE HOOK
export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    return {
      wishlistItems: [],
      wishlistCount: 0,
      loading: false,
      fetchWishlist: () => {},
      toggleWishlist: async () => false,
      isProductInWishlist: () => false,
      clearWishlist: async () => false,
    };
  }

  return context;
};

// PROVIDER
export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  // Ensure we check strict boolean true
  const isAuthenticated = user?.isAuthenticated === true;

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const wishlistCount = wishlistProducts.length;


  // 1. FETCH WISHLIST
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      // Don't set loading true here if you want background updates
      // only set it for initial loads if needed
      const response = await api.get("user/wishlist");
      const items = response.data.items || [];
      
      setWishlistProducts(items);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  }, [isAuthenticated]);

  // 2. LISTEN FOR AUTH CHANGES (Fixes Logout Issue)
  // This ensures that the moment you log out, the wishlist is wiped INSTANTLY.
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlistProducts([]);
    }
  }, [isAuthenticated, fetchWishlist]);

  // 3. TOGGLE WISHLIST (Fixes "Heart not updating" Issue)
  const toggleWishlist = useCallback(
  async (productId) => {
    if (!isAuthenticated) return false;

    const isCurrentlyInWishlist = wishlistProducts.some(
      (item) => item._id === productId
    );

    const prevProducts = [...wishlistProducts];

    try {
      if (isCurrentlyInWishlist) {
        setWishlistProducts((prev) =>
          prev.filter((item) => item._id !== productId)
        );
        await api.delete(`user/wishlist/${productId}`);
      } else {
        setWishlistProducts((prev) => [...prev, { _id: productId }]);
        await api.post("user/wishlist", { productId });
      }

      fetchWishlist(); // silent sync
      return true;
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
      setWishlistProducts(prevProducts); // rollback
      return false;
    }
  },
  [isAuthenticated, wishlistProducts, fetchWishlist]
);


  // 4. CLEAR WISHLIST
  const clearWishlist = useCallback(async () => {
    if (!isAuthenticated) return false;

    try {
      setWishlistProducts([]);
      await api.delete("user/wishlist");
      return true;
    } catch (error) {
      return false;
    }
  }, [isAuthenticated]);

  // 5. CHECK PRODUCT
  const isProductInWishlist = useCallback((productId) => {
    return wishlistProducts.some((item) => item._id === productId);
  }, [wishlistProducts]);

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