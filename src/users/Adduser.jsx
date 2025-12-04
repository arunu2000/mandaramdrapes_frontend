// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";

// const AddUser = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Validation
//   const validate = () => {
//     let tempErrors = {};

//     if (!formData.username) tempErrors.username = "Name is required";
//     else if (!/^[a-zA-Z\s]+$/.test(formData.username))
//       tempErrors.username = "Name should contain only letters and spaces";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) tempErrors.email = "Email is required";
//     else if (!emailRegex.test(formData.email))
//       tempErrors.email = "Enter a valid email";

//     const phoneRegex = /^[0-9]{10}$/;
//     if (!formData.phone) tempErrors.phone = "Phone number is required";
//     else if (!phoneRegex.test(formData.phone))
//       tempErrors.phone = "Enter a valid 10-digit phone number";

//     if (!formData.password) tempErrors.password = "Password is required";
//     else if (formData.password.length < 6)
//       tempErrors.password = "Password must be at least 6 characters";

//     if (!formData.role) {
//       tempErrors.role = "Please select a role";
// }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setSuccessMessage("");

//     if (validate()) {
//       try {
//         const token = localStorage.getItem("token"); //
//         const response = await axios.post(
//           `${domainUrl}/admin/users`,
//           {
//             username: formData.username,
//             email: formData.email,
//             phone: formData.phone,
//             password: formData.password,
//             role: formData.role,
//           },{
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//         );

//         setSuccessMessage(response.data.message || "User added successfully!");
//         setFormData({
//           username: "",
//           email: "",
//           phone: "",
//           password: "",
//           role: "",
//         });
//       } catch (error) {
//         if (error.response) {
//           setErrors({
//             server: error.response.data.Error || "Failed to add user",
//           });
//         } else {
//           setErrors({ server: "Network error, please try again" });
//         }
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-white">
//       <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
//         <h1 className="text-[#5e785a] text-2xl font-bold text-center">
//           Add New User
//         </h1>
//         <p className="text-gray-500 text-sm text-center mt-1">
//           Fill in details to create a new account
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3 autoComplete=off " >
//           {/* Username */}
//           <div>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Name"
//               className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//             />
//             {errors.username && (
//               <p className="text-red-500 text-xs">{errors.username}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs">{errors.email}</p>
//             )}
//           </div>

//           {/* Phone */}
//           <div>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-xs">{errors.phone}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? "password" : "text"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Set Password"
//               className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//             />
//             <span
//                  onClick={() => setShowPassword(!showPassword)}
//                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
//                     >
//                    {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//             {errors.password && (
//               <p className="text-red-500 text-xs">{errors.password}</p>
//             )}
//           </div>

//           {/* Role */}
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="text-sm border border-gray-400 rounded px-3 py-2 
//              focus:outline-none focus:border-[#343e32] w-full 
//              bg-[#EEFFEB] text-[#343e32] 
//               pr-8 relative"
//           >
//             <option value="" disabled hidden>
//             Select Role
//             </option>
//             <option value="customer">Customer</option>
//             <option value="admin">Admin</option>
//             </select>
//             {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}


//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full mt-3 text-[#EEFFEB] bg-[#5e785a] px-4 py-2 rounded hover:bg-[#5a6d57] transition"
//           >
//             Add User
//           </button>
//         </form>

//         {errors.server && (
//           <p className="text-red-500 text-sm mt-2 text-center">
//             {errors.server}
//           </p>
//         )}
//         {successMessage && (
//           <p className="text-green-600 text-sm mt-4 text-center">
//             {successMessage}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddUser;


// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddUser = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Validation logic
//   const validate = () => {
//     const { username, email, phone, password, role } = formData;

//     if (!username.trim() || !email.trim() || !phone.trim() || !password.trim() || !role) {
//       return "Please fill in all fields.";
//     }

//     if (!/^[a-zA-Z\s]+$/.test(username)) {
//       return "Name should contain only letters and spaces.";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return "Enter a valid email address.";
//     }

//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(phone)) {
//       return "Enter a valid 10-digit phone number.";
//     }

//     if (password.length < 6) {
//       return "Password must be at least 6 characters long.";
//     }

//     if (!role) {
//       return "Please select a role.";
//     }

//     return null;
//   };

//   // Submit form
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

//       const res = await axios.post(
//         `${domainUrl}/admin/users`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(res.data.message || "User added successfully!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "🌿",
//       });

//       setFormData({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "",
//       });
//     } catch (err) {
//       const msg =
//         err.response?.data?.Error ||
//         err.response?.data?.message ||
//         "Failed to add user. Please try again.";
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
//       <div className="flex items-center justify-center h-[100vh] bg-[#f4f5f7] overflow-hidden">



//         <div
//           className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm 
//           transition-all duration-300 animate-fadeIn"
//         >
//           <h1 className="text-[#343e32] text-2xl font-bold text-center">
//             Add New User
//           </h1>
//           <p className="text-gray-500 text-sm text-center mt-1">
//             Fill in details to create a new account
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col mt-6 gap-3"
//             autoComplete="off"
//           >
//             {/* Username */}
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Email */}
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email address"
//               className="text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Phone */}
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone number"
//               className="text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Set Password"
//                 className="text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#5e785a]"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#5e785a]"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Role */}
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="text-sm border border-gray-300 rounded px-3 py-2 
//               focus:outline-none focus:border-[#5e785a] w-full bg-white text-[#343e32]"
//             >
//               <option value="" disabled hidden>
//                 Select Role
//               </option>
//               <option value="customer">Customer</option>
//               <option value="admin">Admin</option>
//             </select>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-3 text-white bg-[#5e785a] px-4 py-2 rounded 
//               hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? "Adding..." : "Add User"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Toasts */}
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

// export default AddUser;

///workinggggggggggggggggggggggggggggg


// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddUser = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = () => {
//     const { username, email, phone, password, role } = formData;

//     if (!username.trim() || !email.trim() || !phone.trim() || !password.trim() || !role) {
//       return "Please fill in all fields.";
//     }

//     if (!/^[a-zA-Z\s]+$/.test(username)) {
//       return "Name should contain only letters and spaces.";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return "Enter a valid email address.";
//     }

//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(phone)) {
//       return "Enter a valid 10-digit phone number.";
//     }

//     if (password.length < 6) {
//       return "Password must be at least 6 characters long.";
//     }

//     if (!role) {
//       return "Please select a role.";
//     }

//     return null;
//   };

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

//       const res = await axios.post(`${domainUrl}/admin/users`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(res.data.message || "User added successfully!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "🌿",
//       });

//       setFormData({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "",
//       });
//     } catch (err) {
//       const msg =
//         err.response?.data?.Error ||
//         err.response?.data?.message ||
//         "Failed to add user. Please try again.";
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
//             Add New User
//           </h1>
//           <p className="text-gray-500 text-xs sm:text-sm text-center mt-1">
//             Fill in details to create a new account
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col mt-6 gap-3 sm:gap-4"
//             autoComplete="off"
//           >
//             {/* Username */}
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Email */}
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email address"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Phone */}
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone number"
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//             />

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Set Password"
//                 className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 w-full focus:outline-none focus:border-[#5e785a]"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#5e785a]"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Role */}
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="text-sm border border-gray-300 rounded px-3 py-2 sm:py-2.5 
//               focus:outline-none focus:border-[#5e785a] w-full bg-white text-[#343e32]"
//             >
//               <option value="" disabled hidden>
//                 Select Role
//               </option>
//               <option value="customer">Customer</option>
//               <option value="admin">Admin</option>
//             </select>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-3 text-white bg-[#5e785a] px-4 py-2 sm:py-2.5 rounded 
//               hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? "Adding..." : "Add User"}
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

// export default AddUser;


// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { domainUrl } from "../utils/constant";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddUser = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = () => {
//     const { username, email, phone, password, role } = formData;

//     if (!username.trim() || !email.trim() || !phone.trim() || !password.trim() || !role) {
//       return "Please fill in all fields.";
//     }

//     if (!/^[a-zA-Z\s]+$/.test(username)) {
//       return "Name should contain only letters and spaces.";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return "Enter a valid email address.";
//     }

//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(phone)) {
//       return "Enter a valid 10-digit phone number.";
//     }

//     if (password.length < 6) {
//       return "Password must be at least 6 characters long.";
//     }

//     if (!role) {
//       return "Please select a role.";
//     }

//     return null;
//   };

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

//       const res = await axios.post(`${domainUrl}/admin/users`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(res.data.message || "User added successfully!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "🌿",
//       });

//       setFormData({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "",
//       });
//     } catch (err) {
//       const msg =
//         err.response?.data?.Error ||
//         err.response?.data?.message ||
//         "Failed to add user. Please try again.";
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
//       <div className="min-h-screen w-full bg-[#e2e4e1] px-4 sm:px-6 lg:px-10 py-8 flex">
//         <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
//           {/* Page Header */}
//           <header className="space-y-2">
//             <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-gray-500">
//               User Management
//             </p>
//             <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-semibold text-[#343e32]">
//                   Add New User
//                 </h1>
//                 <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                   Create an account for a new team member or customer with the required details.
//                 </p>
//               </div>
//               <div
//                 className="px-4 py-3 rounded-2xl hidden sm:flex flex-col justify-center
//                 bg-[#e2e4e1] shadow-[10px_10px_20px_#c2c4c1,-10px_-10px_20px_#ffffff]"
//               >
//                 <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
//                   Status
//                 </span>
//                 <span className="text-xs mt-1 text-[#4f644d] font-medium">
//                   Secure user onboarding enabled
//                 </span>
//               </div>
//             </div>
//           </header>

//           {/* Content */}
//           <main className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 lg:gap-8">
//             {/* Form Card */}
//             <section
//               className="bg-[#e2e4e1] rounded-3xl p-5 sm:p-6 lg:p-7
//               shadow-[14px_14px_28px_#c2c4c1,-14px_-14px_28px_#ffffff]
//               transition-transform duration-200 hover:-translate-y-0.5"
//             >
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col gap-4 sm:gap-5"
//                 autoComplete="off"
//               >
//                 {/* Group: Basic Details */}
//                 <div className="flex flex-col gap-1">
//                   <h2 className="text-xs sm:text-sm font-medium text-[#343e32]">
//                     Basic Information
//                   </h2>
//                   <p className="text-[11px] text-gray-500">
//                     Make sure the name, email and phone number are accurate before creating the user.
//                   </p>
//                 </div>

//                 {/* Username */}
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs text-gray-600">Full Name</label>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="e.g. Devika Nair"
//                     className="text-sm rounded-xl px-3.5 py-2.5 w-full
//                       bg-[#e2e4e1]
//                       shadow-inner
//                       outline-none
//                       border border-transparent
//                       focus:border-[#8ba48a]
//                       placeholder:text-gray-400"
//                   />
//                 </div>

//                 {/* Email + Phone */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {/* Email */}
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs text-gray-600">Email Address</label>
//                     <input
//                       type="text"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="user@example.com"
//                       className="text-sm rounded-xl px-3.5 py-2.5 w-full
//                         bg-[#e2e4e1]
//                         shadow-inner
//                         outline-none
//                         border border-transparent
//                         focus:border-[#8ba48a]
//                         placeholder:text-gray-400"
//                     />
//                   </div>

//                   {/* Phone */}
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs text-gray-600">Phone Number</label>
//                     <input
//                       type="text"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="10-digit mobile number"
//                       className="text-sm rounded-xl px-3.5 py-2.5 w-full
//                         bg-[#e2e4e1]
//                         shadow-inner
//                         outline-none
//                         border border-transparent
//                         focus:border-[#8ba48a]
//                         placeholder:text-gray-400"
//                     />
//                   </div>
//                 </div>

//                 {/* Password + Role */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {/* Password */}
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs text-gray-600">Set Password</label>
//                     <div className="relative">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Minimum 6 characters"
//                         className="text-sm rounded-xl px-3.5 py-2.5 w-full
//                           bg-[#e2e4e1]
//                           shadow-inner
//                           outline-none
//                           border border-transparent
//                           focus:border-[#8ba48a]
//                           placeholder:text-gray-400 pr-9"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute inset-y-0 right-3 flex items-center text-[#5e785a] text-base"
//                       >
//                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                       </button>
//                     </div>
//                     <p className="text-[11px] text-gray-500">
//                       Avoid using simple or reusable passwords.
//                     </p>
//                   </div>

//                   {/* Role (Segmented Control style) */}
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs text-gray-600">Assign Role</label>

//                     <div
//                       className="flex rounded-full bg-[#e2e4e1]
//                       shadow-inner p-1 text-xs sm:text-sm"
//                     >
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setFormData((prev) => ({ ...prev, role: "customer" }))
//                         }
//                         className={`flex-1 px-3 py-1.5 rounded-full transition-all
//                           ${
//                             formData.role === "customer"
//                               ? "bg-[#5e785a] text-white shadow-[4px_4px_8px_#c2c4c1]"
//                               : "text-gray-500"
//                           }`}
//                       >
//                         Customer
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setFormData((prev) => ({ ...prev, role: "admin" }))
//                         }
//                         className={`flex-1 px-3 py-1.5 rounded-full transition-all
//                           ${
//                             formData.role === "admin"
//                               ? "bg-[#5e785a] text-white shadow-[4px_4px_8px_#c2c4c1]"
//                               : "text-gray-500"
//                           }`}
//                       >
//                         Admin
//                       </button>
//                     </div>

//                     <p className="text-[11px] text-gray-500">
//                       Choose the right access level for this user.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Submit */}
//                 <div className="flex items-center justify-between gap-3 pt-2">
//                   <p className="text-[11px] text-gray-500 max-w-xs">
//                     You can edit user details later from the user list page.
//                   </p>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="inline-flex items-center justify-center gap-2
//                       px-5 sm:px-6 py-2.5 text-sm font-medium rounded-full
//                       bg-gradient-to-r from-[#7a9181] to-[#5e785a]
//                       text-white
//                       shadow-[8px_8px_16px_#c2c4c1]
//                       hover:scale-[1.01]
//                       active:shadow-inner active:scale-[0.99]
//                       transition disabled:opacity-70 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Adding User..." : "Add User"}
//                   </button>
//                 </div>
//               </form>
//             </section>

//             {/* Right-side Info Panel (optional "advanced" touch) */}
//             <aside className="hidden lg:flex flex-col gap-4">
//               <div
//                 className="bg-[#e2e4e1] rounded-3xl p-5
//                shadow-[14px_14px_28px_#c2c4c1]
//                 text-xs text-gray-600 space-y-3"
//               >
//                 <h3 className="text-sm font-medium text-[#343e32]">
//                   Security & Best Practices
//                 </h3>
//                 <ul className="space-y-2 list-disc list-inside">
//                   <li>Use unique emails and verified phone numbers for each user.</li>
//                   <li>Assign admin role only to trusted internal team members.</li>
//                   <li>Encourage users to change their password on first login.</li>
//                 </ul>
//               </div>

//               <div
//                 className="bg-[#e2e4e1] rounded-3xl p-4
//                 shadow-[14px_14px_28px_#c2c4c1,-14px_-14px_28px_#ffffff]
//                 text-[11px] text-gray-600 space-y-2"
//               >
//                 <p className="font-medium text-[#343e32]">
//                   Mandharam Drapes Admin
//                 </p>
//                 <p>
//                   This panel is designed for seamless user onboarding, keeping the
//                   interface minimal, calm and premium—aligned with your brand.
//                 </p>
//               </div>
//             </aside>
//           </main>
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

// export default AddUser;




import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { domainUrl } from "../utils/constant";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const { username, email, phone, password, role } = formData;

    if (
      !username.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !role
    ) {
      return "Please fill in all fields.";
    }

    if (!/^[a-zA-Z\s]+$/.test(username)) {
      return "Name should contain only letters and spaces.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Enter a valid email address.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return "Enter a valid 10-digit phone number.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (!role) {
      return "Please select a role.";
    }

    return null;
  };

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

      const res = await axios.post(`${domainUrl}/admin/users`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || "User added successfully!", {
        style: {
          background: "#EEFFEB",
          color: "#2f4f2f",
          fontWeight: "500",
        },
        icon: "🌿",
      });

      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
    } catch (err) {
      const msg =
        err.response?.data?.Error ||
        err.response?.data?.message ||
        "Failed to add user. Please try again.";
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 px-4 sm:px-6 lg:px-10 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-600 backdrop-blur-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                User Management · Create
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Add new user
              </h1>
              <p className="mt-1 text-sm text-slate-500 max-w-md">
                Create a secure account for a new team member or customer with
                controlled access to Mandharam Drapes.
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-slate-500">
              <span className="font-medium text-slate-800">
                Mandharam Drapes · Admin Console
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-[10px] font-medium uppercase tracking-wide text-slate-100 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Secure workspace
              </span>
            </div>
          </header>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Left info / brand panel */}
            <aside className="lg:col-span-2 space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-5 py-5 sm:px-6 sm:py-6 text-slate-100">
                <div className="absolute inset-y-0 right-0 w-40 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_#4ade80_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#22c55e_0,_transparent_55%)]" />

                <div className="relative space-y-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1.5">
                      Onboarding overview
                    </p>
                    <p className="text-sm font-medium text-slate-100">
                      Create accounts with a consistent, high-end experience.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-[11px]">
                    <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 backdrop-blur-sm">
                      <p className="text-slate-300">Default role</p>
                      <p className="mt-1 text-xs font-semibold text-emerald-300">
                        Customer
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 backdrop-blur-sm">
                      <p className="text-slate-300">Access level</p>
                      <p className="mt-1 text-xs font-semibold text-slate-100">
                        Restricted
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 backdrop-blur-sm">
                      <p className="text-slate-300">Security</p>
                      <p className="mt-1 text-xs font-semibold text-emerald-300">
                        Enforced login
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[11px] text-slate-300 pt-1">
                    <span className="mt-[3px] h-4 w-4 rounded-full border border-emerald-400/60 flex items-center justify-center text-[9px] text-emerald-300">
                      ✓
                    </span>
                    <p>
                      Share credentials securely and ask the user to reset their
                      password on first login for best practice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-4 sm:px-5 sm:py-5 text-xs text-slate-600 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Smart onboarding tips
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">
                    Recommended
                  </span>
                </div>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Use unique email and phone number for each user.</li>
                  <li>Reserve the “Admin” role for trusted internal staff.</li>
                  <li>
                    For customers, prefer the “Customer” role with limited and
                    safe access.
                  </li>
                  <li>
                    Keep passwords temporary and encourage password updates on
                    first login.
                  </li>
                </ul>
              </div>
            </aside>

            {/* Right form panel */}
            <section className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm">
                <form
                  onSubmit={handleSubmit}
                  className="p-5 sm:p-6 lg:p-7 space-y-7"
                  autoComplete="off"
                >
                  {/* Form header */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        User details
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        These details will be used for sign-in and
                        communication.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2 py-1">
                        Step 1 of 1
                      </span>
                    </div>
                  </div>

                  {/* Full name */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="username"
                        className="text-xs font-medium text-slate-700"
                      >
                        Full name
                      </label>
                      <span className="text-[10px] text-slate-400">
                        As it should appear in the system
                      </span>
                    </div>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="block w-full h-11 rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 text-sm text-slate-900
                        placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0
                        focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-medium text-slate-700"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="user@example.com"
                        className="block w-full h-11 rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 text-sm text-slate-900
                          placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0
                          focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
                      />
                      <p className="text-[11px] text-slate-500">
                        This will be used as the primary login ID and for
                        updates.
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="text-xs font-medium text-slate-700"
                      >
                        Phone number
                      </label>
                      <input
                        id="phone"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=" Mobile number"
                        className="block w-full h-11 rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 text-sm text-slate-900
                          placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0
                          focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
                      />
                    </div>
                  </div>

                  {/* Security & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Password */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="password"
                        className="text-xs font-medium text-slate-700"
                      >
                         Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Minimum 6 Characters"
                          className="block w-full h-11 rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 pr-9 text-sm text-slate-900
                            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0
                            focus:ring-emerald-500/80 focus:border-emerald-500/80 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-emerald-600"
                        >
                          {showPassword ? (
                            <FaEyeSlash className="text-sm" />
                          ) : (
                            <FaEye className="text-sm" />
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Share this once and ask the user to change it after
                        first login.
                      </p>
                    </div>

                    {/* Role selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-700">
                        Role & access
                      </label>
                      <div className="inline-flex rounded-full border border-slate-200 bg-slate-50/60 p-1 text-xs sm:text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              role: "customer",
                            }))
                          }
                          className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                            formData.role === "customer"
                              ? "bg-slate-900 text-slate-50 shadow-sm"
                              : "text-slate-600 hover:bg-white"
                          }`}
                        >
                          <span className="text-[11px]">👤</span>
                          Customer
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              role: "admin",
                            }))
                          }
                          className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                            formData.role === "admin"
                              ? "bg-slate-900 text-slate-50 shadow-sm"
                              : "text-slate-600 hover:bg-white"
                          }`}
                        >
                          <span className="text-[11px]">🛡️</span>
                          Admin
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Admins have extended access. Assign only to trusted
                        internal members.
                      </p>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-[11px] text-slate-500 max-w-xs">
                      You can edit, suspend, or deactivate this user later from
                      the user list.
                    </p>
                    <div className="flex items-center gap-3 justify-end">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          setFormData({
                            username: "",
                            email: "",
                            phone: "",
                            password: "",
                            role: "",
                          })
                        }
                        className="text-xs sm:text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition disabled:opacity-60"
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2
                          px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-medium rounded-lg
                          bg-slate-900 text-white hover:bg-slate-800
                          focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-slate-900
                          disabled:opacity-70 disabled:cursor-not-allowed transition"
                      >
                        {loading ? "Adding user…" : "Add user"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
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

export default AddUser;
