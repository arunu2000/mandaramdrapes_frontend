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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation logic
  const validate = () => {
    const { username, email, phone, password, role } = formData;

    if (!username.trim() || !email.trim() || !phone.trim() || !password.trim() || !role) {
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

  // Submit form
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

      const res = await axios.post(
        `${domainUrl}/admin/users`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-white">
        <div
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm 
          transition-all duration-300 animate-fadeIn"
        >
          <h1 className="text-[#343e32] text-2xl font-bold text-center">
            Add New User
          </h1>
          <p className="text-gray-500 text-sm text-center mt-1">
            Fill in details to create a new account
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-6 gap-3"
            autoComplete="off"
          >
            {/* Username */}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Full Name"
              className="text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#5e785a]"
            />

            {/* Email */}
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#5e785a]"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#5e785a]"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Set Password"
                className="text-sm border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#5e785a]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#5e785a]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Role */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="text-sm border border-gray-300 rounded px-3 py-2 
              focus:outline-none focus:border-[#5e785a] w-full bg-white text-[#343e32]"
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 text-white bg-[#5e785a] px-4 py-2 rounded 
              hover:bg-[#4f644d] transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </form>
        </div>
      </div>

      {/* Toasts */}
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
