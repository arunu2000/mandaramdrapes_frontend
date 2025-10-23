//updated code with Backend//

import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { domainUrl } from "../utils/constant";
import { ClipLoader, PropagateLoader } from "react-spinners";
const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loading,setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    
    
    
    const { emailOrPhone, password } = formData;
    
    // // Simple email format check
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(emailOrPhone)) {
    //   setError("Please enter a valid email address");
    //   return;
    // }
    
    try {
      setLoading(true)
     

      // Send login request to backend
      const res = await axios.post(`${domainUrl}/auth/login`, {
        email: emailOrPhone,
        password,
      });

      // Backend should return token + role
      const { token, role, message } = res.data;

      setSuccessMessage(message || "Login successful!");

      //  Save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);


      // Redirect based on user role
      if (role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/customerdashboard");
      }
    } catch (err) {
      //  Handle errors
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else {
        setError("Server error, please try again.");
      }
    }
    finally{
      setLoading(false)
    }
    // const hardcodedAdmin = {
    //   email: "admin@mandaram.com",
    //   phone: "1111111111",
    //   password: "123",
    // };

    // //  Check if entered credentials match
    // if (
    //   (emailOrPhone === hardcodedAdmin.email ||
    //     emailOrPhone === hardcodedAdmin.phone) &&
    //   password === hardcodedAdmin.password
    // ) {
    //   localStorage.setItem("token", "dummy-admin-token");
    //   localStorage.setItem("role", "admin");
    //   setSuccessMessage("Login successful!");
    //   navigate("/admindashboard",{ replace: true });
    //   return;
    // } else {
    //   setError("Invalid email/phone or password");
    // }
  };

  

  return (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
      <h1 className="text-[#5e785a] text-2xl font-bold text-center">
        Welcome to Mandaram Drapes
      </h1>
      <p className="text-gray-500 text-sm text-center mt-1">
        Login to your account
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
        {/* Email Input */}
        <input
          type="text"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          placeholder="Enter your Email"
          className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
        />

        {/* Password Input */}
        <div className="relative w-full">
          <input
            type={showPassword ? "password" : "text"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            className="text-sm border border-gray-400 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#343e32] w-full"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


          {/*  Submit Button */}
          <button
            type="submit"
            className="w-full h-[40px] mt-3 text-white bg-[#5e785a] px-4  rounded hover:bg-[#5a6d57] transition"
          >

            {loading?<ClipLoader color="white" size={15} />:'Login'
            }

            
          </button>
        </form>

        {/*  Signup Link */}
        <div className="mt-3 text-xs text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#343e32] font-semibold">
            Sign up
          </Link>
        </div>

        {/*  Error / Success Messages */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-sm mt-4 text-center">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;


    

