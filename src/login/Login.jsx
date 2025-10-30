// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//  // 🏠 Recommended Fix for Login.jsx

// useEffect(() => {
//     const storedRole = localStorage.getItem("role"); // Retrieve the stored role
//     if (token) {
//         // If a token exists, check the role for proper redirection
//         if (storedRole === "admin") {
//             navigate("/admindashboard", { replace: true });
//         } else if (storedRole === "user") {
//             navigate("/", { replace: true });
//         }
//         // If role is null/undefined, navigate to / as a safe default
//     }
// }, [token, navigate]);

//   const [formData, setFormData] = useState({
//     emailOrPhone: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ✅ Validation function
//   const validateForm = () => {
//     const { emailOrPhone, password } = formData;

//     if (!emailOrPhone.trim() || !password.trim()) {
//       return "Please fill in all fields.";
//     }

//     const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
//     const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

//     if (!isEmail && !isPhone) {
//       return "Please enter a valid email or 10-digit phone number.";
//     }

//     if (password.length < 3) {
//       return "Password must be at least 3 characters long.";
//     }

//     return null;
//   };

//   // ✅ Form submission
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

//       const res = await axios.post(`${domainUrl}/auth/login`, {
//         email: formData.emailOrPhone,
//         password: formData.password,
//       });

//       const { token, role, message } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       toast.success(message || "Login successful!", {
//         style: {
//           background: "#EEFFEB",
//           color: "#2f4f2f",
//           fontWeight: "500",
//         },
//         icon: "🌿",
//       });

//       setTimeout(() => {
//         navigate(role === "admin" ? "/admindashboard" : "/", { replace: true });
//       }, 1500);
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         (err.response?.status === 401
//           ? "Invalid email or password."
//           : "Server error, please try again later.");

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
//             Welcome to Mandaram Drapes
//           </h1>
//           <p className="text-gray-500 text-sm text-center mt-1">
//             Login to your account
//           </p>

//           <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
//             {/* Email or Phone Input */}
//             <input
//               type="text"
//               name="emailOrPhone"
//               value={formData.emailOrPhone}
//               onChange={handleChange}
//               placeholder="Enter your Email or Phone"
//               className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//             />

//             {/* Password Input */}
//             <div className="relative w-full">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter Your Password"
//                 className="text-sm border border-gray-400 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#343e32] w-full"
//               />

//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-[40px] mt-3 text-white bg-[#5e785a] px-4 rounded hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? <ClipLoader color="white" size={15} /> : "Login"}
//             </button>
//           </form>

//           {/* Signup Link */}
//           <div className="mt-3 text-xs text-center">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-[#343e32] font-semibold">
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Toast Container (with brand styling) */}
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




import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"; // for fade-in animation
import { domainUrl } from "../utils/constant";

// --- BRAND COLOR PALETTE (Modimal Inspired) ---
const DEEP_GREEN = "#34433d"; // Dark background
const ACCENT_GREEN = "#dbe7cf"; // Light accent
const HOVER_GREEN = "#4a5c53"; // Button hover
// ------------------------------------------------

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if already logged in
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (token) {
      navigate(storedRole === "admin" ? "/admindashboard" : "/", { replace: true });
    }
  }, [token, navigate]);

  // ---------------- STATE ----------------
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const { emailOrPhone, password } = formData;

    if (!emailOrPhone.trim() || !password.trim())
      return "Please fill in all fields.";

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
    const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

    if (!isEmail && !isPhone)
      return "Enter a valid email or 10-digit phone number.";

    if (password.length < 3)
      return "Password must be at least 3 characters long.";

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

      const res = await axios.post(`${domainUrl}/auth/login`, {
        email: formData.emailOrPhone,
        password: formData.password,
      });

      const { token, role, message } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success(message || "Login successful!", {
        icon: "✅",
        style: { background: ACCENT_GREEN, color: DEEP_GREEN, fontWeight: 600 },
      });

      setTimeout(() => {
        navigate(role === "admin" ? "/admindashboard" : "/", { replace: true });
      }, 1200);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? "Invalid email or password."
          : "Server error. Please try again later.");

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
            Sign in to your account
          </p>

          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyPress}
            className="flex flex-col gap-4"
          >
            {/* Email or Phone */}
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="Email or Phone"
              className="text-sm border border-gray-300 rounded-md px-4 py-2.5 
                         focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
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
                           focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 w-full"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
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
              {loading ? <ClipLoader color="white" size={18} /> : "Login"}
            </button>
          </form>

          {/* Signup link */}
          <div className="mt-5 text-sm text-center text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold hover:underline"
              style={{ color: DEEP_GREEN }}
            >
              Create Account
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

export default Login;
