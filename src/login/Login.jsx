// //updated code with Backend//

// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import { ClipLoader, PropagateLoader } from "react-spinners";
// import { useEffect } from "react";
// const Login = () => {
//   const navigate = useNavigate();
//       const token = localStorage.getItem('token');

//   useEffect(()=>{
//     if(token){
//       navigate('/',{replace:true})
//     }
//   },[])
//   const [formData, setFormData] = useState({
//     emailOrPhone: "",
//     password: "",
//   });

//   const [loading,setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");
    
    
    
//     const { emailOrPhone, password } = formData;
    
//     // // Simple email format check
//     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     // if (!emailRegex.test(emailOrPhone)) {
//     //   setError("Please enter a valid email address");
//     //   return;
//     // }
    
//     try {
//       setLoading(true)
     

//       // Send login request to backend
//       const res = await axios.post(`${domainUrl}/auth/login`, {
//         email: emailOrPhone,
//         password,
//       });

//       // Backend should return token + role
//       const { token, role, message } = res.data;

//       setSuccessMessage(message || "Login successful!");

//       //  Save token and role in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);


//       // Redirect based on user role
//       if (role === "admin") {
//         navigate("/admindashboard");
//       } else {
//         navigate("/",{replace:true});
        
//       }
//     } catch (err) {
      
//       //  Handle errors
//       if (err.response) {
//         setError(err.response.data.message || "Invalid credentials");
//       } else {
//         setError("Server error, please try again.");
//       }
//     }
//     finally{
//       setLoading(false)
//     }
//     // const hardcodedAdmin = {
//     //   email: "admin@mandaram.com",
//     //   phone: "1111111111",
//     //   password: "123",
//     // };

//     // //  Check if entered credentials match
//     // if (
//     //   (emailOrPhone === hardcodedAdmin.email ||
//     //     emailOrPhone === hardcodedAdmin.phone) &&
//     //   password === hardcodedAdmin.password
//     // ) {
//     //   localStorage.setItem("token", "dummy-admin-token");
//     //   localStorage.setItem("role", "admin");
//     //   setSuccessMessage("Login successful!");
//     //   navigate("/admindashboard",{ replace: true });
//     //   return;
//     // } else {
//     //   setError("Invalid email/phone or password");
//     // }
//   };

  

//   return (
//   <div className="flex items-center justify-center h-screen bg-white">
//     <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
//       <h1 className="text-[#5e785a] text-2xl font-bold text-center">
//         Welcome to Mandaram Drapes
//       </h1>
//       <p className="text-gray-500 text-sm text-center mt-1">
//         Login to your account
//       </p>

//       <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
//         {/* Email Input */}
//         <input
//           type="text"
//           name="emailOrPhone"
//           value={formData.emailOrPhone}
//           onChange={handleChange}
//           placeholder="Enter your Email"
//           className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
//         />

//         {/* Password Input */}
//         <div className="relative w-full">
//           <input
//             type={showPassword ? "password" : "text"}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter Your Password"
//             className="text-sm border border-gray-400 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#343e32] w-full"
//           />

//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>


//           {/*  Submit Button */}
//           <button
//             type="submit"
//             className="w-full h-[40px] mt-3 text-white bg-[#5e785a] px-4  rounded hover:bg-[#5a6d57] transition"
//           >

//             {loading?<ClipLoader color="white" size={15} />:'Login'
//             }

            
//           </button>
//         </form>

//         {/*  Signup Link */}
//         <div className="mt-3 text-xs text-center">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-[#343e32] font-semibold">
//             Sign up
//           </Link>
//         </div>

//         {/*  Error / Success Messages */}
//         {error && (
//           <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
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

// export default Login;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { domainUrl } from "../utils/constant";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

 // 🏠 Recommended Fix for Login.jsx

useEffect(() => {
    const storedRole = localStorage.getItem("role"); // Retrieve the stored role
    if (token) {
        // If a token exists, check the role for proper redirection
        if (storedRole === "admin") {
            navigate("/admindashboard", { replace: true });
        } else if (storedRole === "user") {
            navigate("/", { replace: true });
        }
        // If role is null/undefined, navigate to / as a safe default
    }
}, [token, navigate]);

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Validation function
  const validateForm = () => {
    const { emailOrPhone, password } = formData;

    if (!emailOrPhone.trim() || !password.trim()) {
      return "Please fill in all fields.";
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
    const isPhone = /^[0-9]{10}$/.test(emailOrPhone);

    if (!isEmail && !isPhone) {
      return "Please enter a valid email or 10-digit phone number.";
    }

    if (password.length < 3) {
      return "Password must be at least 3 characters long.";
    }

    return null;
  };

  // ✅ Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
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

      const res = await axios.post(`${domainUrl}/auth/login`, {
        email: formData.emailOrPhone,
        password: formData.password,
      });

      const { token, role, message } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success(message || "Login successful!", {
        style: {
          background: "#EEFFEB",
          color: "#2f4f2f",
          fontWeight: "500",
        },
        icon: "🌿",
      });

      setTimeout(() => {
        navigate(role === "admin" ? "/admindashboard" : "/", { replace: true });
      }, 1500);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? "Invalid email or password."
          : "Server error, please try again later.");

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
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
          <h1 className="text-[#5e785a] text-2xl font-bold text-center">
            Welcome to Mandaram Drapes
          </h1>
          <p className="text-gray-500 text-sm text-center mt-1">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
            {/* Email or Phone Input */}
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="Enter your Email or Phone"
              className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
            />

            {/* Password Input */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="text-sm border border-gray-400 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#343e32] w-full"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[40px] mt-3 text-white bg-[#5e785a] px-4 rounded hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <ClipLoader color="white" size={15} /> : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-3 text-xs text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#343e32] font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Toast Container (with brand styling) */}
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
