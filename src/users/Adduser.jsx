import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { domainUrl } from "../utils/constant";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation
  const validate = () => {
    let tempErrors = {};

    if (!formData.username) tempErrors.username = "Name is required";
    else if (!/^[a-zA-Z\s]+$/.test(formData.username))
      tempErrors.username = "Name should contain only letters and spaces";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      tempErrors.email = "Enter a valid email";

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      tempErrors.phone = "Enter a valid 10-digit phone number";

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    if (!formData.role) {
      tempErrors.role = "Please select a role";
}

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (validate()) {
      try {
        const token = localStorage.getItem("token"); //
        const response = await axios.post(
          `${domainUrl}/admin/users`,
          {
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: formData.role,
          },{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        );

        setSuccessMessage(response.data.message || "User added successfully!");
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          role: "",
        });
      } catch (error) {
        if (error.response) {
          setErrors({
            server: error.response.data.Error || "Failed to add user",
          });
        } else {
          setErrors({ server: "Network error, please try again" });
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-[#EEFFEB] p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-[#5e785a] text-2xl font-bold text-center">
          Add New User
        </h1>
        <p className="text-gray-500 text-sm text-center mt-1">
          Fill in details to create a new account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3 autoComplete=off " >
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Name"
              className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Set Password"
              className="text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#343e32] w-full"
            />
            <span
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#343e32]"
                    >
                   {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="text-sm border border-gray-400 rounded px-3 py-2 
             focus:outline-none focus:border-[#343e32] w-full 
             bg-[#EEFFEB] text-[#343e32] 
              pr-8 relative"
          >
            <option value="" disabled hidden>
            Select Role
            </option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 text-[#EEFFEB] bg-[#5e785a] px-4 py-2 rounded hover:bg-[#5a6d57] transition"
          >
            Add User
          </button>
        </form>

        {errors.server && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors.server}
          </p>
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

export default AddUser;


// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// // --- 1. Custom Input Field Component (Remains the same) ---
// const InputField = ({ label, name, type = "text", placeholder, error, value, onChange, children }) => (
//     <div className="flex flex-col space-y-1 w-full">
//       <label htmlFor={name} className="text-sm font-normal text-gray-700">
//         {label}
//       </label>
//       <div className="relative">
//         <input
//           id={name}
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={`
//             w-full rounded-lg border text-sm transition duration-150 bg-white
//             py-2.5 px-3 
//             ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#5e785a]'}
//             focus:ring-1 focus:ring-[#5e785a] focus:outline-none
//             placeholder-gray-400 
//           `}
//           autoComplete={name === 'password' ? 'new-password' : 'off'}
//         />
//         {children}
//       </div>
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
// );

// // --- 2. Main AddUser Component ---
// const AddUser = () => {
//     // --- State Initialization ---
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "",
//     });

//     const [errors, setErrors] = useState({});
//     const [successMessage, setSuccessMessage] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     // --- Handlers & Validation ---
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const validate = () => {
//         let tempErrors = {};
        
//         // Validation logic
//         if (!formData.username) tempErrors.username = "Name is required";
//         else if (!/^[a-zA-Z\s]+$/.test(formData.username))
//             tempErrors.username = "Name should contain only letters and spaces";

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!formData.email) tempErrors.email = "Email is required";
//         else if (!emailRegex.test(formData.email))
//             tempErrors.email = "Enter a valid email";

//         const phoneRegex = /^[0-9]{10}$/;
//         if (!formData.phone) tempErrors.phone = "Phone number is required";
//         else if (!phoneRegex.test(formData.phone))
//             tempErrors.phone = "Enter a valid 10-digit phone number";

//         if (!formData.password) tempErrors.password = "Password is required";
//         else if (formData.password.length < 6)
//             tempErrors.password = "Password must be at least 6 characters";

//         if (!formData.role) tempErrors.role = "Please select a role";

//         setErrors(tempErrors);
//         return Object.keys(tempErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors({});
//         setSuccessMessage("");

//         if (validate()) {
//             setLoading(true);
//             try {
//                 const token = localStorage.getItem("token"); 
//                 const response = await axios.post(
//                     "http://192.168.29.217:5000/api/admin/users",
//                     formData,
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 setSuccessMessage(response.data.message || "User added successfully! 🎉");
//                 setFormData({ username: "", email: "", phone: "", password: "", role: "", });
//             } catch (error) {
//                 if (error.response) {
//                     setErrors({
//                         server: error.response.data.Error || "Failed to add user",
//                     });
//                 } else {
//                     setErrors({ server: "Network error, please try again" });
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     // Helper for the submit button content (now "Add User")
//     const renderSubmitButtonContent = () => {
//         if (loading) {
//             return (
//                 <div className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Adding...
//                 </div>
//             );
//         }
//         return 'Add User';
//     };


//     // --- 3. Component Render ---
//     return (
//         <div className="min-h-screen bg-[#EEFFEB] p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            
//             <form onSubmit={handleSubmit} className="w-full max-w-7xl">

//                 {/* Header Area with Submit Button */}
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//                     <div>
//                         <h2 className="text-3xl font-bold text-[#5e785a] mb-1">Add User</h2>
//                         <p className="text-gray-500 text-sm">Fill in the details below to create a new user account</p>
//                     </div>
//                     <div className="flex gap-3 mt-4 md:mt-0">
//                         <button 
//                             type="submit" 
//                             disabled={loading}
//                             className={`
//                                 text-white px-5 py-2 rounded-lg font-semibold shadow transition 
//                                 ${loading 
//                                     ? 'bg-gray-400 cursor-not-allowed' 
//                                     : 'bg-[#5e785a] hover:bg-[#4a5f47]'
//                                 }
//                             `}
//                         >
//                             {renderSubmitButtonContent()}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Status Messages */}
//                 {(successMessage || errors.server) && (
//                     <div className="mb-6 p-3 rounded-lg text-center font-medium w-full max-w-4xl mx-auto">
//                         {successMessage && (
//                             <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
//                                 ✅ {successMessage}
//                             </div>
//                         )}
//                         {errors.server && (
//                             <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//                                 🚨 {errors.server}
//                             </div>
//                         )}
//                     </div>
//                 )}
                
//                 {/* Flexbox Form Fields Container 
//                   - flex flex-wrap: enables fields to wrap to the next line
//                   - gap-6 (space-y-6): Vertical spacing between rows 
//                   - md:flex-row: Ensures it behaves like a flex container on medium screens and up
//                 */}
//                 <div className="w-full max-w-4xl mx-auto flex flex-wrap -mx-3 mb-6 md:mb-0">
                    
//                     {/* Username */}
//                     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
//                         <InputField
//                             label="Username"
//                             name="username"
//                             placeholder="Enter full name"
//                             value={formData.username}
//                             onChange={handleChange}
//                             error={errors.username}
//                         />
//                     </div>

//                     {/* Email */}
//                     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
//                         <InputField
//                             label="Email Address"
//                             name="email"
//                             type="email"
//                             placeholder="Enter email address"
//                             value={formData.email}
//                             onChange={handleChange}
//                             error={errors.email}
//                         />
//                     </div>

//                     {/* Phone */}
//                     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
//                         <InputField
//                             label="Phone Number"
//                             name="phone"
//                             type="tel"
//                             placeholder="Enter 10-digit phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             error={errors.phone}
//                         />
//                     </div>

//                     {/* Role Dropdown */}
//                     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="role" className="text-sm font-normal text-gray-700">
//                                 User Role
//                             </label>
//                             <select
//                                 id="role"
//                                 name="role"
//                                 value={formData.role}
//                                 onChange={handleChange}
//                                 className={`
//                                     w-full rounded-lg border text-sm transition duration-150 bg-white
//                                     py-2.5 px-3
//                                     ${errors.role ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#5e785a]'}
//                                     focus:ring-1 focus:ring-[#5e785a] focus:outline-none
//                                     ${formData.role === '' ? 'text-gray-400' : ''}
//                                 `}
//                             >
//                                 <option value="" disabled>
//                                     Select Role
//                                 </option>
//                                 <option value="customer">Customer</option>
//                                 <option value="admin">Admin</option>
//                             </select>
//                             {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
//                         </div>
//                     </div>

//                     {/* Password */}
//                     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
//                         <InputField
//                             label="Set Password"
//                             name="password"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Minimum 6 characters"
//                             value={formData.password}
//                             onChange={handleChange}
//                             error={errors.password}
//                         >
//                             {/* Password Toggle Icon */}
//                             <span
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-[#5e785a]"
//                             >
//                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                             </span>
//                         </InputField>
//                     </div>

//                     {/* Empty div for layout balance (since Flexbox requires explicit handling of widths) */}
//                     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-6">
//                         {/* Empty space or additional field if needed */}
//                     </div>

//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddUser;





