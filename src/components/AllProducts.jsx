// src/pages/AllProducts.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, Popover } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import SocialFooter from "./SocialFooter";


/**
 AllProducts - Tailwind-style product listing page
 - Uses backend endpoints:
    GET /user/categories          -> { categories: [...] }
    GET /user/products/search     -> { items: [...], total: N, page, pageSize }
 - Query params supported: q, category, minPrice, maxPrice, sort, page, limit
 - Product card fields used: _id or id, name, price, image (or imageUrl), category (object or name)
*/

const DEFAULT_LIMIT = 24;
const DEBOUNCE_MS = 300;

function classNames(...c) { return c.filter(Boolean).join(" "); }

function SkeletonCard() {
  return (
    <div className="group relative border rounded-md p-3 bg-white animate-pulse">
      <div className="aspect-square w-full rounded-md bg-gray-200" />
      <div className="mt-3 h-4 bg-gray-200 w-1/2 rounded" />
      <div className="mt-2 h-4 bg-gray-200 w-1/3 rounded" />
    </div>
  );
}

function ProductCard({ p, onView, onAddToCart }) {
  const img = p.image || p.imageUrl || (p.images && p.images[0]) || "https://via.placeholder.com/400?text=No+Image";
  const title = p.name || p.title || "Product";
  const price = p.price == null ? "—" : `₹${p.price}`;
  const categoryName = (p.category && (p.category.name || p.category)) || "";

  return (
    <div className="group relative">
      <img
        src={img}
        alt={p.imageAlt || title}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        loading="lazy"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <button onClick={() => onView && onView(p)} className="text-left">
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </button>
          </h3>
          {categoryName && <p className="mt-1 text-sm text-gray-500">{categoryName}</p>}
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onAddToCart && onAddToCart(p)}
          className="px-3 py-1 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onView && onView(p)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default function AllProducts() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems } = useCart();

  // UI
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filters state (initialize from URL)
  const [filters, setFilters] = useState(() => {
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") ?? "";
    const maxPrice = searchParams.get("maxPrice") ?? "";
    const sort = searchParams.get("sort") || "relevance";
    const page = parseInt(searchParams.get("page") || "1", 10) || 1;
    const limit = parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT;
    return { q, category, minPrice: minPrice === "" ? "" : Number(minPrice), maxPrice: maxPrice === "" ? "" : Number(maxPrice), sort, page, limit };
  });

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);
  const [debouncedQ, setDebouncedQ] = useState(filters.q);

  // debounce search text
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(filters.q), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [filters.q]);

  // sync filters -> URL
  useEffect(() => {
    const q = {};
    if (filters.q) q.q = filters.q;
    if (filters.category) q.category = filters.category;
    if (filters.minPrice !== "" && filters.minPrice !== undefined) q.minPrice = filters.minPrice;
    if (filters.maxPrice !== "" && filters.maxPrice !== undefined) q.maxPrice = filters.maxPrice;
    if (filters.sort) q.sort = filters.sort;
    if (filters.page) q.page = filters.page;
    if (filters.limit) q.limit = filters.limit;
    setSearchParams(q, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.q, filters.category, filters.minPrice, filters.maxPrice, filters.sort, filters.page, filters.limit]);

  // load categories
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/user/categories");
        if (!mounted) return;
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Categories load failed", err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // fetch items (main fetch)
  useEffect(() => {
    // build params
    const params = {
      q: debouncedQ || undefined,
      category: filters.category || undefined,
      minPrice: filters.minPrice === "" ? undefined : filters.minPrice,
      maxPrice: filters.maxPrice === "" ? undefined : filters.maxPrice,
      sort: filters.sort || undefined,
      page: filters.page || 1,
      limit: filters.limit || DEFAULT_LIMIT,
    };

    // cancel previous
    try { abortRef.current?.abort(); } catch (e) {}
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await api.get("/user/products/search", { params, signal: controller.signal });
        setItems(res.data.items || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        if (err.name === "CanceledError" || err?.code === "ERR_CANCELED") {
          // aborted
          return;
        }
        console.error("Search error", err);
        setError(err.response?.data?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      try { controller.abort(); } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, filters.category, filters.minPrice, filters.maxPrice, filters.sort, filters.page, filters.limit]);

  // handlers
  const updateFilter = (change) => {
    setFilters((prev) => ({ ...prev, ...change, page: 1 }));
  };
  const clearFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: key === "page" ? prev.page : "", page: 1 }));
  };
  const clearAll = () => {
    setFilters({ q: "", category: "", minPrice: "", maxPrice: "", sort: "relevance", page: 1, limit: DEFAULT_LIMIT });
  };

  const handleView = (p) => {
    // navigate to product detail page (assuming /products/:productId)
    const id = p._id || p.id || p.slug;
    if (id) navigate(`/products/${id}`);
  };

  const handleAddToCart = async (p) => {
    try {
      await api.post("/cart/add", { productId: p._id || p.id || p.slug, quantity: 1 });
      // ideally call your cart context refresh here
      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Add to cart failed");
    }
  };

  // active chips
  const activeChips = [];
  if (filters.q) activeChips.push({ key: "q", label: `Search: "${filters.q}"` });
  if (filters.category) activeChips.push({ key: "category", label: `Category: ${filters.category}` });
  if (filters.minPrice !== "" || filters.maxPrice !== "") {
    activeChips.push({ key: "price", label: `Price: ₹${filters.minPrice === "" ? 0 : filters.minPrice}–${filters.maxPrice === "" ? "∞" : filters.maxPrice}` });
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar
        isAuthenticated={true}
        role={localStorage.getItem("role")}
        cartItemCount={cartItems.length}
        handleGatedNavigation={() => {}}
      />

      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 sm:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto w-full max-w-xs transform overflow-y-auto bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={filters.category || ""}
                onChange={(e) => updateFilter({ category: e.target.value })}
                className="mt-1 block w-full border rounded-md p-2"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c._id || c.id} value={c.name || c.title}>{c.name || c.title}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Min Price</label>
              <input
                type="number"
                min="0"
                value={filters.minPrice === "" ? "" : filters.minPrice}
                onChange={(e) => updateFilter({ minPrice: e.target.value === "" ? "" : Number(e.target.value) })}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Max Price</label>
              <input
                type="number"
                min="0"
                value={filters.maxPrice === "" ? "" : filters.maxPrice}
                onChange={(e) => updateFilter({ maxPrice: e.target.value === "" ? "" : Number(e.target.value) })}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setMobileFiltersOpen(false)} className="flex-1 px-3 py-2 border rounded">Apply</button>
              <button onClick={() => { clearAll(); }} className="flex-1 px-3 py-2 bg-red-600 text-white rounded">Clear</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="max-w-7xl mx-auto px-4 py-8 mt-24">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">All Products</h1>
            <p className="text-sm text-gray-500 mt-1">Browse all products</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Popover className="relative">
                <Popover.Button className="inline-flex items-center gap-2 px-3 py-2 border rounded-md">
                  Sort
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </Popover.Button>
                <Popover.Panel className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg p-2 z-20">
                  <button className={classNames(filters.sort === "relevance" ? "font-medium" : "text-gray-600", "block px-3 py-2 text-left w-full")} onClick={() => updateFilter({ sort: "relevance" })}>Relevance</button>
                  <button className={classNames(filters.sort === "newest" ? "font-medium" : "text-gray-600", "block px-3 py-2 text-left w-full")} onClick={() => updateFilter({ sort: "newest" })}>Newest</button>
                  <button className={classNames(filters.sort === "price-asc" ? "font-medium" : "text-gray-600", "block px-3 py-2 text-left w-full")} onClick={() => updateFilter({ sort: "price-asc" })}>Price: Low to High</button>
                  <button className={classNames(filters.sort === "price-desc" ? "font-medium" : "text-gray-600", "block px-3 py-2 text-left w-full")} onClick={() => updateFilter({ sort: "price-desc" })}>Price: High to Low</button>
                </Popover.Panel>
              </Popover>
            </div>

            <button onClick={() => setMobileFiltersOpen(true)} className="sm:hidden inline-flex items-center gap-2 px-3 py-2 border rounded-md">
              <Bars3Icon className="h-5 w-5" /> Filters
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4">
          <label htmlFor="search" className="sr-only">Search products</label>
          <input
            id="search"
            type="search"
            placeholder="Search products, e.g., curtains, saree..."
            value={filters.q}
            onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
            className="w-full border rounded-md p-3"
          />
        </div>

        {/* Active filters */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {activeChips.map(chip => (
              <button key={chip.key} onClick={() => clearFilter(chip.key)} className="inline-flex items-center gap-2 bg-white px-3 py-1 border rounded-full text-sm">
                {chip.label} <span className="text-gray-400">×</span>
              </button>
            ))}
          </div>
          {activeChips.length > 0 && <button onClick={clearAll} className="ml-auto text-sm text-red-600 underline">Clear all</button>}
          <div className="ml-auto text-sm text-gray-600">
            {!loading ? (
              <span>Showing {items.length ? (Math.min((filters.page - 1) * filters.limit + 1, total)) : 0}–{Math.min(filters.page * filters.limit, total)} of {total} results</span>
            ) : <span>Loading...</span>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {loading && items.length === 0
            ? Array.from({ length: filters.limit }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((p) => <ProductCard key={p._id || p.id || p.slug} p={p} onView={handleView} onAddToCart={handleAddToCart} />)
          }
        </div>

        {/* Empty */}
        {!loading && items.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            <p>No products found for the selected filters.</p>
            <div className="mt-3">
              <button onClick={clearAll} className="px-3 py-2 border rounded">Clear filters</button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-100 text-red-800 p-3 rounded">
            <div className="flex items-center justify-between">
              <div>{error}</div>
              <div><button onClick={() => { setError(null); setFilters((p) => ({ ...p })); }} className="px-3 py-1 border rounded">Retry</button></div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))} disabled={filters.page === 1} className="px-3 py-2 border rounded disabled:opacity-50">Prev</button>
          <div className="text-sm">Page {filters.page} of {Math.max(1, Math.ceil(total / filters.limit))}</div>
          <button onClick={() => setFilters((p) => ({ ...p, page: Math.min(Math.ceil(total / p.limit), p.page + 1) }))} disabled={filters.page >= Math.ceil(total / filters.limit)} className="px-3 py-2 border rounded disabled:opacity-50">Next</button>
        </div>
      </main>

      <SocialFooter/>
    </div>
  );
}

