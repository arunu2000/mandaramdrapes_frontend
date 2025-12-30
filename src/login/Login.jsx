// import React, { useState, useEffect, useRef } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
// // import { ToastContainer, toast, Slide } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// import toast, { Toaster, } from 'react-hot-toast';
// import { motion } from "framer-motion";
// import api from "../utils/api";
// import { useAuth } from "../context/AuthContext";
// import logo123 from "../assets/logo.png";


// // BRAND COLORS
// const DEEP_GREEN = "#34433d";
// const ACCENT_GREEN = "#dbe7cf";
// const HOVER_GREEN = "#4a5c53";
// const LIGHT_BACKGROUND = "#f9f9f9";

// export default function Login() {
//   const navigate = useNavigate();
//   const { user, checkAuthStatus } = useAuth();

//   const [step, setStep] = useState(1); // 1 = login form, 2 = OTP form
//   const [loading, setLoading] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const otpRefs = useRef([]);
//   const [showPassword, setShowPassword] = useState(false);

//   const [timer, setTimer] = useState(0);

//   //forget password

//   const [resetEmail, setResetEmail] = useState("");
//   const [forgotStep, setForgotStep] = useState(0); // 0=none, 1=email, 2=otp, 3=new password
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Redirect after login
//   useEffect(() => {

//     if (!user.isInitialLoad && user.isAuthenticated) {
//       navigate(user.role === "admin" ? "/admindashboard" : "/", {
//         replace: true,
//       });
//     }
//   }, [user]);

//   // Timer countdown
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   // STEP 1 — LOGIN SUBMIT
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       toast.error("Please enter email and password",{id:"validation" });
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post("/auth/login", { email, password });

//       if (res.data.step === "VERIFY_OTP") {
//         toast.success("OTP sent to your email",{id:"otp sent success"});
//         setOtp(["", "", "", "", "", ""]);
//         setStep(2); // Switch UI
//         setTimer(300); // Optional timer
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed",{id:"login failed"});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotSubmit = async () => {
//     if (!resetEmail.trim()) {
//       toast.error("Please enter your email",{id:"enter email"});
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/auth/forgot-password", {
//         email: resetEmail,
//       });
//       toast.success("OTP sent to your email",{id:"otp sent"});
//       setForgotStep(2);
//       setTimer(300);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP",{id:"failed to sent otp"});
//     } finally {
//       setLoading(false);
//     }
//   };

//   // OTP CHANGE
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

//   // VERIFY OTP
//   const handleVerifyOtp = async () => {
//     const code = otp.join("");

//     if (code.length !== 6) {
//       toast.error("Enter full OTP",{id:"enter full otp"});
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/auth/login/verify", { email, otp: code });

//       toast.success("Login successful!",{id:"login success"});

//       await checkAuthStatus();
//       navigate("/", { replace: true });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "OTP verification failed" , {id:"otp validation failed"});
//     } finally {
//       setLoading(false);
//     }
//   };

//   // RESEND OTP

//   const handleResendOtp = async () => {
//   if (timer > 0) return;

//   try {
//     setLoading(true);

//     await api.post("/auth/resend-otp", { email });

//     toast.success("OTP resent successfully" ,{id:"otp resend success"});

//     // ✅ clear otp
//     setOtp(["", "", "", "", "", ""]);

//     // ✅ move cursor to first input
//     setTimeout(() => {
//       otpRefs.current[0]?.focus();
//     }, 0);

//     setTimer(300);
//   } catch (err) {
//     toast.error(err.response?.data?.message || "OTP resend failed" ,{id:"otp resend failedd"});
//   } finally {
//     setLoading(false);
//   }
// };

// const handleResendResetOtp = async () => {
//   if (timer > 0) return;

//   try {
//     setLoading(true);

//     await api.post("/auth/forgot-password", {
//       email: resetEmail,
//     });

//     toast.success("OTP resent successfully" ,{id:"otp resent success"});
//    setOtp(["", "", "", "", "", ""]);
//    setTimeout(() => {
//   otpRefs.current[0]?.focus();
// }, 0);
//     setTimer(300);
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Resend failed" ,{id:"resend failed .."});
//   } finally {
//     setLoading(false);
//   }
// };



//   const resetLoginFields = () => {
//     setEmail("");
//     setPassword("");
//     setOtp(["", "", "", "", "", ""]);
//   };

//   const handleVerifyResetOtp = async () => {
//     const code = otp.join("");

//     if (code.length !== 6) {
//       toast.error("Please enter full OTP" , {id:"enter full otp."});
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/auth/verify-reset-otp", {
//         email: resetEmail,
//         otp: code,
//       });

//       toast.success("OTP verified",{id:"otp verifiedd"});
//       setForgotStep(3); // move to password reset step
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid OTP",{id:"invalid otpp"});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!newPassword || !confirmPassword) {
//       toast.error("Please fill both fields" ,{id:"fill all the fields"});
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match",{id:"password mismatchess"});
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/auth/reset-password", { newPassword });

//       toast.success("Password reset successfully",{id:"password reset successfullyyy"});
//       resetLoginFields();
//       setForgotStep(0);
//       setStep(1); // back to login
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Reset failed",{id:"reset faileddd"});
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex min-h-screen bg-[#f9f9f9] overflow-hidden">
//         {/* LEFT SECTION */}
//         <div
//           className="hidden  lg:flex w-1/2 relative items-center justify-center px-10"
//           style={{
//             backgroundColor: DEEP_GREEN,
//             clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
//           }}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="relative z-10 max-w-md"
//           >
//             <span
//               className="text-sm font-light"
//               style={{ color: ACCENT_GREEN }}
//             >
//               Step into classic style
//             </span>
//             <h2
//               className="text-4xl font-extrabold mt-2 leading-tight"
//               style={{ color: ACCENT_GREEN }}
//             >
//               Discover your ultimate sustainable fashion destination
//             </h2>
//           </motion.div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div
//           className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10"
//           style={{ backgroundColor: LIGHT_BACKGROUND }}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-md"
//           >
//             {/* LOGO */}
//             <div className="flex justify-center mb-6">
//               <img
//                 className="h-14 w-14 object-contain"
//                 src={logo123}
//                 alt="Logo"
//               />
//             </div>

//             <h2
//               className="text-2xl font-extrabold text-center"
//               style={{ color: DEEP_GREEN }}
//             >
//               Sign in to your account
//             </h2>
//             <p className="text-gray-400 text-center text-sm mt-2">
//               {step === 1 &&
//                 forgotStep === 0 &&
//                 "Welcome back! Please enter your details."}
//               {forgotStep === 2 && `We sent an OTP to ${resetEmail}`}
//               {step === 2 && `We sent an OTP to ${email}`}
//             </p>

//             {/* STEP 1 — LOGIN FORM */}
//             {step === 1 && (
//               <form
//                 onSubmit={handleLoginSubmit}
//                 className="flex flex-col gap-4"
//               >
//                 <label className="text-sm font-medium text-gray-700 mt-9">
//                   Your email
//                 </label>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@example.com"
//                   className="border border-gray-300 rounded-md px-4 py-2.5 text-sm"
//                 />

//                 <label className="text-sm font-medium text-gray-700 mt-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter Your Password"
//                     className="border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm w-full"
//                   />
//                   <span
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </span>
//                 </div>

//                 <p
//                   className="text-sm text-right cursor-pointer text-blue-700"
//                   onClick={() => {
//                     setForgotStep(1);
//                     setStep(null); // hide login UI
//                   }}
//                 >
//                   Forgot password?
//                 </p>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full h-[45px] mt-6 font-semibold rounded-md shadow-md text-white"
//                   style={{
//                     backgroundColor: DEEP_GREEN,
//                   }}
//                 >
//                   {loading ? (
//                     <ClipLoader color="white" size={18} />
//                   ) : (
//                     "Get Started"
//                   )}
//                 </button>
//               </form>
//             )}

//             {step === 2 && forgotStep === 0 && (
//               <div className="flex flex-col items-center gap-5 mt-8">
//                 <p className="text-gray-700 text-center">
//                   Enter the 6-digit OTP sent to {email}
//                 </p>

//                 <div className="flex justify-center gap-3">
//                   {otp.map((digit, i) => (
//                     <input
//                       key={i}
//                       ref={(el) => (otpRefs.current[i] = el)}
//                       value={digit}
//                       maxLength="1"
//                       onChange={(e) => handleOtpChange(e.target.value, i)}
//                       onKeyDown={(e) => handleOtpKeyDown(e, i)}
//                       className="w-10 h-12 border text-center text-xl rounded-md"
//                     />
//                   ))}
//                 </div>

//                 <button
//                   onClick={handleVerifyOtp}
//                   disabled={loading}
//                   className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
//                   style={{ backgroundColor: DEEP_GREEN }}
//                 >
//                   {loading ? (
//                     <ClipLoader color="white" size={18} />
//                   ) : (
//                     "Verify OTP"
//                   )}
//                 </button>

//                 <p className="text-sm text-gray-600 mt-2">
//                   Didn’t receive the code?
//                   <button
//                     onClick={handleResendOtp}
//                     className="ml-1 underline font-semibold"
//                     style={{ color: DEEP_GREEN }}
//                     disabled={timer > 0}
//                   >
//                     {timer > 0
//                       ? `${Math.floor(timer / 60)
//                           .toString()
//                           .padStart(2, "0")}:${(timer % 60)
//                           .toString()
//                           .padStart(2, "0")} Remaining`
//                       : "Resend OTP"}
//                   </button>
//                 </p>
//               </div>
//             )}

//             {forgotStep === 1 && (
//               <div className="flex flex-col gap-4 mt-6">
//                 <label className="text-sm font-medium text-gray-700">
//                   Enter your registered email
//                 </label>

//                 <input
//                   type="email"
//                   value={resetEmail}
//                   onChange={(e) => setResetEmail(e.target.value)}
//                   placeholder="name@example.com"
//                   className="border border-gray-300 rounded-md px-4 py-2.5 text-sm"
//                 />

//                 <button
//                   onClick={handleForgotSubmit}
//                   disabled={loading}
//                   className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
//                   style={{ backgroundColor: DEEP_GREEN }}
//                 >
//                   {loading ? (
//                     <ClipLoader color="white" size={18} />
//                   ) : (
//                     "Send OTP"
//                   )}
//                 </button>

//                 <button
//                   className="text-sm underline"
//                   onClick={() => {
//                     setForgotStep(0);
//                     setStep(1);
//                   }}
//                 >
//                   Back to Login
//                 </button>
//               </div>
//             )}

//             {/* STEP 2 — OTP FORM */}
//             {forgotStep === 2 && (
//               <div className="flex flex-col items-center gap-5 mt-8">
//                 <p className="text-gray-700">
//                   Enter the 6-digit code sent to {resetEmail}
//                 </p>

//                 <div className="flex justify-center gap-3">
//                   {otp.map((digit, i) => (
//                     <input
//                       key={i}
//                       ref={(el) => (otpRefs.current[i] = el)}
//                       value={digit}
//                       maxLength="1"
//                       onChange={(e) => handleOtpChange(e.target.value, i)}
//                       onKeyDown={(e) => handleOtpKeyDown(e, i)}
//                       className="w-10 h-12 border text-center text-xl rounded-md"
//                     />
//                   ))}
//                 </div>

//                 <button
//                   onClick={handleVerifyResetOtp}
//                   disabled={loading}
//                   className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
//                   style={{ backgroundColor: DEEP_GREEN }}
//                 >
//                   {loading ? (
//                     <ClipLoader color="white" size={18} />
//                   ) : (
//                     "Verify OTP"
//                   )}
//                 </button>

//                 <p className="text-sm text-gray-600">
//                   Didn’t receive the code?
//                   <button
//                     onClick={handleResendResetOtp}

//                     disabled={timer > 0}
//                     className="ml-1 font-semibold underline"
//                     style={{ color: DEEP_GREEN }}
//                   >
//                     {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
//                   </button>
//                 </p>
//               </div>
//             )}

//             {forgotStep === 3 && (
//               <div className="flex flex-col gap-4 mt-6">
//                 {/* NEW PASSWORD */}
//                 <div className="relative">
//                   <input
//                     type={showNewPassword ? "text" : "password"}
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="New password"
//                     className="border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm w-full"
//                   />
//                   <span
//                     onClick={() => setShowNewPassword((prev) => !prev)}
//                     className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                   >
//                     {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//                   </span>
//                 </div>

//                 {/* CONFIRM PASSWORD */}
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm password"
//                     className="border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm w-full"
//                   />
//                   <span
//                     onClick={() => setShowConfirmPassword((prev) => !prev)}
//                     className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                   >
//                     {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                   </span>
//                 </div>

//                 <button
//                   onClick={handleResetPassword}
//                   className="w-full h-[45px] font-semibold rounded-md shadow-md text-white"
//                   style={{ backgroundColor: DEEP_GREEN }}
//                 >
//                   Reset Password
//                 </button>
//               </div>
//             )}

//             {/* SIGNUP LINK */}
//             <div className="text-sm text-center mt-6 text-gray-700">
//               Don’t have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="font-semibold hover:underline"
//                 style={{ color: DEEP_GREEN }}
//               >
//                 Sign up
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         transition={Slide}
//       /> */}
//       <Toaster
//                           position="top-right"
//                           toastOptions={{
//                             duration: 2000,
//                             style: {
//                               borderRadius: "10px",
//                               fontFamily: "Inter, sans-serif",
//                             },
//                           }}
//                         />
//     </>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster, } from 'react-hot-toast';
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
  const redirectedRef = useRef(false);


  useEffect(() => {
  if (
    !redirectedRef.current &&
    !user.isInitialLoad &&
    user.isAuthenticated
  ) {
    redirectedRef.current = true;

    navigate(user.role === "admin" ? "/admindashboard" : "/", {
      replace: true,
    });
  }
}, [user, navigate]);


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
      toast.error("Please enter email and password",{id:"validation" });
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      if (res.data.step === "VERIFY_OTP") {
        toast.success("OTP sent to your email",{id:"otp sent success"});
        setOtp(["", "", "", "", "", ""]);
        setStep(2); // Switch UI
        setTimer(300); // Optional timer
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed",{id:"login failed"});
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async () => {
    if (!resetEmail.trim()) {
      toast.error("Please enter your email",{id:"enter email"});
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", {
        email: resetEmail,
      });
      toast.success("OTP sent to your email",{id:"otp sent"});
      setForgotStep(2);
      setTimer(300);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP",{id:"failed to sent otp"});
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
      toast.error("Enter full OTP",{id:"enter full otp"});
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login/verify", { email, otp: code });

      toast.success("Login successful!",{id:"login success"});

      await checkAuthStatus();
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed" , {id:"otp validation failed"});
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP

  const handleResendOtp = async () => {
  if (timer > 0) return;

  try {
    setLoading(true);

    await api.post("/auth/resend-otp", { email });

    toast.success("OTP resent successfully" ,{id:"otp resend success"});

    // ✅ clear otp
    setOtp(["", "", "", "", "", ""]);

    // ✅ move cursor to first input
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 0);

    setTimer(300);
  } catch (err) {
    toast.error(err.response?.data?.message || "OTP resend failed" ,{id:"otp resend failedd"});
  } finally {
    setLoading(false);
  }
};

const handleResendResetOtp = async () => {
  if (timer > 0) return;

  try {
    setLoading(true);

    await api.post("/auth/forgot-password", {
      email: resetEmail,
    });

    toast.success("OTP resent successfully" ,{id:"otp resent success"});
   setOtp(["", "", "", "", "", ""]);
   setTimeout(() => {
  otpRefs.current[0]?.focus();
}, 0);
    setTimer(300);
  } catch (err) {
    toast.error(err.response?.data?.message || "Resend failed" ,{id:"resend failed .."});
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
      toast.error("Please enter full OTP" , {id:"enter full otp."});
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/verify-reset-otp", {
        email: resetEmail,
        otp: code,
      });

      toast.success("OTP verified",{id:"otp verifiedd"});
      setForgotStep(3); // move to password reset step
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP",{id:"invalid otpp"});
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill both fields" ,{id:"fill all the fields"});
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match",{id:"password mismatchess"});
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/reset-password", { newPassword });

      toast.success("Password reset successfully",{id:"password reset successfullyyy"});
      resetLoginFields();
      setForgotStep(0);
      setStep(1); // back to login
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed",{id:"reset faileddd"});
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
                <p className="text-gray-700 text-center">
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
                    {timer > 0
                      ? `${Math.floor(timer / 60)
                          .toString()
                          .padStart(2, "0")}:${(timer % 60)
                          .toString()
                          .padStart(2, "0")} Remaining`
                      : "Resend OTP"}
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
                    onClick={handleResendResetOtp}

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

      {/* <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Slide}
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
    </>
  );
}
