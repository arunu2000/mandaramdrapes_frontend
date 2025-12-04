// import React, { useState } from "react";
// import axios from "axios";

// const Addcategory = () => {
//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     description: "",
//     image: null,
//   });

//   const [message, setMessage] = useState("");

//   //  Handle Input Changes
//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   // Handle Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token"); //
//       const data = new FormData();

//       data.append("code", formData.code);
//       data.append("name", formData.name);
//       data.append("description", formData.description);
//       data.append("image", formData.image);

//       const res = await axios.post(
//         "http://192.168.29.217:5000/api/category/add",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(res.data.message || "Category added successfully!");
//       setFormData({
//         code: "",
//         name: "",
//         description: "",
//         image: null,
//       });
//     } catch (err) {
//       console.error(err);
//       setMessage("Error adding category");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
//         <h1 className="text-[#5e785a] text-xl font-bold text-center">
//           Add Categories
//         </h1>

//         {/*  Form */}
//         <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3" autoComplete="off">
//           {/* Category Name */}

//           {/* Category Code */}
//           <input
//             type="number"
//             name="code"
//             value={formData.code}
//             onChange={handleChange}
//             placeholder="Category Code"
//             className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full appearance-none"
//             required
//           />

//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Category Name"
            
//             className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//             required
//           />

          

//           {/* Description */}
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter Category Description"
//             className="w-full border border-gray-400 rounded px-3 py-4 resize-none text-sm focus:outline-none focus:border-[#343e32]"
//             required
//           />

//           {/* Upload Image */}
//           <label
//             htmlFor="imageUpload"
//             className="px-3 py-2 text-sm text-[#5e785a] font-bold border border-gray-400 rounded cursor-pointer hover:bg-[#6f8b6b] hover:text-white transition"
//           >
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="imageUpload"
//             name="image"
//             onChange={handleChange}
//             className="hidden"
//             accept="image/*"
//             required
//           />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full mt-5 text-white bg-[#5e785a] px-4 py-2 rounded hover:bg-[#2d412a] transition"
//           >
//             Submit
//           </button>
//         </form>

//         {/* Message */}
//         {message && <p className="text-center mt-3 text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Addcategory;


// import React, { useState } from "react";
// import axios from "axios";
// import { domainUrl } from "../utils/constant";

// const Addcategory = () => {
//     const [formData, setFormData] = useState({
//         code: "",
//         name: "",
//         description: "",
//         image: null,
//     });

//     // 1. New state for image preview URL
//     const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
//     const [message, setMessage] = useState("");

//     // Handle Input Changes
//     const handleChange = (e) => {
//         if (e.target.name === "image") {
//             const file = e.target.files[0];
//             setFormData({ ...formData, image: file });

//             // Create and set the image preview URL
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                     setImagePreviewUrl(reader.result);
//                 };
//                 reader.readAsDataURL(file);
//             } else {
//                 setImagePreviewUrl(null);
//             }
//         } else {
//             setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

//     // Handle Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         try {
//             const token = localStorage.getItem("token");
//             const data = new FormData();

//             data.append("code", formData.code);
//             data.append("name", formData.name);
//             data.append("description", formData.description);
//             data.append("image", formData.image);

//             const res = await axios.post(
//                 `${domainUrl}/category/add`,
//                 data,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             setMessage(res.data.message || "Category added successfully!");
            
//             // Reset form and image preview states
//             setFormData({
//                 code: "",
//                 name: "",
//                 description: "",
//                 image: null,
//             });
//             setImagePreviewUrl(null);
//             // Clear the file input visually
//             document.getElementById("imageUpload").value = "";

//         } catch (err) {
//             console.error(err);
//             setMessage(err.response?.data?.message || "Error adding category");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
//                 <h1 className="text-[#5e785a] text-xl font-bold text-center">
//                     Add Categories
//                 </h1>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3" autoComplete="off">
                    
//                     {/* Category Code */}
//                     <input
//                         type="text"
//                         name="code"
//                         value={formData.code}
//                         onChange={handleChange}
//                         placeholder="Category Code"
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full appearance-none"
//                         required
//                     />

//                     {/* Category Name */}
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Category Name"
//                         className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//                         required
//                     />
                    
//                     {/* Description */}
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         placeholder="Enter Category Description"
//                         className="w-full border border-gray-400 rounded px-3 py-4 resize-none text-sm focus:outline-none focus:border-[#343e32]"
//                         required
//                     />

//                     {/* === Upload Image Section with Preview === */}
//                     <div className="mt-2">
//                         {/* Custom File Button */}
//                         <label
//                             htmlFor="imageUpload"
//                             className="px-3 py-2 text-sm text-white font-bold rounded cursor-pointer transition flex items-center justify-center space-x-2"
//                             // Using a vibrant background color for the button for visual distinction
//                             style={{ background: '#5e785a', hover: { background: '#2d412a' } }} 
//                         >
//                             <span>{formData.image ? "Change Image" : "Choose Image"}</span>
//                             {formData.image && <span className="text-gray-200 font-normal ml-2 truncate max-w-[100px]">{formData.image.name}</span>}
//                         </label>
//                         <input
//                             type="file"
//                             id="imageUpload"
//                             name="image"
//                             onChange={handleChange}
//                             className="hidden"
//                             accept="image/*"
//                             required
//                         />

//                         {/* Image Preview Box */}
//                         {/* <div className="mt-3 w-full h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100">
//                             {imagePreviewUrl ? (
//                                 <img 
//                                     src={imagePreviewUrl} 
//                                     alt="Category Preview" 
//                                     className="w-full h-full object-contain" // Use object-contain to ensure the whole image is visible
//                                 />
//                             ) : (
//                                 <span className="text-sm text-gray-500">
//                                     No Image Selected
//                                 </span>
//                             )}
//                         </div> */}
//                     </div>


//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         className="w-full mt-5 text-white bg-[#5e785a] px-4 py-2 rounded hover:bg-[#2d412a] transition"
//                     >
//                         Submit
//                     </button>
//                 </form>

//                 {/* Message */}
//                 {message && <p className="text-center mt-3 text-red-500">{message}</p>}
//             </div>
//         </div>
//     );
// };

// export default Addcategory;


///working/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { domainUrl } from "../utils/constant";

// const AddCategory = () => {
//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     description: "",
//     image: null,
//   });

//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Validation
//   const validate = () => {
//     const { code, name, description, image } = formData;

//     if (!code.trim() || !name.trim() || !description.trim() || !image) {
//       return "Please fill in all fields and upload an image.";
//     }

//     if (!/^[a-zA-Z0-9]+$/.test(code)) {
//       return "Category code should contain only letters and numbers.";
//     }

//     if (!/^[a-zA-Z\s]+$/.test(name)) {
//       return "Category name should contain only letters and spaces.";
//     }

//     if (description.length < 10) {
//       return "Description should be at least 10 characters long.";
//     }

//     return null;
//   };

//   // Handle submit
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

//       data.append("code", formData.code);
//       data.append("name", formData.name);
//       data.append("description", formData.description);
//       data.append("image", formData.image);

//       const res = await axios.post(`${domainUrl}/category/add`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(res.data.message || "Category added successfully!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "🌿",
//       });

//       // Reset form
//       setFormData({
//         code: "",
//         name: "",
//         description: "",
//         image: null,
//       });
//       document.getElementById("imageUpload").value = "";
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data?.Error ||
//         "Error adding category. Please try again.";
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
//             Add New Category
//           </h1>
//           <p className="text-gray-500 text-xs sm:text-sm text-center mt-1">
//             Fill in details to create a new category
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col mt-6 gap-3 sm:gap-4"
//             autoComplete="off"
//           >
//             {/* Category Code */}
//             <input
//               type="text"
//               name="code"
//               value={formData.code}
//               onChange={handleChange}
//               placeholder="Category Code"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Category Name */}
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Category Name"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Description */}
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter Category Description"
//               rows="4"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full resize-none focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Image Upload Button */}
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="imageUpload"
//                 className="px-3 py-2 text-sm text-white font-bold rounded cursor-pointer 
//                 transition flex items-center justify-center bg-[#5e785a] hover:bg-[#4f644d]"
//               >
//                 {formData.image ? formData.image.name : "Upload Image"}
//               </label>

//               <input
//                 type="file"
//                 id="imageUpload"
//                 name="image"
//                 onChange={handleChange}
//                 className="hidden"
//                 accept="image/*"
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-3 text-white bg-[#5e785a] px-4 py-2 sm:py-2.5 rounded 
//               hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? "Adding..." : "Add Category"}
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

// export default AddCategory;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { domainUrl } from "../utils/constant";

// const AddCategory = () => {
//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     description: "",
//     image: null,
//   });

//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // cleanup object urls
//   useEffect(() => {
//     return () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview);
//     };
//   }, [imagePreview]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       const file = files[0];
//       if (file) {
//         setFormData((prev) => ({ ...prev, image: file }));
//         const previewUrl = URL.createObjectURL(file);
//         setImagePreview((prev) => {
//           if (prev) URL.revokeObjectURL(prev);
//           return previewUrl;
//         });
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Validation
//   const validate = () => {
//     const { code, name, description, image } = formData;

//     if (!code.trim() || !name.trim() || !description.trim() || !image) {
//       return "Please fill in all fields and upload an image.";
//     }

//     if (!/^[a-zA-Z0-9]+$/.test(code)) {
//       return "Category code should contain only letters and numbers.";
//     }

//     if (!/^[a-zA-Z\s]+$/.test(name)) {
//       return "Category name should contain only letters and spaces.";
//     }

//     if (description.length < 10) {
//       return "Description should be at least 10 characters long.";
//     }

//     return null;
//   };

//   const handleReset = () => {
//     setFormData({
//       code: "",
//       name: "",
//       description: "",
//       image: null,
//     });
//     setImagePreview(null);
//     const input = document.getElementById("imageUpload");
//     if (input) input.value = "";
//   };

//   // Handle submit
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

//       data.append("code", formData.code);
//       data.append("name", formData.name);
//       data.append("description", formData.description);
//       data.append("image", formData.image);

//       const res = await axios.post(`${domainUrl}/category/add`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(res.data.message || "Category added successfully!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "🌿",
//       });

//       handleReset();
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data?.Error ||
//         "Error adding category. Please try again.";
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
//       <div className="min-h-screen bg-[#f3f4f6] px-4 py-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Top bar / title */}
//           <div className="flex items-center justify-between gap-4">
//             <div>
//               <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
//                 Add New Category
//               </h1>
//               <p className="text-xs md:text-sm text-gray-500 mt-1">
//                 Create a new product category for Mandharam Drapes collection.
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 className="text-xs md:text-sm px-3 py-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
//               >
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 form="add-category-form"
//                 disabled={loading}
//                 className="text-xs md:text-sm px-4 py-2 rounded-full bg-[#5e785a] text-white font-medium shadow-md hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Adding..." : "Add Category"}
//               </button>
//             </div>
//           </div>

//           {/* Main content */}
//           <form
//             id="add-category-form"
//             onSubmit={handleSubmit}
//             autoComplete="off"
//             className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
//           >
//             {/* Left side: Category info */}
//             <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
//               <h2 className="text-sm md:text-base font-semibold text-gray-900">
//                 Category Information
//               </h2>
//               <p className="text-xs text-gray-500 mt-1">
//                 Define the basic details of this category.
//               </p>

//               <div className="mt-5 space-y-4">
//                 {/* Code + Name in two columns */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Category Code
//                     </label>
//                     <input
//                       type="text"
//                       name="code"
//                       value={formData.code}
//                       onChange={handleChange}
//                       placeholder="EX: WD001"
//                       className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Category Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Eg: Wedding Collection"
//                       className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
//                     />
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows={5}
//                     placeholder="Describe this category, fabric types, occasions, or style…"
//                     className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
//                   />
//                   <p className="text-[11px] text-gray-400 mt-1">
//                     Minimum 10 characters. This can be shown in product filters
//                     or category pages.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right side: Image upload + status */}
//             <div className="space-y-6">
//               {/* Image upload card */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
//                 <h2 className="text-sm md:text-base font-semibold text-gray-900">
//                   Category Image
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Upload a cover image that represents this category.
//                 </p>

//                 <div className="mt-4">
//                   <label
//                     htmlFor="imageUpload"
//                     className="block w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition px-3 py-8 flex flex-col items-center justify-center text-center"
//                   >
//                   {imagePreview ? (
//   <img
//     src={imagePreview}
//     alt="Category preview"
//     className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-xl shadow-sm mb-3"
//   />
//                     ) : (
//                       <div className="h-32 w-full flex items-center justify-center rounded-xl bg-white mb-3 border border-gray-100">
//                         <span className="text-[11px] text-gray-400">
//                           Preview will appear here
//                         </span>
//                       </div>
//                     )}

//                     <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white shadow-sm border border-gray-200 text-[11px] font-medium text-gray-700">
//                       <span className="mr-1.5 text-lg leading-none">📁</span>
//                       <span>Click to upload image</span>
//                     </div>
//                     <p className="text-[11px] text-gray-400 mt-2">
//                       PNG / JPG up to 2MB. Currently supports 1 image.
//                     </p>
//                   </label>

//                   <input
//                     type="file"
//                     id="imageUpload"
//                     name="image"
//                     onChange={handleChange}
//                     className="hidden"
//                     accept="image/*"
//                   />
//                 </div>
//               </div>

//               {/* Action button (for mobile – desktop uses top-right button) */}
//               <div className="lg:hidden">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full text-sm font-medium text-white bg-[#5e785a] rounded-full py-2.5 shadow-md hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {loading ? "Adding..." : "Add Category"}
//                 </button>
//               </div>
//             </div>
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

// export default AddCategory;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { domainUrl } from "../utils/constant";

// // --- Data for Select Fields ---
// const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
// const genders = ["Men", "Woman", "Unisex"];
// const discountTypes = [
//   "No Discount",
//   "Seasonal Sale",
//   "Holiday Offer",
//   "First-Time Buyer",
// ];
// const productCategories = ["Jacket", "Trousers", "Shirt", "Dress", "Accessory"];
// // ------------------------------

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     basePricing: "", // New: Corresponds to Base Pricing in UI
//     stock: "", // New: Corresponds to Stock in UI
//     discount: "", // New: Corresponds to Discount in UI
//     discountType: discountTypes[0], // New: Corresponds to Discount Type in UI
//     selectedSizes: [], // New: For Size selection
//     selectedGender: genders[2], // New: For Gender selection, default to Unisex
//     category: productCategories[0], // New: For Category
//     images: [], // Changed: For multiple images (though UI shows one main)
//   });

//   const [imagePreviews, setImagePreviews] = useState([]); // Changed for multiple images/thumbnails
//   const [loading, setLoading] = useState(false);

//   // cleanup object urls
//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [imagePreviews]);

//   // Handle standard input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle image upload change
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       // Clear previous previews before setting new ones
//       imagePreviews.forEach((url) => URL.revokeObjectURL(url));

//       setFormData((prev) => ({ ...prev, images: files }));

//       const newPreviews = files.map((file) => URL.createObjectURL(file));
//       setImagePreviews(newPreviews);
//     }
//   };

//   // Handle size selection (multi-select)
//   const handleSizeChange = (size) => {
//     setFormData((prev) => {
//       const isSelected = prev.selectedSizes.includes(size);
//       const newSizes = isSelected
//         ? prev.selectedSizes.filter((s) => s !== size)
//         : [...prev.selectedSizes, size];
//       return { ...prev, selectedSizes: newSizes };
//     });
//   };

//   // Handle gender selection (radio)
//   const handleGenderChange = (gender) => {
//     setFormData((prev) => ({ ...prev, selectedGender: gender }));
//   };

//   // Validation
//   const validate = () => {
//     const {
//       name,
//       description,
//       basePricing,
//       stock,
//       selectedSizes,
//       images,
//     } = formData;

//     if (
//       !name.trim() ||
//       !description.trim() ||
//       !basePricing ||
//       !stock ||
//       selectedSizes.length === 0 ||
//       images.length === 0
//     ) {
//       return "Please fill in all general and pricing fields, select at least one size, and upload at least one image.";
//     }

//     if (isNaN(parseFloat(basePricing)) || parseFloat(basePricing) <= 0) {
//       return "Base Pricing must be a positive number.";
//     }

//     if (isNaN(parseInt(stock)) || parseInt(stock) < 0) {
//       return "Stock must be a non-negative whole number.";
//     }

//     if (description.length < 20) {
//       return "Description should be at least 20 characters long for good product detail.";
//     }

//     return null;
//   };

//   const handleReset = () => {
//     // Revoke old image URLs before resetting the state
//     imagePreviews.forEach((url) => URL.revokeObjectURL(url));

//     setFormData({
//       name: "",
//       description: "",
//       basePricing: "",
//       stock: "",
//       discount: "",
//       discountType: discountTypes[0],
//       selectedSizes: [],
//       selectedGender: genders[2],
//       category: productCategories[0],
//       images: [],
//     });
//     setImagePreviews([]);

//     // Reset file input
//     const input = document.getElementById("imageUpload");
//     if (input) input.value = "";
//   };

//   // Handle submit
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

//       // Append standard fields
//       data.append("name", formData.name);
//       data.append("description", formData.description);
//       data.append("price", parseFloat(formData.basePricing));
//       data.append("stock", parseInt(formData.stock));
//       data.append("discount", parseFloat(formData.discount) || 0);
//       data.append("discountType", formData.discountType);
//       data.append("sizes", JSON.stringify(formData.selectedSizes)); // Send as JSON string
//       data.append("gender", formData.selectedGender);
//       data.append("category", formData.category);

//       // Append images
//       formData.images.forEach((image, index) => {
//         data.append(`images`, image); // API expects an array of files under 'images' key
//       });

//       // NOTE: Update the API endpoint to a product-specific one
//       const res = await axios.post(`${domainUrl}/product/add`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(res.data.message || "Product added successfully!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "✨",
//       });

//       handleReset();
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data?.Error ||
//         "Error adding product. Please check your inputs and try again.";
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
//       <div className="min-h-screen bg-[#f3f4f6] px-4 py-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Top bar / title + Action Buttons */}
//           <div className="flex items-center justify-between gap-4 py-2 border-b border-gray-200">
//             <h1 className="text-xl md:text-2xl font-bold text-gray-900">
//               🛍️ Add New Product
//             </h1>
//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() => toast.info("Draft saved locally!", { icon: "📝" })}
//                 className="text-xs md:text-sm px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 transition"
//               >
//                 Save Draft
//               </button>
//               <button
//                 type="submit"
//                 form="add-product-form"
//                 disabled={loading}
//                 className="text-xs md:text-sm px-5 py-2.5 rounded-xl bg-[#2e7d32] text-white font-medium shadow-md hover:bg-[#1b5e20] transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1"
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="animate-spin h-4 w-4 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Publishing...
//                   </>
//                 ) : (
//                   "Add Product"
//                 )}
//               </button>
//             </div>
//           </div>
//           {/* --- Main Content Form --- */}
//           <form
//             id="add-product-form"
//             onSubmit={handleSubmit}
//             autoComplete="off"
//             className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
//           >
//             {/* Left Column: General Info, Pricing, and Stock */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* --- 1. General Information Card --- */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
//                 <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
//                   General Information
//                 </h2>

//                 <div className="space-y-4">
//                   {/* Product Name */}
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Product Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Eg: Puffer Jacket With Pocket Detail"
//                       className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
//                     />
//                   </div>

//                   {/* Product Description */}
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Description Product
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows={4}
//                       placeholder="Describe the product's material, cut, features, and style..."
//                       className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
//                     />
//                   </div>

//                   {/* Size and Gender Selection */}
                 
//                 </div>
//               </div>


//             </div>

//             {/* Right Column: Image Upload and Category */}
//             <div className="space-y-6 lg:col-span-1">
//               {/* --- 3. Upload Image Card --- */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
//                 <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
//                   Upload Img
//                 </h2>

//                 <div>
//                   <label
//                     htmlFor="imageUpload"
//                     className="block w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition p-4 flex flex-col items-center justify-center text-center"
//                   >
//                     {/* Main Image Preview */}
//                     <div className="w-full mb-3">
//                       {imagePreviews.length > 0 ? (
//                         <img
//                           src={imagePreviews[0]}
//                           alt="Main Product Preview"
//                           className="w-full h-64 object-cover rounded-xl shadow-md border border-gray-100"
//                         />
//                       ) : (
//                         <div className="w-full h-64 flex items-center justify-center rounded-xl bg-white border border-gray-200">
//                           <span className="text-sm text-gray-400">
//                             Drop image here or click to upload
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Thumbnail Previews */}
//                     <div className="flex gap-2 w-full justify-center">
//                       {imagePreviews.slice(1, 4).map((url, index) => (
//                         <img
//                           key={index}
//                           src={url}
//                           alt={`Thumbnail ${index + 2}`}
//                           className="w-16 h-16 object-cover rounded-md border border-gray-200"
//                         />
//                       ))}
//                       {imagePreviews.length > 4 && (
//                         <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500 border border-gray-200">
//                           + {imagePreviews.length - 4} more
//                         </div>
//                       )}
//                     </div>

//                     <div className="mt-4">
//                       <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#5e785a] text-white text-sm font-medium shadow-md hover:bg-[#4f644d]">
//                         <span>Browse Files</span>
//                       </div>
//                       <p className="text-[11px] text-gray-400 mt-2">
//                         PNG / JPG up to 5MB. Multiple images supported.
//                       </p>
//                     </div>
//                   </label>

//                   <input
//                     type="file"
//                     id="imageUpload"
//                     name="images"
//                     onChange={handleImageChange}
//                     className="hidden"
//                     accept="image/*"
//                     multiple // Allow multiple file selection
//                   />
//                 </div>
//               </div>

//               {/* --- 4. Category Card --- */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
//                 <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
//                   Category
//                 </h2>

               

//                 <button
//                   type="button"
//                   onClick={() => toast.info("Functionality not implemented yet.", { icon: "🔧" })}
//                   className="mt-4 w-full text-xs font-medium text-[#5e785a] bg-[#e6f2e8] rounded-full py-2 shadow-sm hover:bg-[#d5e8d8] transition"
//                 >
//                   + Add New Category
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Toast Notifications */}
//       <ToastContainer
//         position="bottom-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         transition={Slide}
//         toastStyle={{
//           borderRadius: "10px",
//           fontFamily: "Inter, sans-serif",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//         }}
//       />
//     </>
//   );
// };

// export default AddProduct;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { domainUrl } from "../utils/constant";

// --- Data for Select Fields ---
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const genders = ["Men", "Woman", "Unisex"];
const discountTypes = [
  "No Discount",
  "Seasonal Sale",
  "Holiday Offer",
  "First-Time Buyer",
];
const productCategories = ["Jacket", "Trousers", "Shirt", "Dress", "Accessory"];
// ------------------------------

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePricing: "", // Base Pricing in UI
    stock: "", // Stock in UI
    discount: "", // Discount in UI
    discountType: discountTypes[0], // Discount Type
    selectedSizes: [], // Size selection
    selectedGender: genders[2], // Gender selection, default Unisex
    category: productCategories[0], // Category
    images: [], // Multiple images
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cleanup object URLs on unmount or when previews change
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  // Handle standard input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Clear previous previews before setting new ones
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));

      setFormData((prev) => ({ ...prev, images: files }));

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };

  // Handle size selection (multi-select)
  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const isSelected = prev.selectedSizes.includes(size);
      const newSizes = isSelected
        ? prev.selectedSizes.filter((s) => s !== size)
        : [...prev.selectedSizes, size];
      return { ...prev, selectedSizes: newSizes };
    });
  };

  // Handle gender selection (radio-like)
  const handleGenderChange = (gender) => {
    setFormData((prev) => ({ ...prev, selectedGender: gender }));
  };

  // Reset form
  const handleReset = () => {
    // Revoke old image URLs before resetting the state
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setFormData({
      name: "",
      description: "",
      basePricing: "",
      stock: "",
      discount: "",
      discountType: discountTypes[0],
      selectedSizes: [],
      selectedGender: genders[2],
      category: productCategories[0],
      images: [],
    });
    setImagePreviews([]);

    const input = document.getElementById("imageUpload");
    if (input) input.value = "";
  };

  // Validation (similar behaviour to your old code)
  const validate = () => {
    const {
      name,
      description,
      basePricing,
      stock,
      selectedSizes,
      images,
    } = formData;

    if (
      !name.trim() ||
      !description.trim() ||
      !basePricing ||
      !stock ||
      selectedSizes.length === 0 ||
      images.length === 0
    ) {
      return "Please fill in all general and pricing fields, select at least one size, and upload at least one image.";
    }

    if (isNaN(parseFloat(basePricing)) || parseFloat(basePricing) <= 0) {
      return "Base Pricing must be a positive number.";
    }

    if (isNaN(parseInt(stock)) || parseInt(stock) < 0) {
      return "Stock must be a non-negative whole number.";
    }

    if (description.length < 20) {
      return "Description should be at least 20 characters long for good product detail.";
    }

    return null;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      toast.error(validationError, {
        style: {
          background: "#ffeded",
          color: "#c62828",
          fontWeight: "500",
        },
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = new FormData();

      // Append standard fields
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", parseFloat(formData.basePricing));
      data.append("stock", parseInt(formData.stock));
      data.append("discount", parseFloat(formData.discount) || 0);
      data.append("discountType", formData.discountType);
      data.append("sizes", JSON.stringify(formData.selectedSizes)); // Send as JSON string
      data.append("gender", formData.selectedGender);
      data.append("category", formData.category);

      // Append images
      formData.images.forEach((image) => {
        data.append("images", image); // API expects 'images' array
      });

      // Product create API
      const res = await axios.post(`${domainUrl}/product/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || "Product added successfully!", {
        style: {
          background: "#EEFFEB",
          color: "#2f4f2f",
          fontWeight: "500",
        },
        icon: "✨",
      });

      handleReset();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.Error ||
        "Error adding product. Please check your inputs and try again.";
      toast.error(msg, {
        style: {
          background: "#ffeded",
          color: "#c62828",
          fontWeight: "500",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f3f4f6] px-4 py-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top bar / title + Action Buttons */}
          <div className="flex items-center justify-between gap-4 py-2 border-b border-gray-200">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              🛍️ Add New Product
            </h1>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  toast.info("Draft saved locally!", { icon: "📝" })
                }
                className="text-xs md:text-sm px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 transition"
              >
                Save Draft
              </button>
              <button
                type="submit"
                form="add-product-form"
                disabled={loading}
                className="text-xs md:text-sm px-5 py-2.5 rounded-xl bg-[#2e7d32] text-white font-medium shadow-md hover:bg-[#1b5e20] transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </div>

          {/* --- Main Content Form --- */}
          <form
            id="add-product-form"
            onSubmit={handleSubmit}
            autoComplete="off"
            className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column: General Info, Pricing, and Stock */}
            <div className="lg:col-span-2 space-y-6">
              {/* --- 1. General Information Card --- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
                  General Information
                </h2>

                <div className="space-y-4">

                  {/* PRODUCT CODE i added*/}


                   <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product Code
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter the product code"
                      className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
                    />
                  </div>




                  {/* Product Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter the product name"
                      className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
                    />
                  </div>


                  {/* Product Description */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Description Product
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the product's material, cut, features, and style..."
                      className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
                    />
                  </div>

                  {/* Size and Gender Selection */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Size Selection */}


                     <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Available Sizes
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {availableSizes.map((size) => {
                          const selected = formData.selectedSizes.includes(
                            size
                          );
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeChange(size)}
                              className={`text-xs px-2 py-1.5 rounded-full border transition ${
                                selected
                                  ? "bg-[#5e785a] text-white border-[#5e785a] shadow-sm"
                                  : "bg-white text-gray-700 border-gray-200 hover:border-[#5e785a]"
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-1 text-[11px] text-gray-400">
                        Select one or more sizes.
                      </p>
                    </div> 



                    {/* Gender Selection */}
                    
                  
                  </div>
                </div>
              </div>

              {/* --- 2. Pricing & Inventory Card --- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
                  Pricing & Inventory
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Base Pricing */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Base Pricing
                    </label>
                    <input
                      type="number"
                      name="basePricing"
                      value={formData.basePricing}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Discount Type */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Discount Type
                    </label>
                    <select
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleChange}
                      className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
                    >
                      {discountTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5e785a33] focus:border-[#5e785a]"
                    >
                      {productCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Image Upload & Summary */}
            <div className="space-y-6 lg:col-span-1">
              {/* --- 3. Upload Image Card --- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-4">
                  Upload Img
                </h2>

                <div>
                  <label
                    htmlFor="imageUpload"
                    className="block w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition p-4 flex flex-col items-center justify-center text-center"
                  >
                    {/* Main Image Preview */}
                    <div className="w-full mb-3">
                      {imagePreviews.length > 0 ? (
                        <img
                          src={imagePreviews[0]}
                          alt="Main Product Preview"
                          className="w-full h-64 object-cover rounded-xl shadow-md border border-gray-100"
                        />
                      ) : (
                        <div className="w-full h-64 flex items-center justify-center rounded-xl bg-white border border-gray-200">
                          <span className="text-sm text-gray-400">
                            Drop image here or click to upload
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Previews */}
                    <div className="flex gap-2 w-full justify-center">
                      {imagePreviews.slice(1, 4).map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Thumbnail ${index + 2}`}
                          className="w-16 h-16 object-cover rounded-md border border-gray-200"
                        />
                      ))}
                      {imagePreviews.length > 4 && (
                        <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500 border border-gray-200">
                          + {imagePreviews.length - 4} more
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#5e785a] text-white text-sm font-medium shadow-md hover:bg-[#4f644d]">
                        <span>Browse Files</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-2">
                        PNG / JPG up to 5MB. Multiple images supported.
                      </p>
                    </div>
                  </label>

                  <input
                    type="file"
                    id="imageUpload"
                    name="images"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </div>
              </div>

              {/* --- 4. Actions / Reset Card (optional) --- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    Need to start over?
                  </p>
                  <p className="text-[11px] text-gray-400">
                    This will clear all fields and images.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs px-3 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                >
                  Reset Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        transition={Slide}
        toastStyle={{
          borderRadius: "10px",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      />
    </>
  );
};

export default AddCategory;
