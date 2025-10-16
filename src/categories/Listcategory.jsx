import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Listcategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ code: "", name: "", description: "", image: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://192.168.29.217:5000/api/category/list");
      setCategories(res.data.list || []);
      setFilteredCategories(res.data.list || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    const results = categories.filter(
      (cat) =>
        cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(cat.code).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(results);
  }, [searchTerm, categories]);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormData({ code: category.code, name: category.name, description: category.description, image: null });
    setShowEditModal(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") setFormData({ ...formData, image: e.target.files[0] });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("code", formData.code);
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const res = await axios.put(
        `http://192.168.29.217:5000/api/category/update/${selectedCategory._id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Updated");
      setShowEditModal(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Error updating category");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://192.168.29.217:5000/api/category/delete/${selectedCategory._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      fetchCategories();
      setMessage("Category deleted successfully");
    } catch (err) {
      console.error("Error deleting category:", err);
      setMessage("Error deleting category");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d412a] mb-6 text-center">Categories List</h1>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search by code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cfe9d5]"
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#eaf6ea] text-[#2d412a]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Code</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Description</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Image</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, idx) => (
                    <tr key={cat._id || idx} className={`border-t ${idx % 2 === 0 ? "" : "bg-gray-50"}`}>
                      <td className="px-6 py-6 align-top text-sm text-gray-700">{cat.code}</td>
                      <td className="px-6 py-6 align-top text-sm text-gray-800">{cat.name}</td>
                      <td className="px-6 py-6 align-top text-sm text-gray-600">{cat.description}</td>
                      <td className="px-6 py-6 align-top">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="h-16 w-16 rounded-md object-cover border" />
                        ) : (
                          <div className="h-16 w-16 rounded-md border bg-gray-50 flex items-center justify-center text-gray-300">No Image</div>
                        )}
                      </td>
                      <td className="px-6 py-6 align-top text-right">
                        <div className="inline-flex items-center gap-4">
                          <button onClick={() => handleEditClick(cat)} className="text-blue-600 hover:text-blue-800">
                            <FaEdit size={18} />
                          </button>
                          <button onClick={() => handleDeleteClick(cat)} className="text-red-600 hover:text-red-800">
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500 italic">No categories found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
              <h2 className="text-xl font-bold text-[#2d412a] mb-4 text-center">Update Category</h2>

              <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                <input type="number" name="code" value={formData.code} onChange={handleChange} placeholder="Category Code" className="border rounded px-3 py-2 text-sm" required />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Category Name" className="border rounded px-3 py-2 text-sm" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Category Description" className="border rounded px-3 py-2 text-sm resize-none" />

                <label htmlFor="updateImage" className="px-3 py-2 text-sm font-bold text-[#5e785a] border rounded cursor-pointer hover:bg-[#6f8b6b] hover:text-white transition">Change Image</label>
                <input type="file" id="updateImage" name="image" onChange={handleChange} className="hidden" accept="image/*" />

                <div className="flex justify-end gap-3 mt-3">
                  <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="bg-[#5e785a] text-white px-4 py-2 rounded hover:bg-[#2d412a]">Update</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this category?</h2>
              <p className="text-sm text-gray-500 mb-6">{selectedCategory?.name}</p>

              <div className="flex justify-center gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        )}

        {message && <p className="text-center text-green-600 mt-4 font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default Listcategory;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// import { FiX } from "react-icons/fi"; // Used for closing modals

// const Listcategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   // Note: image: null is kept for file input handling
//   const [formData, setFormData] = useState({ code: "", name: "", description: "", image: null });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");

//   // FIX 1: Corrected API header issue in handleUpdate (MUST BE DONE ON BACKEND TOO)
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const data = new FormData();
//       data.append("code", formData.code);
//       data.append("name", formData.name);
//       data.append("description", formData.description);
//       if (formData.image) data.append("image", formData.image);

//       const res = await axios.put(
//         `http://192.168.29.217:5000/api/category/update/${selectedCategory._id}`,
//         data,
//         {
//           headers: { 
//             // REMOVED "Content-Type": "multipart/form-data" to fix 400 error
//             Authorization: `Bearer ${token}` 
//           } 
//         }
//       );

//       setMessage(res.data.message || "Updated");
//       setShowEditModal(false);
//       fetchCategories();
//     } catch (err) {
//       console.error(err);
//       setMessage("Error updating category");
//     }
//   };
  
//   // Existing Logic (unchanged but kept for context)
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://192.168.29.217:5000/api/category/list");
//       setCategories(res.data.list || []);
//       setFilteredCategories(res.data.list || []);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   useEffect(() => {
//     const results = categories.filter(
//       (cat) =>
//         cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         String(cat.code).toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCategories(results);
//   }, [searchTerm, categories]);

//   const handleEditClick = (category) => {
//     setSelectedCategory(category);
//     setFormData({ code: category.code, name: category.name, description: category.description, image: null });
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (category) => {
//     setSelectedCategory(category);
//     setShowDeleteModal(true);
//   };

//   const handleChange = (e) => {
//     if (e.target.name === "image") setFormData({ ...formData, image: e.target.files[0] });
//     else setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
  
//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://192.168.29.217:5000/api/category/delete/${selectedCategory._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setShowDeleteModal(false);
//       fetchCategories();
//       setMessage("Category deleted successfully");
//     } catch (err) {
//       console.error("Error deleting category:", err);
//       setMessage("Error deleting category");
//     }
//   };


//   // Helper function to create the initial/name avatar (like AM for Adam Monroe)
//   const createAvatarText = (name) => {
//     if (!name) return '??';
//     const parts = name.split(' ');
//     if (parts.length > 1) {
//       return (parts[0][0] + parts[1][0]).toUpperCase();
//     }
//     return name.substring(0, 2).toUpperCase();
//   };
  
//   // Helper function for a consistent, random background color for the avatar
//   const getAvatarColor = (id) => {
//     const colors = ['bg-blue-100', 'bg-pink-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100'];
//     // Use the last digit of the ID (or a simple hash) to pick a color
//     const index = parseInt(id?.slice(-1), 16) % colors.length;
//     return colors[index];
//   };


//   // --- RENDER START ---
//   return (
//     <div className="min-h-screen bg-[#f7faf7] py-12">
//       <div className="max-w-6xl mx-auto px-6">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d412a] mb-6 text-center">Manage Product Categories</h1>

//         {/* Search Bar */}
//         <div className="flex justify-center mb-8">
//           <div className="relative w-full max-w-3xl">
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//               <FaSearch />
//             </span>
//             <input
//               type="text"
//               placeholder="Search by code or name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cfe9d5]"
//             />
//           </div>
//         </div>

//         {/* Categories List (The new Card UI) */}
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden divide-y divide-gray-100">
          
//           {filteredCategories.length > 0 ? (
//             filteredCategories.map((cat, idx) => (
//               <div 
//                 key={cat._id || idx} 
//                 className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition"
//               >
//                 {/* Left Side: Avatar/Image, Name, Code, Description */}
//                 <div className="flex items-start flex-grow">
                  
//                   {/* Avatar/Image */}
//                   <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold text-[#2d412a] mr-4 ${getAvatarColor(cat._id)} overflow-hidden`}>
//                     {cat.image ? (
//                       <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
//                     ) : (
//                       createAvatarText(cat.name)
//                     )}
//                   </div>
                  
//                   {/* Name and Details */}
//                   <div className="flex flex-col">
//                     <span className="text-lg font-semibold text-[#2d412a] leading-tight">
//                       {cat.name}
//                     </span>
//                     <span className="text-sm text-gray-500 mt-1">
//                       Code: {cat.code}
//                     </span>
//                     <span className="text-xs text-gray-400 mt-1 max-w-md hidden sm:block">
//                       {cat.description || "No description provided."}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Right Side: Actions */}
//                 <div className="flex items-center gap-4 text-sm font-medium">
//                   {/* Status/Placeholder (like 'Permission' column in your image) */}
//                   <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full hidden sm:inline-block">
//                     Active
//                   </span>

//                   {/* Action Buttons */}
//                   <div className="inline-flex items-center gap-3">
//                     <button 
//                       onClick={() => handleEditClick(cat)} 
//                       className="text-blue-600 hover:text-blue-800 transition p-2 rounded-full hover:bg-blue-50"
//                       title="Edit Category"
//                     >
//                       <FaEdit size={16} />
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteClick(cat)} 
//                       className="text-red-600 hover:text-red-800 transition p-2 rounded-full hover:bg-red-50"
//                       title="Delete Category"
//                     >
//                       <FaTrash size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-10 text-gray-500 italic">
//               {categories.length === 0 && searchTerm === "" ? "No categories loaded." : "No categories match your search."}
//             </div>
//           )}
//         </div>

//         {/* Success/Error Message */}
//         {message && <p className={`text-center mt-4 font-medium ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>{message}</p>}
//       </div>


//       {/* --- EDIT MODAL --- */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md relative">
//             <h2 className="text-2xl font-bold text-[#2d412a] mb-6 text-center">Update Category</h2>
//             <button 
//                 onClick={() => setShowEditModal(false)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//                 <FiX size={24} />
//             </button>

//             <form onSubmit={handleUpdate} className="flex flex-col gap-4">
//               <input type="number" name="code" value={formData.code} onChange={handleChange} placeholder="Category Code" className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#5e785a] focus:ring-[#5e785a]" required />
//               <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Category Name" className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#5e785a] focus:ring-[#5e785a]" required />
//               <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Category Description" className="border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:border-[#5e785a] focus:ring-[#5e785a]" rows="3" />

//               <div className="flex items-center justify-between">
//                   <label htmlFor="updateImage" className="px-4 py-2 text-sm font-bold text-white bg-[#5e785a] rounded-lg cursor-pointer hover:bg-[#4f654e] transition shadow">
//                       {formData.image?.name || "Change Image"}
//                   </label>
//                   <input type="file" id="updateImage" name="image" onChange={handleChange} className="hidden" accept="image/*" />
                  
//                   {/* Display existing image or placeholder */}
//                   {selectedCategory?.image && !formData.image && (
//                       <img src={selectedCategory.image} alt="Current" className="h-10 w-10 object-cover rounded-full border border-gray-300"/>
//                   )}
//               </div>

//               <div className="flex justify-end gap-3 mt-4">
//                 <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
//                 <button type="submit" className="bg-[#5e785a] text-white px-6 py-2 rounded-lg hover:bg-[#4f654e] font-medium transition shadow-md">Update Category</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- DELETE MODAL --- */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
//             <p className="text-base text-gray-600 mb-6">Are you sure you want to permanently delete **{selectedCategory?.name}**?</p>

//             <div className="flex justify-center gap-3">
//               <button onClick={() => setShowDeleteModal(false)} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
//               <button onClick={handleDelete} className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 font-medium transition shadow-md">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Listcategory;


