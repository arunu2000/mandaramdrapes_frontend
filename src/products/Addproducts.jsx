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



import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 

const Addproducts = () => {
    // 1. STATE MANAGEMENT
    const [formData, setFormData] = useState({
        categoryCode: "", 
        productCode: "",
        productName: "",
        description: "",
        price: "",
        image: null,
    });
    const [categories, setCategories] = useState([]); 
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // NOTE: Use your Category List API endpoint
                const res = await axios.get("http://192.168.29.217:5000/api/category/list");
                
                // Assuming your backend returns { list: [...] }
                setCategories(res.data.list); 
            } catch (err) {
                console.error("Error fetching categories for dropdown:", err);
                setMessage("Failed to load categories.");
            }
        };
        fetchCategories();
    }, []); // Empty dependency array means this runs once on mount

    // 3. DATA HANDLING (handleChange)
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // 4. API INTEGRATION (handleSubmit - updated to show the correct endpoint)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const data = new FormData(); 
            
            data.append("category", formData.categoryCode); // 
            data.append("code", formData.productCode);
            data.append("name", formData.productName);
            data.append("description", formData.description);
            data.append("price", formData.price);
            if (formData.image) {
                 data.append("image", formData.image);
            }
            
            //  UNCOMMENTED AXIOS CALL
            const res = await axios.post(
                "http://192.168.29.217:5000/api/product/add", 
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            setMessage(res.data.message);

            // Reset the form after success
            setFormData({
                categoryCode: "",
                productCode: "",
                productName: "",
                description: "",
                price: "",
                image: null,
            });

        } catch (err) {
            console.error("Error adding product:", err.response ? err.response.data : err.message);
            setMessage("Error adding product. Check console for details.");
        }
    };

    // 5. RENDER (Updated to use the dynamic 'categories' state)
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h1 className="text-[#5e785a] text-xl font-bold text-center">
                    Add Products
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
                    
                    {/* Category Select */}
                    <select
                        name="categoryCode"
                        value={formData.categoryCode}
                        onChange={handleChange}
                        className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full bg-[#EEFFEB] text-[#343e32] pr-8 relative"
                        required
                    >
                        <option value="" disabled hidden>Select Category</option>
                        
                        {/*  Mapped REAL categories here */}
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}> 
                                {/* Assuming you want to send the Category ID (_id) but display the name */}
                                {cat.name} ({cat.code})
                            </option>
                        ))}
                    </select>

                    {/* ... (Other inputs remain the same) ... */}
                    {/* Product Code */}
                    <input
                        type="number" name="productCode" value={formData.productCode} onChange={handleChange}
                        placeholder="Product Code"
                        className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
                        required
                    />
                    
                    {/* Product Name */}
                    <input
                        type="text" name="productName" value={formData.productName} onChange={handleChange}
                        placeholder="Product Name"
                        className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
                        required
                    />

                    {/* Description */}
                    <textarea
                        name="description" value={formData.description} onChange={handleChange}
                        placeholder="Enter Product Description"
                        className="w-full border border-gray-400 rounded px-3 py-4 resize-none text-sm focus:outline-none focus:border-[#343e32]"
                        required
                    />

                    {/* Price */}
                    <input
                        type="number" name="price" value={formData.price} onChange={handleChange}
                        placeholder="Price"
                        className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
                        required
                    />
                    
                    {/* Image Upload Field */}
                    <div className="mt-2">
                        <label
                            htmlFor="imageUpload"
                            className="px-3 py-2 text-sm text-white font-bold rounded cursor-pointer transition flex items-center justify-center space-x-2 bg-[#5e785a] hover:bg-[#4f654e]" 
                        >
                            {formData.image ? formData.image.name : "Upload Product Image"} 
                        </label>
                        <input
                            type="file" id="imageUpload" name="image" onChange={handleChange}
                            className="hidden" accept="image/*" required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#5e785a] text-white py-2 mt-4 rounded hover:bg-[#4f654e] font-bold transition"
                    >
                        Add Product
                    </button>
                    
                </form>
                
                {message && (
                    <p className="text-center mt-4 text-[#343e32]">{message}</p>
                )}
            </div>
        </div>
    );
};

export default Addproducts;