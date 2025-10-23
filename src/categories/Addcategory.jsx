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


import React, { useState } from "react";
import axios from "axios";
import { domainUrl } from "../utils/constant";

const Addcategory = () => {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        image: null,
    });

    // 1. New state for image preview URL
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [message, setMessage] = useState("");

    // Handle Input Changes
    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });

            // Create and set the image preview URL
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setImagePreviewUrl(null);
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const data = new FormData();

            data.append("code", formData.code);
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("image", formData.image);

            const res = await axios.post(
                `${domainUrl}/category/add`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(res.data.message || "Category added successfully!");
            
            // Reset form and image preview states
            setFormData({
                code: "",
                name: "",
                description: "",
                image: null,
            });
            setImagePreviewUrl(null);
            // Clear the file input visually
            document.getElementById("imageUpload").value = "";

        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Error adding category");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h1 className="text-[#5e785a] text-xl font-bold text-center">
                    Add Categories
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3" autoComplete="off">
                    
                    {/* Category Code */}
                    <input
                        type="number"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Category Code"
                        className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full appearance-none"
                        required
                    />

                    {/* Category Name */}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Category Name"
                        className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
                        required
                    />
                    
                    {/* Description */}
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter Category Description"
                        className="w-full border border-gray-400 rounded px-3 py-4 resize-none text-sm focus:outline-none focus:border-[#343e32]"
                        required
                    />

                    {/* === Upload Image Section with Preview === */}
                    <div className="mt-2">
                        {/* Custom File Button */}
                        <label
                            htmlFor="imageUpload"
                            className="px-3 py-2 text-sm text-white font-bold rounded cursor-pointer transition flex items-center justify-center space-x-2"
                            // Using a vibrant background color for the button for visual distinction
                            style={{ background: '#5e785a', hover: { background: '#2d412a' } }} 
                        >
                            <span>{formData.image ? "Change Image" : "Choose Image"}</span>
                            {formData.image && <span className="text-gray-200 font-normal ml-2 truncate max-w-[100px]">{formData.image.name}</span>}
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

                        {/* Image Preview Box */}
                        {/* <div className="mt-3 w-full h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100">
                            {imagePreviewUrl ? (
                                <img 
                                    src={imagePreviewUrl} 
                                    alt="Category Preview" 
                                    className="w-full h-full object-contain" // Use object-contain to ensure the whole image is visible
                                />
                            ) : (
                                <span className="text-sm text-gray-500">
                                    No Image Selected
                                </span>
                            )}
                        </div> */}
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-5 text-white bg-[#5e785a] px-4 py-2 rounded hover:bg-[#2d412a] transition"
                    >
                        Submit
                    </button>
                </form>

                {/* Message */}
                {message && <p className="text-center mt-3 text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Addcategory;







