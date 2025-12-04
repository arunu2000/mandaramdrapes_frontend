// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import { motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";
// import { domainUrl } from "../utils/constant";

// // --- BRAND COLOR PALETTE (Modimal Inspired) ---
// const DEEP_GREEN = "#34433d"; // Dark background
// const ACCENT_GREEN = "#dbe7cf"; // Light accent
// const HOVER_GREEN = "#4a5c53"; // Hover color
// // ------------------------------------------------

// const Signup = () => {
//   const navigate = useNavigate();

//   // ---------------- STATE ----------------
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ---------------- HANDLERS ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSubmit(e);
//   };

//   // ---------------- VALIDATION ----------------
//   const validateForm = () => {
//     const { username, email, phone, password, confirmPassword } = formData;

//     if (!username.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
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

//     if (password !== confirmPassword) {
//       return "Passwords do not match.";
//     }

//     return null;
//   };

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationError = validateForm();
//     if (validationError) {
//       toast.error(validationError, {
//         icon: "❌",
//         style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(`${domainUrl}/auth/signup`, formData);

//       toast.success(res.data.message || "Account created successfully!", {
//         icon: "✅",
//         style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 },
//       });

//       // Reset form
//       setFormData({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//       });

//       // Redirect after short delay
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       const msg =
//         err.response?.data?.Error ||
//         err.response?.data?.message ||
//         "Signup failed. Please try again later.";

//       toast.error(msg, {
//         icon: "❌",
//         style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UI ----------------
//   return (
//     <>
//       <div
//         className="flex items-center justify-center h-screen px-4"
//         style={{ backgroundColor: DEEP_GREEN }}
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
//         >
//           <h1
//             className="text-2xl font-extrabold text-center mb-1"
//             style={{ color: DEEP_GREEN }}
//           >
//             Welcome to Mandaram Drapes
//           </h1>
//           <p className="text-gray-600 text-center text-base mb-6">
//             Let’s create your account
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             onKeyDown={handleKeyPress}
//             className="flex flex-col gap-4"
//           >
//             {/* Username */}
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5
//                          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
//             />

//             {/* Email */}
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5
//                          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
//             />

//             {/* Phone */}
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5
//                          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
//             />

//             {/* Password */}
//             <div className="relative w-full">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10
//                            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Confirm Password */}
//             <div className="relative w-full">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10
//                            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
//               />
//               <span
//                 onClick={() => setShowConfirmPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-[45px] mt-3 font-semibold rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
//               style={{ backgroundColor: DEEP_GREEN, color: ACCENT_GREEN }}
//               onMouseEnter={(e) => {
//                 if (!loading) e.currentTarget.style.backgroundColor = HOVER_GREEN;
//               }}
//               onMouseLeave={(e) => {
//                 if (!loading) e.currentTarget.style.backgroundColor = DEEP_GREEN;
//               }}
//             >
//               {loading ? <ClipLoader color="white" size={18} /> : "Create Account"}
//             </button>
//           </form>

//           {/* Login link */}
//           <div className="mt-5 text-sm text-center text-gray-700">
//             Already have an account?{" "}
//             <Link
//               to="/"
//               className="font-semibold hover:underline"
//               style={{ color: DEEP_GREEN }}
//             >
//               Login
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer
//         position="top-center"
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

// export default Signup;

// with cookies And without Localstorage

// src/pages/Signup.jsx
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import { motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../utils/api"; // centralized axios instance

// // --- BRAND COLOR PALETTE (Modimal Inspired) ---
// const DEEP_GREEN = "#34433d"; // Dark background
// const ACCENT_GREEN = "#dbe7cf"; // Light accent
// const HOVER_GREEN = "#4a5c53"; // Hover color
// // ------------------------------------------------

// const Signup = () => {
//   const navigate = useNavigate();

//   // ---------------- STATE ----------------
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ---------------- HANDLERS ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSubmit(e);
//   };

//   // ---------------- VALIDATION ----------------
//   const validateForm = () => {
//     const { username, email, phone, password, confirmPassword } = formData;

//     if (!username.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
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

//     if (password !== confirmPassword) {
//       return "Passwords do not match.";
//     }

//     return null;
//   };

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return; // prevent double clicks

//     const validationError = validateForm();
//     if (validationError) {
//       toast.error(validationError, {
//         icon: "❌",
//         style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       //  Send signup request with cookies enabled automatically
//       const res = await api.post("/auth/signup", formData);

//       toast.success(res.data.message || "Account created successfully!", {
//         icon: "✅",
//         style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 },
//       });

//       // Reset form fields
//       setFormData({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//       });

//       // Redirect after short delay
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       const msg =
//         err.response?.data?.Error ||
//         err.response?.data?.message ||
//         (err.message === "Network Error"
//           ? "Unable to connect. Please check your internet connection."
//           : "Signup failed. Please try again later.");

//       toast.error(msg, {
//         icon: "❌",
//         style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UI ----------------
//   return (
//     <>
//       <div
//         className="flex items-center justify-center h-screen px-4"
//         style={{ backgroundColor: DEEP_GREEN }}
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
//         >
//           <h1
//             className="text-2xl font-extrabold text-center mb-1"
//             style={{ color: DEEP_GREEN }}
//           >
//             Welcome to Mandaram Drapes
//           </h1>
//           <p className="text-gray-600 text-center text-base mb-6">
//             Let’s create your account
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             onKeyDown={handleKeyPress}
//             className="flex flex-col gap-4"
//           >
//             {/* Username */}
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//             />

//             {/* Email */}
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//             />

//             {/* Phone */}
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//             />

//             {/* Password */}
//             <div className="relative w-full">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Confirm Password */}
//             <div className="relative w-full">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//               />
//               <span
//                 onClick={() => setShowConfirmPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full h-[45px] mt-3 font-semibold rounded-md shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed
//                 ${loading ? "bg-gray-400" : "bg-[#34433d] hover:bg-[#4a5c53] text-[#dbe7cf]"}`}
//             >
//               {loading ? <ClipLoader color="white" size={18} /> : "Create Account"}
//             </button>
//           </form>

//           {/* Login link */}
//           <div className="mt-5 text-sm text-center text-gray-700">
//             Already have an account?{" "}
//             <Link
//               to="/"
//               className="font-semibold hover:underline"
//               style={{ color: DEEP_GREEN }}
//             >
//               Login
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer
//         position="top-center"
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

// export default Signup;


////workinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg

// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import { motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";
// // Assuming api is an axios instance configured with { withCredentials: true }
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";

// // --- BRAND COLOR PALETTE (Modimal Inspired) ---
// const DEEP_GREEN = "#34433d";
// const ACCENT_GREEN = "#dbe7cf";
// const HOVER_GREEN = "#4a5c53";
// // ------------------------------------------------

// const Signup = () => {
//   const navigate = useNavigate();
//   // const { notifyAuthChange } = useCart(); // ---------------- STATE ----------------

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false); // ---------------- HANDLERS ----------------

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSubmit(e);
//   }; // ---------------- VALIDATION ----------------

//   const validateForm = () => {
//     const { username, email, phone, password, confirmPassword } = formData; // (Validation logic remains the same)
//     if (
//       !username.trim() ||
//       !email.trim() ||
//       !phone.trim() ||
//       !password.trim() ||
//       !confirmPassword.trim()
//     ) {
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
//     if (password !== confirmPassword) {
//       return "Passwords do not match.";
//     }
//     return null;
//   }; // ---------------- SUBMIT ----------------

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     const validationError = validateForm();
//     if (validationError) {
//       toast.error(validationError, {
//         icon: "❌",
//         style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const { confirmPassword, ...dataToSend } = formData; // Send signup request. Backend handles setting the JWT cookie.

//       const res = await api.post("/auth/signup", dataToSend);

//       // Your backend login/signup flow is unique: it attempts to set the cookie
//       // AND returns the new user data. We must infer the role from the response.
//       const user = res.data.AdminUser || res.data.user;
//       console.log("signupdata",user);
      
//       const role = user?.role || "user"; // 🚨 ACTION: Store the non-sensitive role for client-side routing

//       localStorage.setItem("role", role);
//       // notifyAuthChange(); // Refresh cart/header state //commented

//       toast.success(
//         res.data.message || "Account created and logged in successfully!",
//         {
//           icon: "✅",
//           style: {
//             background: ACCENT_GREEN,
//             color: DEEP_GREEN,
//             fontWeight: 600,
//           },
//         }
//       ); // Reset form fields

//       setFormData({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//       }); // Redirect based on the determined role

//       setTimeout(
//         () =>
//           navigate(role === "admin" ? "/admindashboard" : "/", {
//             replace: true,
//           }),
//         1500
//       );
//     } catch (err) {
//       const msg =
//         err.response?.data?.Error ||
//         err.response?.data?.message ||
//         "Signup failed. Please try again later.";

//       toast.error(msg, {
//         icon: "❌",
//         style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
//       });
//     } finally {
//       setLoading(false);
//     }
//   }; // ---------------- UI ----------------

//   return (
//     <>
//       {" "}
//       <div
//         className="flex items-center justify-center h-screen px-4"
//         style={{ backgroundColor: DEEP_GREEN }}
//       >
//         {" "}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
//         >
//           {" "}
//           <h1
//             className="text-2xl font-extrabold text-center mb-1"
//             style={{ color: DEEP_GREEN }}
//           >
//             Welcome to Mandaram Drapes{" "}
//           </h1>{" "}
//           <p className="text-gray-600 text-center text-base mb-6">
//             Let’s create your account{" "}
//           </p>{" "}
//           <form
//             onSubmit={handleSubmit}
//             onKeyDown={handleKeyPress}
//             className="flex flex-col gap-4"
//           >
//             {/* Username */}{" "}
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//             />
//             {/* Email */}{" "}
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//             />
//             {/* Phone */}{" "}
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//             />
//             {/* Password */}{" "}
//             <div className="relative w-full">
//               {" "}
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//               />{" "}
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
//               </span>{" "}
//             </div>
//             {/* Confirm Password */}{" "}
//             <div className="relative w-full">
//               {" "}
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//               />{" "}
//               <span
//                 onClick={() => setShowConfirmPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {" "}
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}{" "}
//               </span>{" "}
//             </div>
//             {/* Submit */}{" "}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full h-[45px] mt-3 font-semibold rounded-md shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed 
//                   ${loading ? "bg-gray-400" : "bg-[#34433d] hover:bg-[#4a5c53] text-[#dbe7cf]"}`}
//             >
//               {" "}
//               {loading ? (
//                 <ClipLoader color="white" size={18} />
//               ) : (
//                 "Create Account"
//               )}{" "}
//             </button>{" "}
//           </form>
//           {/* Login link */}{" "}
//           <div className="mt-5 text-sm text-center text-gray-700">
//             Already have an account? " "
//             <Link
//               to="/"
//               className="font-semibold hover:underline"
//               style={{ color: DEEP_GREEN }}
//             >
//               Login{" "}
//             </Link>{" "}
//           </div>{" "}
//         </motion.div>{" "}
//       </div>
//       {/* Toast Container */}{" "}
//       <ToastContainer
//         position="top-center"
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
//       />{" "}
//     </>
//   );
// };

// export default Signup;



//signup with updated new ui


import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast, Slide } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";
import logo123 from "../assets/logo.png";

// **BRAND COLORS**
const DEEP_GREEN = "#34433d";
const ACCENT_GREEN = "#dbe7cf";
const HOVER_GREEN = "#4a5c53";
const LIGHT_BACKGROUND = "#f9f9f9";

export default function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // FORM VALIDATION
  const validateForm = () => {
    const { username, email, phone, password, confirmPassword } = formData;

    if (!username || !email || !phone || !password || !confirmPassword) {
        return "Please fill in all fields.";
    }

    // Full Name
    if (!/^[a-zA-Z\s]{3,}$/.test(username)) {
        return "Name should contain only letters and at least 3 characters.";
    }

    // Strong Email Regex
    const strongEmailRegex =
        /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!strongEmailRegex.test(email.trim())) {
        return "Enter a valid email address.";
    }

    // India Mobile Number (6-9 start + 10 digits)
    const strongPhoneRegex = /^[6-9][0-9]{9}$/;

    if (!strongPhoneRegex.test(phone.trim())) {
        return "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.";
    }

    // Strong Password Rule
    // MEDIUM PASSWORD VALIDATION (letters + numbers, 6+ chars)
const mediumPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*()_+\-=!?.]{6,}$/;

if (!mediumPasswordRegex.test(password)) {
    return "Please create a strong password.";
}


    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }

    return null;
};



    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            toast.error(error, {
                icon: "❌",
                style: { background: "#ffeded", color: "#c62828" },
            });
            return;
        }

        try {
            setLoading(true);
            const { confirmPassword, ...dataToSend } = formData;

            const res = await api.post("/auth/signup", dataToSend);

            toast.success("Account created successfully!", {
                icon: "✅",
                style: { background: ACCENT_GREEN, color: DEEP_GREEN },
            });

            setTimeout(() => navigate("/", { replace: true }), 1200);

        } catch (err) {
            toast.error(
                err.response?.data?.Error ||
                err.response?.data?.message ||
                "Signup failed",
                {
                    icon: "❌",
                    style: { background: "#ffeded", color: "#c62828" },
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex min-h-screen  bg-[#f9f9f9] overflow-hidden">

                {/* LEFT SECTION (same as login) */}
                <div
                    className="hidden lg:flex w-1/2 relative items-center justify-center px-10"
                    style={{
                        backgroundColor: DEEP_GREEN,
                        clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-md"
                    >
                        <span
                            className="text-sm font-light"
                            style={{ color: ACCENT_GREEN }}
                        >
                            Step into classic style
                        </span>

                        <h2
                            className="text-4xl font-extrabold mt-2 leading-tight"
                            style={{ color: ACCENT_GREEN }}
                        >
                            Begin your journey with sustainable fashion
                        </h2>
                    </motion.div>
                </div>

                {/* RIGHT SECTION */}
                <div
                    className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10"
                    style={{ backgroundColor: LIGHT_BACKGROUND }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-md"
                    >
                        {/* LOGO */}
                        <div className="flex justify-center mb-6">
                            <img className="h-14 w-14 object-contain" src={logo123} alt="Logo" />
                        </div>

                        {/* TITLE */}
                        <h2
                            className="text-2xl font-extrabold text-center"
                            style={{ color: DEEP_GREEN }}
                        >
                            Create your account
                        </h2>

                        <p className="text-gray-600 text-center text-sm mt-2">
                            Join Mandaram Drapes today
                        </p>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">

                            <input
                                type="text"
                                name="username"
                                placeholder="Full Name"
                                value={formData.username}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-4 py-2.5 text-sm"
                            />

                            <input
                                type="text"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-4 py-2.5 text-sm"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-4 py-2.5 text-sm"
                            />

                            {/* PASSWORD */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm w-full"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm w-full"
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-[45px] font-semibold rounded-md shadow-md text-white mt-3"
                                style={{ backgroundColor: DEEP_GREEN }}
                            >
                                {loading ? <ClipLoader color="white" size={18} /> : "Create Account"}
                            </button>
                        </form>

                        {/* LOGIN LINK */}
                        <div className="text-sm text-center mt-6 text-gray-700">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="font-semibold hover:underline"
                                style={{ color: DEEP_GREEN }}
                            >
                                Login
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={2000} transition={Slide} />
        </>
    );
}


