// import React from 'react'

// const Addproducts = () => {
//   return (
//      <div className="flex justify-center items-center h-screen">
//             <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
//                 <h1 className="text-[#5e785a] text-xl font-bold text-center">
//                     Add Products
//                 </h1>

//                <form  className="flex flex-col mt-6 gap-3" >
//                   <select
//                   className="text-sm border border-gray-400 rounded px-3 py-2 
//                              focus:outline-none focus:border-[#343e32] w-full 
//                            bg-[#EEFFEB] text-[#343e32] 
//                              pr-8 relative"
//                   >
//                   <option value="" disabled hidden>
//                   Category
//                   </option>
//                   <option value="customer">001</option>
//                   <option value="admin">002</option>
//                    </select>

//                   <input
//                         type="number"
//                         placeholder="Product Code"
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Product Name"
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//                         required
//                     />

//                     {/* Description */}
//                     <textarea
//                         placeholder="Enter Product Description"
//                         className="w-full border border-gray-400 rounded px-3 py-4 resize-none text-sm focus:outline-none focus:border-[#343e32]"
//                         required
//                     />

//                      <input
//                         type="number"
//                         placeholder="Price"
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//                         required
//                     />

//                     <div className="mt-2">
//             {/* Custom File Button (The visible button) */}
//             <label
//               htmlFor="imageUpload"
//               className="px-3 py-2 text-sm text-white font-bold rounded cursor-pointer transition flex items-center justify-center space-x-2 bg-[#5e785a] hover:bg-[#4f654e]" 
//             >
//               Upload Product Image
//             </label>
            
//             {/* Hidden File Input (The functional element) */}
//             <input
//               type="file"
//               id="imageUpload" // Must match htmlFor in the label
//               name="image"
//               className="hidden" // Hides the default browser UI
//               accept="image/*"
//               required
//             />
//           </div>

//            <button
//                         type="submit"
//                         className="w-full mt-5 text-white bg-[#5e785a] px-4 py-2 rounded hover:bg-[#2d412a] transition"
//                     >
//                         Submit
//                     </button>
                  
//                 </form>
//             </div>
//      </div>

//   )
// }

// export default Addproducts



// import React, { useState, useEffect } from 'react'; 
// import axios from 'axios'; 
// import { domainUrl } from '../utils/constant';

// const Addproducts = () => {
//     // 1. STATE MANAGEMENT
//     const [formData, setFormData] = useState({
//         categoryCode: "", 
//         productCode: "",
//         productName: "",
//         description: "",
//         price: "",
//         image: null,
//     });
//     const [categories, setCategories] = useState([]); 
//     const [message, setMessage] = useState("");
    
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 // NOTE: Use your Category List API endpoint
//                 const res = await axios.get(`${domainUrl}/category/list`);
                
//                 // Assuming your backend returns { list: [...] }
//                 setCategories(res.data.list); 
//             } catch (err) {
//                 console.error("Error fetching categories for dropdown:", err);
//                 setMessage("Failed to load categories.");
//             }
//         };
//         fetchCategories();
//     }, []); // Empty dependency array means this runs once on mount

//     // 3. DATA HANDLING (handleChange)
//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === "image") {
//             setFormData({ ...formData, image: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     // 4. API INTEGRATION (handleSubmit - updated to show the correct endpoint)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         try {
//             const token = localStorage.getItem("token");
//             const data = new FormData(); 
            
//             data.append("category", formData.categoryCode); // 
//             data.append("code", formData.productCode);
//             data.append("name", formData.productName);
//             data.append("description", formData.description);
//             data.append("price", formData.price);
//             if (formData.image) {
//                  data.append("image", formData.image);
//             }
            
//             //  UNCOMMENTED AXIOS CALL
//             const res = await axios.post(
//                 `${domainUrl}/product/add`, 
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
            
//             setMessage(res.data.message);

//             // Reset the form after success
//             setFormData({
//                 categoryCode: "",
//                 productCode: "",
//                 productName: "",
//                 description: "",
//                 price: "",
//                 image: null,
//             });
//             setTimeout(()=>{
//                 setMessage('')
//             },2000)

//         } catch (err) {
//             console.error("Error adding product:", err.response ? err.response.data : err.message);
//             setMessage("Error adding product. Check console for details.");
//         }
//     };

//     // 5. RENDER (Updated to use the dynamic 'categories' state)
//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
//                 <h1 className="text-[#5e785a] text-xl font-bold text-center">
//                     Add Products
//                 </h1>

//                 <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
                    
//                     {/* Category Select */}
//                     <select
//                         name="categoryCode"
//                         value={formData.categoryCode}
//                         onChange={handleChange}
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full bg-[#EEFFEB] text-[#343e32] pr-8 relative"
//                         required
//                     >
//                         <option value="" disabled hidden>Select Category</option>
                        
//                         {/*  Mapped REAL categories here */}
//                         {categories.map(cat => (
//                             <option key={cat._id} value={cat._id}> 
//                                 {/* Assuming you want to send the Category ID (_id) but display the name */}
//                                 {cat.name} ({cat.code})
//                             </option>
//                         ))}
//                     </select>

//                     {/* ... (Other inputs remain the same) ... */}
//                     {/* Product Code */}
//                     <input
//                         type="number" name="productCode" value={formData.productCode} onChange={handleChange}
//                         placeholder="Product Code"
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//                         required
//                     />
                    
//                     {/* Product Name */}
//                     <input
//                         type="text" name="productName" value={formData.productName} onChange={handleChange}
//                         placeholder="Product Name"
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//                         required
//                     />

//                     {/* Description */}
//                     <textarea
//                         name="description" value={formData.description} onChange={handleChange}
//                         placeholder="Enter Product Description"
//                         className="w-full border border-gray-400 rounded px-3 py-4 resize-none text-sm focus:outline-none focus:border-[#343e32]"
//                         required
//                     />

//                     {/* Price */}
//                     <input
//                         type="number" name="price" value={formData.price} onChange={handleChange}
//                         placeholder="Price"
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//                         required
//                     />
                    
//                     {/* Image Upload Field */}
//                     <div className="mt-2">
//                         <label
//                             htmlFor="imageUpload"
//                             className="px-3 py-2 text-sm text-white font-bold rounded cursor-pointer transition flex items-center justify-center space-x-2 bg-[#5e785a] hover:bg-[#4f654e]" 
//                         >
//                             {formData.image ? formData.image.name : "Upload Product Image"} 
//                         </label>
//                         <input
//                             type="file" id="imageUpload" name="image" onChange={handleChange}
//                             className="hidden" accept="image/*" required
//                         />
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="bg-[#5e785a] text-white py-2 mt-4 rounded hover:bg-[#4f654e] font-bold transition"
//                     >
//                         Add Product
//                     </button>
                    
//                 </form>
                
//                 {message && (
//                     <p className="text-center mt-4 text-[#343e32]">{message}</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Addproducts;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { domainUrl } from "../utils/constant";

// const AddProducts = () => {
//   const [formData, setFormData] = useState({
//     categoryCode: "",
//     productCode: "",
//     productName: "",
//     description: "",
//     price: "",
//     image: null,
//   });

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   //  Fetch categories for dropdown
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(`${domainUrl}/category/list`);
//         setCategories(res.data.list || []);
//       } catch (err) {
//         toast.error("Failed to load categories.", {
//           style: {
//             background: "#ffeded",
//             color: "#c62828",
//             fontWeight: "500",
//           },
//         });
//       }
//     };
//     fetchCategories();
//   }, []);

//   //  Input Change Handler
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   //  Validation
//   const validate = () => {
//     const { categoryCode, productCode, productName, description, price, image } =
//       formData;

//     if (
//       !categoryCode ||
//       !productCode.trim() ||
//       !productName.trim() ||
//       !description.trim() ||
//       !price.trim() ||
//       !image
//     ) {
//       return "Please fill in all fields and upload an image.";
//     }

//     if (!/^[0-9]+$/.test(productCode)) {
//       return "Product code should contain only numbers.";
//     }

    
//       if (!/^[a-zA-Z0-9\s&_\-,]+$/.test(productName)) {
//   return "Product name can only contain letters, numbers, spaces, &, -, _ and ,";
// }

//     if (description.length < 10) {
//       return "Description should be at least 10 characters long.";
//     }

//     if (parseFloat(price) <= 0) {
//       return "Please enter a valid price.";
//     }

//     return null;
//   };

//   //  Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationError = validate();

//     if (validationError) {
//       toast.error(validationError, {
//         style: {
//           background: "#ffeded",
//           color: "#c62828",
//           fontWeight: "500",
//         },
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const data = new FormData();

//       data.append("category", formData.categoryCode);
//       data.append("code", formData.productCode);
//       data.append("name", formData.productName);
//       data.append("description", formData.description);
//       data.append("price", formData.price);
//       data.append("image", formData.image);


//       console.log("logdata",data);
      
//       const res = await axios.post(`${domainUrl}/product/add`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("resyyyyyyyyyyyyyyyyyyyyyy");
      
      

//       toast.success(res.data.message || "Product added successfully!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "🌿",
//       });

//       // Reset form
//       setFormData({
//         categoryCode: "",
//         productCode: "",
//         productName: "",
//         description: "",
//         price: "",
//         image: null,
//       });
//       document.getElementById("imageUpload").value = "";
//     } catch (err) {
//       console.error("Error adding product:", err.response.data);
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data?.Error ||
//         "Error adding product. Please try again.";
//       toast.error(msg, {
//         style: {
//           background: "#ffeded",
//           color: "#c62828",
//           fontWeight: "500",
//         },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-[#e2e4e1] px-4 sm:px-6 md:px-8 py-6">
//         <div
//           className="bg-white w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-md
//           p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300"
//         >
//           <h1 className="text-[#343e32] text-xl sm:text-2xl font-bold text-center">
//             Add New Product
//           </h1>
//           <p className="text-gray-500 text-xs sm:text-sm text-center mt-1">
//             Fill in details to add a new product
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col mt-6 gap-3 sm:gap-4"
//             autoComplete="off"
//           >
//             {/* Category Dropdown */}
//             <select
//               name="categoryCode"
//               value={formData.categoryCode}
//               onChange={handleChange}
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 
//               focus:outline-none focus:border-[#5e785a] w-full bg-white text-[#343e32]"
//               required
//             >
//               <option value="" disabled hidden>
//                 Select Category
//               </option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name} ({cat.code})
//                 </option>
//               ))}
//             </select>

//             {/* Product Code */}
//             <input
//               type="number"
//               name="productCode"
//               value={formData.productCode}
//               onChange={handleChange}
//               placeholder="Product Code"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//               required
//             />

//             {/* Product Name */}
//             <input
//               type="text"
//               name="productName"
//               value={formData.productName}
//               onChange={handleChange}
//               placeholder="Product Name"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//               required
//             />

//             {/* Description */}
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter Product Description"
//               rows="4"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full resize-none focus:outline-none focus:border-[#5e785a]"
//               required
//             />

//             {/* Price */}
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="Price"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//               required
//             />

//             {/* Image Upload */}
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="imageUpload"
//                 className="px-3 py-2 text-sm text-white font-bold rounded cursor-pointer 
//                 transition flex items-center justify-center bg-[#5e785a] hover:bg-[#4f644d]"
//               >
//                 {formData.image ? formData.image.name : "Upload Product Image"}
//               </label>

//               <input
//                 type="file"
//                 id="imageUpload"
//                 name="image"
//                 onChange={handleChange}
//                 className="hidden"
//                 accept="image/*"
//                 required
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-3 text-white bg-[#5e785a] px-4 py-2 sm:py-2.5 rounded 
//               hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? "Adding..." : "Add Product"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Toast Notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         transition={Slide}
//         toastStyle={{
//           borderRadius: "10px",
//           fontFamily: "Inter, sans-serif",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         }}
//       />
//     </>
//   );
// };

// export default AddProducts;

//working code with new uiiiiiiiiiiiiiiiiiiiiiiiiiiiii


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { domainUrl } from "../utils/constant";
// import {
//   Upload,
//   X,
//   Image as ImageIcon,
//   Loader2,
//   Sparkles,
//   CheckCircle,
//   AlertCircle,
//   Palette,
//   Type,
//   FileText,
//   Hash,
//   RefreshCw,
//   Zap,
//   Tag,
//   DollarSign,
//   Layers,
// } from "lucide-react";

// // ---------------------- Toast ----------------------
// const Toast = ({ message, type = "success", onClose }) => {
//   const icons = {
//     success: <CheckCircle className="h-5 w-5" />,
//     error: <AlertCircle className="h-5 w-5" />,
//     info: <Sparkles className="h-5 w-5" />,
//   };

//   const bgColors = {
//     success: "bg-gradient-to-r from-emerald-500 to-emerald-600",
//     error: "bg-gradient-to-r from-rose-500 to-rose-600",
//     info: "bg-gradient-to-r from-slate-800 to-slate-900",
//   };

//   return (
//     <div className="fixed top-5 left-1/2 z-50 w-[96%] max-w-md -translate-x-1/2 animate-slideDown sm:w-full">
//       <div
//         className={`${bgColors[type]} mx-auto rounded-2xl px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between shadow-2xl shadow-black/20 backdrop-blur-sm border border-white/10`}
//       >
//         <div className="flex items-center gap-3">
//           {icons[type]}
//           <span className="text-sm font-medium text-white">{message}</span>
//         </div>
//         <button
//           onClick={onClose}
//           className="text-white/80 hover:text-white transition-colors p-1 -mr-2"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // ---------------- Validation Indicator -------------
// const ValidationIndicator = ({ isValid, message }) => (
//   <div className="flex items-center gap-2 mt-1">
//     {isValid ? (
//       <CheckCircle className="h-3 w-3 text-emerald-500" />
//     ) : (
//       <AlertCircle className="h-3 w-3 text-amber-500" />
//     )}
//     <span className="text-xs text-slate-500">{message}</span>
//   </div>
// );

// const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

// const AddProducts = () => {
//   const [formData, setFormData] = useState({
//     categoryCode: "",
//     productCode: "",
//     productName: "",
//     description: "",
//     price: "",
//     stock: "",
//     sizes: [], // multi-select
//     image: null,
//   });

//   const [categories, setCategories] = useState([]);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [charCount, setCharCount] = useState(0);

//   const [validation, setValidation] = useState({
//     category: { isValid: false, message: "Category is required" },
//     productCode: { isValid: false, message: "Numbers only" },
//     productName: { isValid: false, message: "Letters, numbers & basic symbols" },
//     description: { isValid: false, message: "Minimum 10 characters" },
//     price: { isValid: false, message: "Price must be greater than 0" },
//     image: { isValid: false, message: "Image required" },
//   });

//   // ------------- Load categories (COOKIE AUTH) -------------
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(`${domainUrl}/category/list`, {
//           withCredentials: true,
//         });
//         setCategories(res.data.list || []);
//       } catch (err) {
//         showToast("Failed to load categories", "error");
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Cleanup preview URL
//   useEffect(
//     () => () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview);
//     },
//     [imagePreview]
//   );

//   // ------------- Real-time validation -------------
//   useEffect(() => {
//     const {
//       categoryCode,
//       productCode,
//       productName,
//       description,
//       price,
//       image,
//     } = formData;

//     setValidation({
//       category: {
//         isValid: !!categoryCode,
//         message: categoryCode ? "Category selected ✓" : "Category is required",
//       },
//       productCode: {
//         isValid: /^[0-9]+$/.test(productCode) && productCode.length > 0,
//         message:
//           productCode.length > 0 && !/^[0-9]+$/.test(productCode)
//             ? "Only numbers allowed"
//             : "Numbers only",
//       },
//       productName: {
//         isValid:
//           /^[a-zA-Z0-9\s&_\-,]+$/.test(productName) &&
//           productName.trim().length > 0,
//         message:
//           productName.length > 0 &&
//           !/^[a-zA-Z0-9\s&_\-,]+$/.test(productName)
//             ? "Only letters, numbers, spaces, &, -, _ and ,"
//             : "Letters, numbers & basic symbols",
//       },
//       description: {
//         isValid: description.length >= 10,
//         message: `${description.length}/10 characters minimum`,
//       },
//       price: {
//         isValid: !!price && parseFloat(price) > 0,
//         message: price ? "Valid price ✓" : "Price must be greater than 0",
//       },
//       image: {
//         isValid: image !== null,
//         message: image ? "Image selected ✓" : "Image required",
//       },
//     });

//     setCharCount(description.length);
//   }, [formData]);

//   // -------------------- Handlers --------------------
//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 4000);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image") {
//       const file = files?.[0];
//       if (file) {
//         if (imagePreview) URL.revokeObjectURL(imagePreview);
//         const url = URL.createObjectURL(file);
//         setFormData((prev) => ({ ...prev, image: file }));
//         setImagePreview(url);
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSizeToggle = (size) => {
//     setFormData((prev) => {
//       const alreadySelected = prev.sizes.includes(size);
//       const sizes = alreadySelected
//         ? prev.sizes.filter((s) => s !== size)
//         : [...prev.sizes, size];
//       return { ...prev, sizes };
//     });
//   };

//   const handleReset = () => {
//     if (imagePreview) URL.revokeObjectURL(imagePreview);
//     setFormData({
//       categoryCode: "",
//       productCode: "",
//       productName: "",
//       description: "",
//       price: "",
//       stock: "",
//       sizes: [],
//       image: null,
//     });
//     setImagePreview(null);
//     setCharCount(0);

//     const input = document.getElementById("imageUpload");
//     if (input) input.value = "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const allValid = Object.values(validation).every((v) => v.isValid);
//     if (!allValid) {
//       showToast(
//         "Please ensure all required fields are valid before submitting.",
//         "error"
//       );
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = new FormData();

//       data.append("category", formData.categoryCode);
//       data.append("code", formData.productCode);
//       data.append("name", formData.productName);
//       data.append("description", formData.description);
//       data.append("price", formData.price);
//       data.append("image", formData.image);

//       // NOTE: stock & sizes are UI-only now (not sent). You can enable later like:
//       // data.append("stock", formData.stock);
//       // data.append("sizes", JSON.stringify(formData.sizes));

//       const res = await axios.post(`${domainUrl}/product/add`, data, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       showToast(res.data.message || "Product added successfully!", "success");
//       handleReset();
//     } catch (err) {
//       showToast(
//         err.response?.data?.message ||
//           err.response?.data?.Error ||
//           "Error adding product. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ----------------------- UI -----------------------
//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-2 sm:px-4 lg:px-6 xl:px-8 py-6">

//         <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4">

//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
//                     <Palette className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                       Add New Product
//                     </h1>
//                     <p className="text-sm text-slate-500 mt-1">
//                       Create a new product for your catalogue
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Header buttons */}
//               <div className="flex items-center gap-3 w-full md:w-auto">
//                 <button
//                   type="button"
//                   onClick={handleReset}
//                   className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200"
//                 >
//                   <RefreshCw className="h-4 w-4" />
//                   Reset
//                 </button>
//                 <button
//                   type="submit"
//                   form="add-product-form"
//                   disabled={loading}
//                   className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     <>
//                       <Zap className="h-4 w-4" />
//                       Create Product
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Progress Indicators */}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
//               {/* Category */}
//               <div
//                 className={`p-4 rounded-xl border ${
//                   validation.category.isValid
//                     ? "border-emerald-200 bg-emerald-50"
//                     : "border-slate-200 bg-white"
//                 } transition-all duration-300`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       validation.category.isValid ? "bg-emerald-500" : "bg-slate-200"
//                     }`}
//                   >
//                     <Layers
//                       className={`h-4 w-4 ${
//                         validation.category.isValid ? "text-white" : "text-slate-400"
//                       }`}
//                     />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-slate-700">Category</div>
//                     <div
//                       className={`text-xs ${
//                         validation.category.isValid
//                           ? "text-emerald-600"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {validation.category.isValid ? "✓ Selected" : "Required"}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Product Code */}
//               <div
//                 className={`p-4 rounded-xl border ${
//                   validation.productCode.isValid
//                     ? "border-emerald-200 bg-emerald-50"
//                     : "border-slate-200 bg-white"
//                 } transition-all duration-300`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       validation.productCode.isValid
//                         ? "bg-emerald-500"
//                         : "bg-slate-200"
//                     }`}
//                   >
//                     <Hash
//                       className={`h-4 w-4 ${
//                         validation.productCode.isValid
//                           ? "text-white"
//                           : "text-slate-400"
//                       }`}
//                     />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-slate-700">
//                       Product Code
//                     </div>
//                     <div
//                       className={`text-xs ${
//                         validation.productCode.isValid
//                           ? "text-emerald-600"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {validation.productCode.isValid ? "✓ Valid" : "Required"}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Product Name */}
//               <div
//                 className={`p-4 rounded-xl border ${
//                   validation.productName.isValid
//                     ? "border-emerald-200 bg-emerald-50"
//                     : "border-slate-200 bg-white"
//                 } transition-all duration-300`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       validation.productName.isValid
//                         ? "bg-emerald-500"
//                         : "bg-slate-200"
//                     }`}
//                   >
//                     <Type
//                       className={`h-4 w-4 ${
//                         validation.productName.isValid
//                           ? "text-white"
//                           : "text-slate-400"
//                       }`}
//                     />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-slate-700">
//                       Product Name
//                     </div>
//                     <div
//                       className={`text-xs ${
//                         validation.productName.isValid
//                           ? "text-emerald-600"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {validation.productName.isValid ? "✓ Valid" : "Required"}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div
//                 className={`p-4 rounded-xl border ${
//                   validation.description.isValid
//                     ? "border-emerald-200 bg-emerald-50"
//                     : "border-slate-200 bg-white"
//                 } transition-all duration-300`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       validation.description.isValid
//                         ? "bg-emerald-500"
//                         : "bg-slate-200"
//                     }`}
//                   >
//                     <FileText
//                       className={`h-4 w-4 ${
//                         validation.description.isValid
//                           ? "text-white"
//                           : "text-slate-400"
//                       }`}
//                     />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-slate-700">
//                       Description
//                     </div>
//                     <div
//                       className={`text-xs ${
//                         validation.description.isValid
//                           ? "text-emerald-600"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {validation.description.isValid ? "✓ Valid" : "Required"}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Price */}
//               <div
//                 className={`p-4 rounded-xl border ${
//                   validation.price.isValid
//                     ? "border-emerald-200 bg-emerald-50"
//                     : "border-slate-200 bg-white"
//                 } transition-all duration-300`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       validation.price.isValid ? "bg-emerald-500" : "bg-slate-200"
//                     }`}
//                   >
//                     <DollarSign
//                       className={`h-4 w-4 ${
//                         validation.price.isValid ? "text-white" : "text-slate-400"
//                       }`}
//                     />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-slate-700">Price</div>
//                     <div
//                       className={`text-xs ${
//                         validation.price.isValid ? "text-emerald-600" : "text-slate-500"
//                       }`}
//                     >
//                       {validation.price.isValid ? "✓ Valid" : "Required"}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Image */}
//               <div
//                 className={`p-4 rounded-xl border ${
//                   validation.image.isValid
//                     ? "border-emerald-200 bg-emerald-50"
//                     : "border-slate-200 bg-white"
//                 } transition-all duration-300`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       validation.image.isValid ? "bg-emerald-500" : "bg-slate-200"
//                     }`}
//                   >
//                     <ImageIcon
//                       className={`h-4 w-4 ${
//                         validation.image.isValid ? "text-white" : "text-slate-400"
//                       }`}
//                     />
//                   </div>
//                   <div>
//                     <div className="text-xs font-medium text-slate-700">Image</div>
//                     <div
//                       className={`text-xs ${
//                         validation.image.isValid ? "text-emerald-600" : "text-slate-500"
//                       }`}
//                     >
//                       {validation.image.isValid ? "✓ Selected" : "Required"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Form */}
//           <form
//             id="add-product-form"
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//           >
//             {/* LEFT: Product Fields */}
//             <div className="lg:col-span-2 space-y-8">
//               {/* Product Information */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
//                 <div className="p-6 border-b border-slate-100">
//                   <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//                     <div className="p-1.5 rounded-lg bg-slate-100">
//                       <Tag className="h-4 w-4 text-slate-700" />
//                     </div>
//                     Product Information
//                   </h2>
//                   <p className="text-sm text-slate-500 mt-1">
//                     Define your product details and attributes
//                   </p>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   {/* Category Select */}
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <label className="block text-sm font-semibold text-slate-800">
//                         Product Category
//                       </label>
//                       <span className="text-xs font-medium text-slate-500">
//                         Select from existing categories
//                       </span>
//                     </div>
//                     <select
//                       name="categoryCode"
//                       value={formData.categoryCode}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.name} ({cat.code})
//                         </option>
//                       ))}
//                     </select>
//                     <ValidationIndicator
//                       isValid={validation.category.isValid}
//                       message={validation.category.message}
//                     />
//                   </div>

//                   {/* Product Code */}
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <label className="block text-sm font-semibold text-slate-800">
//                         Product Code
//                       </label>
//                       <span className="text-xs font-medium text-slate-500">
//                         Numbers only
//                       </span>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         name="productCode"
//                         value={formData.productCode}
//                         onChange={handleChange}
//                         placeholder="Eg: 1001"
//                         className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
//                       />
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                         {validation.productCode.isValid ? (
//                           <CheckCircle className="h-4 w-4 text-emerald-500" />
//                         ) : formData.productCode ? (
//                           <AlertCircle className="h-4 w-4 text-amber-500" />
//                         ) : null}
//                       </div>
//                     </div>
//                     <ValidationIndicator
//                       isValid={validation.productCode.isValid}
//                       message={validation.productCode.message}
//                     />
//                   </div>

//                   {/* Product Name */}
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <label className="block text-sm font-semibold text-slate-800">
//                         Product Name
//                       </label>
//                       <span className="text-xs font-medium text-slate-500">
//                         Display name
//                       </span>
//                     </div>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         name="productName"
//                         value={formData.productName}
//                         onChange={handleChange}
//                         placeholder="Eg: Puffer Jacket with Pocket Detail"
//                         className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
//                       />
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                         {validation.productName.isValid ? (
//                           <CheckCircle className="h-4 w-4 text-emerald-500" />
//                         ) : formData.productName ? (
//                           <AlertCircle className="h-4 w-4 text-amber-500" />
//                         ) : null}
//                       </div>
//                     </div>
//                     <ValidationIndicator
//                       isValid={validation.productName.isValid}
//                       message={validation.productName.message}
//                     />
//                   </div>

//                   {/* Description */}
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <label className="block text-sm font-semibold text-slate-800">
//                         Description
//                       </label>
//                       <span
//                         className={`text-xs font-medium ${
//                           charCount >= 10 ? "text-emerald-600" : "text-slate-500"
//                         }`}
//                       >
//                         {charCount}/10 characters
//                       </span>
//                     </div>
//                     <div className="relative">
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows="4"
//                         placeholder="Describe this product in detail..."
//                         className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200 resize-none"
//                       />
//                       <div className="absolute right-3 top-3">
//                         {validation.description.isValid ? (
//                           <CheckCircle className="h-4 w-4 text-emerald-500" />
//                         ) : formData.description ? (
//                           <AlertCircle className="h-4 w-4 text-amber-500" />
//                         ) : null}
//                       </div>
//                     </div>
//                     <ValidationIndicator
//                       isValid={validation.description.isValid}
//                       message={validation.description.message}
//                     />
//                   </div>

//                   {/* Price & Stock */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Price */}
//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="block text-sm font-semibold text-slate-800">
//                           Price
//                         </label>
//                         <span className="text-xs font-medium text-slate-500">
//                           In your base currency
//                         </span>
//                       </div>
//                       <div className="relative">
//                         <input
//                           type="number"
//                           name="price"
//                           value={formData.price}
//                           onChange={handleChange}
//                           placeholder="Eg: 2499"
//                           className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
//                         />
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400">
//                           <DollarSign className="h-3 w-3" />
//                         </div>
//                       </div>
//                       <ValidationIndicator
//                         isValid={validation.price.isValid}
//                         message={validation.price.message}
//                       />
//                     </div>

//                     {/* Stock (UI only for now) */}
//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="block text-sm font-semibold text-slate-800">
//                           Stock
//                         </label>
//                         <span className="text-xs font-medium text-slate-500">
//                           (UI only, functional later)
//                         </span>
//                       </div>
//                       <input
//                         type="number"
//                         name="stock"
//                         value={formData.stock}
//                         onChange={handleChange}
//                         placeholder="Eg: 50"
//                         className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
//                       />
//                     </div>
//                   </div>

//                   {/* Size UI */}
//                   <div>
//                     <div className="flex items-center justify-between mb-2">
//                       <label className="block text-sm font-semibold text-slate-800">
//                         Available Sizes
//                       </label>
//                       <span className="text-xs font-medium text-slate-500">
//                         XS, S, M, L, XL, XXL
//                       </span>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {SIZE_OPTIONS.map((size) => {
//                         const selected = formData.sizes.includes(size);
//                         return (
//                           <button
//                             key={size}
//                             type="button"
//                             onClick={() => handleSizeToggle(size)}
//                             className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
//                               selected
//                                 ? "bg-slate-900 text-white border-slate-900 shadow-sm"
//                                 : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
//                             }`}
//                           >
//                             {size}
//                           </button>
//                         );
//                       })}
//                     </div>
//                     <p className="text-[11px] text-slate-400 mt-1">
//                       You can select multiple sizes. (Not saved yet, UI only for
//                       now).
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT: Image Upload */}
//             <div className="space-y-8">
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 overflow-hidden h-full">
//                 <div className="p-6 border-b border-slate-100">
//                   <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//                     <div className="p-1.5 rounded-lg bg-slate-100">
//                       <ImageIcon className="h-4 w-4 text-slate-700" />
//                     </div>
//                     Product Image
//                   </h2>
//                   <p className="text-sm text-slate-500 mt-1">
//                     Upload a high-quality product image
//                   </p>
//                 </div>

//                 <div className="p-6 h-full">
//                   <div className="flex flex-col h-full">
//                     <label
//                       htmlFor="imageUpload"
//                       className="cursor-pointer transition-all duration-300 block"
//                     >
//                       {imagePreview ? (
//                         <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-xl group">
//                           <img
//                             src={imagePreview}
//                             alt="Product preview"
//                             className="w-full h-full object-contain rounded-xl border-2 border-slate-200 bg-white p-2"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
//                           <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-xl">
//                             <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-800 mb-2">
//                               Change Image
//                             </div>
//                             <p className="text-xs text-white/80 text-center max-w-xs">
//                               Click to upload a different image
//                             </p>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="border-3 border-dashed border-slate-300 rounded-xl p-8 pb-12 text-center bg-gradient-to-b from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-300 h-full min-h-[300px] flex flex-col items-center justify-center">
//                           <div className="p-4 rounded-full bg-slate-100 mb-4">
//                             <Upload className="h-8 w-8 text-slate-400" />
//                           </div>
//                           <h3 className="text-sm font-semibold text-slate-700 mb-2">
//                             Upload Product Image
//                           </h3>
//                           <p className="text-xs text-slate-500 mb-4 max-w-xs">
//                             Drag & drop or click to browse. Supports PNG, JPG,
//                             WEBP up to 5MB.
//                           </p>
//                           <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-medium hover:shadow-lg transition-all duration-200">
//                             <Upload className="h-4 w-4" />
//                             Select Image File
//                           </div>
//                         </div>
//                       )}
//                     </label>

//                     <input
//                       type="file"
//                       id="imageUpload"
//                       name="image"
//                       onChange={handleChange}
//                       className="hidden"
//                       accept="image/*"
//                     />

//                     <div className="mt-6 space-y-4">
//                       <ValidationIndicator
//                         isValid={validation.image.isValid}
//                         message={validation.image.message}
//                       />

//                       {formData.image && (
//                         <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                               <CheckCircle className="h-4 w-4 text-emerald-600" />
//                               <div>
//                                 <p className="text-xs font-medium text-emerald-800 truncate max-w-[150px] sm:max-w-xs">
//                                   {formData.image.name}
//                                 </p>
//                                 <p className="text-xs text-emerald-600">
//                                   {(
//                                     formData.image.size /
//                                     1024 /
//                                     1024
//                                   ).toFixed(2)}{" "}
//                                   MB
//                                 </p>
//                               </div>
//                             </div>
//                             {/* <button
//                               type="button"
//                               onClick={() => {
//                                 if (imagePreview)
//                                   URL.revokeObjectURL(imagePreview);
//                                 setFormData((prev) => ({
//                                   ...prev,
//                                   image: null,
//                                 }));
//                                 setImagePreview(null);
//                                 const input =
//                                   document.getElementById("imageUpload");
//                                 if (input) input.value = "";
//                               }}
//                               className="text-xs text-rose-600 hover:text-rose-700 font-medium ml-2 whitespace-nowrap"
//                             >
//                               Remove
//                             </button> */}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <style>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translate(-50%, -20px);
//           }
//           to {
//             opacity: 1;
//             transform: translate(-50%, 0);
//           }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default AddProducts;



// added quantity 

import React, { useState, useEffect } from "react";
import axios from "axios";
import { domainUrl } from "../utils/constant";
import api from "../utils/api";
import toast, { Toaster, } from 'react-hot-toast';
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Palette,
  Type,
  FileText,
  Hash,
  RefreshCw,
  Zap,
  Tag,
  DollarSign,
  Layers,
} from "lucide-react";

// ---------------------- Toast ----------------------


// ---------------- Validation Indicator -------------
const ValidationIndicator = ({ isValid, message }) => (
  <div className="flex items-center gap-2 mt-1">
    {isValid ? (
      <CheckCircle className="h-3 w-3 text-emerald-500" />
    ) : (
      <AlertCircle className="h-3 w-3 text-amber-500" />
    )}
    <span className="text-xs text-slate-500">{message}</span>
  </div>
);

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

const AddProducts = () => {
  const [formData, setFormData] = useState({
    categoryCode: "",
    productCode: "",
    productName: "",
    description: "",
    price: "",
    stock: "",
    sizes: [], // multi-select
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const [validation, setValidation] = useState({
    category: { isValid: false, message: "Category is required" },
    productCode: { isValid: false, message: "Numbers only" },
    productName: { isValid: false, message: "Letters, numbers & basic symbols" },
    description: { isValid: false, message: "Minimum 10 characters" },
    price: { isValid: false, message: "Price must be greater than 0" },
    image: { isValid: false, message: "Image required" },
    stock: { isValid: true, message: "Optional" },

  });

  // ------------- Load categories (COOKIE AUTH) -------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/category/list', {
          // withCredentials: true,
        });
        setCategories(res.data.list || []);
      } catch (err) {
        toast.error("Failed to load categories",{ id: "failed load categories" });

      }
    };
    fetchCategories();
  }, []);

  // Cleanup preview URL
  useEffect(
    () => () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    },
    [imagePreview]
  );

  // ------------- Real-time validation -------------
  useEffect(() => {
    const {
      categoryCode,
      productCode,
      productName,
      description,
      price,
      stock,
      image,
    } = formData;


    

   setValidation({
  category: {
    isValid: !!categoryCode,
    message: categoryCode ? "Category selected ✓" : "Category is required",
  },
  productCode: {
    isValid: /^[0-9]+$/.test(productCode) && productCode.length > 0,
    message:
      productCode.length > 0 && !/^[0-9]+$/.test(productCode)
        ? "Only numbers allowed"
        : "Numbers only",
  },
  productName: {
    isValid:
      /^[a-zA-Z0-9\s&_\-,]+$/.test(productName) &&
      productName.trim().length > 0,
    message:
      productName.length > 0 &&
      !/^[a-zA-Z0-9\s&_\-,]+$/.test(productName)
        ? "Only letters, numbers, spaces, &, -, _ and ,"
        : "Letters, numbers & basic symbols",
  },
  description: {
    isValid: description.length >= 10,
    message: `${description.length}/10 characters minimum`,
  },
  price: {
    isValid: !!price && parseFloat(price) > 0,
    message: price ? "Valid price ✓" : "Price must be greater than 0",
  },

  //  ADD THIS BLOCK
  stock: {
    isValid:
      stock === "" || (Number(stock) >= 0 && Number.isInteger(+stock)),
    message:
      stock === ""
        ? "Optional"
        : Number(stock) >= 0
        ? "Valid stock ✓"
        : "Stock cannot be negative",
  },

  image: {
    isValid: image !== null,
    message: image ? "Image selected ✓" : "Image required",
  },
});


    setCharCount(description.length);
  }, [formData]);

  // -------------------- Handlers --------------------


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];
      if (file) {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        const url = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(url);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => {
      const alreadySelected = prev.sizes.includes(size);
      const sizes = alreadySelected
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleReset = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setFormData({
      categoryCode: "",
      productCode: "",
      productName: "",
      description: "",
      price: "",
      stock: "",
      sizes: [],
      image: null,
    });
    setImagePreview(null);
    setCharCount(0);

    const input = document.getElementById("imageUpload");
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allValid = Object.values(validation).every((v) => v.isValid);
    if (!allValid) {
      toast.error(
        "Please ensure all required fields are valid before submitting.",{ id: "fill all feilds" },
      );
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();

     data.append("category", formData.categoryCode);
data.append("code", formData.productCode);
data.append("name", formData.productName);
data.append("description", formData.description);
data.append("price", formData.price);
data.append("image", formData.image);

// ✅ ENABLE STOCK (sizes still skipped)
if (formData.stock !== "") {
  data.append("stock", Number(formData.stock));
}


      // NOTE: stock & sizes are UI-only now (not sent). You can enable later like:
      // data.append("stock", formData.stock);
      // data.append("sizes", JSON.stringify(formData.sizes));

      const res = await api.post('/product/add', data, {
        // withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Product added successfully!", { id: "product-added" });
      handleReset();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.Error ||
          "Error adding product. Please try again.",
          { id: "error adding product" }
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------- UI -----------------------
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-2 sm:px-4 lg:px-6 xl:px-8 py-6">

        <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4">

          {/* Header */}
          <div className="mb-8 mt-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {/* <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
                    <Palette className="h-6 w-6 text-white" />
                  </div> */}
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      Add New Product
                    </h1>
                    <p className="text-sm text-slate-400 mt-2">
                      Create a new product for your catalogue
                    </p>
                  </div>
                </div>
              </div>

              {/* Header buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </button>
                <button
                  type="submit"
                  form="add-product-form"
                  disabled={loading}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Create Product
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {/* Category */}
              <div
                className={`p-4 rounded-xl border ${
                  validation.category.isValid
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                } transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      validation.category.isValid ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  >
                    <Layers
                      className={`h-4 w-4 ${
                        validation.category.isValid ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-700">Category</div>
                    <div
                      className={`text-xs ${
                        validation.category.isValid
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {validation.category.isValid ? "✓ Selected" : "Required"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Code */}
              <div
                className={`p-4 rounded-xl border ${
                  validation.productCode.isValid
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                } transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      validation.productCode.isValid
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  >
                    <Hash
                      className={`h-4 w-4 ${
                        validation.productCode.isValid
                          ? "text-white"
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-700">
                      Product Code
                    </div>
                    <div
                      className={`text-xs ${
                        validation.productCode.isValid
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {validation.productCode.isValid ? "✓ Valid" : "Required"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <div
                className={`p-4 rounded-xl border ${
                  validation.productName.isValid
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                } transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      validation.productName.isValid
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  >
                    <Type
                      className={`h-4 w-4 ${
                        validation.productName.isValid
                          ? "text-white"
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-700">
                      Product Name
                    </div>
                    <div
                      className={`text-xs ${
                        validation.productName.isValid
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {validation.productName.isValid ? "✓ Valid" : "Required"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div
                className={`p-4 rounded-xl border ${
                  validation.description.isValid
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                } transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      validation.description.isValid
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  >
                    <FileText
                      className={`h-4 w-4 ${
                        validation.description.isValid
                          ? "text-white"
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-700">
                      Description
                    </div>
                    <div
                      className={`text-xs ${
                        validation.description.isValid
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {validation.description.isValid ? "✓ Valid" : "Required"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div
                className={`p-4 rounded-xl border ${
                  validation.price.isValid
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                } transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      validation.price.isValid ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  >
                    <DollarSign
                      className={`h-4 w-4 ${
                        validation.price.isValid ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-700">Price</div>
                    <div
                      className={`text-xs ${
                        validation.price.isValid ? "text-emerald-600" : "text-slate-500"
                      }`}
                    >
                      {validation.price.isValid ? "✓ Valid" : "Required"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div
                className={`p-4 rounded-xl border ${
                  validation.image.isValid
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                } transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      validation.image.isValid ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  >
                    <ImageIcon
                      className={`h-4 w-4 ${
                        validation.image.isValid ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-700">Image</div>
                    <div
                      className={`text-xs ${
                        validation.image.isValid ? "text-emerald-600" : "text-slate-500"
                      }`}
                    >
                      {validation.image.isValid ? "✓ Selected" : "Required"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <form
            id="add-product-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* LEFT: Product Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100">
                      <Tag className="h-4 w-4 text-slate-700" />
                    </div>
                    Product Information
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Define your product details and attributes
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Category Select */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-800">
                        Product Category
                      </label>
                      <span className="text-xs font-medium text-slate-500">
                        Select from existing categories
                      </span>
                    </div>
                    <select
                      name="categoryCode"
                      value={formData.categoryCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name} ({cat.code})
                        </option>
                      ))}
                    </select>
                    <ValidationIndicator
                      isValid={validation.category.isValid}
                      message={validation.category.message}
                    />
                  </div>

                  {/* Product Code */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-800">
                        Product Code
                      </label>
                      <span className="text-xs font-medium text-slate-500">
                        Numbers only
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        name="productCode"
                        value={formData.productCode}
                        onChange={handleChange}
                        placeholder="Eg: 1001"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validation.productCode.isValid ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : formData.productCode ? (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        ) : null}
                      </div>
                    </div>
                    <ValidationIndicator
                      isValid={validation.productCode.isValid}
                      message={validation.productCode.message}
                    />
                  </div>

                  {/* Product Name */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-800">
                        Product Name
                      </label>
                      <span className="text-xs font-medium text-slate-500">
                        Display name
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="Eg: Puffer Jacket with Pocket Detail"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validation.productName.isValid ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : formData.productName ? (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        ) : null}
                      </div>
                    </div>
                    <ValidationIndicator
                      isValid={validation.productName.isValid}
                      message={validation.productName.message}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-800">
                        Description
                      </label>
                      <span
                        className={`text-xs font-medium ${
                          charCount >= 10 ? "text-emerald-600" : "text-slate-500"
                        }`}
                      >
                        {charCount}/10 characters
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Describe this product in detail..."
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200 resize-none"
                      />
                      <div className="absolute right-3 top-3">
                        {validation.description.isValid ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : formData.description ? (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        ) : null}
                      </div>
                    </div>
                    <ValidationIndicator
                      isValid={validation.description.isValid}
                      message={validation.description.message}
                    />
                  </div>

                  {/* Price & Stock */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-slate-800">
                          Price
                        </label>
                        <span className="text-xs font-medium text-slate-500">
                          In your base currency
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="Eg: 2499"
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400">
                          <DollarSign className="h-3 w-3" />
                        </div>
                      </div>
                      <ValidationIndicator
                        isValid={validation.price.isValid}
                        message={validation.price.message}
                      />
                    </div>

                    {/* Stock (UI only for now) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-slate-800">
                          Stock
                        </label>
                        <span className="text-xs font-medium text-slate-500">
                          (Update stock)
                        </span>
                      </div>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Eg: 50"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Size UI */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-800">
                        Available Sizes
                      </label>
                      <span className="text-xs font-medium text-slate-500">
                        XS, S, M, L, XL, XXL
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SIZE_OPTIONS.map((size) => {
                        const selected = formData.sizes.includes(size);
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => handleSizeToggle(size)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                              selected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      (Currently This Feature Is Not Available...)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Image Upload */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 overflow-hidden h-full">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100">
                      <ImageIcon className="h-4 w-4 text-slate-700" />
                    </div>
                    Product Image
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Upload a high-quality product image
                  </p>
                </div>

                <div className="p-6 h-full">
                  <div className="flex flex-col h-full">
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer transition-all duration-300 block"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-xl group">
                          <img
                            src={imagePreview}
                            alt="Product preview"
                            className="w-full h-full object-contain rounded-xl border-2 border-slate-200 bg-white p-2"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-xl">
                            <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-800 mb-2">
                              Change Image
                            </div>
                            <p className="text-xs text-white/80 text-center max-w-xs">
                              Click to upload a different image
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="border-3 border-dashed border-slate-300 rounded-xl p-8 pb-12 text-center bg-gradient-to-b from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-all duration-300 h-full min-h-[300px] flex flex-col items-center justify-center">
                          <div className="p-4 rounded-full bg-slate-100 mb-4">
                            <Upload className="h-8 w-8 text-slate-400" />
                          </div>
                          <h3 className="text-sm font-semibold text-slate-700 mb-2">
                            Upload Product Image
                          </h3>
                          <p className="text-xs text-slate-500 mb-4 max-w-xs">
                            Drag & drop or click to browse. Supports PNG, JPG,
                            WEBP up to 5MB.
                          </p>
                          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-medium hover:shadow-lg transition-all duration-200">
                            <Upload className="h-4 w-4" />
                            Select Image File
                          </div>
                        </div>
                      )}
                    </label>

                    <input
                      type="file"
                      id="imageUpload"
                      name="image"
                      onChange={handleChange}
                      className="hidden"
                      accept="image/*"
                    />

                    <div className="mt-6 space-y-4">
                      <ValidationIndicator
                        isValid={validation.image.isValid}
                        message={validation.image.message}
                      />

                      {formData.image && (
                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-600" />
                              <div>
                                <p className="text-xs font-medium text-emerald-800 truncate max-w-[150px] sm:max-w-xs">
                                  {formData.image.name}
                                </p>
                                <p className="text-xs text-emerald-600">
                                  {(
                                    formData.image.size /
                                    1024 /
                                    1024
                                  ).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                            </div>
                            {/* <button
                              type="button"
                              onClick={() => {
                                if (imagePreview)
                                  URL.revokeObjectURL(imagePreview);
                                setFormData((prev) => ({
                                  ...prev,
                                  image: null,
                                }));
                                setImagePreview(null);
                                const input =
                                  document.getElementById("imageUpload");
                                if (input) input.value = "";
                              }}
                              className="text-xs text-rose-600 hover:text-rose-700 font-medium ml-2 whitespace-nowrap"
                            >
                              Remove
                            </button> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )} */}

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

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AddProducts;
