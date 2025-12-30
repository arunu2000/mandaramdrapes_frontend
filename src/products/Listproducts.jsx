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


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaChevronDown, FaChevronRight, FaSearch } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";

// const Listproducts = () => {
//   const [categories, setCategories] = useState([]);
//   const [productsByCategory, setProductsByCategory] = useState({});
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [formData, setFormData] = useState({
//     categoryCode: "",
//     productCode: "",
//     productName: "",
//     description: "",
//     price: "",
//     image: null,
//   });

//   // 🔹 Fetch Categories on Mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${domainUrl}/category/list`);
//       setCategories(res.data.list || []);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   // 🔹 Fetch Products for a specific Category
//   const fetchProductsByCategory = async (categoryId) => {
//     try {
//       const res = await axios.get(`${domainUrl}/product/list?categoryId=${categoryId}`);
//       setProductsByCategory((prev) => ({
//         ...prev,
//         [categoryId]: res.data.list || [],
//       }));
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   // 🔹 Toggle Dropdown
//   const toggleCategory = (categoryId) => {
//     if (expandedCategory === categoryId) {
//       setExpandedCategory(null);
//     } else {
//       setExpandedCategory(categoryId);
//       if (!productsByCategory[categoryId]) {
//         fetchProductsByCategory(categoryId);
//       }
//     }
//   };

//   // 🔹 Filter by Search Term
//   const filteredCategories = categories.filter((cat) =>
//     cat.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 🔹 Handle Edit / Delete
//   const handleEditClick = (product) => {
//     setSelectedProduct(product);
//     setFormData({
//       categoryCode: product.category?._id || "",
//       productCode: product.code,
//       productName: product.name,
//       description: product.description,
//       price: product.price,
//       image: null,
//     });
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (product) => {
//     setSelectedProduct(product);
//     setShowDeleteModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "image" ? files[0] : value,
//     }));
//   };

//   // 🔹 Update Product
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");
//       const data = new FormData();
//       data.append("category", formData.categoryCode);
//       data.append("code", formData.productCode);
//       data.append("name", formData.productName);
//       data.append("description", formData.description);
//       data.append("price", formData.price);
//       if (formData.image) data.append("image", formData.image);

//       await axios.put(`${domainUrl}/product/update/${selectedProduct._id}`, data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMessage("Product updated successfully!");
//       setShowEditModal(false);
//       fetchProductsByCategory(formData.categoryCode); // Refresh only affected category
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setMessage("Error updating product.");
//     }
//   };

//   // 🔹 Delete Product
//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${domainUrl}/product/delete/${selectedProduct._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setShowDeleteModal(false);
//       fetchProductsByCategory(selectedProduct.category._id);
//       setMessage(`Product "${selectedProduct.name}" deleted successfully!`);
//     } catch (err) {
//       console.error("Error deleting product:", err);
//       setMessage("Error deleting product.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f7faf7] py-12">
//       <div className="max-w-6xl mx-auto px-6">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d412a] mb-6 text-center">
//           Products by Category
//         </h1>

//         {/* 🔍 Search */}
//         <div className="flex justify-center mb-8">
//           <div className="relative w-full max-w-2xl">
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//               <FaSearch />
//             </span>
//             <input
//               type="text"
//               placeholder="Search categories..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cfe9d5]"
//             />
//           </div>
//         </div>

//         {message && (
//           <p className="text-center text-[#5e785a] mt-4 font-medium p-3 bg-[#EEFFEB] rounded-lg">
//             {message}
//           </p>
//         )}

//         {/* 🔹 Category Dropdowns */}
//         <div className="space-y-4">
//           {filteredCategories.length > 0 ? (
//             filteredCategories.map((category) => (
//               <div key={category._id} className="bg-white rounded-2xl shadow">
//                 {/* Header */}
//                 <div
//                   onClick={() => toggleCategory(category._id)}
//                   className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-[#f0f8f1] transition"
//                 >
//                   <h2 className="text-lg font-semibold text-[#2d412a]">
//                     {category.name} ({category.code})
//                   </h2>
//                   {expandedCategory === category._id ? (
//                     <FaChevronDown className="text-[#5e785a]" />
//                   ) : (
//                     <FaChevronRight className="text-[#5e785a]" />
//                   )}
//                 </div>

//                 {/* Products Table */}
//                 {expandedCategory === category._id && (
//                   <div className="overflow-x-auto border-t">
//                     <table className="w-full table-auto">
//                       <thead className="bg-[#eaf6ea] text-[#2d412a]">
//                         <tr>
//                           <th className="text-left px-6 py-4 text-sm font-semibold">Code</th>
//                           <th className="text-left px-6 py-4 text-sm font-semibold">Name</th>
//                           <th className="text-left px-6 py-4 text-sm font-semibold">Price</th>
//                           <th className="text-left px-6 py-4 text-sm font-semibold">Image</th>
//                           <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {productsByCategory[category._id]?.length ? (
//                           productsByCategory[category._id].map((prod, idx) => (
//                             <tr
//                               key={prod._id}
//                               className={`border-t ${idx % 2 === 0 ? "" : "bg-gray-50"}`}
//                             >
//                               <td className="px-6 py-4 text-sm text-gray-700">{prod.code}</td>
//                               <td className="px-6 py-4 text-sm text-gray-800">{prod.name}</td>
//                               <td className="px-6 py-4 text-sm font-bold text-[#5e785a]">
//                                 ₹{prod.price}
//                               </td>
//                               <td className="px-6 py-4">
//                                 {prod.image ? (
//                                   <img
//                                     src={`${prod.image}`}
//                                     alt={prod.name}
//                                     className="h-16 w-16 rounded-md object-cover"
//                                   />
//                                 ) : (
//                                   <div className="h-16 w-16 rounded-md border bg-gray-50 flex items-center justify-center text-gray-300">
//                                     No Image
//                                   </div>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 text-right">
//                                 <div className="inline-flex items-center gap-4">
//                                   <button
//                                     onClick={() => handleEditClick(prod)}
//                                     className="text-blue-600 hover:text-blue-800"
//                                   >
//                                     <FaEdit size={18} />
//                                   </button>
//                                   <button
//                                     onClick={() => handleDeleteClick(prod)}
//                                     className="text-red-600 hover:text-red-800"
//                                   >
//                                     <FaTrash size={18} />
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td
//                               colSpan="5"
//                               className="text-center py-8 text-gray-500 italic"
//                             >
//                               No products found in this category.
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 italic py-12">
//               No categories found.
//             </p>
//           )}
//         </div>

//         {/* 🛠 Edit Modal */}
//         {showEditModal && selectedProduct && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
//             <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
//               <h2 className="text-xl font-bold text-[#2d412a] mb-6 text-center">
//                 Update Product: {selectedProduct.name}
//               </h2>

//               <form onSubmit={handleUpdate} className="flex flex-col gap-4">
//                 <select
//                   name="categoryCode"
//                   value={formData.categoryCode}
//                   onChange={handleChange}
//                   className="border rounded px-3 py-2 text-sm"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="number"
//                   name="productCode"
//                   value={formData.productCode}
//                   onChange={handleChange}
//                   placeholder="Product Code"
//                   className="border rounded px-3 py-2 text-sm"
//                 />
//                 <input
//                   type="text"
//                   name="productName"
//                   value={formData.productName}
//                   onChange={handleChange}
//                   placeholder="Product Name"
//                   className="border rounded px-3 py-2 text-sm"
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="Price"
//                   className="border rounded px-3 py-2 text-sm"
//                 />
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Description"
//                   className="border rounded px-3 py-2 text-sm"
//                 />
//                 <input type="file" name="image" onChange={handleChange} className="text-sm" />
//                 <div className="flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setShowEditModal(false)}
//                     className="bg-gray-300 px-4 py-2 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="bg-[#5e785a] text-white px-4 py-2 rounded">
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* ❌ Delete Modal */}
//         {showDeleteModal && selectedProduct && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
//             <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
//               <h2 className="text-xl font-semibold text-red-700 mb-4">Confirm Deletion</h2>
//               <p className="text-sm text-gray-600 mb-6">
//                 Are you sure you want to delete <b>{selectedProduct.name}</b>?
//               </p>
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="bg-gray-300 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-red-600 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Listproducts;


//updated decent uiiiiiiiiiiiii




// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaSearch, FaPlus, FaTag, FaBoxOpen, FaInfoCircle, FaTimes } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";

// // --- Custom Components for Modals (to keep the main component clean) ---

// /** 🖼️ Generic Modal Component */
// const Modal = ({ title, children, isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform scale-100 transition-transform duration-300 relative">
//         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//           <h2 className="text-xl font-bold text-[#1a2e1d]">{title}</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
//             <FaTimes size={18} />
//           </button>
//         </div>
//         <div className="p-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ------------------------------------------------------------------------

// const Listproducts = () => {
//   const [categories, setCategories] = useState([]);
//   const [productsByCategory, setProductsByCategory] = useState({});
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Key for master-detail view
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [formData, setFormData] = useState({
//     categoryCode: "",
//     productCode: "",
//     productName: "",
//     description: "",
//     price: "",
//     image: null,
//   });

//   // 🔹 Fetch Categories on Mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${domainUrl}/category/list`);
//       const list = res.data.list || [];
//       setCategories(list);
//       // Select the first category on load if available
//       if (list.length > 0) {
//         setSelectedCategoryId(list[0]._id);
//       }
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   // 🔹 Fetch Products for the selected Category
//   useEffect(() => {
//     if (selectedCategoryId && !productsByCategory[selectedCategoryId]) {
//       fetchProductsByCategory(selectedCategoryId);
//     }
//   }, [selectedCategoryId, productsByCategory]);

//   const fetchProductsByCategory = useCallback(async (categoryId) => {
//     try {
//       const res = await axios.get(`${domainUrl}/product/list?categoryId=${categoryId}`);
//       setProductsByCategory((prev) => ({
//         ...prev,
//         [categoryId]: res.data.list || [],
//       }));
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   }, []);

//   // 🔹 Filtered Categories and Products (for search)
//   const filteredCategories = useMemo(() => {
//     return categories.filter((cat) =>
//       cat.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [categories, searchTerm]);

//   const productsToDisplay = useMemo(() => {
//     const products = productsByCategory[selectedCategoryId] || [];
//     // Note: Search logic is currently only for categories. For product search within a category,
//     // we would need a separate state/input for product search.
//     return products;
//   }, [productsByCategory, selectedCategoryId]);
  
//   const selectedCategoryName = categories.find(c => c._id === selectedCategoryId)?.name;


//   // 🔹 Handle Edit / Delete setup
//   const handleEditClick = (product) => {
//     setSelectedProduct(product);
//     setFormData({
//       categoryCode: product.category?._id || "",
//       productCode: product.code,
//       productName: product.name,
//       description: product.description,
//       price: product.price,
//       image: null, // Reset image for file input
//     });
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (product) => {
//     setSelectedProduct(product);
//     setShowDeleteModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "image" ? files[0] : value,
//     }));
//   };

//   // 🔹 Update Product
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");
//       const data = new FormData();
//       data.append("category", formData.categoryCode);
//       data.append("code", formData.productCode);
//       data.append("name", formData.productName);
//       data.append("description", formData.description);
//       data.append("price", formData.price);
//       if (formData.image) data.append("image", formData.image);

//       await axios.put(`${domainUrl}/product/update/${selectedProduct._id}`, data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMessage(`Product "${formData.productName}" updated successfully!`);
//       setShowEditModal(false);
//       // Refresh the product list for the category
//       fetchProductsByCategory(formData.categoryCode);
      
//       // If category changed, also refresh the old category if needed, but here we just refresh the new one.
//       if(selectedProduct.category?._id !== formData.categoryCode) {
//         // Optimistically update the selected category ID to the new one
//         setSelectedCategoryId(formData.categoryCode);
//       }
      
//     } catch (err) {
//       console.error("Error updating product:", err);
//       setMessage("Error updating product. Please check the data.");
//     }
//   };

//   // 🔹 Delete Product
//   const handleDelete = async () => {
//     const categoryId = selectedProduct.category._id;
//     const productName = selectedProduct.name;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${domainUrl}/product/delete/${selectedProduct._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setShowDeleteModal(false);
//       // Refresh products for the current category
//       fetchProductsByCategory(categoryId);
//       setMessage(`Product "${productName}" deleted successfully!`);
//     } catch (err) {
//       console.error("Error deleting product:", err);
//       setMessage("Error deleting product.");
//     }
//   };

//   // --- RENDERING ---

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <div className="max-w-7xl mx-auto pt-12 pb-24 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-extrabold text-[#1a2e1d] tracking-tight mb-8 text-center">
//           Product Management Dashboard 📦
//         </h1>
        
//         {/* Success/Error Message */}
//         {message && (
//           <p className="text-center text-sm font-medium p-3 rounded-lg my-6 bg-[#e6fff1] text-[#1e815c] shadow-md transition-all duration-300">
//             <FaInfoCircle className="inline mr-2" />
//             {message}
//           </p>
//         )}

//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* 👈 Category Sidebar (Master View) */}
//           <div className="lg:w-1/4 w-full bg-white p-6 rounded-3xl shadow-xl border border-gray-100 self-start sticky top-4">
//             <h2 className="text-2xl font-bold text-[#1a2e1d] mb-4 flex items-center">
//               <FaTag className="mr-2 text-[#4c845b]" /> Categories
//             </h2>
            
//             {/* Search Input */}
//             <div className="relative mb-6">
//               <input
//                 type="text"
//                 placeholder="Search categories..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4c845b] transition duration-150"
//               />
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
//             </div>

//             <nav className="space-y-2">
//               {filteredCategories.length > 0 ? (
//                 filteredCategories.map((category) => (
//                   <button
//                     key={category._id}
//                     onClick={() => setSelectedCategoryId(category._id)}
//                     className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 
//                       ${selectedCategoryId === category._id 
//                         ? 'bg-[#4c845b] text-white shadow-lg shadow-[#4c845b]/30' 
//                         : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                   >
//                     <span>{category.name}</span>
//                     <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${selectedCategoryId === category._id ? 'bg-white text-[#4c845b]' : 'bg-gray-200 text-gray-600'}`}>
//                       {category.code}
//                     </span>
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-500 italic p-4 text-center">
//                   No categories found.
//                 </p>
//               )}
//             </nav>
//           </div>

//           {/* ➡️ Product Detail/List (Detail View) */}
//           <div className="lg:w-3/4 w-full">
//             <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
//                 <h2 className="text-3xl font-bold text-[#1a2e1d] mb-6 border-b pb-4 flex items-center">
//                     <FaBoxOpen className="mr-3 text-2xl text-[#4c845b]" />
//                     {selectedCategoryName ? `${selectedCategoryName} Products` : "Select a Category"}
//                 </h2>

//                 {selectedCategoryId && (
//                     productsToDisplay.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                             {productsToDisplay.map((prod) => (
//                                 <div 
//                                     key={prod._id} 
//                                     className="bg-white border border-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
//                                 >
//                                     {/* Product Image */}
//                                     <div className="h-40 w-full mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
//                                         {prod.image ? (
//                                             <img
//                                                 src={`${prod.image}`}
//                                                 alt={prod.name}
//                                                 className="h-full w-full object-cover transition duration-300 hover:opacity-90"
//                                             />
//                                         ) : (
//                                             <FaBoxOpen size={40} className="text-gray-300" />
//                                         )}
//                                     </div>

//                                     {/* Product Info */}
//                                     <h3 className="text-lg font-semibold text-[#1a2e1d] truncate" title={prod.name}>
//                                         {prod.name}
//                                     </h3>
//                                     <p className="text-sm text-gray-500 mb-2">Code: **{prod.code}**</p>
//                                     <p className="text-xl font-bold text-[#4c845b] mb-4">
//                                         ₹{prod.price}
//                                     </p>
                                    
//                                     {/* Actions */}
//                                     <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
//                                         <button
//                                             onClick={() => handleEditClick(prod)}
//                                             className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition"
//                                             title="Edit Product"
//                                         >
//                                             <FaEdit size={16} />
//                                         </button>
//                                         <button
//                                             onClick={() => handleDeleteClick(prod)}
//                                             className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
//                                             title="Delete Product"
//                                         >
//                                             <FaTrash size={16} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
//                             <FaInfoCircle size={40} className="text-gray-300 mx-auto mb-4" />
//                             <p className="text-gray-500 italic">
//                                 No products found in {selectedCategoryName}.
//                             </p>
//                         </div>
//                     )
//                 )}

//                 {!selectedCategoryId && (
//                      <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
//                         <FaBoxOpen size={50} className="text-gray-300 mx-auto mb-4" />
//                         <p className="text-gray-500 italic font-medium">
//                             Please select a category from the sidebar to view its products.
//                         </p>
//                     </div>
//                 )}
//             </div>
//           </div>
//         </div>

//         {/* 🛠 Edit Modal */}
//         <Modal 
//           title={`Update Product: ${selectedProduct?.name || ''}`} 
//           isOpen={showEditModal} 
//           onClose={() => setShowEditModal(false)}
//         >
//           <form onSubmit={handleUpdate} className="flex flex-col gap-5">
//             {/* Category Select */}
//             <label className="block">
//               <span className="text-sm font-medium text-gray-700 mb-1 block">Category</span>
//               <select
//                 name="categoryCode"
//                 value={formData.categoryCode}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-[#4c845b] focus:ring-[#4c845b] transition"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat._id} value={cat._id}>
//                     {cat.name} ({cat.code})
//                   </option>
//                 ))}
//               </select>
//             </label>
            
//             {/* Product Details */}
//             <div className="grid grid-cols-2 gap-4">
//                 <Input type="number" name="productCode" placeholder="Product Code" value={formData.productCode} onChange={handleChange} label="Product Code" required />
//                 <Input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} label="Product Name" required />
//                 <Input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} label="Price (₹)" required />
//                 <label className="block">
//                     <span className="text-sm font-medium text-gray-700 mb-1 block">Product Image</span>
//                     <input type="file" name="image" onChange={handleChange} className="text-sm w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#eaf6ea] file:text-[#4c845b]" />
//                 </label>
//             </div>
            
//             <label className="block">
//               <span className="text-sm font-medium text-gray-700 mb-1 block">Description</span>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Product Description"
//                 rows="3"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-[#4c845b] focus:ring-[#4c845b] transition"
//               />
//             </label>

//             {/* Actions */}
//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowEditModal(false)}
//                 className="px-6 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="px-6 py-2 rounded-lg bg-[#4c845b] text-white hover:bg-[#3d6a4a] transition font-medium shadow-md shadow-[#4c845b]/30">
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </Modal>

//         {/* ❌ Delete Modal */}
//         <Modal 
//           title="Confirm Deletion" 
//           isOpen={showDeleteModal} 
//           onClose={() => setShowDeleteModal(false)}
//         >
//             <p className="text-base text-gray-700 mb-6 text-center">
//                 Are you absolutely sure you want to delete the product: <br/><b>"{selectedProduct?.name}"</b>? 
//                 This action cannot be undone.
//             </p>
//             <div className="flex justify-center gap-4">
//                 <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="px-6 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     onClick={handleDelete}
//                     className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium shadow-md shadow-red-600/30"
//                 >
//                     <FaTrash className="inline mr-2" />
//                     Delete Permanently
//                 </button>
//             </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// // --- Helper Input Component for Cleaner Form ---
// const Input = ({ label, name, value, onChange, type = "text", placeholder, required = false }) => (
//     <label className="block">
//         <span className="text-sm font-medium text-gray-700 mb-1 block">{label} {required && <span className="text-red-500">*</span>}</span>
//         <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-[#4c845b] focus:ring-[#4c845b] transition"
//             required={required}
//         />
//     </label>
// );

// export default Listproducts;



// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaSearch, FaTag, FaBoxOpen, FaInfoCircle, FaTimes, FaEllipsisV, FaImage } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";
// // Import Heroicons for the product card look
// import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
// import api from "../utils/api";

// // Color Palette
// const colors = {
//   primary: "#2D5A27", // Dark green - Main brand color
//   secondary: "#4A7C59", // Medium green
//   accent: "#8FB996", // Light green
//   light: "#C8D5B9", // Very light green
//   background: "#F5F9F4", // Off-white background
//   text: "#1A1F16", // Dark text
//   textLight: "#5A6D57", // Light text
//   danger: "#D32F2F", // Red for delete
//   warning: "#FF9800", // Orange for warnings
//   border: "#E0E0E0", // Light border
// };

// // --- Custom Components for Modals & Model (Dropdown) ---

// /** 🖼️ Generic Modal Component - Updated Design */
// const Modal = ({ title, children, isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 animate-fadeIn">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 animate-slideUp relative">
//         <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
//           <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//           <button 
//             onClick={onClose} 
//             className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>
//         <div className="p-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// /** ⚙️ Custom Model Dropdown Component (Replaces direct icons) */
// const ActionModel = ({ onEdit, onDelete }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     // Close dropdown if clicked outside
//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (isOpen && !event.target.closest('.action-model-container')) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleOutsideClick);
//         return () => document.removeEventListener('mousedown', handleOutsideClick);
//     }, [isOpen]);

//     return (
//         <div className="relative action-model-container">
//             <button 
//                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }}
//                 className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 border border-gray-200 hover:border-gray-300"
//                 title="Product Actions"
//             >
//                 <EllipsisVerticalIcon className="w-5 h-5" />
//             </button>
//             {isOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 origin-top-right animate-fadeIn ring-1 ring-gray-100 overflow-hidden">
//                     <button
//                         onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); setIsOpen(false); }}
//                         className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100"
//                     >
//                         <PencilSquareIcon className="w-4 h-4 mr-3 text-blue-600" /> 
//                         <span className="font-medium">Edit Product</span>
//                     </button>
//                     <button
//                         onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); setIsOpen(false); }}
//                         className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                     >
//                         <TrashIcon className="w-4 h-4 mr-3 text-red-600" /> 
//                         <span className="font-medium">Delete Product</span>
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// // --- Product Card Component adapted for Dashboard ---
// const DashboardProductCard = ({ product, handleEditClick, handleDeleteClick }) => {
//     const name = product?.name || "No Name";
//     const price = product?.price ? `₹${product.price}` : "N/A";
//     const description = product?.description || "No description available";
    
//     // Truncate description for card view
//     const truncatedDescription = description.length > 100 
//         ? `${description.substring(0, 100)}...` 
//         : description;
    
//     // Adapted image logic for dashboard use
//     const imageUrl = product?.image
//         ? product.image
//         : "https://placehold.co/500x500?text=No+Image";

//     return (
//         <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 group">
//             {/* IMAGE */}
//             <div className="bg-gray-50 rounded-lg overflow-hidden relative mb-4">
//                 <div className="w-full h-[280px] flex items-center justify-center">
//                     {imageUrl ? (
//                         <img
//                             src={imageUrl}
//                             alt={name}
//                             className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
//                         />
//                     ) : (
//                         <div className="w-full h-full flex flex-col items-center justify-center text-sm text-gray-400">
//                             <FaImage className="text-3xl mb-2 text-gray-300" />
//                             No Image
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* INFO + ACTION MODEL */}
//             <div className="space-y-3">
//                 <div className="flex justify-between items-start">
//                     <div className="flex-1 min-w-0">
//                         <h3 className="text-lg font-bold text-gray-800 truncate" title={name}>{name}</h3>
//                         <p className="text-xs text-gray-500 mb-2">Code: {product.code}</p>
//                     </div>
//                     <ActionModel 
//                         onEdit={() => handleEditClick(product)}
//                         onDelete={() => handleDeleteClick(product)}
//                     />
//                 </div>
                
//                 {/* PRICE */}
//                 <span className="text-[#2D5A27] font-extrabold text-xl block">{price}</span>
                
//                 {/* DESCRIPTION */}

//                 {/* <div className="mt-2 pt-3 border-t border-gray-100">
//                     <p className="text-sm text-gray-600 line-clamp-3" title={description}>
//                         {truncatedDescription}
//                     </p>
//                 </div> */}

//                  <p className="text-sm text-gray-600 whitespace-pre-line">
//                      {description}
//                 </p>
//             </div>
//         </div>
//     );
// };


// // --- MAIN COMPONENT ---
// const Listproducts = () => {
//     const [categories, setCategories] = useState([]);
//     const [productsByCategory, setProductsByCategory] = useState({});
//     const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [message, setMessage] = useState("");
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [formData, setFormData] = useState({
//         categoryCode: "",
//         productCode: "",
//         productName: "",
//         description: "",
//         price: "",
//         image: null,
//     });

//     // 🔹 Fetch Categories on Mount
//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const res = await axios.get(`${domainUrl}/category/list`);
//             const list = res.data.list || [];
//             setCategories(list);
//             if (list.length > 0) {
//                 setSelectedCategoryId(list[0]._id);
//             }
//         } catch (err) {
//             console.error("Error fetching categories:", err);
//         }
//     };

//     const fetchProductsByCategory = useCallback(async (categoryId) => {
//         try {
//            const res = await axios.get(`${domainUrl}/product/list?categoryId=${categoryId}`, {
//       withCredentials: true,
//    });
//             setProductsByCategory((prev) => ({
//                 ...prev,
//                 [categoryId]: res.data.list || [],
//             }));
//         } catch (err) {
//             console.error("Error fetching products:", err);
//         }
//     }, []);

//     // 🔹 Fetch Products for the selected Category
//     useEffect(() => {
//         if (selectedCategoryId && !productsByCategory[selectedCategoryId]) {
//             fetchProductsByCategory(selectedCategoryId);
//         }
//     }, [selectedCategoryId, productsByCategory, fetchProductsByCategory]);

//     // 🔹 Filtered Categories and Products (for search)
//     const filteredCategories = useMemo(() => {
//         return categories.filter((cat) =>
//             cat.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [categories, searchTerm]);

//     const productsToDisplay = useMemo(() => {
//         return productsByCategory[selectedCategoryId] || [];
//     }, [productsByCategory, selectedCategoryId]);
    
//     const selectedCategoryName = useMemo(() => {
//         return categories.find(c => c._id === selectedCategoryId)?.name;
//     }, [categories, selectedCategoryId]);


//     // 🔹 Handle Edit / Delete setup
//     const handleEditClick = (product) => {
//         setSelectedProduct(product);
//         setFormData({
//             categoryCode: product.category?._id || "",
//             productCode: product.code,
//             productName: product.name,
//             description: product.description || "",
//             price: product.price,
//             image: null,
//         });
//         setShowEditModal(true);
//     };

//     const handleDeleteClick = (product) => {
//         setSelectedProduct(product);
//         setShowDeleteModal(true);
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: name === "image" ? files[0] : value,
//         }));
//     };

//     // 🔹 Update Product
//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         try {
           
//             const data = new FormData();
//             data.append("category", formData.categoryCode);
//             data.append("code", formData.productCode);
//             data.append("name", formData.productName);
//             data.append("description", formData.description);
//             data.append("price", formData.price);
//             if (formData.image) data.append("image", formData.image);

//            await axios.put(`${domainUrl}/product/update/${selectedProduct._id}`, data, {
//  withCredentials: true,
// });

//             setMessage(`✓ Product "${formData.productName}" updated successfully!`);
//             setShowEditModal(false);
//             // Refresh the product list for the category
//             fetchProductsByCategory(formData.categoryCode);
            
//             if(selectedProduct.category?._id !== formData.categoryCode) {
//                 setSelectedCategoryId(formData.categoryCode);
//             }
            
//         } catch (err) {
//             console.error("Error updating product:", err);
//             setMessage("✗ Error updating product. Please check the data.");
//         }
//     };

//     // 🔹 Delete Product
//     const handleDelete = async () => {
//         const categoryId = selectedProduct.category._id;
//         const productName = selectedProduct.name;
//         try {
//             await axios.delete(`${domainUrl}/product/delete/${selectedProduct._id}`, {
//             withCredentials: true,
//            });
//             setShowDeleteModal(false);
//             fetchProductsByCategory(categoryId);
//             setMessage(`✓ Product "${productName}" deleted successfully!`);
//         } catch (err) {
//             console.error("Error deleting product:", err);
//             setMessage("✗ Error deleting product.");
//         }
//     };

//     // Add CSS animations
//     useEffect(() => {
//         const style = document.createElement('style');
//         style.textContent = `
//             @keyframes fadeIn {
//                 from { opacity: 0; }
//                 to { opacity: 1; }
//             }
//             @keyframes slideUp {
//                 from { transform: translateY(20px); opacity: 0; }
//                 to { transform: translateY(0); opacity: 1; }
//             }
//             .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
//             .animate-slideUp { animation: slideUp 0.3s ease-out; }
//             .line-clamp-3 {
//                 display: -webkit-box;
//                 -webkit-line-clamp: 3;
//                 -webkit-box-orient: vertical;
//                 overflow: hidden;
//             }
//         `;
//         document.head.appendChild(style);
//         return () => document.head.removeChild(style);
//     }, []);

//     // --- RENDERING ---

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
//             <div className="w-full max-w-[1700px] mx-auto pt-4 pb-12 px-3 sm:px-4 md:px-6 lg:px-8">


//                 {/* 📌 UPDATED HEADING - Left Aligned */}
//                 <div className="mb-10">
//                     <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
//                         Product Management Dashboard
//                     </h1>
//                     <p className="text-gray-600 max-w-3xl">
//                         Manage your inventory by category, update product details, and organize your catalog efficiently.
//                     </p>
//                 </div>
                
//                 {/* Success/Error Message */}
//                 {message && (
//                     <div className={`mb-6 p-4 rounded-lg flex items-center ${message.includes('✓') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
//                         <FaInfoCircle className={`mr-3 ${message.includes('✓') ? 'text-green-500' : 'text-red-500'}`} />
//                         <span className="font-medium">{message}</span>
//                     </div>
//                 )}

//                 <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    
//                     {/* 👈 Category Sidebar (Master View) */}
//                     <div className="w-full lg:w-1/4 bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 h-fit">

//                         <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                             {/* <FaTag className="mr-3 text-[#4A7C59]" />  */}
//                             Categories
//                             <span className="ml-auto text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                                 {categories.length} total
//                             </span>
//                         </h2>
                        
//                         {/* Search Input */}
//                         <div className="relative mb-5">
//                             <input
//                                 type="text"
//                                 placeholder="Search categories..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition duration-200"
//                             />
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
//                         </div>

//                         <nav className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
//                             {filteredCategories.length > 0 ? (
//                                 filteredCategories.map((category) => (
//                                     <button
//                                         key={category._id}
//                                         onClick={() => setSelectedCategoryId(category._id)}
//                                         className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 group
//                                             ${selectedCategoryId === category._id 
//                                                 ? 'bg-gradient-to-r from-[#2D5A27] to-[#4A7C59] text-white shadow-md' 
//                                                 : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
//                                             }`}
//                                     >
//                                         <span className="font-medium group-hover:text-[#2D5A27]">{category.name}</span>
//                                         <span className={`text-xs font-mono px-2 py-1 rounded ${selectedCategoryId === category._id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
//                                             {category.code}
//                                         </span>
//                                     </button>
//                                 ))
//                             ) : (
//                                 <div className="text-center py-8">
//                                     <FaSearch className="text-gray-300 text-2xl mx-auto mb-2" />
//                                     <p className="text-sm text-gray-500">
//                                         No categories found
//                                     </p>
//                                 </div>
//                             )}
//                         </nav>
//                     </div>

//                     {/* ➡️ Product Detail/List (Detail View) */}
//                     <div className="lg:w-3/4 w-full">
//                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                             <div className="flex items-center justify-between mb-8">
//                                 <div>
//                                     <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//                                         <FaBoxOpen className="mr-3 text-[#4A7C59]" />
//                                         {selectedCategoryName ? `${selectedCategoryName} Products` : "Select a Category"}
//                                     </h2>
//                                     {selectedCategoryName && (
//                                         <p className="text-gray-500 text-sm mt-1">
//                                             Showing {productsToDisplay.length} products in this category
//                                         </p>
//                                     )}
//                                 </div>
//                                 {selectedCategoryId && productsToDisplay.length > 0 && (
//                                     <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
//                                         {productsToDisplay.length} items
//                                     </span>
//                                 )}
//                             </div>

//                             {selectedCategoryId && (
//                                 productsToDisplay.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                                         {productsToDisplay.map((prod) => (
//                                             <DashboardProductCard 
//                                                 key={prod._id}
//                                                 product={prod}
//                                                 handleEditClick={handleEditClick}
//                                                 handleDeleteClick={handleDeleteClick}
//                                             />
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
//                                         <FaBoxOpen size={48} className="text-gray-300 mx-auto mb-4" />
//                                         <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
//                                         <p className="text-gray-500 max-w-md mx-auto">
//                                             There are no products in <span className="font-semibold text-[#2D5A27]">{selectedCategoryName}</span> yet.
//                                         </p>
//                                     </div>
//                                 )
//                             )}

//                             {!selectedCategoryId && (
//                                 <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
//                                     <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
//                                         <FaBoxOpen size={28} className="text-gray-400" />
//                                     </div>
//                                     <h3 className="text-xl font-medium text-gray-700 mb-3">Select a Category</h3>
//                                     <p className="text-gray-500 max-w-md mx-auto">
//                                         Choose a category from the sidebar to view and manage its products
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* 🛠 Updated Edit Modal */}
//                 <Modal 
//                   title={`Edit Product: ${selectedProduct?.name || ''}`} 
//                   isOpen={showEditModal} 
//                   onClose={() => setShowEditModal(false)}
//                 >
//                   <form onSubmit={handleUpdate} className="space-y-6">
//                     <div className="space-y-4">
//                         {/* Category Select */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Category *
//                             </label>
//                             <select
//                                 name="categoryCode"
//                                 value={formData.categoryCode}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200 bg-white"
//                                 required
//                             >
//                                 <option value="" className="text-gray-400">Select Category</option>
//                                 {categories.map((cat) => (
//                                 <option key={cat._id} value={cat._id}>
//                                     {cat.name} ({cat.code})
//                                 </option>
//                                 ))}
//                             </select>
//                         </div>
                        
//                         {/* Product Details Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product Code *
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="productCode"
//                                     value={formData.productCode}
//                                     onChange={handleChange}
//                                     placeholder="Enter product code"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="productName"
//                                     value={formData.productName}
//                                     onChange={handleChange}
//                                     placeholder="Enter product name"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Price (₹) *
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     value={formData.price}
//                                     onChange={handleChange}
//                                     placeholder="Enter price"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product Image
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type="file"
//                                         name="image"
//                                         onChange={handleChange}
//                                         accept="image/*"
//                                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-gray-100 file:to-gray-200 file:text-gray-700 hover:file:from-gray-200 hover:file:to-gray-300 transition duration-200"
//                                     />
//                                     <div className="text-xs text-gray-400 mt-1">
//                                         Leave empty to keep current image
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

                        

                        
//                         {/* Description */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Description
//                             </label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 placeholder="Describe the product..."
//                                 rows="4"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200 resize-none"
//                             />
//                             <div className="text-xs text-gray-400 mt-1 text-right">
//                                 {formData.description.length}/500 characters
//                             </div>
//                         </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//                         <button
//                             type="button"
//                             onClick={() => setShowEditModal(false)}
//                             className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200 font-medium text-sm"
//                         >
//                             Cancel
//                         </button>
//                         <button 
//                             type="submit" 
//                             className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#2D5A27] to-[#4A7C59] text-white hover:from-[#23421f] hover:to-[#3d6a4a] transition duration-200 font-medium text-sm shadow-sm"
//                         >
//                             Save Changes
//                         </button>
//                     </div>
//                   </form>
//                 </Modal>

//                 {/* ❌ Updated Delete Modal */}
//                 <Modal 
//                   title="Delete Product" 
//                   isOpen={showDeleteModal} 
//                   onClose={() => setShowDeleteModal(false)}
//                 >
//                     <div className="text-center">
//                         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
//                             <TrashIcon className="w-8 h-8 text-red-600" />
//                         </div>
                        
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                             Confirm Deletion
//                         </h3>
                        
//                         <p className="text-gray-600 mb-2">
//                             Are you sure you want to delete this product?
//                         </p>
                        
//                         <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
//                             <p className="font-medium text-gray-800 text-lg mb-1">
//                                 {selectedProduct?.name}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                                 Code: {selectedProduct?.code} • Price: ₹{selectedProduct?.price}
//                             </p>
//                         </div>
                        
//                         <p className="text-sm text-gray-500 mb-6">
//                             This action cannot be undone. The product will be permanently removed from the system.
//                         </p>

//                         <div className="flex justify-center gap-3">
//                             <button
//                                 onClick={() => setShowDeleteModal(false)}
//                                 className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200 font-medium text-sm"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleDelete}
//                                 className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition duration-200 font-medium text-sm shadow-sm flex items-center"
//                             >
//                                 <TrashIcon className="w-4 h-4 mr-2" />
//                                 Delete Permanently
//                             </button>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         </div>
//     );
// };

// export default Listproducts;





// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaSearch, FaTag, FaBoxOpen, FaInfoCircle, FaTimes, FaEllipsisV, FaImage } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";
// // Import Heroicons for the product card look
// import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
// import api from "../utils/api";

// // Color Palette
// const colors = {
//   primary: "#2D5A27", // Dark green - Main brand color
//   secondary: "#4A7C59", // Medium green
//   accent: "#8FB996", // Light green
//   light: "#C8D5B9", // Very light green
//   background: "#F5F9F4", // Off-white background
//   text: "#1A1F16", // Dark text
//   textLight: "#5A6D57", // Light text
//   danger: "#D32F2F", // Red for delete
//   warning: "#FF9800", // Orange for warnings
//   border: "#E0E0E0", // Light border
// };

// // --- Custom Components for Modals & Model (Dropdown) ---

// /**  Generic Modal Component - Updated Design */
// const Modal = ({ title, children, isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 animate-fadeIn">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 animate-slideUp relative">
//         <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
//           <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//           <button 
//             onClick={onClose} 
//             className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>
//         <div className="p-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// /**  Custom Model Dropdown Component (Replaces direct icons) */
// const ActionModel = ({ onEdit, onDelete }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     // Close dropdown if clicked outside
//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (isOpen && !event.target.closest('.action-model-container')) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleOutsideClick);
//         return () => document.removeEventListener('mousedown', handleOutsideClick);
//     }, [isOpen]);

//     return (
//         <div className="relative action-model-container">
//             <button 
//                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }}
//                 className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 border border-gray-200 hover:border-gray-300"
//                 title="Product Actions"
//             >
//                 <EllipsisVerticalIcon className="w-5 h-5" />
//             </button>
//             {isOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 origin-top-right animate-fadeIn ring-1 ring-gray-100 overflow-hidden">
//                     <button
//                         onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); setIsOpen(false); }}
//                         className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100"
//                     >
//                         <PencilSquareIcon className="w-4 h-4 mr-3 text-blue-600" /> 
//                         <span className="font-medium">Edit Product</span>
//                     </button>
//                     <button
//                         onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); setIsOpen(false); }}
//                         className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                     >
//                         <TrashIcon className="w-4 h-4 mr-3 text-red-600" /> 
//                         <span className="font-medium">Delete Product</span>
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// // --- Product Card Component adapted for Dashboard ---
// const DashboardProductCard = ({ product, handleEditClick, handleDeleteClick }) => {
//     const name = product?.name || "No Name";
//     const price = product?.price ? `₹${product.price}` : "N/A";
//     const description = product?.description || "No description available";
    
//     // Truncate description for card view
//     const truncatedDescription = description.length > 100 
//         ? `${description.substring(0, 100)}...` 
//         : description;
    
//     // Adapted image logic for dashboard use
//     const imageUrl = product?.image
//         ? product.image
//         : "https://placehold.co/500x500?text=No+Image";

//     return (
//         <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 group">
//             {/* IMAGE */}
//             <div className="bg-gray-50 rounded-lg overflow-hidden relative mb-4">
//                 <div className="w-full h-[280px] flex items-center justify-center">
//                     {imageUrl ? (
//                         <img
//                             src={imageUrl}
//                             alt={name}
//                             className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
//                         />
//                     ) : (
//                         <div className="w-full h-full flex flex-col items-center justify-center text-sm text-gray-400">
//                             <FaImage className="text-3xl mb-2 text-gray-300" />
//                             No Image
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* INFO + ACTION MODEL */}
//             <div className="space-y-3">
//                 <div className="flex justify-between items-start">
//                     <div className="flex-1 min-w-0">
//                         <h3 className="text-lg font-bold text-gray-800 truncate" title={name}>{name}</h3>
//                         <p className="text-xs text-gray-500 mb-2">Code: {product.code}</p>
//                     </div>
//                     <ActionModel 
//                         onEdit={() => handleEditClick(product)}
//                         onDelete={() => handleDeleteClick(product)}
//                     />
//                 </div>
                
//                 {/* PRICE */}
//                 <span className="text-[#2D5A27] font-extrabold text-xl block">{price}</span>
                
//                 {/* DESCRIPTION */}

//                 {/* <div className="mt-2 pt-3 border-t border-gray-100">
//                     <p className="text-sm text-gray-600 line-clamp-3" title={description}>
//                         {truncatedDescription}
//                     </p>
//                 </div> */}

//                  <p className="text-sm text-gray-600 whitespace-pre-line">
//                      {description}
//                 </p>
//             </div>
//         </div>
//     );
// };


// // --- MAIN COMPONENT ---
// const Listproducts = () => {
//     const [categories, setCategories] = useState([]);
//     const [productsByCategory, setProductsByCategory] = useState({});
//     const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [message, setMessage] = useState("");
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [formData, setFormData] = useState({
//         categoryCode: "",
//         productCode: "",
//         productName: "",
//         description: "",
//         price: "",
//         stock: "", 
//         image: null,
//     });

//     // 🔹 Fetch Categories on Mount
//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const res = await api.get('/category/list');
//             const list = res.data.list || [];
//             setCategories(list);
//             if (list.length > 0) {
//                 setSelectedCategoryId(list[0]._id);
//             }
//         } catch (err) {
//             console.error("Error fetching categories:", err);
//         }
//     };

//     const fetchProductsByCategory = useCallback(async (categoryId) => {
//         try {
//            const res = await api.get(`/product/list?categoryId=${categoryId}`, {
//     //   withCredentials: true,
//    });
//             setProductsByCategory((prev) => ({
//                 ...prev,
//                 [categoryId]: res.data.list || [],
//             }));
//         } catch (err) {
//             console.error("Error fetching products:", err);
//         }
//     }, []);

//     // 🔹 Fetch Products for the selected Category
//     useEffect(() => {
//         if (selectedCategoryId && !productsByCategory[selectedCategoryId]) {
//             fetchProductsByCategory(selectedCategoryId);
//         }
//     }, [selectedCategoryId, productsByCategory, fetchProductsByCategory]);

//     // 🔹 Filtered Categories and Products (for search)
//     const filteredCategories = useMemo(() => {
//         return categories.filter((cat) =>
//             cat.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [categories, searchTerm]);

//     const productsToDisplay = useMemo(() => {
//         return productsByCategory[selectedCategoryId] || [];
//     }, [productsByCategory, selectedCategoryId]);
    
//     const selectedCategoryName = useMemo(() => {
//         return categories.find(c => c._id === selectedCategoryId)?.name;
//     }, [categories, selectedCategoryId]);


//     // 🔹 Handle Edit / Delete setup
//     const handleEditClick = (product) => {
//         setSelectedProduct(product);
//         setFormData({
//             categoryCode: product.category?._id || "",
//             productCode: product.code,
//             productName: product.name,
//             description: product.description || "",
//             price: product.price,
//             stock: product.stock || 0,
//             image: null,
//         });
//         setShowEditModal(true);
//     };

//     const handleDeleteClick = (product) => {
//         setSelectedProduct(product);
//         setShowDeleteModal(true);
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: name === "image" ? files[0] : value,
//         }));
//     };

//     // 🔹 Update Product
//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         try {
           
//             const data = new FormData();
//             data.append("category", formData.categoryCode);
//             data.append("code", formData.productCode);
//             data.append("name", formData.productName);
//             data.append("description", formData.description);
//             data.append("price", formData.price);
//             if (formData.image) data.append("image", formData.image);
//             data.append("stock", formData.stock); // ✅ ADD THIS


//            await api.put(`/product/update/${selectedProduct._id}`, data, {
// //  withCredentials: true,
// });

//             setMessage(`✓ Product "${formData.productName}" updated successfully!`);
//             setShowEditModal(false);
//             // Refresh the product list for the category
//             fetchProductsByCategory(formData.categoryCode);
            
//             if(selectedProduct.category?._id !== formData.categoryCode) {
//                 setSelectedCategoryId(formData.categoryCode);
//             }
            
//         } catch (err) {
//             console.error("Error updating product:", err);
//             setMessage("✗ Error updating product. Please check the data.");
//         }
//     };

//     // 🔹 Delete Product
//     const handleDelete = async () => {
//         const categoryId = selectedProduct.category._id;
//         const productName = selectedProduct.name;
//         try {
//             await api.delete(`/product/delete/${selectedProduct._id}`, {
//             // withCredentials: true,
//            });
//             setShowDeleteModal(false);
//             fetchProductsByCategory(categoryId);
//             setMessage(`✓ Product "${productName}" deleted successfully!`);
//         } catch (err) {
//             console.error("Error deleting product:", err);
//             setMessage("✗ Error deleting product.");
//         }
//     };

//     // Add CSS animations
//     useEffect(() => {
//         const style = document.createElement('style');
//         style.textContent = `
//             @keyframes fadeIn {
//                 from { opacity: 0; }
//                 to { opacity: 1; }
//             }
//             @keyframes slideUp {
//                 from { transform: translateY(20px); opacity: 0; }
//                 to { transform: translateY(0); opacity: 1; }
//             }
//             .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
//             .animate-slideUp { animation: slideUp 0.3s ease-out; }
//             .line-clamp-3 {
//                 display: -webkit-box;
//                 -webkit-line-clamp: 3;
//                 -webkit-box-orient: vertical;
//                 overflow: hidden;
//             }
//         `;
//         document.head.appendChild(style);
//         return () => document.head.removeChild(style);
//     }, []);

//     // --- RENDERING ---

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
//             <div className="w-full max-w-[1700px] mx-auto pt-4 pb-12 px-3 sm:px-4 md:px-6 lg:px-8">


//                 {/* 📌 UPDATED HEADING - Left Aligned */}
//                 <div className="mb-10">
//                     <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
//                         Product Management Dashboard
//                     </h1>
//                     <p className="text-gray-600 max-w-3xl">
//                         Manage your inventory by category, update product details, and organize your catalog efficiently.
//                     </p>
//                 </div>
                
//                 {/* Success/Error Message */}
//                 {message && (
//                     <div className={`mb-6 p-4 rounded-lg flex items-center ${message.includes('✓') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
//                         <FaInfoCircle className={`mr-3 ${message.includes('✓') ? 'text-green-500' : 'text-red-500'}`} />
//                         <span className="font-medium">{message}</span>
//                     </div>
//                 )}

//                 <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    
//                     {/* 👈 Category Sidebar (Master View) */}
//                     <div className="w-full lg:w-1/4 bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 h-fit">

//                         <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                             {/* <FaTag className="mr-3 text-[#4A7C59]" />  */}
//                             Categories
//                             <span className="ml-auto text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                                 {categories.length} total
//                             </span>
//                         </h2>
                        
//                         {/* Search Input */}
//                         <div className="relative mb-5">
//                             <input
//                                 type="text"
//                                 placeholder="Search categories..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition duration-200"
//                             />
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
//                         </div>

//                         <nav className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
//                             {filteredCategories.length > 0 ? (
//                                 filteredCategories.map((category) => (
//                                     <button
//                                         key={category._id}
//                                         onClick={() => setSelectedCategoryId(category._id)}
//                                         className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 group
//                                             ${selectedCategoryId === category._id 
//                                                 ? 'bg-gradient-to-r from-[#2D5A27] to-[#4A7C59] text-white shadow-md' 
//                                                 : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
//                                             }`}
//                                     >
//                                         <span className="font-medium group-hover:text-[#2D5A27]">{category.name}</span>
//                                         <span className={`text-xs font-mono px-2 py-1 rounded ${selectedCategoryId === category._id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
//                                             {category.code}
//                                         </span>
//                                     </button>
//                                 ))
//                             ) : (
//                                 <div className="text-center py-8">
//                                     <FaSearch className="text-gray-300 text-2xl mx-auto mb-2" />
//                                     <p className="text-sm text-gray-500">
//                                         No categories found
//                                     </p>
//                                 </div>
//                             )}
//                         </nav>
//                     </div>

//                     {/* ➡️ Product Detail/List (Detail View) */}
//                     <div className="lg:w-3/4 w-full">
//                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                             <div className="flex items-center justify-between mb-8">
//                                 <div>
//                                     <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//                                         <FaBoxOpen className="mr-3 text-[#4A7C59]" />
//                                         {selectedCategoryName ? `${selectedCategoryName} Products` : "Select a Category"}
//                                     </h2>
//                                     {selectedCategoryName && (
//                                         <p className="text-gray-500 text-sm mt-1">
//                                             Showing {productsToDisplay.length} products in this category
//                                         </p>
//                                     )}
//                                 </div>
//                                 {selectedCategoryId && productsToDisplay.length > 0 && (
//                                     <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
//                                         {productsToDisplay.length} items
//                                     </span>
//                                 )}
//                             </div>

//                             {selectedCategoryId && (
//                                 productsToDisplay.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                                         {productsToDisplay.map((prod) => (
//                                             <DashboardProductCard 
//                                                 key={prod._id}
//                                                 product={prod}
//                                                 handleEditClick={handleEditClick}
//                                                 handleDeleteClick={handleDeleteClick}
//                                             />
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
//                                         <FaBoxOpen size={48} className="text-gray-300 mx-auto mb-4" />
//                                         <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
//                                         <p className="text-gray-500 max-w-md mx-auto">
//                                             There are no products in <span className="font-semibold text-[#2D5A27]">{selectedCategoryName}</span> yet.
//                                         </p>
//                                     </div>
//                                 )
//                             )}

//                             {!selectedCategoryId && (
//                                 <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
//                                     <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
//                                         <FaBoxOpen size={28} className="text-gray-400" />
//                                     </div>
//                                     <h3 className="text-xl font-medium text-gray-700 mb-3">Select a Category</h3>
//                                     <p className="text-gray-500 max-w-md mx-auto">
//                                         Choose a category from the sidebar to view and manage its products
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* 🛠 Updated Edit Modal */}
//                 <Modal 
//                   title={`Edit Product: ${selectedProduct?.name || ''}`} 
//                   isOpen={showEditModal} 
//                   onClose={() => setShowEditModal(false)}
//                 >
//                   <form onSubmit={handleUpdate} className="space-y-6">
//                     <div className="space-y-4">
//                         {/* Category Select */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Category *
//                             </label>
//                             <select
//                                 name="categoryCode"
//                                 value={formData.categoryCode}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200 bg-white"
//                                 required
//                             >
//                                 <option value="" className="text-gray-400">Select Category</option>
//                                 {categories.map((cat) => (
//                                 <option key={cat._id} value={cat._id}>
//                                     {cat.name} ({cat.code})
//                                 </option>
//                                 ))}
//                             </select>
//                         </div>
                        
//                         {/* Product Details Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product Code *
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="productCode"
//                                     value={formData.productCode}
//                                     onChange={handleChange}
//                                     placeholder="Enter product code"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="productName"
//                                     value={formData.productName}
//                                     onChange={handleChange}
//                                     placeholder="Enter product name"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Price (₹) *
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     value={formData.price}
//                                     onChange={handleChange}
//                                     placeholder="Enter price"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200"
//                                     required
//                                 />
//                             </div>
//                             <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Stock Quantity *
//   </label>
//   <input
//     type="number"
//     name="stock"
//     value={formData.stock}
//     onChange={handleChange}
//     placeholder="Enter stock quantity"
//     min="0"
//     className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
//                focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20
//                transition duration-200"
//     required
//   />
// </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product Image
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type="file"
//                                         name="image"
//                                         onChange={handleChange}
//                                         accept="image/*"
//                                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-gray-100 file:to-gray-200 file:text-gray-700 hover:file:from-gray-200 hover:file:to-gray-300 transition duration-200"
//                                     />
//                                     <div className="text-xs text-gray-400 mt-1">
//                                         Leave empty to keep current image
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

                        

                        
//                         {/* Description */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Description
//                             </label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 placeholder="Describe the product..."
//                                 rows="4"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 transition duration-200 resize-none"
//                             />
//                             <div className="text-xs text-gray-400 mt-1 text-right">
//                                 {formData.description.length}/500 characters
//                             </div>
//                         </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//                         <button
//                             type="button"
//                             onClick={() => setShowEditModal(false)}
//                             className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200 font-medium text-sm"
//                         >
//                             Cancel
//                         </button>
//                         <button 
//                             type="submit" 
//                             className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#2D5A27] to-[#4A7C59] text-white hover:from-[#23421f] hover:to-[#3d6a4a] transition duration-200 font-medium text-sm shadow-sm"
//                         >
//                             Save Changes
//                         </button>
//                     </div>
//                   </form>
//                 </Modal>

//                 {/* ❌ Updated Delete Modal */}
//                 <Modal 
//                   title="Delete Product" 
//                   isOpen={showDeleteModal} 
//                   onClose={() => setShowDeleteModal(false)}
//                 >
//                     <div className="text-center">
//                         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
//                             <TrashIcon className="w-8 h-8 text-red-600" />
//                         </div>
                        
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                             Confirm Deletion
//                         </h3>
                        
//                         <p className="text-gray-600 mb-2">
//                             Are you sure you want to delete this product?
//                         </p>
                        
//                         <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
//                             <p className="font-medium text-gray-800 text-lg mb-1">
//                                 {selectedProduct?.name}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                                 Code: {selectedProduct?.code} • Price: ₹{selectedProduct?.price}
//                             </p>
//                         </div>
                        
//                         <p className="text-sm text-gray-500 mb-6">
//                             This action cannot be undone. The product will be permanently removed from the system.
//                         </p>

//                         <div className="flex justify-center gap-3">
//                             <button
//                                 onClick={() => setShowDeleteModal(false)}
//                                 className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200 font-medium text-sm"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleDelete}
//                                 className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition duration-200 font-medium text-sm shadow-sm flex items-center"
//                             >
//                                 <TrashIcon className="w-4 h-4 mr-2" />
//                                 Delete Permanently
//                             </button>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         </div>
//     );
// };

// export default Listproducts;


import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaTag, FaBoxOpen, FaInfoCircle, FaTimes, FaEllipsisV, FaImage } from "react-icons/fa";
import { domainUrl } from "../utils/constant";
// Import Heroicons for the product card look
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import api from "../utils/api";
import { Upload } from "lucide-react";
import toast, { Toaster, } from 'react-hot-toast';



// SAME FILE – ListProducts.jsx
const LoaderSpinner = ({ size = "sm", color = "white" }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  const colors = {
    white: "text-white",
    slate: "text-slate-600",
  };

  return (
    <svg
      className={`animate-spin ${sizes[size]} ${colors[color]}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};


// Color Palette
const colors = {
  primary: "#2D5A27", // Dark green - Main brand color
  secondary: "#4A7C59", // Medium green
  accent: "#8FB996", // Light green
  light: "#C8D5B9", // Very light green
  background: "#F5F9F4", // Off-white background
  text: "#1A1F16", // Dark text
  textLight: "#5A6D57", // Light text
  danger: "#D32F2F", // Red for delete
  warning: "#FF9800", // Orange for warnings
  border: "#E0E0E0", // Light border
};

// --- Custom Components for Modals & Model (Dropdown) ---

/**  Generic Modal Component - Updated Design */
const Modal = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 animate-slideUp relative">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

/**  Custom Model Dropdown Component (Replaces direct icons) */
const ActionModel = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.closest('.action-model-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    return (
        <div className="relative action-model-container">
            <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 border border-gray-200 hover:border-gray-300"
                title="Product Actions"
            >
                <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 origin-top-right animate-fadeIn ring-1 ring-gray-100 overflow-hidden">
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); setIsOpen(false); }}
                        className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100"
                    >
                        <PencilSquareIcon className="w-4 h-4 mr-3 text-blue-600" /> 
                        <span className="font-medium">Edit Product</span>
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); setIsOpen(false); }}
                        className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                        <TrashIcon className="w-4 h-4 mr-3 text-red-600" /> 
                        <span className="font-medium">Delete Product</span>
                    </button>
                </div>
            )}
        </div>
    );
};

// --- Product Card Component adapted for Dashboard ---
const DashboardProductCard = ({ product, handleEditClick, handleDeleteClick , handleViewProduct,}) => {
    const name = product?.name || "No Name";
    const price = product?.price ? `₹${product.price}` : "N/A";
    const description = product?.description || "No description available";
    
    // Truncate description for card view
    const truncatedDescription = description.length > 100 
        ? `${description.substring(0, 100)}...` 
        : description;
    
    // Adapted image logic for dashboard use
    const imageUrl = product?.image
        ? product.image
        : "https://placehold.co/500x500?text=No+Image";

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 group">
            {/* IMAGE */}
            <div className="bg-gray-50 rounded-lg overflow-hidden relative mb-4">
                <div className="w-full h-[220px] md:h-[240px] xl:h-[280px] flex items-center justify-center">
                    {imageUrl ? (
                        <img
  src={`${imageUrl}?v=${product.updatedAt || Date.now()}`}
  alt={name}
  className="w-full h-full object-contain sm:object-cover object-center transition-transform duration-300 group-hover:scale-105"
/>

                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-sm text-gray-400">
                            <FaImage className="text-3xl mb-2 text-gray-300" />
                            No Image
                        </div>
                    )}
                </div>
            </div>

            {/* INFO + ACTION MODEL */}
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate" title={name}>{name}</h3>
                        <p className="text-xs text-gray-500 mb-2">Code: {product.code}</p>
                    </div>
                    <ActionModel 
                        onEdit={() => handleEditClick(product)}
                        onDelete={() => handleDeleteClick(product)}
                    />
                </div>
                
                {/* PRICE */}
                <span className="text-black font-bold text-xl block">{price}</span>
                
                {/* DESCRIPTION */}

                {/* <div className="mt-2 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 line-clamp-3" title={description}>
                        {truncatedDescription}
                    </p>
                </div> */}

{/* DESCRIPTION */}
{/* VIEW DETAILS (EYE BUTTON) */}
<div className="flex items-center justify-between pt-4">
  <button
    onClick={() => handleViewProduct(product)}
    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
  >
    <FaInfoCircle className="h-3 w-3" />
    View Details
  </button>

  {/* KEEP EXISTING ACTION MENU */}
  {/* <ActionModel
    onEdit={() => handleEditClick(product)}
    onDelete={() => handleDeleteClick(product)}
  /> */}
</div>



            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const Listproducts = () => {
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({
        categoryCode: "",
        productCode: "",
        productName: "",
        description: "",
        price: "",
        stock: "", 
        image: null,
    });
    const [imagePreview, setImagePreview] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [showProductDetailModal, setShowProductDetailModal] = useState(false);
    const [detailProduct, setDetailProduct] = useState(null);




    // 🔹 Fetch Categories on Mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/category/list');
            const list = res.data.list || [];
            setCategories(list);
            if (list.length > 0) {
                setSelectedCategoryId(list[0]._id);
            }
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const fetchProductsByCategory = useCallback(async (categoryId) => {
        try {
           const res = await api.get(`/product/list?categoryId=${categoryId}`, {
    //   withCredentials: true,
   });
            setProductsByCategory((prev) => ({
                ...prev,
                [categoryId]: res.data.list || [],
            }));
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }, []);

    // 🔹 Fetch Products for the selected Category
    useEffect(() => {
        if (selectedCategoryId && !productsByCategory[selectedCategoryId]) {
            fetchProductsByCategory(selectedCategoryId);
        }
    }, [selectedCategoryId, productsByCategory, fetchProductsByCategory]);

    useEffect(() => {
  if (showEditModal || showDeleteModal || showProductDetailModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  // Cleanup (important)
  return () => {
    document.body.style.overflow = "unset";
  };
}, [showEditModal, showDeleteModal, showProductDetailModal]);


    // 🔹 Filtered Categories and Products (for search)
    const filteredCategories = useMemo(() => {
        return categories.filter((cat) =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    const productsToDisplay = useMemo(() => {
        return productsByCategory[selectedCategoryId] || [];
    }, [productsByCategory, selectedCategoryId]);
    
    const selectedCategoryName = useMemo(() => {
        return categories.find(c => c._id === selectedCategoryId)?.name;
    }, [categories, selectedCategoryId]);


    // 🔹 Handle Edit / Delete setup
    const handleEditClick = (product) => {
  setSelectedProduct(product);
  setFormData({
    categoryCode: product.category?._id || "",
    productCode: product.code,
    productName: product.name,
    description: product.description || "",
    price: product.price,
    stock: product.stock || 0,
    image: null,
  });

  setImagePreview(product.image || "");
  setShowEditModal(true);
};

const handleViewProduct = (product) => {
  setDetailProduct(product);
  setShowProductDetailModal(true);
};





    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    const file = files?.[0];
    setFormData(prev => ({ ...prev, image: file || null }));

    if (file) {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(selectedProduct?.image || "");
    }
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

    // 🔹 Update Product
// const handleUpdate = async (e) => {
//   e.preventDefault();

//   // 🔍 No changes check (BEFORE loader)
//   const isUnchanged =
//     formData.productName === selectedProduct.name &&
//     formData.price === selectedProduct.price &&
//     formData.description === selectedProduct.description &&
//     formData.stock === selectedProduct.stock &&
//     !formData.image;

//   if (isUnchanged) {
//     toast("No changes detected", {
//       icon: "ℹ️",
//       id: "no-change-toast",
//     });
//     return; // ✅ safe now
//   }

//   setIsUpdating(true); // ✅ START loader ONLY when API will run

//   try {
//     const data = new FormData();
//     data.append("category", formData.categoryCode);
//     data.append("code", formData.productCode);
//     data.append("name", formData.productName);
//     data.append("description", formData.description);
//     data.append("price", formData.price);
//     data.append("stock", formData.stock);

//     if (formData.image) {
//       data.append("image", formData.image);
//     }

//     await api.put(`/product/update/${selectedProduct._id}`, data);


//     const updatedProduct = res.data.product

// setProductsByCategory(prev => ({
//   ...prev,
//   [formData.categoryCode]: prev[formData.categoryCode].map(p =>
//     p._id === updatedProduct._id ? updatedProduct : p
//   )
// }))

//     toast.success(
//       `Product "${formData.productName}" updated successfully`,
//       { id: "product-updated" }
//     );

//     setShowEditModal(false);
//     fetchProductsByCategory(formData.categoryCode);

//     if (selectedProduct.category?._id !== formData.categoryCode) {
//       setSelectedCategoryId(formData.categoryCode);
//     }

//   } catch (err) {
//     console.error("Error updating product:", err);
//     toast.error(
//       "Error updating product. Please check the data",
//       { id: "product-update-error" }
//     );
//   } finally {
//     setIsUpdating(false); 
//   }
// };

const handleUpdate = async (e) => {
  e.preventDefault();

  // 🔍 No changes check
  const isUnchanged =
    formData.productName === selectedProduct.name &&
    formData.price === selectedProduct.price &&
    formData.description === selectedProduct.description &&
    formData.stock === selectedProduct.stock &&
    !formData.image;

  if (isUnchanged) {
    toast("No changes detected", {
      icon: "ℹ️",
      id: "no-change-toast",
    });
    return;
  }

  setIsUpdating(true);

  try {
    const data = new FormData();
    data.append("category", formData.categoryCode);
    data.append("code", formData.productCode);
    data.append("name", formData.productName);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);

    if (formData.image) {
      data.append("image", formData.image);
    }

    // ✅ Capture response
    const res = await api.put(
      `/product/update/${selectedProduct._id}`,
      data,
      {
        headers: {
            "Content-Type": "multipart/form-data", // Forces the browser to send the file correctly
        }
      }
    );

    const updatedProduct = res.data.product;

    // ✅ Update state immediately
    setProductsByCategory(prev => ({
      ...prev,
      [formData.categoryCode]: (prev[formData.categoryCode] || []).map(p =>
        p._id === updatedProduct._id ? updatedProduct : p
      )
    }));

    // ✅ Handle category change
    if (selectedProduct.category?._id !== formData.categoryCode) {
      setSelectedCategoryId(formData.categoryCode);
    }

    toast.success(
      `Product "${formData.productName}" updated successfully`,
      { id: "product-updated" }
    );

    setShowEditModal(false);

  } catch (err) {
    console.error("Error updating product:", err);
    toast.error(
      "Error updating product. Please check the data",
      { id: "product-update-error" }
    );
  } finally {
    setIsUpdating(false);
  }
};


    // 🔹 Delete Product
    const handleDelete = async () => {
        setIsDeleting(true);

        const categoryId = selectedProduct.category._id;
        const productName = selectedProduct.name;
        try {
            await api.delete(`/product/delete/${selectedProduct._id}`, {
            // withCredentials: true,
           });
            setShowDeleteModal(false);
            fetchProductsByCategory(categoryId);
            toast.success(`Product "${productName}" deleted successfully`,{id:"product deleted"});

        } catch (err) {
            console.error("Error deleting product:", err);
            toast.error("Error deleting product",{id:"error deleting products"});

        }finally {
  setIsDeleting(false);
}
    };

    // Add CSS animations
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
            .animate-slideUp { animation: slideUp 0.3s ease-out; }
            .line-clamp-3 {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // --- RENDERING ---

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
            <div className="w-full max-w-[1700px] mx-auto pt-4 pb-12 px-3 sm:px-4  md:px-6 lg:px-8 ">


                {/* 📌 UPDATED HEADING - Left Aligned */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
                        Product Management Dashboard
                    </h1>
                    <p className="text-gray-600 max-w-3xl">
                        Manage your inventory by category, update product details, and organize your catalog efficiently.
                    </p>
                </div>
                

                <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">



                    
                    {/*  Category Sidebar (Master View) */}
                    {/* <div className="w-full lg:w-1/4 bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 h-fit lg:sticky top-20 self-start md:w-100 xl:w-1/4 xl:sticky "> */}
                    <div className="w-full xl:w-1/4 bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 h-fit xl:sticky top-20">



                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            {/* <FaTag className="mr-3 text-[#4A7C59]" />  */}
                            Categories
                            <span className="ml-auto text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {categories.length} total
                            </span>
                        </h2>
                        
                        {/* Search Input */}
                        <div className="relative mb-5">
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition duration-200"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        </div>

                        <nav className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <button
                                        key={category._id}
                                        onClick={() => setSelectedCategoryId(category._id)}
                                        className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 group
                                            ${selectedCategoryId === category._id 
                                                ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md' 
                                                : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="font-medium group-hover:text-[#2D5A27]">{category.name}</span>
                                        <span className={`text-xs font-mono px-2 py-1 rounded ${selectedCategoryId === category._id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                            {category.code}
                                        </span>
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <FaSearch className="text-gray-300 text-2xl mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">
                                        No categories found
                                    </p>
                                </div>
                            )}
                        </nav>
                    </div>

                    {/* ➡️ Product Detail/List (Detail View) */}
                    <div className="w-full  xl:w-3/4">

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                        {/* <FaBoxOpen className="mr-3 text-[#4A7C59]" /> */}
                                        {selectedCategoryName ? `${selectedCategoryName} Products` : "Select a Category"}
                                    </h2>
                                    {selectedCategoryName && (
                                        <p className="text-gray-500 text-sm mt-1">
                                            Showing {productsToDisplay.length} products in this category
                                        </p>
                                    )}
                                </div>
                                {selectedCategoryId && productsToDisplay.length > 0 && (
                                    <span className=" w-[90px] text-sm font-medium text-gray-600 bg-gray-100 py-1.5 rounded-full text-center">
                                        {productsToDisplay.length} items
                                    </span>
                                )}
                            </div>

                            {selectedCategoryId && (
                                productsToDisplay.length > 0 ? (
                                    <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">


                                        {productsToDisplay.map((prod) => (
                                            <DashboardProductCard 
                                                key={prod._id}
                                                product={prod}
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                                handleViewProduct={handleViewProduct}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                                        <FaBoxOpen size={48} className="text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
                                        <p className="text-gray-500 max-w-md mx-auto">
                                            There are no products in <span className="font-semibold text-[#2D5A27]">{selectedCategoryName}</span> yet.
                                        </p>
                                    </div>
                                )
                            )}

                            {!selectedCategoryId && (
                                <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
                                    <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
                                        <FaBoxOpen size={28} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-700 mb-3">Select a Category</h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        Choose a category from the sidebar to view and manage its products
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 🛠 Updated Edit Modal */}
{showEditModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">

    <div className="bg-white rounded-2xl shadow-2xl w-full sm:w-[90%] md:w-[75%] lg:w-[60%] max-h-[90vh] overflow-y-auto">

      {/* HEADER */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Edit Product
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Update product details and image
            </p>
          </div>

          <button
            onClick={() => setShowEditModal(false)}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <FaTimes className="text-slate-500" />
          </button>
        </div>
      </div>

      {/* BODY – SAME GRID AS ADD CATEGORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">

        {/* LEFT – FORM */}
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              name="categoryCode"
              value={formData.categoryCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50
                         focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-300"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Code */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Code
            </label>
            <input
              type="number"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50"
              required
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50"
              required
            />
          </div>

          {/* IMAGE UPLOAD – SAME CARD UI */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Image
            </label>

            <label
              htmlFor="productImage"
              className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed
                         border-slate-200 rounded-xl bg-slate-50/30 hover:bg-slate-50/50
                         cursor-pointer transition"
            >
              {/* <FaImage className="text-3xl text-slate-400 mb-2" /> */}
               <Upload className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-700">
                {formData.image ? formData.image.name : "Click to upload image"}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                PNG, JPG, WEBP up to 5MB
              </span>
            </label>

            <input
              type="file"
              id="productImage"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 resize-none"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
           <button
  type="submit"
  disabled={isUpdating}
  className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800
             text-white flex items-center justify-center gap-2
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isUpdating ? (
    <>
      <LoaderSpinner />
      Updating...
    </>
  ) : (
    "Save Changes"
  )}
</button>

          </div>
        </form>

        {/* RIGHT – CARD PREVIEW (EXACT SAME AS CATEGORY) */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Card Preview
          </h3>

          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-100 mb-4 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <FaImage className="text-5xl text-slate-300" />
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-500">
                Product Name
              </div>
              <div className="text-lg font-bold text-slate-900">
                {formData.productName || "Untitled Product"}
              </div>

              <div className="text-sm font-medium text-slate-500 mt-4">
                Price
              </div>
              <div className="text-slate-900 font-semibold">
                ₹ {formData.price || "0"}
              </div>

              <div className="text-sm font-medium text-slate-500 mt-4">
                Description
              </div>
              <div className="text-sm text-slate-600 line-clamp-3">
                {formData.description || "No description provided"}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
)}


{showProductDetailModal && detailProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

      {/* HEADER */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">
          Product Details
        </h2>
        <button
          onClick={() => setShowProductDetailModal(false)}
          className="p-2 rounded-lg hover:bg-slate-100 transition"
        >
          <FaTimes className="text-slate-500" />
        </button>
      </div>

      {/* BODY */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* IMAGE */}
        <div className="flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden">
          {detailProduct.image ? (
            <img
              src={`${detailProduct.image}?v=${detailProduct.updatedAt || Date.now()}`}
              alt={detailProduct.name}
              className="max-h-[400px] w-auto object-contain"
            />
          ) : (
            <FaImage className="text-6xl text-slate-300" />
          )}
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Product Name</p>
            <p className="text-xl font-bold text-slate-900 break-all break-words max-w-full">
              {detailProduct.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Code</p>
            <p className="font-mono text-slate-800">
              {detailProduct.code}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Price</p>
            <p className="text-lg font-semibold text-[#2D5A27]">
              ₹{detailProduct.price}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Description</p>
            <p className="text-slate-600 whitespace-pre-wrap break-words">
              {detailProduct.description || "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}




                {/* ❌ Updated Delete Modal */}
                <Modal 
                  title="Delete Product" 
                  isOpen={showDeleteModal} 
                  onClose={() => setShowDeleteModal(false)}
                >
                    <div className="text-center ">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                            <TrashIcon className="w-8 h-8 text-red-600" />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Confirm Deletion
                        </h3>
                        
                        <p className="text-gray-600 mb-2">
                            Are you sure you want to delete this product?
                        </p>
                        
                        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                            <p className="font-medium text-gray-800 text-lg mb-1">
                                {selectedProduct?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                Code: {selectedProduct?.code} Price: ₹{selectedProduct?.price}
                            </p>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-6">
                            This action cannot be undone. The product will be permanently removed from the system.
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200 font-medium text-sm"
                            >
                                Cancel
                            </button>
                            <button
  onClick={handleDelete}
  disabled={isDeleting}
  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700
             text-white flex items-center justify-center gap-2
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isDeleting ? (
    <>
      <LoaderSpinner />
      Deleting...
    </>
  ) : (
    <>
      <TrashIcon className="w-4 h-4" />
      Delete Permanently
    </>
  )}
</button>

                        </div>
                    </div>
                </Modal>
            </div>
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

export default Listproducts;


