//proper working login with localstorage.

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion"; // for fade-in animation
// import { domainUrl } from "../utils/constant";
// import { useCart } from "../context/CartContext";

// // --- BRAND COLOR PALETTE (Modimal Inspired) ---
// const DEEP_GREEN = "#34433d"; // Dark background
// const ACCENT_GREEN = "#dbe7cf"; // Light accent
// const HOVER_GREEN = "#4a5c53"; // Button hover
// // ------------------------------------------------

// const Login = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Redirect if already logged in
//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (token) {
//       navigate(storedRole === "admin" ? "/admindashboard" : "/", { replace: true });
//     }
//   }, [token, navigate]);

//   // ---------------- STATE ----------------
//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ---------------- HANDLERS ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSubmit(e);
//   };

//   // ---------------- VALIDATION ----------------
//   const validateForm = () => {
//     const { emailOrPhone, password } = formData;

//     if (!emailOrPhone.trim() || !password.trim())
//       return "Please fill in all fields.";

//     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
//     const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

//     if (!isEmail && !isPhone)
//       return "Enter a valid email or 10-digit phone number.";

//     if (password.length < 3)
//       return "Password must be at least 3 characters long.";

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

//       const res = await axios.post(`${domainUrl}/auth/login`, {
//         email: formData.emailOrPhone,
//         password: formData.password,
//       });

//       const { token, role, message } = res.data;
//       // const {notifyAuthChange} = await useCart();
//       localStorage.setItem("token", token);
//       // await notifyAuthChange(); // Notify auth change to update cart context
//       localStorage.setItem("role", role);

//       toast.success(message || "Login successful!", {
//         icon: "✅",
//         style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 },
//       });

//       setTimeout(() => {
//         navigate(role === "admin" ? "/admindashboard" : "/", { replace: true });
//       }, 1200);
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         (err.response?.status === 400
//           ? "Invalid email or password."
//           : "Server error. Please try again later.");

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
//             Sign in to your account
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             onKeyDown={handleKeyPress}
//             className="flex flex-col gap-4"
//           >
//             {/* Email or Phone */}
//             <input
//               type="text"
//               name="emailOrPhone"
//               value={formData.emailOrPhone}
//               onChange={handleChange}
//               placeholder="Email or Phone"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5
//                          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
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
//                            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
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
//               {loading ? <ClipLoader color="white" size={18} /> : "Login"}
//             </button>
//           </form>

//           {/* Signup link */}
//           <div className="mt-5 text-sm text-center text-gray-700">
//             Don’t have an account?{" "}
//             <Link
//               to="/signup"
//               className="font-semibold hover:underline"
//               style={{ color: DEEP_GREEN }}
//             >
//               Create Account
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

// export default Login;

//with Cookies and without Localstorage//generated by chatgpt

// import React, { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import { motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../utils/api";

// const DEEP_GREEN = "#34433d";
// const ACCENT_GREEN = "#dbe7cf";
// const HOVER_GREEN = "#4a5c53";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);

//   //  Check if already logged in
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await api.get("/auth/status");
//         if (res.data.isLoggedIn) {
//           const role = res.data.role;
//           window.location.href = role === "admin" ? "/admindashboard" : "/";
//         }
//       } catch (err) {
//         console.log("Auth check failed");
//       } finally {
//         setIsChecking(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const { emailOrPhone, password } = formData;
//     if (!emailOrPhone || !password) return "Please fill in all fields.";
//     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
//     const isPhone = /^[0-9]{10}$/.test(emailOrPhone);
//     if (!isEmail && !isPhone)
//       return "Enter a valid email or 10-digit phone number.";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     const error = validateForm();
//     if (error) return toast.error(error);

//     try {
//       setLoading(true);
//       const res = await api.post("/auth/login", {
//         email: formData.emailOrPhone,
//         password: formData.password,
//       });

//       toast.success(res.data.message || "Login successful!");
//       setTimeout(() => {
//         const role = res.data.role;
//         window.location.href = role === "admin" ? "/admindashboard" : "/";
//       }, 500);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Invalid email or password. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isChecking)
//     return (
//       <div
//         className="flex items-center justify-center h-screen"
//         style={{ backgroundColor: DEEP_GREEN }}
//       >
//         <ClipLoader color={ACCENT_GREEN} />
//       </div>
//     );

//   return (
//     <>
//       <div
//         className="flex items-center justify-center h-screen px-4"
//         style={{ backgroundColor: DEEP_GREEN }}
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
//         >
//           <h1
//             className="text-2xl font-extrabold text-center mb-1"
//             style={{ color: DEEP_GREEN }}
//           >
//             Welcome to Mandaram Drapes
//           </h1>
//           <p className="text-gray-600 text-center text-base mb-6">
//             Sign in to your account
//           </p>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input
//               type="text"
//               name="emailOrPhone"
//               value={formData.emailOrPhone}
//               onChange={handleChange}
//               placeholder="Email or Phone"
//               className="border rounded-md px-4 py-2 focus:ring-green-400"
//             />
//             <div className="relative w-full">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="border rounded-md px-4 py-2 pr-10 focus:ring-green-400 w-full"
//               />
//               <span
//                 onClick={() => setShowPassword((p) => !p)}
//                 className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full h-[45px] mt-3 font-semibold rounded-md shadow-md transition disabled:opacity-70 ${
//                 loading
//                   ? "bg-gray-400"
//                   : "bg-[#34433d] hover:bg-[#4a5c53] text-[#dbe7cf]"
//               }`}
//             >
//               {loading ? <ClipLoader size={18} color="white" /> : "Login"}
//             </button>
//           </form>

//           <div className="mt-5 text-sm text-center text-gray-700">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="font-semibold hover:underline">
//               Create Account
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       <ToastContainer transition={Slide} />
//     </>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import api from "../utils/api"; //  import axios instance

// const DEEP_GREEN = "#34433d";
// const ACCENT_GREEN = "#dbe7cf";
// const HOVER_GREEN = "#4a5c53";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ---------------- HANDLERS ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSubmit(e);
//   };

//   // ---------------- VALIDATION ----------------
//   const validateForm = () => {
//     const { emailOrPhone, password } = formData;

//     if (!emailOrPhone.trim() || !password.trim())
//       return "Please fill in all fields.";

//     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
//     const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

//     if (!isEmail && !isPhone)
//       return "Enter a valid email or 10-digit phone number.";

//     if (password.length < 3)
//       return "Password must be at least 3 characters long.";

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

//       const res = await api.post("/auth/login", {
//         email: formData.emailOrPhone,
//         password: formData.password,
//       });

//       const { role, message } = res.data;
//       console.log("resssss",res.data)

//       toast.success(message || "Login successful!", {
//         icon: "✅",
//         style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 },
//       });

//       setTimeout(() => {
//         navigate(role === "admin" ? "/admindashboard" : "/", { replace: true });
//       }, 1200);
//       // localStorage.setItem("role",role)
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         "Login failed. Please check your credentials.";
//       toast.error(msg, {
//         icon: "❌",
//         style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

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
//             Sign in to your account
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             onKeyDown={handleKeyPress}
//             className="flex flex-col gap-4"
//           >
//             <input
//               type="text"
//               name="emailOrPhone"
//               value={formData.emailOrPhone}
//               onChange={handleChange}
//               placeholder="Email or Phone"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5
//                          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//             />

//             <div className="relative w-full">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10
//                            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

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
//               {loading ? <ClipLoader color="white" size={18} /> : "Login"}
//             </button>
//           </form>

//           <div className="mt-5 text-sm text-center text-gray-700">
//             Don’t have an account?{" "}
//             <Link
//               to="/signup"
//               className="font-semibold hover:underline"
//               style={{ color: DEEP_GREEN }}
//             >
//               Create Account
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         transition={Slide}
//       />
//     </>
//   );
// };

// export default Login;

//proper working with cookies

// "use client";

// import React, { useState,useEffect } from "react"; // Removed useEffect as it was unused
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import api from "../utils/api"; // import axios instance
// import { useAuth } from "../context/AuthContext";

// const DEEP_GREEN = "#34433d";
// const ACCENT_GREEN = "#dbe7cf";
// const HOVER_GREEN = "#4a5c53";

// const Login = () => {
//   const navigate = useNavigate();
//   const { user, checkAuthStatus } = useAuth()
//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//         if (!user.isInitialLoad && user.isAuthenticated) {
//             navigate(user.role === "admin" ? "/admindashboard" : "/", { replace: true });
//         }
//     }, [user.isInitialLoad, user.isAuthenticated, user.role, navigate]);

//   // ---------------- HANDLERS ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSubmit(e);
//   };

//   // ---------------- VALIDATION ----------------
//   const validateForm = () => {
//     const { emailOrPhone, password } = formData;

//     if (!emailOrPhone.trim() || !password.trim())
//       return "Please fill in all fields.";

//     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
//     const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

//     if (!isEmail && !isPhone)
//       return "Enter a valid email or 10-digit phone number.";

//     if (password.length < 3)
//       return "Password must be at least 3 characters long.";

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

//       const res = await api.post("/auth/login", {
//         email: formData.emailOrPhone,
//         password: formData.password,
//       });

//       const { role, message } = res.data;
//       console.log("resssss", res.data);

//       // ------------------------------------------------------------------
//       // *** MODIFICATION HERE: Set the role in localStorage ***
//       localStorage.setItem("role", role);
//       await checkAuthStatus();
//       // ------------------------------------------------------------------

//       toast.success(message || "Login successful!", {
//         icon: "✅",
//         style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 },
//       });

//       setTimeout(() => {
//         // We ensure a default navigation to the customer dashboard ("/") if role is missing or not 'admin'
//         navigate(role === "admin" ? "/admindashboard" : "/", { replace: true });
//       }, 1200);
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         "Login failed. Please check your credentials.";
//       toast.error(msg, {
//         icon: "❌",
//         style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (user.isInitialLoad) { // Guard against rendering the form while checking auth status
//         return <ClipLoader color="white" size={35} />;
//     }

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
//             Sign in to your account
//           </p>

//           <form
//             onSubmit={handleSubmit}
//             onKeyDown={handleKeyPress}
//             className="flex flex-col gap-4"
//           >
//             <input
//               type="text"
//               name="emailOrPhone"
//               value={formData.emailOrPhone}
//               onChange={handleChange}
//               placeholder="Email or Phone"
//               className="text-sm border border-gray-300 rounded-md px-4 py-2.5
//                          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//             />

//             <div className="relative w-full">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10
//                             focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

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
//               {loading ? <ClipLoader color="white" size={18} /> : "Login"}
//             </button>
//           </form>

//           <div className="mt-5 text-sm text-center text-gray-700">
//             Don’t have an account?{" "}
//             <Link
//               to="/signup"
//               className="font-semibold hover:underline"
//               style={{ color: DEEP_GREEN }}
//             >
//               Create Account
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         transition={Slide}
//       />
//     </>
//   );
// };

// export default Login;

// with otp working codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import api from "../utils/api";
// import { useAuth } from "../context/AuthContext";

// const DEEP_GREEN = "#34433d";
// const ACCENT_GREEN = "#dbe7cf";
// const HOVER_GREEN = "#4a5c53";

// export default function Login() {
//   const navigate = useNavigate();
//   const { user, checkAuthStatus } = useAuth();

//   const [email, setEmail] = useState("");
//   const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
//   const [loading, setLoading] = useState(false);

//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const otpRefs = useRef([]);

//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     if (!user.isInitialLoad && user.isAuthenticated) {
//       navigate(user.role === "admin" ? "/admindashboard" : "/", { replace: true });
//     }
//   }, [user]);

//   // Timer countdown
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   // --------------------
//   // SEND OTP
//   // --------------------
//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       toast.error("Please enter your email.");
//       return;
//     }

//     const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     if (!isValidEmail) {
//       toast.error("Enter a valid email address.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/auth/sendOtp", { email });

//       toast.success("OTP sent to your email!", {
//         icon: "📩",
//         style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 }
//       });

//       setStep(2);
//       setTimer(300);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------
//   // OTP INPUT HANDLING
//   // -------------------------
//   const handleOtpChange = (value, index) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       otpRefs.current[index + 1].focus();
//     }
//   };

//   const handleOtpKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       otpRefs.current[index - 1].focus();
//     }
//   };

//   // -------------------------
//   // VERIFY OTP
//   // -------------------------
//   const handleVerifyOtp = async () => {
//     const code = otp.join("");

//     if (code.length !== 6) {
//       toast.error("Enter the full 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post("/auth/verifyOtp", {
//         email,
//         otp: code,
//       });

//       toast.success("Login successful!", {
//         icon: "🎉",
//         style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 }
//       });

//       await checkAuthStatus();

//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 1200);

//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid or expired OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------
//   // RESEND OTP
//   // -------------------------
//   const handleResend = async () => {
//     if (timer > 0) return;

//     try {
//       setLoading(true);
//       await api.post("/auth/sendOtp", { email });
//       toast.success("OTP resent!");
//       setTimer(300);
//     } catch (err) {
//       toast.error("Failed to resend OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center h-screen px-4" style={{ backgroundColor: DEEP_GREEN }}>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
//         >
//           <h1 className="text-2xl font-extrabold text-center mb-1" style={{ color: DEEP_GREEN }}>
//             Welcome to Mandaram Drapes
//           </h1>
//           <p className="text-gray-600 text-center text-base mb-6">
//             {step === 1 ? "Sign in with email OTP" : "Enter your verification code"}
//           </p>

//           {/* STEP 1: EMAIL */}
//           {step === 1 && (
//             <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5 w-full focus:ring-2 focus:ring-green-400"
//               />

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
//                 style={{ backgroundColor: DEEP_GREEN }}
//               >
//                 {loading ? <ClipLoader color="white" size={18} /> : "Send OTP"}
//               </button>
//             </form>
//           )}

//           {/* STEP 2: OTP */}
//           {step === 2 && (
//             <div className="flex flex-col items-center gap-5">
//               <div className="flex justify-center gap-2">
//                 {otp.map((digit, i) => (
//                   <input
//                     key={i}
//                     ref={(el) => (otpRefs.current[i] = el)}
//                     value={digit}
//                     maxLength="1"
//                     onChange={(e) => handleOtpChange(e.target.value, i)}
//                     onKeyDown={(e) => handleOtpKeyDown(e, i)}
//                     className="w-10 h-12 border text-center text-xl rounded-md focus:ring-2 focus:ring-green-400"
//                   />
//                 ))}
//               </div>

//               <button
//                 onClick={handleVerifyOtp}
//                 disabled={loading}
//                 className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
//                 style={{ backgroundColor: DEEP_GREEN }}
//               >
//                 {loading ? <ClipLoader color="white" size={18} /> : "Verify OTP"}
//               </button>

//               <p className="text-sm text-gray-600">
//                 Didn’t receive the code?{" "}
//                 <button
//                   onClick={handleResend}
//                   disabled={timer > 0}
//                   className="font-semibold underline"
//                   style={{ color: DEEP_GREEN }}
//                 >
//                   {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
//                 </button>
//               </p>
//             </div>
//           )}

//           <div className="mt-5 text-sm text-center text-gray-700">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="font-semibold underline" style={{ color: DEEP_GREEN }}>
//               Create Account
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       <ToastContainer position="top-center" autoClose={2000} transition={Slide} />
//     </>
//   );
// }

// blue colorcode with update ui

// import React, { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import api from "../utils/api";
// import { useAuth } from "../context/AuthContext";

// // --- BRAND COLOR PALETTE (Kept the same) ---
// const DEEP_GREEN = "#34433d"; // Dark background
// const ACCENT_GREEN = "#dbe7cf"; // Light accent
// const HOVER_GREEN = "#4a5c53"; // Button hover

// // --- Assuming the backend requires email and password now, based on the image ---

// export default function Login() {
//     const navigate = useNavigate();
//     const { user, checkAuthStatus } = useAuth(); // Using Auth Context

//     // ---------------- STATE ----------------
//     const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     // 🚨 Redirection Check (Using Context)
//     useEffect(() => {
//         if (!user.isInitialLoad && user.isAuthenticated) {
//             navigate(user.role === "admin" ? "/admindashboard" : "/", { replace: true });
//         }
//     }, [user.isInitialLoad, user.isAuthenticated, user.role, navigate]);

//     // ---------------- HANDLERS & VALIDATION ----------------
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const validateForm = () => {
//         const { emailOrPhone, password } = formData;
//         if (!emailOrPhone.trim() || !password.trim())
//             return "Please fill in all fields.";

//         const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
//         if (!isEmail)
//             return "Enter a valid email address."; // Assuming OTP is removed, we expect email

//         if (password.length < 3)
//             return "Password must be at least 3 characters long.";
//         return null;
//     };

//     // ---------------- SUBMIT ----------------
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationError = validateForm();
//         if (validationError) {
//             toast.error(validationError, { icon: "❌", style: { background: "#ffeded", color: "#c62828", fontWeight: 500 } });
//             return;
//         }

//         try {
//             setLoading(true);

//             // POST to login endpoint
//             const res = await api.post("/auth/login", {
//                 email: formData.emailOrPhone,
//                 password: formData.password,
//             }, { withCredentials: true });

//             const { role, message } = res.data;

//             // Update role in localStorage and context immediately
//             localStorage.setItem("role", role);
//             await checkAuthStatus();

//             toast.success(message || "Login successful!", {
//                 icon: "✅",
//                 style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 },
//             });

//             setTimeout(() => {
//                 // Redirection is handled by the useEffect, but this ensures a clean exit
//                 navigate(role === "admin" ? "/admindashboard" : "/", { replace: true });
//             }, 1200);

//         } catch (err) {
//             const msg = err.response?.data?.message || "Invalid credentials or server error.";
//             toast.error(msg, { icon: "❌", style: { background: "#ffeded", color: "#c62828", fontWeight: 500 } });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Show loading spinner while checking initial auth status
//     if (user.isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen px-4" style={{ backgroundColor: DEEP_GREEN }}>
//                 <ClipLoader color="white" size={35} />
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="flex min-h-screen">

//                 {/* --- LEFT SECTION: Decorative Background (Matches Image) --- */}
//                 <div
//                     className="hidden lg:flex w-1/2 p-10 items-end justify-center"
//                     style={{ background: 'linear-gradient(135deg, #A855F7, #7C3AED, #3B82F6)', // Purple/Blue Gradient
//                              clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' // Angled right edge
//                     }}
//                 >
//                     <motion.div
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="w-full max-w-md text-white text-left mb-16"
//                     >
//                    <span className="text-sm font-light opacity-80">Step into style</span>
//                       <h2 className="text-4xl font-extrabold mt-1 leading-tight">
//                             Discover your ultimate fashion destination
//                       </h2>

//                     </motion.div>
//                 </div>

//                 {/* --- RIGHT SECTION: Login Form --- */}
//                 <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 p-8">
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.2 }}
//                         className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md"
//                     >
//                         {/* Logo/Icon (Matching the image) */}
//                         {/* <div className="flex justify-center mb-6">
//                             <span className="text-4xl font-extrabold" style={{ color: DEEP_GREEN }}>*</span>
//                         </div> */}

//                         <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-1">
//                             Sign in to your account
//                         </h1>
//                         <p className="text-gray-600 text-center text-sm mb-8">
//                             Access your tasks, notes, and projects anytime.
//                         </p>

//                         <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//                             {/* Email/Phone */}
//                             <label htmlFor="emailOrPhone" className="text-sm font-medium text-gray-700">Your email</label>
//                             <input
//                                 id="emailOrPhone"
//                                 type="text"
//                                 name="emailOrPhone"
//                                 value={formData.emailOrPhone}
//                                 onChange={handleChange}
//                                 placeholder="name@example.com"
//                                 className="text-sm border border-gray-300 rounded-md px-4 py-2.5
//                                           focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 w-full"
//                             />

//                             {/* Password */}
//                             <label htmlFor="password" className="text-sm font-medium text-gray-700 mt-2">Password</label>
//                             <div className="relative w-full">
//                                 <input
//                                     id="password"
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     placeholder="••••••••"
//                                     className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10
//                                               focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 w-full"
//                                 />
//                                 <span
//                                     onClick={() => setShowPassword((prev) => !prev)}
//                                     className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
//                                 >
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </span>
//                             </div>

//                             {/* Submit Button (Purple/Indigo color to match image) */}
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full h-[45px] mt-6 font-semibold rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
//                                 style={{ backgroundColor: '#6366F1', color: 'white' }} // Indigo-500/600
//                                 onMouseEnter={(e) => {
//                                     if (!loading) e.currentTarget.style.backgroundColor = '#4F46E5';
//                                 }}
//                                 onMouseLeave={(e) => {
//                                     if (!loading) e.currentTarget.style.backgroundColor = '#6366F1';
//                                 }}
//                             >
//                                 {loading ? <ClipLoader color="white" size={18} /> : "Get Started"}
//                             </button>

//                             {/* Social Login Divider (Matching the image) */}
//                              <div className="flex items-center my-4">
//                                 <div className="flex-grow border-t border-gray-300"></div>
//                                 <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">or continue with</span>
//                                 <div className="flex-grow border-t border-gray-300"></div>
//                             </div>

//                             {/* Social Login Buttons (Placeholders matching image)
//                             <div className="flex justify-center gap-3">
//                                 <button type="button" className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
//                                     Bē
//                                 </button>
//                                 <button type="button" className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
//                                     G
//                                 </button>
//                                 <button type="button" className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
//                                     f
//                                 </button>
//                             </div> */}

//                         </form>

//                         {/* Signup link */}
//                         <div className="mt-8 text-sm text-center text-gray-700">
//                             Don’t have an account?{" "}
//                             <Link
//                                 to="/signup"
//                                 className="font-semibold hover:underline"
//                                 style={{ color: '#6366F1' }} // Indigo color
//                             >
//                                 Sign up
//                             </Link>
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>

//             {/* Toast Container */}
//             <ToastContainer
//                 position="top-center"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 draggable
//                 transition={Slide}
//             />
//         </>
//     );
// };

// updated code with new ui with mandaram color code

import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import logo123 from "../assets/logo.png";

// BRAND COLORS
const DEEP_GREEN = "#34433d";
const ACCENT_GREEN = "#dbe7cf";
const HOVER_GREEN = "#4a5c53";
const LIGHT_BACKGROUND = "#f9f9f9";

export default function Login() {
  const navigate = useNavigate();
  const { user, checkAuthStatus } = useAuth();

  const [step, setStep] = useState(1); // 1 = login form, 2 = OTP form
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [showPassword, setShowPassword] = useState(false);

  const [timer, setTimer] = useState(0);

  //forget password

  const [resetEmail, setResetEmail] = useState("");
  const [forgotStep, setForgotStep] = useState(0); // 0=none, 1=email, 2=otp, 3=new password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect after login
  useEffect(() => {
    if (!user.isInitialLoad && user.isAuthenticated) {
      navigate(user.role === "admin" ? "/admindashboard" : "/", {
        replace: true,
      });
    }
  }, [user]);

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // STEP 1 — LOGIN SUBMIT
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      if (res.data.step === "VERIFY_OTP") {
        toast.success("OTP sent to your email");
        setOtp(["", "", "", "", "", ""]);
        setStep(2); // Switch UI
        setTimer(30); // Optional timer
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async () => {
    if (!resetEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", {
        email: resetEmail,
      });
      toast.success("OTP sent to your email");
      setForgotStep(2);
      setTimer(30);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // OTP CHANGE
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Enter full OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login/verify", { email, otp: code });

      toast.success("Login successful!");

      await checkAuthStatus();
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP

  const handleResendOtp = async () => {
    if (timer > 0) return;

    try {
      setLoading(true);
      await api.post("/auth/login", { email, password });
      toast.success("OTP resent");
      setTimer(300);
    } catch {
      toast.error("OTP resend failed");
    } finally {
      setLoading(false);
    }
  };

  const resetLoginFields = () => {
    setEmail("");
    setPassword("");
    setOtp(["", "", "", "", "", ""]);
  };

  const handleVerifyResetOtp = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Please enter full OTP");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/verify-reset-otp", {
        email: resetEmail,
        otp: code,
      });

      toast.success("OTP verified");
      setForgotStep(3); // move to password reset step
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill both fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/reset-password", { newPassword });

      toast.success("Password reset successfully");
      resetLoginFields();
      setForgotStep(0);
      setStep(1); // back to login
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#f9f9f9] overflow-hidden">
        {/* LEFT SECTION */}
        <div
          className="hidden  lg:flex w-1/2 relative items-center justify-center px-10"
          style={{
            backgroundColor: DEEP_GREEN,
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-md"
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
              Discover your ultimate sustainable fashion destination
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
              <img
                className="h-14 w-14 object-contain"
                src={logo123}
                alt="Logo"
              />
            </div>

            <h2
              className="text-2xl font-extrabold text-center"
              style={{ color: DEEP_GREEN }}
            >
              Sign in to your account
            </h2>
            <p className="text-gray-400 text-center text-sm mt-2">
              {step === 1 &&
                forgotStep === 0 &&
                "Welcome back! Please enter your details."}
              {forgotStep === 2 && `We sent an OTP to ${resetEmail}`}
              {step === 2 && `We sent an OTP to ${email}`}
            </p>

            {/* STEP 1 — LOGIN FORM */}
            {step === 1 && (
              <form
                onSubmit={handleLoginSubmit}
                className="flex flex-col gap-4"
              >
                <label className="text-sm font-medium text-gray-700 mt-9">
                  Your email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="border border-gray-300 rounded-md px-4 py-2.5 text-sm"
                />

                <label className="text-sm font-medium text-gray-700 mt-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    className="border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm w-full"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <p
                  className="text-sm text-right cursor-pointer text-blue-700"
                  onClick={() => {
                    setForgotStep(1);
                    setStep(null); // hide login UI
                  }}
                >
                  Forgot password?
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[45px] mt-6 font-semibold rounded-md shadow-md text-white"
                  style={{
                    backgroundColor: DEEP_GREEN,
                  }}
                >
                  {loading ? (
                    <ClipLoader color="white" size={18} />
                  ) : (
                    "Get Started"
                  )}
                </button>
              </form>
            )}

            {step === 2 && forgotStep === 0 && (
              <div className="flex flex-col items-center gap-5 mt-8">
                <p className="text-gray-700">
                  Enter the 6-digit OTP sent to {email}
                </p>

                <div className="flex justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      value={digit}
                      maxLength="1"
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      className="w-10 h-12 border text-center text-xl rounded-md"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
                  style={{ backgroundColor: DEEP_GREEN }}
                >
                  {loading ? (
                    <ClipLoader color="white" size={18} />
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <p className="text-sm text-gray-600 mt-2">
                  Didn’t receive the code?
                  <button
                    onClick={handleResendOtp}
                    className="ml-1 underline font-semibold"
                    style={{ color: DEEP_GREEN }}
                    disabled={timer > 0}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                  </button>
                </p>
              </div>
            )}

            {forgotStep === 1 && (
              <div className="flex flex-col gap-4 mt-6">
                <label className="text-sm font-medium text-gray-700">
                  Enter your registered email
                </label>

                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="border border-gray-300 rounded-md px-4 py-2.5 text-sm"
                />

                <button
                  onClick={handleForgotSubmit}
                  disabled={loading}
                  className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
                  style={{ backgroundColor: DEEP_GREEN }}
                >
                  {loading ? (
                    <ClipLoader color="white" size={18} />
                  ) : (
                    "Send OTP"
                  )}
                </button>

                <button
                  className="text-sm underline"
                  onClick={() => {
                    setForgotStep(0);
                    setStep(1);
                  }}
                >
                  Back to Login
                </button>
              </div>
            )}

            {/* STEP 2 — OTP FORM */}
            {forgotStep === 2 && (
              <div className="flex flex-col items-center gap-5 mt-8">
                <p className="text-gray-700">
                  Enter the 6-digit code sent to {resetEmail}
                </p>

                <div className="flex justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      value={digit}
                      maxLength="1"
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      className="w-10 h-12 border text-center text-xl rounded-md"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyResetOtp}
                  disabled={loading}
                  className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
                  style={{ backgroundColor: DEEP_GREEN }}
                >
                  {loading ? (
                    <ClipLoader color="white" size={18} />
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <p className="text-sm text-gray-600">
                  Didn’t receive the code?
                  <button
                    onClick={handleResendOtp}
                    disabled={timer > 0}
                    className="ml-1 font-semibold underline"
                    style={{ color: DEEP_GREEN }}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                  </button>
                </p>
              </div>
            )}

            {forgotStep === 3 && (
              <div className="flex flex-col gap-4 mt-6">
                {/* NEW PASSWORD */}
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm w-full"
                  />
                  <span
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm w-full"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button
                  onClick={handleResetPassword}
                  className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
                  style={{ backgroundColor: DEEP_GREEN }}
                >
                  Reset Password
                </button>
              </div>
            )}

            {/* SIGNUP LINK */}
            <div className="text-sm text-center mt-6 text-gray-700">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold hover:underline"
                style={{ color: DEEP_GREEN }}
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Slide}
      />
    </>
  );
}
