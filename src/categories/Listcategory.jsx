import React, { useEffect, useState } from "react";
import axios from "axios";
import { domainUrl } from "../utils/constant";
import {
  Pencil,
  Trash2,
  Search,
  X,
} from "lucide-react"; // ✨ cleaner professional icons

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    image: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${domainUrl}/category/list`);
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
    setFormData({
      code: category.code,
      name: category.name,
      description: category.description,
      image: null,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    if (e.target.name === "image")
      setFormData({ ...formData, image: e.target.files[0] });
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
        `${domainUrl}/category/update/${selectedCategory._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Category updated successfully!");
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
      await axios.delete(`${domainUrl}/category/delete/${selectedCategory._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      fetchCategories();
      setMessage("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category:", err);
      setMessage("Error deleting category");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f5] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2d412a] mb-6 text-center">
          Category Management
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bcd6c1]"
            />
          </div>
        </div>

        {/* Category Table */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead className="bg-[#e9f4ea] text-[#2d412a]">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Code</th>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                  <th className="px-6 py-4 text-left font-semibold">Image</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, idx) => (
                    <tr
                      key={cat._id || idx}
                      className={`border-t transition hover:bg-[#f7faf7] ${
                        idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                      }`}
                    >
                      <td className="px-6 py-4">{cat.code}</td>
                      <td className="px-6 py-4 font-medium text-[#2d412a]">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {cat.description}
                      </td>
                      <td className="px-6 py-4">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="h-14 w-14 rounded-md object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="h-14 w-14 rounded-md border bg-gray-50 flex items-center justify-center text-gray-300 text-xs">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-4">
                          <button
                            onClick={() => handleEditClick(cat)}
                            className="text-[#3b6b36] hover:text-[#1d3d1a] transition"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(cat)}
                            className="text-[#b91c1c] hover:text-[#7f1212] transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500 italic"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold text-[#2d412a] mb-6 text-center">
                Update Category
              </h2>

              <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Category Code"
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5e785a]"
                  required
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Category Name"
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5e785a]"
                  required
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Category Description"
                  className="border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#5e785a]"
                />

                <label
                  htmlFor="updateImage"
                  className="px-3 py-2 text-sm font-bold text-center text-white bg-[#5e785a] rounded cursor-pointer hover:bg-[#4f644d] transition"
                >
                  {formData.image ? formData.image.name : "Change Image"}
                </label>
                <input
                  type="file"
                  id="updateImage"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#5e785a] text-white px-4 py-2 rounded-lg hover:bg-[#2d412a]"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center animate-fadeIn">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Delete Category
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#2d412a]">
                  {selectedCategory?.name}
                </span>
                ?
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {message && (
          <p className="text-center text-green-700 mt-6 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ListCategory;