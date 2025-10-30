// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   // const [loading,setLoading] = useState(false)

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Validation
//   const validate = () => {
//     const tempErrors = {};

//     // Username
//     if (!formData.username) tempErrors.username = "Name is required";
//     else if (!/^[a-zA-Z\s]+$/.test(formData.username))
//       tempErrors.username = "Name should contain only letters and spaces";

//     // Email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) tempErrors.email = "Email is required";
//     else if (!emailRegex.test(formData.email))
//       tempErrors.email = "Enter a valid email address";

//     // Phone
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!formData.phone) tempErrors.phone = "Phone number is required";
//     else if (!phoneRegex.test(formData.phone))
//       tempErrors.phone = "Enter a valid 10-digit phone number";

//     // Password
//     if (!formData.password) tempErrors.password = "Password is required";
//     else if (formData.password.length < 6)
//       tempErrors.password = "Password must be at least 6 characters long";

//     // Confirm Password
//     if (!formData.confirmPassword)
//       tempErrors.confirmPassword = "Please confirm your password";
//     else if (formData.password !== formData.confirmPassword)
//       tempErrors.confirmPassword = "Passwords do not match";

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage("");
//     setErrors({});
//     // setLoading(true)

//     if (validate()) {
//       try {
//         const response = await axios.post(
//           `${domainUrl}/auth/signup`,
//           formData
//         );

//         setSuccessMessage(response.data.message || "Account Created Successfully!");
//         setFormData({
//           username: "",
//           email: "",
//           phone: "",
//           password: "",
//           confirmPassword: "",
//         });

//         // Redirect after 2 seconds
//         setTimeout(() => navigate("/"), 2000);
//       } catch (error) {
//         if (error.response) {
//           setErrors({ server: error.response.data.Error || "Signup failed" });
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
//           Welcome To Mandaram Drapes
//         </h1>
//         <p className="text-gray-500 text-sm text-center mt-1">
//           Let&apos;s make your account
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
//           {/* Username */}
//           <div>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//             />
//             {errors.username && (
//               <p className="text-red-500 text-xs">{errors.username}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email address"
//               className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
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
//               placeholder="Phone number"
//               className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-xs">{errors.phone}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//             {errors.password && (
//               <p className="text-red-500 text-xs">{errors.password}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//             />
//             <span
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
//             >
//               {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full mt-3 text-[#EEFFEB] bg-[#5e785a] px-4 py-2 rounded hover:bg-[#5a6d57] transition"
//           >
//             Create your Account
//           </button>
//         </form>

//         {/* Server Error */}
//         {errors.server && (
//           <p className="text-red-500 text-sm mt-2 text-center">
//             {errors.server}
//           </p>
//         )}

//         {/* Success Message */}
//         {successMessage && (
//           <p className="text-green-600 text-sm mt-4 text-center">
//             {successMessage}
//           </p>
//         )}

//         <div className="mt-3 text-xs text-center">
//           Already have an account?{" "}
//           <Link to="/" className="text-[#343e32] font-semibold">
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Signup = () => {
//   const navigate = useNavigate();

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

//   //  Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   //  Validation logic
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

//   //  Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationError = validateForm();
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

//       const res = await axios.post(`${domainUrl}/auth/signup`, formData);

//       toast.success(res.data.message || "Account created successfully!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "🌿",
//       });

//       // Clear form
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
//       <div className="flex items-center justify-center h-screen bg-white">
//         <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
//           <h1 className="text-[#5e785a] text-2xl font-bold text-center">
//             Welcome To Mandaram Drapes
//           </h1>
//           <p className="text-gray-500 text-sm text-center mt-1">
//             Let&apos;s make your account
//           </p>

//           <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
//             {/* Username */}
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//             />

//             {/* Email */}
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email address"
//               className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//             />

//             {/* Phone */}
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone number"
//               className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//             />

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-[#343e32]"
//               />
//               <span
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-3 text-white bg-[#5e785a] px-4 py-2 rounded hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? <ClipLoader color="white" size={15} /> : "Create your Account"}
//             </button>
//           </form>

//           {/* Login Link */}
//           <div className="mt-3 text-xs text-center">
//             Already have an account?{" "}
//             <Link to="/" className="text-[#343e32] font-semibold">
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/*  Toast Container (same as Login) */}
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

// export default Signup;


import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast, Slide } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { domainUrl } from "../utils/constant";

// --- BRAND COLOR PALETTE (Modimal Inspired) ---
const DEEP_GREEN = "#34433d"; // Dark background
const ACCENT_GREEN = "#dbe7cf"; // Light accent
const HOVER_GREEN = "#4a5c53"; // Hover color
// ------------------------------------------------

const Signup = () => {
  const navigate = useNavigate();

  // ---------------- STATE ----------------
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const { username, email, phone, password, confirmPassword } = formData;

    if (!username.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
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

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError, {
        icon: "❌",
        style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${domainUrl}/auth/signup`, formData);

      toast.success(res.data.message || "Account created successfully!", {
        icon: "✅",
        style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 },
      });

      // Reset form
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect after short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const msg =
        err.response?.data?.Error ||
        err.response?.data?.message ||
        "Signup failed. Please try again later.";

      toast.error(msg, {
        icon: "❌",
        style: { background: "#ffeded", color: "#c62828", fontWeight: 500 },
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <>
      <div
        className="flex items-center justify-center h-screen px-4"
        style={{ backgroundColor: DEEP_GREEN }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
        >
          <h1
            className="text-2xl font-extrabold text-center mb-1"
            style={{ color: DEEP_GREEN }}
          >
            Welcome to Mandaram Drapes
          </h1>
          <p className="text-gray-600 text-center text-base mb-6">
            Let’s create your account
          </p>

          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyPress}
            className="flex flex-col gap-4"
          >
            {/* Username */}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Full Name"
              className="text-sm border border-gray-300 rounded-md px-4 py-2.5 
                         focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
            />

            {/* Email */}
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="text-sm border border-gray-300 rounded-md px-4 py-2.5 
                         focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="text-sm border border-gray-300 rounded-md px-4 py-2.5 
                         focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10 
                           focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="text-sm border border-gray-300 rounded-md px-4 py-2.5 pr-10 
                           focus:outline-none focus:ring-2 focus:ring-offset-1 focus:[8eb086] w-full"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[45px] mt-3 font-semibold rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              style={{ backgroundColor: DEEP_GREEN, color: ACCENT_GREEN }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = HOVER_GREEN;
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = DEEP_GREEN;
              }}
            >
              {loading ? <ClipLoader color="white" size={18} /> : "Create Account"}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-5 text-sm text-center text-gray-700">
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

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
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

export default Signup;
