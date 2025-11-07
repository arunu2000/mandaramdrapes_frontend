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


import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { domainUrl } from "../utils/constant";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    categoryCode: "",
    productCode: "",
    productName: "",
    description: "",
    price: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${domainUrl}/category/list`);
        setCategories(res.data.list || []);
      } catch (err) {
        toast.error("Failed to load categories.", {
          style: {
            background: "#ffeded",
            color: "#c62828",
            fontWeight: "500",
          },
        });
      }
    };
    fetchCategories();
  }, []);

  //  Input Change Handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //  Validation
  const validate = () => {
    const { categoryCode, productCode, productName, description, price, image } =
      formData;

    if (
      !categoryCode ||
      !productCode.trim() ||
      !productName.trim() ||
      !description.trim() ||
      !price.trim() ||
      !image
    ) {
      return "Please fill in all fields and upload an image.";
    }

    if (!/^[0-9]+$/.test(productCode)) {
      return "Product code should contain only numbers.";
    }

    
      if (!/^[a-zA-Z0-9\s&_\-,]+$/.test(productName)) {
  return "Product name can only contain letters, numbers, spaces, &, -, _ and ,";
}

    if (description.length < 10) {
      return "Description should be at least 10 characters long.";
    }

    if (parseFloat(price) <= 0) {
      return "Please enter a valid price.";
    }

    return null;
  };

  //  Submit Handler
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

      data.append("category", formData.categoryCode);
      data.append("code", formData.productCode);
      data.append("name", formData.productName);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("image", formData.image);


      console.log("logdata",data);
      
      const res = await axios.post(`${domainUrl}/product/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("resyyyyyyyyyyyyyyyyyyyyyy");
      
      

      toast.success(res.data.message || "Product added successfully!", {
        style: {
          background: "#EEFFEB",
          color: "#2f4f2f",
          fontWeight: "500",
        },
        icon: "🌿",
      });

      // Reset form
      setFormData({
        categoryCode: "",
        productCode: "",
        productName: "",
        description: "",
        price: "",
        image: null,
      });
      document.getElementById("imageUpload").value = "";
    } catch (err) {
      console.error("Error adding product:", err.response.data);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.Error ||
        "Error adding product. Please try again.";
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
      <div className="min-h-screen flex items-center justify-center bg-[#e2e4e1] px-4 sm:px-6 md:px-8 py-6">
        <div
          className="bg-white w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-md
          p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300"
        >
          <h1 className="text-[#343e32] text-xl sm:text-2xl font-bold text-center">
            Add New Product
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm text-center mt-1">
            Fill in details to add a new product
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-6 gap-3 sm:gap-4"
            autoComplete="off"
          >
            {/* Category Dropdown */}
            <select
              name="categoryCode"
              value={formData.categoryCode}
              onChange={handleChange}
              className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 
              focus:outline-none focus:border-[#5e785a] w-full bg-white text-[#343e32]"
              required
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} ({cat.code})
                </option>
              ))}
            </select>

            {/* Product Code */}
            <input
              type="number"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              placeholder="Product Code"
              className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
              required
            />

            {/* Product Name */}
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Product Description"
              rows="4"
              className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full resize-none focus:outline-none focus:border-[#5e785a]"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
              required
            />

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="imageUpload"
                className="px-3 py-2 text-sm text-white font-bold rounded cursor-pointer 
                transition flex items-center justify-center bg-[#5e785a] hover:bg-[#4f644d]"
              >
                {formData.image ? formData.image.name : "Upload Product Image"}
              </label>

              <input
                type="file"
                id="imageUpload"
                name="image"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 text-white bg-[#5e785a] px-4 py-2 sm:py-2.5 rounded 
              hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        transition={Slide}
        toastStyle={{
          borderRadius: "10px",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      />
    </>
  );
};

export default AddProducts;
