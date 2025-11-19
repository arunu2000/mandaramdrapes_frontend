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





// with otp 


"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import api from "../utils/api"; 
import { useAuth } from "../context/AuthContext";

const DEEP_GREEN = "#34433d";
const ACCENT_GREEN = "#dbe7cf";
const HOVER_GREEN = "#4a5c53";

export default function Login() {
  const navigate = useNavigate();
  const { user, checkAuthStatus } = useAuth();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!user.isInitialLoad && user.isAuthenticated) {
      navigate(user.role === "admin" ? "/admindashboard" : "/", { replace: true });
    }
  }, [user]);

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // --------------------
  // SEND OTP
  // --------------------
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/sendOtp", { email });

      toast.success("OTP sent to your email!", {
        icon: "📩",
        style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 }
      });

      setStep(2);
      setTimer(30);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // OTP INPUT HANDLING
  // -------------------------
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

  // -------------------------
  // VERIFY OTP
  // -------------------------
  const handleVerifyOtp = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Enter the full 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verifyOtp", {
        email,
        otp: code,
      });

      toast.success("Login successful!", {
        icon: "🎉",
        style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 }
      });

      await checkAuthStatus();

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200);

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // RESEND OTP
  // -------------------------
  const handleResend = async () => {
    if (timer > 0) return;

    try {
      setLoading(true);
      await api.post("/auth/sendOtp", { email });
      toast.success("OTP resent!");
      setTimer(30);
    } catch (err) {
      toast.error("Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen px-4" style={{ backgroundColor: DEEP_GREEN }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
        >
          <h1 className="text-2xl font-extrabold text-center mb-1" style={{ color: DEEP_GREEN }}>
            Welcome to Mandaram Drapes
          </h1>
          <p className="text-gray-600 text-center text-base mb-6">
            {step === 1 ? "Sign in with email OTP" : "Enter your verification code"}
          </p>

          {/* STEP 1: EMAIL */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-4 py-2.5 w-full focus:ring-2 focus:ring-green-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
                style={{ backgroundColor: DEEP_GREEN }}
              >
                {loading ? <ClipLoader color="white" size={18} /> : "Send OTP"}
              </button>
            </form>
          )}

          {/* STEP 2: OTP */}
          {step === 2 && (
            <div className="flex flex-col items-center gap-5">
              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    value={digit}
                    maxLength="1"
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-10 h-12 border text-center text-xl rounded-md focus:ring-2 focus:ring-green-400"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
                style={{ backgroundColor: DEEP_GREEN }}
              >
                {loading ? <ClipLoader color="white" size={18} /> : "Verify OTP"}
              </button>

              <p className="text-sm text-gray-600">
                Didn’t receive the code?{" "}
                <button
                  onClick={handleResend}
                  disabled={timer > 0}
                  className="font-semibold underline"
                  style={{ color: DEEP_GREEN }}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                </button>
              </p>
            </div>
          )}

          <div className="mt-5 text-sm text-center text-gray-700">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold underline" style={{ color: DEEP_GREEN }}>
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} transition={Slide} />
    </>
  );
}
