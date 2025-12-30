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

// SAFE HOOK (NEVER RETURNS UNDEFINED)
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
  const isAuthenticated = !!user;

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);

 
  // FETCH WISHLIST

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
  }, [fetchWishlist]);


  // TOGGLE WISHLIST
 
  const toggleWishlist = useCallback(
    async (productId, isCurrentlyInWishlist) => {
      if (!isAuthenticated) return false;

      const prevItems = wishlistProducts;

      try {
        if (isCurrentlyInWishlist) {
          setWishlistProducts((prev) =>
            prev.filter((item) => item._id !== productId)
          );
          setWishlistCount((prev) => prev - 1);
          await api.delete(`user/wishlist/${productId}`);
        } else {
          setWishlistCount((prev) => prev + 1);
          await api.post("user/wishlist", { productId });
        }

        fetchWishlist();
        return true;
      } catch (error) {
        setWishlistProducts(prevItems);
        setWishlistCount(prevItems.length);
        return false;
      }
    },
    [isAuthenticated, wishlistProducts, fetchWishlist]
  );


  // CLEAR WISHLIST
  
  const clearWishlist = useCallback(async () => {
    if (!isAuthenticated) return false;

    try {
      setWishlistProducts([]);
      setWishlistCount(0);
      await api.delete("user/wishlist");
      return true;
    } catch (error) {
      return false;
    }
  }, [isAuthenticated]);


  // CHECK PRODUCT
  
  const isProductInWishlist = (productId) =>
    wishlistProducts.some((item) => item._id === productId);


  // PROVIDER (ALWAYS RENDERED)
  
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
