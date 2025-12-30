// "use client";

// import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import { domainUrl } from "../utils/constant";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Loader from "../components/Loader";
// import { useAuth } from "../context/AuthContext";
// import { 
//   ArrowLeft, 
//   Shield, 
//   Mail, 
//   User, 
//   CheckCircle, 
//   Key, 
//   RefreshCw,
//   Smartphone,
//   AlertCircle
// } from "lucide-react";
// import api from "../utils/api";

// // axios.defaults.withCredentials = true;

// const AdminProfile = () => {
//   const navigate = useNavigate();
//   const { checkAuthStatus } = useAuth();

//   const [profile, setProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   const [formData, setFormData] = useState({
//     newUsername: "",
//     newEmail: "",
//   });

//   const [requestingOtp, setRequestingOtp] = useState(false);
//   const [otpRequested, setOtpRequested] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [verifyingOtp, setVerifyingOtp] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(0);
//   const [showSecurityTips, setShowSecurityTips] = useState(false);

//   // ===========================
//   // FETCH ADMIN PROFILE
//   // ===========================
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoadingProfile(true);
//         const res = await api.get('/admin/adminProfile', {
//           // withCredentials: true,
//         });

//         if (!res.data || !res.data.adminData) {
//           throw new Error("Invalid profile response");
//         }

//         const data = res.data.adminData;
//         setProfile(data);

//         setFormData({
//           newUsername: data.username || "",
//           newEmail: data.email || "",
//         });

//       } catch (err) {
//         console.error("Admin profile error:", err);
//         toast.error("Failed to load admin profile.");
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       } finally {
//         setLoadingProfile(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   // OTP Timer Effect
//   useEffect(() => {
//     let interval;
//     if (otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [otpTimer]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ===========================
//   // REQUEST UPDATE (SEND OTP)
//   // ===========================
//   const handleRequestUpdate = async (e) => {
//     e.preventDefault();

//     const { newUsername, newEmail } = formData;

//     if (!newUsername.trim() || !newEmail.trim()) {
//       toast.warn("Please fill in both username and email.");
//       return;
//     }

//     try {
//       setRequestingOtp(true);
//       const res = await api.post(
//         '/admin/adminProfile/request-update',
//         { newUsername, newEmail }
//       );

//       toast.success(res.data?.message || "Security code sent to your email.");
//       setOtpRequested(true);
//       setOtpTimer(300); // 5 minutes timer
//       setShowSecurityTips(true);

//     } catch (err) {
//       console.error("Request update error:", err);
//       toast.error(err.response?.data?.message || "Failed to send security code.");
//     } finally {
//       setRequestingOtp(false);
//     }
//   };

//   // ===========================
//   // VERIFY OTP
//   // ===========================
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     if (!otp.trim()) {
//       toast.warn("Please enter the security code.");
//       return;
//     }

//     try {
//       setVerifyingOtp(true);
//       const res = await api.post(
//         '/admin/adminProfile/verify-update',
//         { otp }
//       );

//       toast.success(
//         <div className="flex items-center">
//           <CheckCircle className="w-5 h-5 mr-2" />
//           Profile updated successfully!
//         </div>
//       );

//       if (res.data?.user) {
//         setProfile(res.data.user);
//         setFormData({
//           newUsername: res.data.user.username,
//           newEmail: res.data.user.email,
//         });
//       }

//       checkAuthStatus();
//       setOtp("");
//       setOtpRequested(false);
//       setShowSecurityTips(false);

//     } catch (err) {
//       console.error("Verify OTP error:", err);
//       toast.error(err.response?.data?.message || "Invalid or expired security code.");
//     } finally {
//       setVerifyingOtp(false);
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   // ===========================
//   // LOADING SCREEN
//   // ===========================
//   if (loadingProfile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading admin profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900">Failed to load admin profile.</h2>
//         </div>
//       </div>
//     );
//   }

//   // ===========================
//   // MAIN UI - MODERN DESIGN
//   // ===========================
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:20px_20px]" />
      
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

//         {/* Header */}
//         <div className="mb-8 lg:mb-12">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
//             {/* Back Button */}
//             {/* <button
//               onClick={() => navigate("/admindashboard")}
//               className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <div className="p-2 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
//                 <ArrowLeft className="w-4 h-4" />
//               </div>
//               <span className="hidden sm:inline">Back to Dashboard</span>
//             </button> */}

//             {/* Title Section */}
//             <div className=" ">
//               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white">
//                 <Shield className="w-5 h-5" />
//                 <span className="text-sm font-semibold">Admin Panel</span>
//               </div>
//               <h1 className="mt-4 text-4xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 Profile Settings
//               </h1>
//               <p className="mt-2 text-gray-600 max-w-2xl mx-auto lg:mx-0">
//                 Manage your administrator account with enhanced security and precision controls
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//           {/* Left Column - Profile Card & Stats */}
//           <div className="lg:col-span-4 space-y-8">

//             {/* Profile Card */}
//             <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transform transition-all hover:shadow-3xl">
//               <div className="relative">
//                 {/* Avatar with Gradient */}
//                 <div className="relative w-32 h-32 mx-auto">
//                   <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full animate-pulse"></div>
//                   <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
//                     <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                       {profile.username.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Profile Info */}
//                 <div className="mt-8 text-center">
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     {profile.username}
//                   </h2>
//                   <div className="mt-2 inline-flex items-center gap-2 text-gray-600">
//                     <Mail className="w-4 h-4" />
//                     <span className="text-sm">{profile.email}</span>
//                   </div>
                  
//                   {/* Role Badge */}
//                   <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white">
//                     <Shield className="w-4 h-4" />
//                     <span className="text-sm font-semibold">{profile.role}</span>
//                   </div>

//                   {/* Account Status */}
//                   <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600">Account Status</span>
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                         <span className="text-sm font-semibold text-green-600">Active</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Security Tips Panel */}
//             {showSecurityTips && (
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Key className="w-5 h-5 text-blue-600" />
//                   <h3 className="font-semibold text-gray-900">Security Tips</h3>
//                 </div>
//                 <ul className="space-y-3">
//                   <li className="flex items-start gap-2 text-sm text-gray-700">
//                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                     <span>Check your email spam folder if code not received</span>
//                   </li>
//                   <li className="flex items-start gap-2 text-sm text-gray-700">
//                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                     <span>Code expires in 5 minutes for security</span>
//                   </li>
//                   <li className="flex items-start gap-2 text-sm text-gray-700">
//                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                     <span>Keep your new credentials secure</span>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Edit Form */}
//           <div className="lg:col-span-8">
//             <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              
//               {/* Form Header */}
//               <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-gray-900 text-white">
//                     <User className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">Edit Profile Information</h2>
//                     <p className="text-sm text-gray-600">Update your administrative credentials</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Form Content */}
//               <div className="p-8">
                
//                 {/* Current Info Cards */}
//                 <div className="mb-10">
//                   <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Current Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
//                       <div className="flex items-center gap-3 mb-2">
//                         <User className="w-4 h-4 text-gray-500" />
//                         <span className="text-xs font-medium text-gray-500">Username</span>
//                       </div>
//                       <p className="text-lg font-semibold text-gray-900">{profile.username}</p>
//                     </div>
//                     <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
//                       <div className="flex items-center gap-3 mb-2">
//                         <Mail className="w-4 h-4 text-gray-500" />
//                         <span className="text-xs font-medium text-gray-500">Email Address</span>
//                       </div>
//                       <p className="text-lg font-semibold text-gray-900 break-all">{profile.email}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Edit Form */}
//                 {!otpRequested ? (
//                   <form onSubmit={handleRequestUpdate} className="space-y-8">
                    
//                     <div>
//                       <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">New Information</h3>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Username Field */}
//                         <div className="space-y-2">
//                           <label className="block text-sm font-medium text-gray-900">
//                             <span className="flex items-center gap-2">
//                               <User className="w-4 h-4" />
//                               New Username
//                             </span>
//                           </label>
//                           <div className="relative">
//                             <input
//                               name="newUsername"
//                               type="text"
//                               value={formData.newUsername}
//                               onChange={handleChange}
//                               className="w-full px-4 py-3.5 pl-11 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all"
//                               placeholder="Enter new username"
//                             />
//                             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           </div>
//                         </div>

//                         {/* Email Field */}
//                         <div className="space-y-2">
//                           <label className="block text-sm font-medium text-gray-900">
//                             <span className="flex items-center gap-2">
//                               <Mail className="w-4 h-4" />
//                               New Email Address
//                             </span>
//                           </label>
//                           <div className="relative">
//                             <input
//                               name="newEmail"
//                               type="email"
//                               value={formData.newEmail}
//                               onChange={handleChange}
//                               className="w-full px-4 py-3.5 pl-11 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all"
//                               placeholder="Enter new email"
//                             />
//                             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="pt-6">
//                       <button
//                         type="submit"
//                         disabled={requestingOtp}
//                         className="w-full group relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         <div className="relative flex items-center justify-center gap-3">
//                           {requestingOtp ? (
//                             <>
//                               <RefreshCw className="w-5 h-5 animate-spin" />
//                               Sending Security Code...
//                             </>
//                           ) : (
//                             <>
//                               <Key className="w-5 h-5" />
//                               Request Security Code
//                             </>
//                           )}
//                         </div>
//                       </button>
//                       <p className="mt-3 text-center text-sm text-gray-500">
//                         A verification code will be sent to your new email address
//                       </p>
//                     </div>
//                   </form>
//                 ) : (
//                   /* OTP Verification Section */
//                   <form onSubmit={handleVerifyOtp} className="space-y-8">
                    
//                     <div className="text-center">
//                       <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
//                         <Smartphone className="w-8 h-8 text-blue-600" />
//                       </div>
                      
//                       <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                         Enter Security Code
//                       </h3>
//                       <p className="text-gray-600 mb-6">
//                         We've sent a 6-digit code to your new email address
//                       </p>

//                       {/* OTP Input */}
//                       <div className="relative max-w-xs mx-auto">
//                         <input
//                           type="text"
//                           maxLength={6}
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                           className="w-full text-center text-3xl font-bold tracking-widest px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
//                           placeholder="000000"
//                         />
//                         {otpTimer > 0 && (
//                           <div className="absolute -bottom-8 left-0 right-0 text-center">
//                             <span className="text-sm font-medium text-gray-600">
//                               Code expires in:{" "}
//                               <span className="text-red-600 font-bold">{formatTime(otpTimer)}</span>
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="mt-12 space-y-4">
//                         <button
//                           type="submit"
//                           disabled={verifyingOtp}
//                           className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-medium disabled:opacity-50"
//                         >
//                           {verifyingOtp ? (
//                             <span className="flex items-center justify-center gap-3">
//                               <RefreshCw className="w-5 h-5 animate-spin" />
//                               Verifying & Updating...
//                             </span>
//                           ) : (
//                             <span className="flex items-center justify-center gap-3">
//                               <CheckCircle className="w-5 h-5" />
//                               Verify & Update Profile
//                             </span>
//                           )}
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => setOtpRequested(false)}
//                           className="w-full py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
//                         >
//                           ← Back to Edit Form
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         transition={Slide}
//         theme="colored"
//         className="mt-4"
//       />
//     </div>
//   );
// };

// export default AdminProfile;



"use client";

import React, { useEffect, useState } from "react";
// import axios from "axios";
import { domainUrl } from "../utils/constant";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster, } from 'react-hot-toast';
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { 
  ArrowLeft, 
  Shield, 
  Mail, 
  User, 
  CheckCircle, 
  Key, 
  RefreshCw,
  Smartphone,
  AlertCircle
} from "lucide-react";
import api from "../utils/api";

// axios.defaults.withCredentials = true;

const AdminProfile = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [formData, setFormData] = useState({
    newUsername: "",
    newEmail: "",
  });

  const [requestingOtp, setRequestingOtp] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [showSecurityTips, setShowSecurityTips] = useState(false);

  // ===========================
  // FETCH ADMIN PROFILE
  // ===========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        const res = await api.get('/admin/adminProfile', {
          // withCredentials: true,
        });

        if (!res.data || !res.data.adminData) {
          throw new Error("Invalid profile response");
        }

        const data = res.data.adminData;
        setProfile(data);

        setFormData({
          newUsername: data.username || "",
          newEmail: data.email || "",
        });

      } catch (err) {
        console.error("Admin profile error:", err);
        toast.error("Failed to load admin profile.");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // OTP Timer Effect
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // 🔥 AUTO RESET WHEN OTP EXPIRES (NO RESEND)
useEffect(() => {
  if (otpRequested && otpTimer === 0) {
    toast("Security code expired. Please try again.", {
      icon: "⏰",
      id: "otp-expired",
    });

    // Reset OTP flow
    setOtpRequested(false);
    setOtp("");
    setShowSecurityTips(false);
  }
}, [otpTimer, otpRequested]);

  
  
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // ===========================
  // REQUEST UPDATE (SEND OTP)
  // ===========================
  const handleRequestUpdate = async (e) => {
  e.preventDefault();

  const newUsername = formData.newUsername.trim();
  const newEmail = formData.newEmail.trim();

  if (!newUsername || !newEmail) {
    toast.warn("Please fill in both username and email.");
    return;
  }

  if (!emailRegex.test(newEmail)) {
    toast.warn("Please enter a valid email address.");
    return;
  }

  // 🔥 IMPORTANT: No changes detected
  if (
    profile &&
    newUsername === profile.username &&
    newEmail === profile.email
  ) {
    toast("No changes detected in profile.",{
      icon:"❗",
      id:"no changes"
    });
    return;
  }

  try {
    setRequestingOtp(true);

    const res = await api.post(
      "/admin/adminProfile/request-update",
      {
        newUsername,
        newEmail,
      }
    );

    toast.success(
      res.data?.message || "Security code sent to your email."
    );

    setOtpRequested(true);
    setOtpTimer(300);
    setShowSecurityTips(true);

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Failed to send security code."
    );
  } finally {
    setRequestingOtp(false);
  }
};


  // ===========================
  // VERIFY OTP
  // ===========================
   const handleVerifyOtp = async (e) => {
  e.preventDefault();

  if (otpTimer === 0) {
  toast("Security code expired. Please request again.", {
    icon: "⛔",
    id: "otp-expired-verify",
  });
  return;
}


  if (!otp.trim()) {
    toast.warn("Please enter the security code.");
    return;
  }

  if (!/^\d{6}$/.test(otp)) {
    toast.warn("Please enter a valid 6-digit code.");
    return;
  }

  try {
    setVerifyingOtp(true);

    const res = await api.post(
      "/admin/adminProfile/verify-update",
      { otp: otp.trim() }
    );

    toast.success("Profile updated successfully!");

    if (res.data?.user) {
      setProfile(res.data.user);
      setFormData({
        newUsername: res.data.user.username,
        newEmail: res.data.user.email,
      });
    }

    checkAuthStatus();

    // 🔥 Reset states
    setOtp("");
    setOtpRequested(false);
    setShowSecurityTips(false);

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Invalid or expired security code."
    );
  } finally {
    setVerifyingOtp(false);
  }
};


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // ===========================
  // LOADING SCREEN
  // ===========================
  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Failed to load admin profile.</h2>
        </div>
      </div>
    );
  }

  // ===========================
  // MAIN UI - MODERN DESIGN
  // ===========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:20px_20px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Back Button */}
            {/* <button
              onClick={() => navigate("/admindashboard")}
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <div className="p-2 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button> */}

            {/* Title Section */}
            <div className=" ">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-semibold">Admin Panel</span>
              </div>
              <h1 className="mt-4 text-4xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Manage your administrator account with enhanced security and precision controls
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column - Profile Card & Stats */}
          <div className="lg:col-span-4 space-y-8">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transform transition-all hover:shadow-3xl">
              <div className="relative">
                {/* Avatar with Gradient */}
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {profile.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.username}
                  </h2>
                  <div className="mt-2 inline-flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  
                  {/* Role Badge */}
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-semibold">{profile.role}</span>
                  </div>

                  {/* Account Status */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Account Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-green-600">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Tips Panel */}
            {showSecurityTips && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Security Tips</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Check your email spam folder if code not received</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Code expires in 5 minutes for security</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Keep your new credentials secure</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              
              {/* Form Header */}
              <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-900 text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Profile Information</h2>
                    <p className="text-sm text-gray-600">Update your administrative credentials</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                
                {/* Current Info Cards */}
                <div className="mb-10">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Current Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">Username</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{profile.username}</p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">Email Address</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 break-all">{profile.email}</p>
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                {!otpRequested ? (
                  <form onSubmit={handleRequestUpdate} className="space-y-8">
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">New Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-900">
                            <span className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              New Username
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              name="newUsername"
                              type="text"
                              value={formData.newUsername}
                              onChange={handleChange}
                              className="w-full px-4 py-3.5 pl-11 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all"
                              placeholder="Enter new username"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-900">
                            <span className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              New Email Address
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              name="newEmail"
                              type="email"
                              value={formData.newEmail}
                              onChange={handleChange}
                              className="w-full px-4 py-3.5 pl-11 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all"
                              placeholder="Enter new email"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit "
                        disabled={requestingOtp}
                        className="w-full group relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 rounded-xl font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center justify-center gap-3">
                          {requestingOtp ? (
                            <>
                              <RefreshCw className="w-5 h-5 animate-spin" />
                              Sending Security Code...
                            </>
                          ) : (
                            <>
                              <Key className="w-5 h-5" />
                              Request Security Code
                            </>
                          )}
                        </div>
                      </button>
                      <p className="mt-3 text-center text-sm text-gray-500">
                        A verification code will be sent to your new email address
                      </p>
                    </div>
                  </form>
                ) : (
                  /* OTP Verification Section */
                  <form onSubmit={handleVerifyOtp} className="space-y-8">
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
                        <Smartphone className="w-8 h-8 text-blue-600" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Enter Security Code
                      </h3>
                      <p className="text-gray-600 mb-6">
                        We've sent a 6-digit code to your new email address
                      </p>

                      {/* OTP Input */}
                      <div className="relative max-w-xs mx-auto">
                        <input
                          type="text"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full text-center text-3xl font-bold tracking-widest px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
                          placeholder="000000"
                        />
                        {otpTimer > 0 && (
                          <div className="absolute -bottom-8 left-0 right-0 text-center">
                            <span className="text-sm font-medium text-gray-600">
                              Code expires in:{" "}
                              <span className="text-red-600 font-bold">{formatTime(otpTimer)}</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-12 space-y-4">
                        <button
                          type="submit"
                          disabled={verifyingOtp || otpTimer === 0}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-medium disabled:opacity-50"
                        >
                          {verifyingOtp ? (
                            <span className="flex items-center justify-center gap-3">
                              <RefreshCw className="w-5 h-5 animate-spin" />
                              Verifying & Updating...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-3">
                              <CheckCircle className="w-5 h-5" />
                              Verify & Update Profile
                            </span>
                          )}
                        </button>

                        <button
  type="button"
  onClick={() => {
    setOtpRequested(false);
    setOtp("");
    setOtpTimer(0);
    setShowSecurityTips(false);
  }}
  className="w-full py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
>
  ← Back to Edit Form
</button>

                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Slide}
        theme="colored"
        className="mt-4"
      /> */}

      <Toaster
                                position="top-right"
                                toastOptions={{
                                  duration: 2000,
                                  style: {
                                    borderRadius: "10px",
                                    fontFamily: "Inter, sans-serif",
                                  },
                                }}
                              />
    </div>
  );
};

export default AdminProfile;