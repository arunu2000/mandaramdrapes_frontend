// // src/pages/AllProducts.jsx
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Dialog, DialogBackdrop, DialogPanel, Popover } from "@headlessui/react";
// import { ChevronDownIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import SocialFooter from "./SocialFooter";

// /**
//  AllProducts - Tailwind-style product listing page
//  - Uses backend endpoints:
//     GET /user/categories          -> { categories: [...] }
//     GET /user/products/search     -> { items: [...], total: N, page, pageSize }
//  - Query params supported: q, category, minPrice, maxPrice, sort, page, limit
//  - Product card fields used: _id or id, name, price, image (or imageUrl), category (object or name)
// */

// const DEFAULT_LIMIT = 24;
// const DEBOUNCE_MS = 300;

// function classNames(...c) { return c.filter(Boolean).join(" "); }

// function SkeletonCard() {
//   return (
//     <div className="group relative border rounded-md p-3 bg-white animate-pulse">
//       <div className="aspect-square w-full rounded-md bg-gray-200" />
//       <div className="mt-3 h-4 bg-gray-200 w-1/2 rounded" />
//       <div className="mt-2 h-4 bg-gray-200 w-1/3 rounded" />
//     </div>
//   );
// }

// function ProductCard({ p, onView, onAddToCart }) {
//   const img = p.image || p.imageUrl || (p.images && p.images[0]) || "https://via.placeholder.com/400?text=No+Image";
//   const title = p.name || p.title || "Product";
//   const price = p.price == null ? "—" : `₹${p.price}`;
//   const categoryName = (p.category && (p.category.name || p.category)) || "";

//   return (
//     <div className="group relative">
//       <img
//         src={img}
//         alt={p.imageAlt || title}
//         className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
//         loading="lazy"
//       />
//       <div className="mt-4 flex justify-between">
//         <div>
//           <h3 className="text-sm text-gray-700">
//             <button onClick={() => onView && onView(p)} className="text-left">
//               <span aria-hidden="true" className="absolute inset-0" />
//               {title}
//             </button>
//           </h3>
//           {categoryName && <p className="mt-1 text-sm text-gray-500">{categoryName}</p>}
//         </div>
//         <p className="text-sm font-medium text-gray-900">{price}</p>
//       </div>
//       <div className="mt-3 flex gap-2">
//         <button
//           onClick={() => onAddToCart && onAddToCart(p)}
//           className="px-3 py-1 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
//         >
//           Add to Cart
//         </button>
//         <button
//           onClick={() => onView && onView(p)}
//           className="px-3 py-1 border rounded-md text-sm"
//         >
//           View
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function AllProducts() {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { cartItems } = useCart();

//   // UI
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

//   // Filters state (initialize from URL)
//   const [filters, setFilters] = useState(() => {
//     const q = searchParams.get("q") || "";
//     const category = searchParams.get("category") || "";
//     const minPrice = searchParams.get("minPrice") ?? "";
//     const maxPrice = searchParams.get("maxPrice") ?? "";
//     const sort = searchParams.get("sort") || "relevance";
//     const page = parseInt(searchParams.get("page") || "1", 10) || 1;
//     const limit = parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT;
//     return { q, category, minPrice: minPrice === "" ? "" : Number(minPrice), maxPrice: maxPrice === "" ? "" : Number(maxPrice), sort, page, limit };
//   });

//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const abortRef = useRef(null);
//   const [debouncedQ, setDebouncedQ] = useState(filters.q);

//   // debounce search text
//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedQ(filters.q), DEBOUNCE_MS);
//     return () => clearTimeout(t);
//   }, [filters.q]);

//   // sync filters -> URL
//   useEffect(() => {
//     const q = {};
//     if (filters.q) q.q = filters.q;
//     if (filters.category) q.category = filters.category;
//     if (filters.minPrice !== "" && filters.minPrice !== undefined) q.minPrice = filters.minPrice;
//     if (filters.maxPrice !== "" && filters.maxPrice !== undefined) q.maxPrice = filters.maxPrice;
//     if (filters.sort) q.sort = filters.sort;
//     if (filters.page) q.page = filters.page;
//     if (filters.limit) q.limit = filters.limit;
//     setSearchParams(q, { replace: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filters.q, filters.category, filters.minPrice, filters.maxPrice, filters.sort, filters.page, filters.limit]);

//   // load categories
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const res = await api.get("/user/categories");
//         if (!mounted) return;
//         setCategories(res.data.categories || []);
//       } catch (err) {
//         console.error("Categories load failed", err);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   // fetch items (main fetch)
//   useEffect(() => {
//     // build params
//     const params = {
//       q: debouncedQ || undefined,
//       category: filters.category || undefined,
//       minPrice: filters.minPrice === "" ? undefined : filters.minPrice,
//       maxPrice: filters.maxPrice === "" ? undefined : filters.maxPrice,
//       sort: filters.sort || undefined,
//       page: filters.page || 1,
//       limit: filters.limit || DEFAULT_LIMIT,
//     };

//     // cancel previous
//     try { abortRef.current?.abort(); } catch (e) {}
//     const controller = new AbortController();
//     abortRef.current = controller;

//     setLoading(true);
//     setError(null);

//     (async () => {
//       try {
//         const res = await api.get("/user/products/search", { params, signal: controller.signal });
//         setItems(res.data.items || []);
//         setTotal(res.data.total || 0);
//       } catch (err) {
//         if (err.name === "CanceledError" || err?.code === "ERR_CANCELED") {
//           // aborted
//           return;
//         }
//         console.error("Search error", err);
//         setError(err.response?.data?.message || "Failed to load products.");
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => {
//       try { controller.abort(); } catch (e) {}
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [debouncedQ, filters.category, filters.minPrice, filters.maxPrice, filters.sort, filters.page, filters.limit]);

//   // handlers
//   const updateFilter = (change) => {
//     setFilters((prev) => ({ ...prev, ...change, page: 1 }));
//   };
//   const clearFilter = (key) => {
//     setFilters((prev) => ({ ...prev, [key]: key === "page" ? prev.page : "", page: 1 }));
//   };
//   const clearAll = () => {
//     setFilters({ q: "", category: "", minPrice: "", maxPrice: "", sort: "relevance", page: 1, limit: DEFAULT_LIMIT });
//   };

//   const handleView = (p) => {
//     // navigate to product detail page (assuming /products/:productId)
//     const id = p._id || p.id || p.slug;
//     if (id) navigate(`/products/${id}`);
//   };

//   const handleAddToCart = async (p) => {
//     try {
//       await api.post("/cart/add", { productId: p._id || p.id || p.slug, quantity: 1 });
//       // ideally call your cart context refresh here
//       alert("Added to cart");
//     } catch (err) {
//       console.error("Add to cart failed", err);
//       alert("Add to cart failed");
//     }
//   };

//   // active chips
//   const activeChips = [];
//   if (filters.q) activeChips.push({ key: "q", label: `Search: "${filters.q}"` });
//   if (filters.category) activeChips.push({ key: "category", label: `Category: ${filters.category}` });
//   if (filters.minPrice !== "" || filters.maxPrice !== "") {
//     activeChips.push({ key: "price", label: `Price: ₹${filters.minPrice === "" ? 0 : filters.minPrice}–${filters.maxPrice === "" ? "∞" : filters.maxPrice}` });
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar
//         isAuthenticated={true}
//         role={localStorage.getItem("role")}
//         cartItemCount={cartItems.length}
//         handleGatedNavigation={() => {}}
//       />

//       {/* Mobile filter dialog */}
//       <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 sm:hidden">
//         <DialogBackdrop className="fixed inset-0 bg-black/25" />
//         <div className="fixed inset-0 z-40 flex">
//           <DialogPanel className="relative ml-auto w-full max-w-xs transform overflow-y-auto bg-white p-4 shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-medium">Filters</h2>
//               <button onClick={() => setMobileFiltersOpen(false)} className="p-2">
//                 <XMarkIcon className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Category */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Category</label>
//               <select
//                 value={filters.category || ""}
//                 onChange={(e) => updateFilter({ category: e.target.value })}
//                 className="mt-1 block w-full border rounded-md p-2"
//               >
//                 <option value="">All categories</option>
//                 {categories.map((c) => (
//                   <option key={c._id || c.id} value={c.name || c.title}>{c.name || c.title}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Min Price</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={filters.minPrice === "" ? "" : filters.minPrice}
//                 onChange={(e) => updateFilter({ minPrice: e.target.value === "" ? "" : Number(e.target.value) })}
//                 className="mt-1 block w-full border rounded-md p-2"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Max Price</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={filters.maxPrice === "" ? "" : filters.maxPrice}
//                 onChange={(e) => updateFilter({ maxPrice: e.target.value === "" ? "" : Number(e.target.value) })}
//                 className="mt-1 block w-full border rounded-md p-2"
//               />
//             </div>

//             <div className="flex gap-2">
//               <button onClick={() => setMobileFiltersOpen(false)} className="flex-1 px-3 py-2 border rounded">Apply</button>
//               <button onClick={() => { clearAll(); }} className="flex-1 px-3 py-2 bg-red-600 text-white rounded">Clear</button>
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>

//       <main className="max-w-7xl mx-auto px-4 py-8 mt-24">

//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold">All Products</h1>
//             <p className="text-sm text-gray-500 mt-1">Browse all products</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="hidden sm:block">
//               <Popover className="relative">
//                 <Popover.Button className="inline-flex items-center gap-2 px-3 py-2 border rounded-md">
//                   Sort
//                   <ChevronDownIcon className="h-4 w-4 text-gray-500" />
//                 </Popover.Button>
//                 <Popover.Panel className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg p-2 z-20">
//                   <button className={classNames(filters.sort === "relevance" ? "font-medium" : "text-gray-600", "block px-3 py-2 text-left w-full")} onClick={() => updateFilter({ sort: "relevance" })}>Relevance</button>
//                   <button className={classNames(filters.sort === "newest" ? "font-medium" : "text-gray-600", "block px-3 py-2 text-left w-full")} onClick={() => updateFilter({ sort: "newest" })}>Newest</button>
//                   <button className={classNames(filters.sort === "price-asc" ? "font-medium" : "text-gray-600", "block px-3 py-2 text-left w-full")} onClick={() => updateFilter({ sort: "price-asc" })}>Price: Low to High</button>
//                   <button className={classNames(filters.sort === "price-desc" ? "font-medium" : "text-gray-600", "block px-3 py-2 text-left w-full")} onClick={() => updateFilter({ sort: "price-desc" })}>Price: High to Low</button>
//                 </Popover.Panel>
//               </Popover>
//             </div>

//             <button onClick={() => setMobileFiltersOpen(true)} className="sm:hidden inline-flex items-center gap-2 px-3 py-2 border rounded-md">
//               <Bars3Icon className="h-5 w-5" /> Filters
//             </button>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="mt-4">
//           <label htmlFor="search" className="sr-only">Search products</label>
//           <input
//             id="search"
//             type="search"
//             placeholder="Search products, e.g., curtains, saree..."
//             value={filters.q}
//             onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
//             className="w-full border rounded-md p-3"
//           />
//         </div>

//         {/* Active filters */}
//         <div className="mt-4 flex items-center gap-3">
//           <div className="flex flex-wrap gap-2">
//             {activeChips.map(chip => (
//               <button key={chip.key} onClick={() => clearFilter(chip.key)} className="inline-flex items-center gap-2 bg-white px-3 py-1 border rounded-full text-sm">
//                 {chip.label} <span className="text-gray-400">×</span>
//               </button>
//             ))}
//           </div>
//           {activeChips.length > 0 && <button onClick={clearAll} className="ml-auto text-sm text-red-600 underline">Clear all</button>}
//           <div className="ml-auto text-sm text-gray-600">
//             {!loading ? (
//               <span>Showing {items.length ? (Math.min((filters.page - 1) * filters.limit + 1, total)) : 0}–{Math.min(filters.page * filters.limit, total)} of {total} results</span>
//             ) : <span>Loading...</span>}
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {loading && items.length === 0
//             ? Array.from({ length: filters.limit }).map((_, i) => <SkeletonCard key={i} />)
//             : items.map((p) => <ProductCard key={p._id || p.id || p.slug} p={p} onView={handleView} onAddToCart={handleAddToCart} />)
//           }
//         </div>

//         {/* Empty */}
//         {!loading && items.length === 0 && (
//           <div className="mt-8 text-center text-gray-500">
//             <p>No products found for the selected filters.</p>
//             <div className="mt-3">
//               <button onClick={clearAll} className="px-3 py-2 border rounded">Clear filters</button>
//             </div>
//           </div>
//         )}

//         {/* Error */}
//         {error && (
//           <div className="mt-6 bg-red-50 border border-red-100 text-red-800 p-3 rounded">
//             <div className="flex items-center justify-between">
//               <div>{error}</div>
//               <div><button onClick={() => { setError(null); setFilters((p) => ({ ...p })); }} className="px-3 py-1 border rounded">Retry</button></div>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-8 flex items-center justify-center gap-4">
//           <button onClick={() => setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))} disabled={filters.page === 1} className="px-3 py-2 border rounded disabled:opacity-50">Prev</button>
//           <div className="text-sm">Page {filters.page} of {Math.max(1, Math.ceil(total / filters.limit))}</div>
//           <button onClick={() => setFilters((p) => ({ ...p, page: Math.min(Math.ceil(total / p.limit), p.page + 1) }))} disabled={filters.page >= Math.ceil(total / filters.limit)} className="px-3 py-2 border rounded disabled:opacity-50">Next</button>
//         </div>
//       </main>

//       <SocialFooter/>
//     </div>
//   );
// }






// src/pages/AllProducts.jsx
// "use client";

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Popover,
// } from "@headlessui/react";
// import {
//   ChevronDownIcon,
//   XMarkIcon,
//   Bars3Icon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import SocialFooter from "./SocialFooter";

// /**
//  * AllProducts - Tailwind-style product listing page
//  * - Uses backend endpoints:
//  * GET /user/categories          -> { categories: [...] }
//  * GET /user/products/search     -> { items: [...], total: N, page, pageSize }
//  * - Query params supported: q, category, minPrice, maxPrice, sort, page, limit
//  * - Product card fields used: _id or id, name, price, image (or imageUrl), category (object or name)
//  */

// const DEFAULT_LIMIT = 24;
// const DEBOUNCE_MS = 300;

// function classNames(...c) {
//   return c.filter(Boolean).join(" ");
// }

// // ... (SkeletonCard and ProductCard components remain the same)
// function SkeletonCard() {
//   return (
//     <div className="group relative border rounded-md p-3 bg-white animate-pulse">
//       <div className="aspect-square w-full rounded-md bg-gray-200" />
//       <div className="mt-3 h-4 bg-gray-200 w-1/2 rounded" />
//       <div className="mt-2 h-4 bg-gray-200 w-1/3 rounded" />
//     </div>
//   );
// }

// function ProductCard({ p, onView, onAddToCart }) {
//   const img =
//     p.image ||
//     p.imageUrl ||
//     (p.images && p.images[0]) ||
//     "https://via.placeholder.com/400?text=No+Image";
//   const title = p.name || p.title || "Product";
//   const price = p.price == null ? "—" : `₹${p.price}`;
//   const categoryName = (p.category && (p.category.name || p.category)) || "";

//   return (
//     <div className="group relative">
//       <img
//         src={img}
//         alt={p.imageAlt || title}
//         className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
//         loading="lazy"
//       />
//       <div className="mt-4 flex justify-between">
//         <div>
//           <h3 className="text-sm text-gray-700">
//             <button onClick={() => onView && onView(p)} className="text-left">
//               <span aria-hidden="true" className="absolute inset-0" />
//               {title}
//             </button>
//           </h3>
//           {categoryName && (
//             <p className="mt-1 text-sm text-gray-500">{categoryName}</p>
//           )}
//         </div>
//         <p className="text-sm font-medium text-gray-900">{price}</p>
//       </div>
//       <div className="mt-3 flex gap-2">
//         <button
//           onClick={() => onAddToCart && onAddToCart(p)}
//           className="px-3 py-1 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
//         >
//           Add to Cart
//         </button>
//         <button
//           onClick={() => onView && onView(p)}
//           className="px-3 py-1 border rounded-md text-sm"
//         >
//           View
//         </button>
//       </div>
//     </div>
//   );
// }
// // ...

// export default function AllProducts() {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { cartItems } = useCart();

//   // UI State
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false); // New state for search input toggle

//   // Filters state (initialize from URL)
//   const [filters, setFilters] = useState(() => {
//     const q = searchParams.get("q") || "";
//     const category = searchParams.get("category") || "";
//     const minPrice = searchParams.get("minPrice") ?? "";
//     const maxPrice = searchParams.get("maxPrice") ?? "";
//     const sort = searchParams.get("sort") || "relevance";
//     const page = parseInt(searchParams.get("page") || "1", 10) || 1;
//     const limit =
//       parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10) ||
//       DEFAULT_LIMIT;
//     return {
//       q,
//       category,
//       minPrice: minPrice === "" ? "" : Number(minPrice),
//       maxPrice: maxPrice === "" ? "" : Number(maxPrice),
//       sort,
//       page,
//       limit,
//     };
//   });

//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const abortRef = useRef(null);
//   const [debouncedQ, setDebouncedQ] = useState(filters.q);
//   const searchInputRef = useRef(null);

//   // Debounce search text
//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedQ(filters.q), DEBOUNCE_MS);
//     return () => clearTimeout(t);
//   }, [filters.q]);

//   // Focus search input when it opens
//   useEffect(() => {
//     if (isSearchOpen) {
//       searchInputRef.current?.focus();
//     }
//   }, [isSearchOpen]);

//   // Sync filters -> URL
//   useEffect(() => {
//     const q = {};
//     if (filters.q) q.q = filters.q;
//     if (filters.category) q.category = filters.category;
//     if (filters.minPrice !== "" && filters.minPrice !== undefined)
//       q.minPrice = filters.minPrice;
//     if (filters.maxPrice !== "" && filters.maxPrice !== undefined)
//       q.maxPrice = filters.maxPrice;
//     if (filters.sort) q.sort = filters.sort;
//     if (filters.page) q.page = filters.page;
//     if (filters.limit) q.limit = filters.limit;
//     setSearchParams(q, { replace: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     filters.q,
//     filters.category,
//     filters.minPrice,
//     filters.maxPrice,
//     filters.sort,
//     filters.page,
//     filters.limit,
//   ]);

//   // Load categories
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const res = await api.get("/user/categories");
//         if (!mounted) return;
//         setCategories(res.data.categories || []);
//       } catch (err) {
//         console.error("Categories load failed", err);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // Fetch items (main fetch)
//   useEffect(() => {
//     // build params
//     const params = {
//       q: debouncedQ || undefined,
//       category: filters.category || undefined,
//       minPrice: filters.minPrice === "" ? undefined : filters.minPrice,
//       maxPrice: filters.maxPrice === "" ? undefined : filters.maxPrice,
//       sort: filters.sort || undefined,
//       page: filters.page || 1,
//       limit: filters.limit || DEFAULT_LIMIT,
//     };

//     // cancel previous
//     try {
//       abortRef.current?.abort();
//     } catch (e) {}
//     const controller = new AbortController();
//     abortRef.current = controller;

//     setLoading(true);
//     setError(null);

//     (async () => {
//       try {
//         const res = await api.get("/user/products/search", {
//           params,
//           signal: controller.signal,
//         });
//         setItems(res.data.items || []);
//         setTotal(res.data.total || 0);
//       } catch (err) {
//         if (err.name === "CanceledError" || err?.code === "ERR_CANCELED") {
//           // aborted
//           return;
//         }
//         console.error("Search error", err);
//         setError(err.response?.data?.message || "Failed to load products.");
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => {
//       try {
//         controller.abort();
//       } catch (e) {}
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     debouncedQ,
//     filters.category,
//     filters.minPrice,
//     filters.maxPrice,
//     filters.sort,
//     filters.page,
//     filters.limit,
//   ]);

//   // Handlers
//   const updateFilter = useCallback((change) => {
//     setFilters((prev) => ({ ...prev, ...change, page: 1 }));
//   }, []);

//   const clearFilter = useCallback(
//     (key) => {
//       const resetValue = key === "page" ? filters.page : "";
//       setFilters((prev) => ({ ...prev, [key]: resetValue, page: 1 }));
//     },
//     [filters.page]
//   );

//   const clearAll = useCallback(() => {
//     setFilters({
//       q: "",
//       category: "",
//       minPrice: "",
//       maxPrice: "",
//       sort: "relevance",
//       page: 1,
//       limit: DEFAULT_LIMIT,
//     });
//     setIsSearchOpen(false); // Close search when clearing all
//   }, []);

//   const handleView = (p) => {
//     // navigate to product detail page (assuming /products/:productId)
//     const id = p._id || p.id || p.slug;
//     if (id) navigate(`/products/${id}`);
//   };

//   const handleAddToCart = async (p) => {
//     try {
//       await api.post("/cart/add", {
//         productId: p._id || p.id || p.slug,
//         quantity: 1,
//       });
//       // ideally call your cart context refresh here
//       alert("Added to cart");
//     } catch (err) {
//       console.error("Add to cart failed", err);
//       alert("Add to cart failed");
//     }
//   };

//   const toggleSearch = () => {
//   setIsSearchOpen((prev) => !prev);
  
//   // Reset search only when closing (optional)
//   if (isSearchOpen && !filters.q) {
//     setFilters((prev) => ({ ...prev, q: "" }));
//   }
// };


//   // Active chips
//   const activeChips = [];
//   if (filters.q)
//     activeChips.push({ key: "q", label: `Search: "${filters.q}"` });
//   if (filters.category)
//     activeChips.push({
//       key: "category",
//       label: `Category: ${filters.category}`,
//     });
//   if (filters.minPrice !== "" || filters.maxPrice !== "") {
//     activeChips.push({
//       key: "price",
//       label: `Price: ₹${filters.minPrice === "" ? 0 : filters.minPrice}–${
//         filters.maxPrice === "" ? "∞" : filters.maxPrice
//       }`,
//     });
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar
//         isAuthenticated={true}
//         role={localStorage.getItem("role")}
//         cartItemCount={cartItems.length}
//         handleGatedNavigation={() => {}}
//       />

//       {/* Mobile filter dialog */}
//       <Dialog
//         open={mobileFiltersOpen}
//         onClose={setMobileFiltersOpen}
//         className="relative z-40 sm:hidden"
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/25" />
//         <div className="fixed inset-0 z-40 flex">
//           <DialogPanel className="relative ml-auto w-full max-w-xs transform overflow-y-auto bg-white p-4 shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-medium">Filters</h2>
//               <button
//                 onClick={() => setMobileFiltersOpen(false)}
//                 className="p-2"
//               >
//                 <XMarkIcon className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Category */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <select
//                 value={filters.category || ""}
//                 onChange={(e) => updateFilter({ category: e.target.value })}
//                 className="mt-1 block w-full border rounded-md p-2"
//               >
//                 <option value="">All categories</option>
//                 {categories.map((c) => (
//                   <option key={c._id || c.id} value={c.name || c.title}>
//                     {c.name || c.title}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Min Price
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={filters.minPrice === "" ? "" : filters.minPrice}
//                 onChange={(e) =>
//                   updateFilter({
//                     minPrice:
//                       e.target.value === "" ? "" : Number(e.target.value),
//                   })
//                 }
//                 className="mt-1 block w-full border rounded-md p-2"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Max Price
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={filters.maxPrice === "" ? "" : filters.maxPrice}
//                 onChange={(e) =>
//                   updateFilter({
//                     maxPrice:
//                       e.target.value === "" ? "" : Number(e.target.value),
//                   })
//                 }
//                 className="mt-1 block w-full border rounded-md p-2"
//               />
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setMobileFiltersOpen(false)}
//                 className="flex-1 px-3 py-2 border rounded"
//               >
//                 Apply
//               </button>
//               <button
//                 onClick={() => {
//                   clearAll();
//                 }}
//                 className="flex-1 px-3 py-2 bg-red-600 text-white rounded"
//               >
//                 Clear
//               </button>
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>

//       <main className="max-w-7xl mx-auto px-4 py-8 mt-24">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
//               All Products
//             </h1>
//             <p className="text-md text-gray-500 mt-1">
//               Discover curated products
//             </p>
//           </div>

//           {/* Controls (Search Button, Sort Popover, Mobile Filters) */}
//           <div className="flex items-center gap-3">
//             {/* Search Toggle Button */}
//             <button
//               onClick={toggleSearch}
//               className=" p-3 transition-colors"
//               aria-label="Toggle search"
//             >
//               <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
//             </button>

//             {/* Sort Popover (Desktop) */}
//             <div className="hidden sm:block">
//               <Popover className="relative">
//               <Popover.Button className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
//   Sort
//   <ChevronDownIcon className="h-4 w-4 text-gray-500" />
// </Popover.Button>
//                 <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg p-1 z-20">
//                   {({ close }) => (
//                     <>
//                       <button
//                         className={classNames(
//                           filters.sort === "relevance"
//                             ? "bg-gray-100 font-medium"
//                             : "text-gray-600",
//                           "block px-3 py-2 text-left w-full text-sm rounded hover:bg-gray-50"
//                         )}
//                         onClick={() => {
//                           updateFilter({ sort: "relevance" });
//                           close();
//                         }}
//                       >
//                         Relevance
//                       </button>
//                       <button
//                         className={classNames(
//                           filters.sort === "newest"
//                             ? "bg-gray-100 font-medium"
//                             : "text-gray-600",
//                           "block px-3 py-2 text-left w-full text-sm rounded hover:bg-gray-50"
//                         )}
//                         onClick={() => {
//                           updateFilter({ sort: "newest" });
//                           close();
//                         }}
//                       >
//                         Newest
//                       </button>
//                       <button
//                         className={classNames(
//                           filters.sort === "price-asc"
//                             ? "bg-gray-100 font-medium"
//                             : "text-gray-600",
//                           "block px-3 py-2 text-left w-full text-sm rounded hover:bg-gray-50"
//                         )}
//                         onClick={() => {
//                           updateFilter({ sort: "price-asc" });
//                           close();
//                         }}
//                       >
//                         Price: Low to High
//                       </button>
//                       <button
//                         className={classNames(
//                           filters.sort === "price-desc"
//                             ? "bg-gray-100 font-medium"
//                             : "text-gray-600",
//                           "block px-3 py-2 text-left w-full text-sm rounded hover:bg-gray-50"
//                         )}
//                         onClick={() => {
//                           updateFilter({ sort: "price-desc" });
//                           close();
//                         }}
//                       >
//                         Price: High to Low
//                       </button>
//                     </>
//                   )}
//                 </Popover.Panel>
//               </Popover>
//             </div>

//             {/* Mobile Filters Button */}
//             <button
//               onClick={() => setMobileFiltersOpen(true)}
//               className="sm:hidden inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium"
//             >
//               <Bars3Icon className="h-5 w-5" /> Filters
//             </button>
//           </div>
//         </div>

//         {/* Search Input (Conditionally Rendered) */}
//        <div
//   className={classNames(
//     "mt-4 transition-all duration-300 ease-in-out overflow-hidden",
//     isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
//   )}
// >
//   <input
//     ref={searchInputRef}
//     type="search"
//     placeholder="Search Products..."
//     value={filters.q}
//     onChange={(e) =>
//       setFilters((prev) => ({ ...prev, q: e.target.value }))
//     }
//     className="
//       w-full
//       border border-gray-300
//       rounded-lg
//       p-3 shadow-sm
//       focus:outline-none
//       focus:ring-1 focus:ring-gray-300
//       focus:border-gray-300
//     "
//   />
// </div>


//         {/* Active filters and Stats */}
//         <div className="mt-4 flex flex-wrap items-center gap-3">
//           <div className="flex flex-wrap gap-2">
//             {activeChips.map((chip) => (
//               <button
//                 key={chip.key}
//                 onClick={() =>
//                   clearFilter(chip.key === "price" ? "minPrice" : chip.key)
//                 }
//                 className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 border rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
//               >
//                 {chip.label}{" "}
//                 <span className="text-gray-500 font-semibold">×</span>
//               </button>
//             ))}
//           </div>
//           {activeChips.length > 0 && (
//             <button
//               onClick={clearAll}
//               className="ml-2 text-sm text-red-600 hover:text-red-700 underline font-medium"
//             >
//               Clear all
//             </button>
//           )}

//           {/* Results Count - Pushed to the right on desktop */}
//           <div
//             className={classNames(
//               "text-sm text-gray-600 mt-2 sm:mt-0",
//               activeChips.length > 0 ? "sm:ml-auto" : "ml-auto"
//             )}
//           >
//             {!loading ? (
//               <span>
//                 Showing{" "}
//                 {items.length
//                   ? Math.min((filters.page - 1) * filters.limit + 1, total)
//                   : 0}
//                 –{Math.min(filters.page * filters.limit, total)} of {total}{" "}
//                 results
//               </span>
//             ) : (
//               <span>Loading...</span>

//             )}
//           </div>
//         </div>

//         <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {loading && items.length === 0
//             ? Array.from({ length: filters.limit }).map((_, i) => (
//                 <SkeletonCard key={i} />
//               ))
//             : items.map((p) => (
//                 <ProductCard
//                   key={p._id || p.id || p.slug}
//                   p={p}
//                   onView={handleView}
//                   onAddToCart={handleAddToCart}
//                 />
//               ))}
//         </div>

//         {/* Empty State */}
//         {!loading && items.length === 0 && (
//           <div className="mt-16 text-center text-gray-500 p-10 border border-dashed rounded-lg">
//             <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
//             <p className="mt-2 text-lg font-medium">No products found</p>
//             <p className="mt-1 text-sm">
//               Try adjusting your filters or clearing your search term.
//             </p>
//             <div className="mt-6">
//               <button
//                 onClick={clearAll}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="mt-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
//             <div className="flex items-center justify-between">
//               <div>**Error:** {error}</div>
//               <div>
//                 <button
//                   onClick={() => {
//                     setError(null);
//                     setFilters((p) => ({ ...p }));
//                   }}
//                   className="px-3 py-1 border border-red-800 rounded text-red-800 hover:bg-red-100"
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-10 flex items-center justify-center gap-4">
//           <button
//             onClick={() =>
//               setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
//             }
//             disabled={filters.page === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-gray-50"
//           >
//             Previous
//           </button>
//           <div className="text-sm font-medium text-gray-700">
//             Page {filters.page} of{" "}
//             {Math.max(1, Math.ceil(total / filters.limit))}
//           </div>
//           <button
//             onClick={() =>
//               setFilters((p) => ({
//                 ...p,
//                 page: Math.min(Math.ceil(total / p.limit), p.page + 1),
//               }))
//             }
//             disabled={filters.page >= Math.ceil(total / filters.limit)}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//       </main>

//       <SocialFooter />
//     </div>
//   );
// }




// "use client";

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Popover,
// } from "@headlessui/react";
// import {
//   ChevronDownIcon,
//   XMarkIcon,
//   Bars3Icon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import SocialFooter from "./SocialFooter";

// const DEFAULT_LIMIT = 24;
// const DEBOUNCE_MS = 300;

// function classNames(...c) {
//   return c.filter(Boolean).join(" ");
// }

// // Skeleton loader card
// function SkeletonCard() {
//   return (
//     <div className="group relative border rounded-md p-3 bg-white animate-pulse">
//       <div className="aspect-square w-full rounded-md bg-gray-200" />
//       <div className="mt-3 h-4 bg-gray-200 w-1/2 rounded" />
//       <div className="mt-2 h-4 bg-gray-200 w-1/3 rounded" />
//     </div>
//   );
// }

// // Product card
// function ProductCard({ p, onView, onAddToCart }) {
//   const img =
//     p.image ||
//     p.imageUrl ||
//     (p.images && p.images[0]) ||
//     "https://via.placeholder.com/400?text=No+Image";
//   const title = p.name || p.title || "Product";
//   const price = p.price == null ? "—" : `₹${p.price}`;
//   const categoryName = (p.category && (p.category.name || p.category)) || "";

//   return (
//     <div className="group relative">
//       <img
//         src={img}
//         alt={p.imageAlt || title}
//         loading="lazy"
//         className="
//           w-full
//           rounded-md
//           bg-gray-200
//           object-cover
//           group-hover:opacity-75
//           aspect-square
//           sm:aspect-square
//           md:h-60
//           lg:h-72
//           xl:h-80
//         "
//       />
//       <div className="mt-4 flex justify-between">
//         <div>
//           <h3 className="text-sm text-gray-700">
//             <button onClick={() => onView && onView(p)} className="text-left">
//               <span aria-hidden="true" className="absolute inset-0" />
//               {title}
//             </button>
//           </h3>
//           {categoryName && (
//             <p className="mt-1 text-sm text-gray-500">{categoryName}</p>
//           )}
//         </div>
//         <p className="text-sm font-medium text-gray-900">{price}</p>
//       </div>
//       <div className="mt-3 flex gap-2">
//         <button
//           onClick={() => onAddToCart && onAddToCart(p)}
//           className="px-3 py-1 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
//         >
//           Add to Cart
//         </button>
//         <button
//           onClick={() => onView && onView(p)}
//           className="px-3 py-1 border rounded-md text-sm"
//         >
//           View
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function AllProducts() {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { cartItems } = useCart();

//   // UI State
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   // Filters state (initialize from URL)
//   const [filters, setFilters] = useState(() => {
//     const q = searchParams.get("q") || "";
//     const category = searchParams.get("category") || "";
//     const minPrice = searchParams.get("minPrice") ?? "";
//     const maxPrice = searchParams.get("maxPrice") ?? "";
//     const sort = searchParams.get("sort") || "relevance";
//     const page = parseInt(searchParams.get("page") || "1", 10) || 1;
//     const limit =
//       parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10) ||
//       DEFAULT_LIMIT;
//     return {
//       q,
//       category,
//       minPrice: minPrice === "" ? "" : Number(minPrice),
//       maxPrice: maxPrice === "" ? "" : Number(maxPrice),
//       sort,
//       page,
//       limit,
//     };
//   });

//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true); // start with loader visible
//   const [error, setError] = useState(null);

//   const abortRef = useRef(null);
//   const [debouncedQ, setDebouncedQ] = useState(filters.q);
//   const searchInputRef = useRef(null);

//   // Debounce search text
//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedQ(filters.q), DEBOUNCE_MS);
//     return () => clearTimeout(t);
//   }, [filters.q]);

//   // Focus search input when it opens
//   useEffect(() => {
//     if (isSearchOpen) {
//       searchInputRef.current?.focus();
//     }
//   }, [isSearchOpen]);

//   // Sync filters -> URL
//   useEffect(() => {
//     const q = {};
//     if (filters.q) q.q = filters.q;
//     if (filters.category) q.category = filters.category;
//     if (filters.minPrice !== "" && filters.minPrice !== undefined)
//       q.minPrice = filters.minPrice;
//     if (filters.maxPrice !== "" && filters.maxPrice !== undefined)
//       q.maxPrice = filters.maxPrice;
//     if (filters.sort) q.sort = filters.sort;
//     if (filters.page) q.page = filters.page;
//     if (filters.limit) q.limit = filters.limit;
//     setSearchParams(q, { replace: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     filters.q,
//     filters.category,
//     filters.minPrice,
//     filters.maxPrice,
//     filters.sort,
//     filters.page,
//     filters.limit,
//   ]);

//   // Load categories
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const res = await api.get("/user/categories");
//         if (!mounted) return;
//         setCategories(res.data.categories || []);
//       } catch (err) {
//         console.error("Categories load failed", err);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // Fetch items (main fetch)
//   useEffect(() => {
//     const params = {
//       q: debouncedQ || undefined,
//       category: filters.category || undefined,
//       minPrice: filters.minPrice === "" ? undefined : filters.minPrice,
//       maxPrice: filters.maxPrice === "" ? undefined : filters.maxPrice,
//       sort: filters.sort || undefined,
//       page: filters.page || 1,
//       limit: filters.limit || DEFAULT_LIMIT,
//     };

//     // cancel previous
//     try {
//       abortRef.current?.abort();
//     } catch (e) {}
//     const controller = new AbortController();
//     abortRef.current = controller;

//     setLoading(true);
//     setError(null);

//     (async () => {
//       try {
//         const res = await api.get("/user/products/search", {
//           params,
//           signal: controller.signal,
//         });
//         setItems(res.data.items || []);
//         setTotal(res.data.total || 0);
//       } catch (err) {
//         if (err.name === "CanceledError" || err?.code === "ERR_CANCELED") {
//           return;
//         }
//         console.error("Search error", err);
//         setError(err.response?.data?.message || "Failed to load products.");
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => {
//       try {
//         controller.abort();
//       } catch (e) {}
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     debouncedQ,
//     filters.category,
//     filters.minPrice,
//     filters.maxPrice,
//     filters.sort,
//     filters.page,
//     filters.limit,
//   ]);

//   // Handlers
//   const updateFilter = useCallback((change) => {
//     setFilters((prev) => ({ ...prev, ...change, page: 1 }));
//   }, []);

//   const clearFilter = useCallback(
//     (key) => {
//       const resetValue = key === "page" ? filters.page : "";
//       setFilters((prev) => ({ ...prev, [key]: resetValue, page: 1 }));
//     },
//     [filters.page]
//   );

//   const clearAll = useCallback(() => {
//     setFilters({
//       q: "",
//       category: "",
//       minPrice: "",
//       maxPrice: "",
//       sort: "relevance",
//       page: 1,
//       limit: DEFAULT_LIMIT,
//     });
//     setIsSearchOpen(false);
//   }, []);

//   const handleView = (p) => {
//     const id = p._id || p.id || p.slug;
//     if (id) navigate(`/products/${id}`);
//   };

//   const handleAddToCart = async (p) => {
//     try {
//       await api.post("/cart/add", {
//         productId: p._id || p.id || p.slug,
//         quantity: 1,
//       });
//       alert("Added to cart");
//     } catch (err) {
//       console.error("Add to cart failed", err);
//       alert("Add to cart failed");
//     }
//   };

//   const toggleSearch = () => {
//     setIsSearchOpen((prev) => !prev);
//   };

//   // Active chips
//   const activeChips = [];
//   if (filters.q)
//     activeChips.push({ key: "q", label: `Search: "${filters.q}"` });
//   if (filters.category)
//     activeChips.push({
//       key: "category",
//       label: `Category: ${filters.category}`,
//     });
//   if (filters.minPrice !== "" || filters.maxPrice !== "") {
//     activeChips.push({
//       key: "price",
//       label: `Price: ₹${filters.minPrice === "" ? 0 : filters.minPrice}–${
//         filters.maxPrice === "" ? "∞" : filters.maxPrice
//       }`,
//     });
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar
//         isAuthenticated={true}
//         role={localStorage.getItem("role")}
//         cartItemCount={cartItems.length}
//         handleGatedNavigation={() => {}}
//       />

//       {/* Mobile filter dialog */}
//       <Dialog
//         open={mobileFiltersOpen}
//         onClose={setMobileFiltersOpen}
//         className="relative z-40 sm:hidden"
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/25" />
//         <div className="fixed inset-0 z-40 flex">
//           <DialogPanel className="relative ml-auto w-full max-w-xs transform overflow-y-auto bg-white p-4 shadow-xl">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-medium">Filters</h2>
//               <button
//                 onClick={() => setMobileFiltersOpen(false)}
//                 className="p-2"
//               >
//                 <XMarkIcon className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Category */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <select
//                 value={filters.category || ""}
//                 onChange={(e) => updateFilter({ category: e.target.value })}
//                 className="mt-1 block w-full border rounded-md p-2"
//               >
//                 <option value="">All categories</option>
//                 {categories.map((c) => (
//                   <option key={c._id || c.id} value={c.name || c.title}>
//                     {c.name || c.title}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Min Price
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={filters.minPrice === "" ? "" : filters.minPrice}
//                 onChange={(e) =>
//                   updateFilter({
//                     minPrice:
//                       e.target.value === "" ? "" : Number(e.target.value),
//                   })
//                 }
//                 className="mt-1 block w-full border rounded-md p-2"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Max Price
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={filters.maxPrice === "" ? "" : filters.maxPrice}
//                 onChange={(e) =>
//                   updateFilter({
//                     maxPrice:
//                       e.target.value === "" ? "" : Number(e.target.value),
//                   })
//                 }
//                 className="mt-1 block w-full border rounded-md p-2"
//               />
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setMobileFiltersOpen(false)}
//                 className="flex-1 px-3 py-2 border rounded"
//               >
//                 Apply
//               </button>
//               <button
//                 onClick={() => {
//                   clearAll();
//                 }}
//                 className="flex-1 px-3 py-2 bg-red-600 text-white rounded"
//               >
//                 Clear
//               </button>
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>

//       <main className="max-w-7xl mx-auto px-4 py-8 mt-24">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
//               All Products
//             </h1>
//             <p className="text-md text-gray-500 mt-1">
//               Discover curated products
//             </p>
//           </div>

//           {/* Controls (Search Button, Sort Popover, Mobile Filters) */}
//           <div className="flex items-center gap-3">
//             {/* Search Toggle Button */}
//             <button
//               onClick={toggleSearch}
//               className="p-3 transition-colors"
//               aria-label="Toggle search"
//             >
//               <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
//             </button>

//             {/* Sort Popover (Desktop) */}
//             <div className="hidden sm:block">
//               <Popover className="relative">
//                 <Popover.Button className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
//                   Sort
//                   <ChevronDownIcon className="h-4 w-4 text-gray-500" />
//                 </Popover.Button>
//                 <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg p-1 z-20">
//                   {({ close }) => (
//                     <>
//                       <button
//                         className={classNames(
//                           filters.sort === "relevance"
//                             ? "bg-gray-100 font-medium"
//                             : "text-gray-600",
//                           "block px-3 py-2 text-left w-full text-sm rounded hover:bg-gray-50"
//                         )}
//                         onClick={() => {
//                           updateFilter({ sort: "relevance" });
//                           close();
//                         }}
//                       >
//                         Relevance
//                       </button>
//                       <button
//                         className={classNames(
//                           filters.sort === "newest"
//                             ? "bg-gray-100 font-medium"
//                             : "text-gray-600",
//                           "block px-3 py-2 text-left w-full text-sm rounded hover:bg-gray-50"
//                         )}
//                         onClick={() => {
//                           updateFilter({ sort: "newest" });
//                           close();
//                         }}
//                       >
//                         Newest
//                       </button>
//                       <button
//                         className={classNames(
//                           filters.sort === "price-asc"
//                             ? "bg-gray-100 font-medium"
//                             : "text-gray-600",
//                           "block px-3 py-2 text-left w-full text-sm rounded hover:bg-gray-50"
//                         )}
//                         onClick={() => {
//                           updateFilter({ sort: "price-asc" });
//                           close();
//                         }}
//                       >
//                         Price: Low to High
//                       </button>
//                       <button
//                         className={classNames(
//                           filters.sort === "price-desc"
//                             ? "bg-gray-100 font-medium"
//                             : "text-gray-600",
//                           "block px-3 py-2 text-left w-full text-sm rounded hover:bg-gray-50"
//                         )}
//                         onClick={() => {
//                           updateFilter({ sort: "price-desc" });
//                           close();
//                         }}
//                       >
//                         Price: High to Low
//                       </button>
//                     </>
//                   )}
//                 </Popover.Panel>
//               </Popover>
//             </div>

//             {/* Mobile Sort (no price inputs, same options) */}
//             <div className="sm:hidden">
//               <Popover className="relative">
//                 <Popover.Button className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
//                   Sort
//                   <ChevronDownIcon className="h-4 w-4 text-gray-500" />
//                 </Popover.Button>
//                 <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg p-1 z-20">
//                   {({ close }) => (
//                     <>
//                       <button
//                         onClick={() => {
//                           updateFilter({ sort: "relevance" });
//                           close();
//                         }}
//                         className="block px-3 py-2 text-sm text-left hover:bg-gray-50"
//                       >
//                         Relevance
//                       </button>
//                       <button
//                         onClick={() => {
//                           updateFilter({ sort: "newest" });
//                           close();
//                         }}
//                         className="block px-3 py-2 text-sm text-left hover:bg-gray-50"
//                       >
//                         Newest
//                       </button>
//                       <button
//                         onClick={() => {
//                           updateFilter({ sort: "price-asc" });
//                           close();
//                         }}
//                         className="block px-3 py-2 text-sm text-left hover:bg-gray-50"
//                       >
//                         Price: Low to High
//                       </button>
//                       <button
//                         onClick={() => {
//                           updateFilter({ sort: "price-desc" });
//                           close();
//                         }}
//                         className="block px-3 py-2 text-sm text-left hover:bg-gray-50"
//                       >
//                         Price: High to Low
//                       </button>
//                     </>
//                   )}
//                 </Popover.Panel>
//               </Popover>
//             </div>

//             {/* Mobile Filters Button */}
//             <button
//               onClick={() => setMobileFiltersOpen(true)}
//               className="sm:hidden inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium"
//             >
//               <Bars3Icon className="h-5 w-5" /> Filters
//             </button>
//           </div>
//         </div>

//         {/* Search Input (Conditionally Rendered) */}
//         <div
//           className={classNames(
//             "mt-4 transition-all duration-300 ease-in-out overflow-hidden",
//             isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
//           )}
//         >
//           <input
//             ref={searchInputRef}
//             type="search"
//             placeholder="Search Products..."
//             value={filters.q}
//             onChange={(e) =>
//               setFilters((prev) => ({ ...prev, q: e.target.value }))
//             }
//             className="
//               w-full
//               border border-gray-300
//               rounded-lg
//               p-3 shadow-sm
//               focus:outline-none
//               focus:ring-1 focus:ring-gray-300
//               focus:border-gray-300
//             "
//           />
//         </div>

//         {/* Active filters and Stats */}
//         <div className="mt-4 flex flex-wrap items-center gap-3">
//           <div className="flex flex-wrap gap-2">
//             {activeChips.map((chip) => (
//               <button
//                 key={chip.key}
//                 onClick={() =>
//                   clearFilter(chip.key === "price" ? "minPrice" : chip.key)
//                 }
//                 className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 border rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
//               >
//                 {chip.label}{" "}
//                 <span className="text-gray-500 font-semibold">×</span>
//               </button>
//             ))}
//           </div>
//           {activeChips.length > 0 && (
//             <button
//               onClick={clearAll}
//               className="ml-2 text-sm text-red-600 hover:text-red-700 underline font-medium"
//             >
//               Clear all
//             </button>
//           )}

//           {/* Results Count */}
//           <div
//             className={classNames(
//               "text-sm text-gray-600 mt-2 sm:mt-0",
//               activeChips.length > 0 ? "sm:ml-auto" : "ml-auto"
//             )}
//           >
//             {!loading ? (
//               <span>
//                 Showing{" "}
//                 {items.length
//                   ? Math.min((filters.page - 1) * filters.limit + 1, total)
//                   : 0}
//                 –{Math.min(filters.page * filters.limit, total)} of {total}{" "}
//                 results
//               </span>
//             ) : (
//               <span>Loading...</span>
//             )}
//           </div>
//         </div>

//         {/* Products grid */}
//         <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {loading && items.length === 0
//             ? Array.from({ length: filters.limit }).map((_, i) => (
//                 <SkeletonCard key={i} />
//               ))
//             : items.map((p) => (
//                 <ProductCard
//                   key={p._id || p.id || p.slug}
//                   p={p}
//                   onView={handleView}
//                   onAddToCart={handleAddToCart}
//                 />
//               ))}
//         </div>

//         {/* Empty State */}
//         {!loading && items.length === 0 && (
//           <div className="mt-16 text-center text-gray-500 p-10 border border-dashed rounded-lg">
//             <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
//             <p className="mt-2 text-lg font-medium">No products found</p>
//             <p className="mt-1 text-sm">
//               Try adjusting your filters or clearing your search term.
//             </p>
//             <div className="mt-6">
//               <button
//                 onClick={clearAll}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="mt-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
//             <div className="flex items-center justify-between">
//               <div>**Error:** {error}</div>
//               <div>
//                 <button
//                   onClick={() => {
//                     setError(null);
//                     setFilters((p) => ({ ...p }));
//                   }}
//                   className="px-3 py-1 border border-red-800 rounded text-red-800 hover:bg-red-100"
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-10 flex items-center justify-center gap-4">
//           <button
//             onClick={() =>
//               setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
//             }
//             disabled={filters.page === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-gray-50"
//           >
//             Previous
//           </button>
//           <div className="text-sm font-medium text-gray-700">
//             Page {filters.page} of{" "}
//             {Math.max(1, Math.ceil(total / filters.limit))}
//           </div>
//           <button
//             onClick={() =>
//               setFilters((p) => ({
//                 ...p,
//                 page: Math.min(Math.ceil(total / p.limit), p.page + 1),
//               }))
//             }
//             disabled={filters.page >= Math.ceil(total / filters.limit)}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//       </main>

//       <SocialFooter />
//     </div>
//   );
// }

//updated ui like categoryproductpage 




"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Heart, ShoppingBag, ArrowRight, Check } from "lucide-react"; 
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion"; 
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
// 1. IMPORT WISHLIST HOOK
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { domainUrl } from "../utils/constant";
import { Toaster, toast } from "react-hot-toast"; 
import FooterSection from "../components/FooterSection"; 

const DEFAULT_LIMIT = 24;
const DEBOUNCE_MS = 300;

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

// --- MODERN CARD COMPONENT (FIXED) ---
const ModernProductCard = ({ product, addToCart, cartItems }) => {
  const navigate = useNavigate();
  
  // 2. GET CONTEXT FUNCTIONS
  const { isProductInWishlist, toggleWishlist } = useWishlist();
  
  // 3. CHECK GLOBAL STATE
  const isWishlisted = isProductInWishlist(product._id);

  // Check if product is already in cart
  const isInCart = cartItems.some((item) => {
    const cartId = item.product?._id || item.productId;
    return String(cartId) === String(product._id);
  });

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${domainUrl}/${product.image}`;

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (isInCart) {
      toast.error("This item is already in your cart",
        {id:"already in the cart allproducts"});
      return;
    }

    addToCart(product);
  };

  // 4. HANDLE TOGGLE USING CONTEXT
  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    
    const success = await toggleWishlist(product._id);
    
    if (success) {
      if (!isWishlisted) {
         toast.success("Added to wishlist",{id:"added to wishlist allproducts"});
      } else {
         toast.success("Removed from wishlist",{id:"removed from wishlist allproducts"});
      }
    } else {
      toast.error("Please login to use wishlist",{id:"login to wishlist"});
    }
  };

  const categoryName = typeof product.category === 'object' 
    ? product.category?.name 
    : product.category;

  return (
    <div 
      onClick={handleCardClick}
      className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-3xl bg-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Top Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Top Left: Category Tag */}
      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 backdrop-blur-md">
          {categoryName || "Collection"}
        </span>
      </div>

      {/* Top Right: Action Buttons Stack */}
      <div className="absolute right-4 top-4 flex flex-col gap-3">
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        >
          <Heart
            className={classNames(
              "h-5 w-5 transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-900"
            )}
          />
        </button>

        {/* Add To Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isInCart} 
          className={classNames(
            "flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95",
            isInCart 
              ? "bg-green-100 text-green-700 cursor-default" 
              : "bg-white/90 text-gray-900 hover:bg-black hover:text-white" 
          )}
          title={isInCart ? "Already in Cart" : "Add to Cart"}
        >
          {isInCart ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
        </button>
      </div>

      {/* Bottom Info Card */}
      <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-xl border border-white/50">
          <div className="flex flex-col truncate pr-2">
            <h3 className="truncate text-sm font-bold text-gray-900">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs font-bold text-gray-500">
              ₹ {product.price?.toFixed(2)}
            </p>
          </div>
          
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton loader
function SkeletonCard() {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-gray-200 animate-pulse">
       <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-gray-300" />
       <div className="absolute bottom-4 left-4 right-4 h-16 rounded-2xl bg-gray-300" />
    </div>
  );
}

export default function AllProducts() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems, addToCart, notifyAuthChange } = useCart();

  // UI State
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { user, handleClientLogout } = useAuth();

  const isAuthenticated = user?.isAuthenticated;
  const role = user?.role;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      handleClientLogout();
      localStorage.removeItem("role");
      notifyAuthChange();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleGatedNavigation = (e, path, isProtected) => {
    if (isProtected && !isAuthenticated) {
      e.preventDefault();
      navigate("/login");
    } else if (isProtected && role === "admin") {
      e.preventDefault();
      navigate("/admindashboard");
    } else {
      navigate(path);
    }
  };

  const handleUserIconClick = () => {
    if (!isAuthenticated || role !== "user") {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  // Filters state
  const [filters, setFilters] = useState(() => {
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") ?? "";
    const maxPrice = searchParams.get("maxPrice") ?? "";
    const sort = searchParams.get("sort") || "relevance";
    const page = parseInt(searchParams.get("page") || "1", 10) || 1;
    const limit =
      parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10) ||
      DEFAULT_LIMIT;
    return {
      q,
      category,
      minPrice: minPrice === "" ? "" : Number(minPrice),
      maxPrice: maxPrice === "" ? "" : Number(maxPrice),
      sort,
      page,
      limit,
    };
  });

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);
  const [debouncedQ, setDebouncedQ] = useState(filters.q);

  // Debounce search text
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(filters.q), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [filters.q]);

  // Sync filters -> URL
  useEffect(() => {
    const q = {};
    if (filters.q) q.q = filters.q;
    if (filters.category) q.category = filters.category;
    if (filters.minPrice !== "" && filters.minPrice !== undefined)
      q.minPrice = filters.minPrice;
    if (filters.maxPrice !== "" && filters.maxPrice !== undefined)
      q.maxPrice = filters.maxPrice;
    if (filters.sort) q.sort = filters.sort;
    if (filters.page) q.page = filters.page;
    if (filters.limit) q.limit = filters.limit;
    setSearchParams(q, { replace: true });
  }, [filters, setSearchParams]);

  // Load Categories
  useEffect(() => {
      let mounted = true;
      (async () => {
        try {
          const res = await api.get("/user/shop/categories");
          if (!mounted) return;
          setCategories(res.data.categories || []);
        } catch (err) {
          console.error("Categories load failed", err);
        }
      })();
      return () => {
        mounted = false;
      };
  }, []);

  // Fetch items (main fetch)
  useEffect(() => {
    const params = {
      q: debouncedQ || undefined,
      category: filters.category || undefined,
      minPrice: filters.minPrice === "" ? undefined : filters.minPrice,
      maxPrice: filters.maxPrice === "" ? undefined : filters.maxPrice,
      sort: filters.sort || undefined,
      page: filters.page || 1,
      limit: filters.limit || DEFAULT_LIMIT,
    };

    try {
      abortRef.current?.abort();
    } catch (e) {}
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await api.get("/user/products/search", {
          params,
          signal: controller.signal,
        });
        setItems(res.data.items || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        if (err.name === "CanceledError" || err?.code === "ERR_CANCELED") {
          return;
        }
        console.error("Search error", err);
        setError(err.response?.data?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      try {
        controller.abort();
      } catch (e) {}
    };
  }, [
    debouncedQ,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
    filters.page,
    filters.limit,
  ]);

  // Handlers
  const updateFilter = useCallback((change) => {
    setFilters((prev) => ({ ...prev, ...change, page: 1 }));
  }, []);

  const clearFilter = useCallback(
    (key) => {
      const resetValue = key === "page" ? filters.page : "";
      setFilters((prev) => ({ ...prev, [key]: resetValue, page: 1 }));
    },
    [filters.page]
  );

  const clearAll = useCallback(() => {
    setFilters({
      q: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "relevance",
      page: 1,
      limit: DEFAULT_LIMIT,
    });
  }, []);

  // Wrapper for Add to Cart to handle Toast
  const handleAddToCartWrapper = (product) => {
     if(addToCart) {
        addToCart(product);
        toast.success(`Added ${product.name} to cart`,{id:"added products to cart allproducts"});
     }
  }

  // Active chips logic
  const activeChips = [];
  if (filters.q)
    activeChips.push({ key: "q", label: `Search: "${filters.q}"` });
  if (filters.category)
    activeChips.push({
      key: "category",
      label: `Category: ${filters.category}`,
    });
  if (filters.minPrice !== "" || filters.maxPrice !== "") {
    activeChips.push({
      key: "price",
      label: `Price: ₹${filters.minPrice === "" ? 0 : filters.minPrice}–${
        filters.maxPrice === "" ? "∞" : filters.maxPrice
      }`,
    });
  }

  return (
    <div className="bg-white min-h-screen">
      {/* ADDED TOASTER FOR NOTIFICATIONS */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* <Navbar
        isAuthenticated={isAuthenticated}
        role={role}
        cartItemCount={cartItems.length}
        handleLogout={handleLogout}
        handleUserIconClick={handleUserIconClick}
        handleGatedNavigation={handleGatedNavigation}
      /> */}

      {/* Mobile Filter Dialog (Unchanged) */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 sm:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto w-full max-w-xs transform overflow-y-auto bg-white p-4 shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            {/* Filter Inputs (Category, Price) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={filters.category || ""}
                onChange={(e) => updateFilter({ category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c._id || c.id} value={c.name || c.title}>
                    {c.name || c.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    placeholder="Min"
                    min="0"
                    value={filters.minPrice === "" ? "" : filters.minPrice}
                    onChange={(e) => updateFilter({ minPrice: e.target.value === "" ? "" : Number(e.target.value) })}
                    className="block w-full rounded-md border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    min="0"
                    value={filters.maxPrice === "" ? "" : filters.maxPrice}
                    onChange={(e) => updateFilter({ maxPrice: e.target.value === "" ? "" : Number(e.target.value) })}
                    className="block w-full rounded-md border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Apply
              </button>
              <button
                onClick={clearAll}
                className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="max-w-7xl mx-auto px-4 py-8 mt-24">
        
        {/* --- 1. NEW HEADER DESIGN (Matches Previous Pages) --- */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl font-sans"
          >
            <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent">
              Featured Collections
            </span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gray-900 mx-auto mt-4 rounded-full"
          />
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto font-light">
            Discover our latest arrivals and timeless pieces crafted for you.
          </p>
        </div>

        {/* --- 2. REDESIGNED SEARCH & CONTROLS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          
          {/* Centered Search Bar */}
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={filters.q}
                onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Controls (Sort & Filter) */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-center">
            {/* Desktop Sort */}
            <div className="hidden sm:block">
              <Popover className="relative">
                <Popover.Button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all">
                  Sort By
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </Popover.Button>
                <Popover.Panel className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl p-2 z-20">
                  {({ close }) => (
                    <div className="flex flex-col gap-1">
                      {[
                        { name: 'Relevance', value: 'relevance' },
                        { name: 'Newest', value: 'newest' },
                        { name: 'Price: Low to High', value: 'price-asc' },
                        { name: 'Price: High to Low', value: 'price-desc' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          className={classNames(
                            filters.sort === option.value ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50",
                            "block w-full px-4 py-2 text-left text-sm rounded-lg transition-colors"
                          )}
                          onClick={() => {
                            updateFilter({ sort: option.value });
                            close();
                          }}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </Popover.Panel>
              </Popover>
            </div>

            {/* Mobile Filters Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="sm:hidden inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Bars3Icon className="h-5 w-5" /> Filters
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeChips.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 border border-gray-200"
              >
                {chip.label}
                <button
                  onClick={() => clearFilter(chip.key === "price" ? "minPrice" : chip.key)}
                  className="ml-1 rounded-full p-0.5 hover:bg-gray-200 text-gray-500"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-sm font-medium text-red-600 hover:text-red-800 ml-2 underline decoration-red-200 underline-offset-4"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="mb-6 text-sm text-gray-500 text-right">
           {!loading && (
             <>Showing {items.length ? Math.min((filters.page - 1) * filters.limit + 1, total) : 0} – {Math.min(filters.page * filters.limit, total)} of {total} products</>
           )}
        </div>

        {/* PRODUCT GRID LAYOUT */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {loading && items.length === 0
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : items.map((p) => (
                <ModernProductCard 
                    key={p._id || p.id} 
                    product={p} 
                    addToCart={handleAddToCartWrapper}
                    cartItems={cartItems} 
                />
              ))}
        </div>

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-16 text-center">
            <div className="rounded-full bg-white p-4 shadow-sm">
                <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              We couldn't find any matches for your filters.
            </p>
            <button
              onClick={clearAll}
              className="mt-6 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all hover:shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading products</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => { setError(null); setFilters((p) => ({ ...p })); }}
                    className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {total > filters.limit && (
        <div className="mt-20 flex items-center justify-center gap-6">
          <button
            onClick={() => setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
            disabled={filters.page === 1}
            className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md disabled:opacity-50 disabled:hover:bg-transparent disabled:shadow-none transition-all"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
            Page {filters.page}
          </span>
          <button
            onClick={() => setFilters((p) => ({
                ...p,
                page: Math.min(Math.ceil(total / p.limit), p.page + 1),
              }))
            }
            disabled={filters.page >= Math.ceil(total / filters.limit)}
            className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md disabled:opacity-50 disabled:hover:bg-transparent disabled:shadow-none transition-all"
          >
            Next
          </button>
        </div>
        )}
      </main>

       <FooterSection/>

      {/* <SocialFooter /> */}
    </div>
  );
}