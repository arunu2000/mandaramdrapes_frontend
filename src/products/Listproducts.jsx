// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";

// const Listproducts = () => {
//     // 1. STATE MANAGEMENT
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [categories, setCategories] = useState([]); // To get category names for the dropdown/display
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [formData, setFormData] = useState({ 
//         categoryCode: "", 
//         productCode: "", 
//         productName: "", 
//         description: "", 
//         price: "", 
//         image: null 
//     });
//     const [searchTerm, setSearchTerm] = useState("");
//     const [message, setMessage] = useState("");

//     // Base URL from your other components
     

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories(); // Fetch categories for the update dropdown
//     }, []);

//     // 2. FETCH DATA FUNCTIONS

//     const fetchCategories = async () => {
//         try {
//             const res = await axios.get(`${domainUrl}/category/list`);
//             // Store categories in a format that's easy to look up by ID later
//             setCategories(res.data.list || []); 
//         } catch (err) {
//             console.error("Error fetching categories:", err);
//         }
//     };
    
//     const fetchProducts = async () => {
//         try {
//             // NOTE: Use your Product List API endpoint
//             const res = await axios.get(`${domainUrl}/product/list`); 
//             setProducts(res.data.list || []);
//             setFilteredProducts(res.data.list || []);
//         } catch (err) {
//             console.error("Error fetching products:", err);
//             setMessage("Failed to load products.");
//         }
//     };

//     // 3. SEARCH FUNCTIONALITY
//     useEffect(() => {
//         const results = products.filter(
//             (prod) =>
//                 prod.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 String(prod.code).toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredProducts(results);
//     }, [searchTerm, products]);

//     // Helper to get category name from ID
//     const getCategoryName = (categoryId) => {
//         const category = categories.find(cat => cat._id === categoryId);
//         return category ? `${category.name} (${category.code})` : 'N/A';
//     };


//     // 4. MODAL HANDLERS

//     const handleEditClick = (product) => {
//         setSelectedProduct(product);
//         // Map product data to formData state for the modal
//         setFormData({ 
//             categoryCode: product.category, // product.category is the ID
//             productCode: product.code, 
//             productName: product.name, 
//             description: product.description, 
//             price: product.price, 
//             image: null // null ensures no image is sent unless a new one is selected
//         });
//         setShowEditModal(true);
//     };

//     const handleDeleteClick = (product) => {
//         setSelectedProduct(product);
//         setShowDeleteModal(true);
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === "image") {
//             setFormData({ ...formData, image: files[0] });
//         } else if (name === "productCode" || name === "price") {
//             // Ensure code and price are treated as numbers/strings respectively
//             setFormData({ ...formData, [name]: value });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     // 5. API INTERACTION FUNCTIONS

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         try {
//             const token = localStorage.getItem("token");
//             const data = new FormData();
            
//             // Append updated fields
//             data.append("category", formData.categoryCode); 
//             data.append("code", formData.productCode);
//             data.append("name", formData.productName);
//             data.append("description", formData.description);
//             data.append("price", formData.price);

//             // Only append image if a new one was selected
//             if (formData.image) {
//                 data.append("image", formData.image);
//             }

//             const res = await axios.put(
//                 `${domainUrl}/product/update/${selectedProduct._id}`, // Use product ID
//                 data,
//                 { headers: { Authorization: `Bearer ${token}` } } // Axios will set Content-Type: multipart/form-data correctly
//             );

//             setMessage(res.data.message || "Product updated successfully!");
//             setShowEditModal(false);
//             fetchProducts(); // Refresh the product list
//         } catch (err) {
//             console.error("Error updating product:", err.response ? err.response.data : err.message);
//             setMessage("Error updating product. Check console for details.");
//         }
//     };

//     const handleDelete = async () => {
//         setMessage("");
//         try {
//             const token = localStorage.getItem("token");
//             await axios.delete(`${domainUrl}/product/delete/${selectedProduct._id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
            
//             setShowDeleteModal(false);
//             fetchProducts(); // Refresh the product list
//             setMessage(`Product "${selectedProduct.name}" deleted successfully!`);
//         } catch (err) {
//             console.error("Error deleting product:", err);
//             setMessage("Error deleting product.");
//         }
//     };

//     // 6. RENDER
//     return (
//         <div className="min-h-screen bg-[#f7faf7] py-12">
//             <div className="max-w-6xl mx-auto px-6">
//                 <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d412a] mb-6 text-center">Products List</h1>

//                 <div className="flex justify-center mb-8">
//                     <div className="relative w-full max-w-2xl">
//                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//                             <FaSearch />
//                         </span>
//                         <input
//                             type="text"
//                             placeholder="Search by code or name..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cfe9d5]"
//                         />
//                     </div>
//                 </div>
                
//                 {message && <p className="text-center text-[#5e785a] mt-4 font-medium p-3 bg-[#EEFFEB] rounded-lg">{message}</p>}

//                 <div className="bg-white shadow rounded-2xl overflow-hidden mt-4">
//                     <div className="overflow-x-auto">
//                         <table className="w-full table-auto">
//                             <thead className="bg-[#eaf6ea] text-[#2d412a]">
//                                 <tr>
//                                     <th className="text-left px-6 py-4 text-sm font-semibold">Code</th>
//                                     <th className="text-left px-6 py-4 text-sm font-semibold">Name</th>
//                                     <th className="text-left px-6 py-4 text-sm font-semibold">Category</th>
//                                     <th className="text-left px-6 py-4 text-sm font-semibold">Price</th>
//                                     <th className="text-left px-6 py-4 text-sm font-semibold">Image</th>
//                                     <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white">
//                                 {filteredProducts.length > 0 ? (
//                                     filteredProducts.map((prod, idx) => (
//                                         <tr key={prod._id || idx} className={`border-t ${idx % 2 === 0 ? "" : "bg-gray-50"}`}>
//                                             <td className="px-6 py-6 align-top text-sm text-gray-700">{prod.code}</td>
//                                             <td className="px-6 py-6 align-top text-sm text-gray-800">{prod.name}</td>
//                                             {/* Display Category Name/Code by looking up the ID */}
//                                             <td className="px-6 py-6 align-top text-sm text-gray-600">
//                                                 {getCategoryName(prod.category)}
//                                             </td>
//                                             <td className="px-6 py-6 align-top text-sm font-bold text-[#5e785a]">₹{prod.price}</td>
//                                             <td className="px-6 py-6 align-top">
//                                                 {prod.image ? (
//                                                     // Assuming your backend serves images from a path like this
//                                                     <img src={`${prod.image}`} alt={prod.name} className="h-16 w-16 rounded-md object-cover" />
//                                                 ) : (
//                                                     <div className="h-16 w-16 rounded-md border bg-gray-50 flex items-center justify-center text-gray-300">No Image</div>
//                                                 )}
//                                             </td>
//                                             <td className="px-6 py-6 align-top text-right">
//                                                 <div className="inline-flex items-center gap-4">
//                                                     <button onClick={() => handleEditClick(prod)} className="text-blue-600 hover:text-blue-800">
//                                                         <FaEdit size={18} />
//                                                     </button>
//                                                     <button onClick={() => handleDeleteClick(prod)} className="text-red-600 hover:text-red-800">
//                                                         <FaTrash size={18} />
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="text-center py-10 text-gray-500 italic">No products found.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* UPDATE PRODUCT MODAL */}
//                 {showEditModal && selectedProduct && (
//                     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
//                             <h2 className="text-xl font-bold text-[#2d412a] mb-6 text-center">Update Product: {selectedProduct.name}</h2>

//                             <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                                
//                                 {/* Category Select */}
//                                 <select
//                                     name="categoryCode"
//                                     value={formData.categoryCode}
//                                     onChange={handleChange}
//                                     className="border rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5e785a]"
//                                     required
//                                 >
//                                     <option value="" disabled hidden>Select Category</option>
//                                     {categories.map(cat => (
//                                         <option key={cat._id} value={cat._id}> 
//                                             {cat.name} ({cat.code})
//                                         </option>
//                                     ))}
//                                 </select>

//                                 {/* Product Code */}
//                                 <input 
//                                     type="number" 
//                                     name="productCode" 
//                                     value={formData.productCode} 
//                                     onChange={handleChange} 
//                                     placeholder="Product Code" 
//                                     className="border rounded px-3 py-2 text-sm" 
//                                     required 
//                                 />
//                                 {/* Product Name */}
//                                 <input 
//                                     type="text" 
//                                     name="productName" 
//                                     value={formData.productName} 
//                                     onChange={handleChange} 
//                                     placeholder="Product Name" 
//                                     className="border rounded px-3 py-2 text-sm" 
//                                     required 
//                                 />
//                                 {/* Price */}
//                                 <input 
//                                     type="number" 
//                                     name="price" 
//                                     value={formData.price} 
//                                     onChange={handleChange} 
//                                     placeholder="Price" 
//                                     className="border rounded px-3 py-2 text-sm" 
//                                     required 
//                                 />
//                                 {/* Description */}
//                                 <textarea 
//                                     name="description" 
//                                     value={formData.description} 
//                                     onChange={handleChange} 
//                                     placeholder="Product Description" 
//                                     className="border rounded px-3 py-2 text-sm resize-none" 
//                                 />

//                                 {/* Image Upload */}
//                                 <label htmlFor="updateImage" className="px-3 py-2 text-sm font-bold text-center text-[#5e785a] border border-[#5e785a] rounded cursor-pointer hover:bg-[#6f8b6b] hover:text-white transition">
//                                     {formData.image ? `Selected: ${formData.image.name}` : "Click to Change Product Image"}
//                                 </label>
//                                 <input type="file" id="updateImage" name="image" onChange={handleChange} className="hidden" accept="image/*" />

//                                 <div className="flex justify-end gap-3 mt-3">
//                                     <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 font-medium">Cancel</button>
//                                     <button type="submit" className="bg-[#5e785a] text-white px-4 py-2 rounded hover:bg-[#2d412a] font-medium">Save Changes</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}

//                 {/* DELETE PRODUCT MODAL */}
//                 {showDeleteModal && selectedProduct && (
//                     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
//                             <h2 className="text-xl font-semibold text-red-700 mb-4">Confirm Deletion</h2>
//                             <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete the product: **{selectedProduct.name}**?</p>

//                             <div className="flex justify-center gap-3">
//                                 <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 font-medium">Cancel</button>
//                                 <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium">Yes, Delete</button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Listproducts;



// updated with dropdown


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaChevronDown, FaChevronRight, FaSearch } from "react-icons/fa";
import { domainUrl } from "../utils/constant";

const Listproducts = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    categoryCode: "",
    productCode: "",
    productName: "",
    description: "",
    price: "",
    image: null,
  });

  // 🔹 Fetch Categories on Mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${domainUrl}/category/list`);
      setCategories(res.data.list || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // 🔹 Fetch Products for a specific Category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await axios.get(`${domainUrl}/product/list?categoryId=${categoryId}`);
      setProductsByCategory((prev) => ({
        ...prev,
        [categoryId]: res.data.list || [],
      }));
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // 🔹 Toggle Dropdown
  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      if (!productsByCategory[categoryId]) {
        fetchProductsByCategory(categoryId);
      }
    }
  };

  // 🔹 Filter by Search Term
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Handle Edit / Delete
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      categoryCode: product.category?._id || "",
      productCode: product.code,
      productName: product.name,
      description: product.description,
      price: product.price,
      image: null,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  // 🔹 Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("category", formData.categoryCode);
      data.append("code", formData.productCode);
      data.append("name", formData.productName);
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);

      await axios.put(`${domainUrl}/product/update/${selectedProduct._id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Product updated successfully!");
      setShowEditModal(false);
      fetchProductsByCategory(formData.categoryCode); // Refresh only affected category
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage("Error updating product.");
    }
  };

  // 🔹 Delete Product
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${domainUrl}/product/delete/${selectedProduct._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      fetchProductsByCategory(selectedProduct.category._id);
      setMessage(`Product "${selectedProduct.name}" deleted successfully!`);
    } catch (err) {
      console.error("Error deleting product:", err);
      setMessage("Error deleting product.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d412a] mb-6 text-center">
          Products by Category
        </h1>

        {/* 🔍 Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cfe9d5]"
            />
          </div>
        </div>

        {message && (
          <p className="text-center text-[#5e785a] mt-4 font-medium p-3 bg-[#EEFFEB] rounded-lg">
            {message}
          </p>
        )}

        {/* 🔹 Category Dropdowns */}
        <div className="space-y-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category._id} className="bg-white rounded-2xl shadow">
                {/* Header */}
                <div
                  onClick={() => toggleCategory(category._id)}
                  className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-[#f0f8f1] transition"
                >
                  <h2 className="text-lg font-semibold text-[#2d412a]">
                    {category.name} ({category.code})
                  </h2>
                  {expandedCategory === category._id ? (
                    <FaChevronDown className="text-[#5e785a]" />
                  ) : (
                    <FaChevronRight className="text-[#5e785a]" />
                  )}
                </div>

                {/* Products Table */}
                {expandedCategory === category._id && (
                  <div className="overflow-x-auto border-t">
                    <table className="w-full table-auto">
                      <thead className="bg-[#eaf6ea] text-[#2d412a]">
                        <tr>
                          <th className="text-left px-6 py-4 text-sm font-semibold">Code</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold">Name</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold">Price</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold">Image</th>
                          <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsByCategory[category._id]?.length ? (
                          productsByCategory[category._id].map((prod, idx) => (
                            <tr
                              key={prod._id}
                              className={`border-t ${idx % 2 === 0 ? "" : "bg-gray-50"}`}
                            >
                              <td className="px-6 py-4 text-sm text-gray-700">{prod.code}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{prod.name}</td>
                              <td className="px-6 py-4 text-sm font-bold text-[#5e785a]">
                                ₹{prod.price}
                              </td>
                              <td className="px-6 py-4">
                                {prod.image ? (
                                  <img
                                    src={`${prod.image}`}
                                    alt={prod.name}
                                    className="h-16 w-16 rounded-md object-cover"
                                  />
                                ) : (
                                  <div className="h-16 w-16 rounded-md border bg-gray-50 flex items-center justify-center text-gray-300">
                                    No Image
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="inline-flex items-center gap-4">
                                  <button
                                    onClick={() => handleEditClick(prod)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <FaEdit size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteClick(prod)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <FaTrash size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="5"
                              className="text-center py-8 text-gray-500 italic"
                            >
                              No products found in this category.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic py-12">
              No categories found.
            </p>
          )}
        </div>

        {/* 🛠 Edit Modal */}
        {showEditModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
              <h2 className="text-xl font-bold text-[#2d412a] mb-6 text-center">
                Update Product: {selectedProduct.name}
              </h2>

              <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <select
                  name="categoryCode"
                  value={formData.categoryCode}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="productCode"
                  value={formData.productCode}
                  onChange={handleChange}
                  placeholder="Product Code"
                  className="border rounded px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="border rounded px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="border rounded px-3 py-2 text-sm"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border rounded px-3 py-2 text-sm"
                />
                <input type="file" name="image" onChange={handleChange} className="text-sm" />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-[#5e785a] text-white px-4 py-2 rounded">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ❌ Delete Modal */}
        {showDeleteModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
              <h2 className="text-xl font-semibold text-red-700 mb-4">Confirm Deletion</h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete <b>{selectedProduct.name}</b>?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listproducts;
