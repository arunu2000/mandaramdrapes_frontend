


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { domainUrl } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import api from '../utils/api';

// axios.defaults.withCredentials = true;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, checkAuthStatus } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    newUsername: "",
    newEmail: "",
  });

  const [requestingOtp, setRequestingOtp] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        const res = await api.get('/user/profile');

        if (!res.data || !res.data.users) {
          throw new Error("Invalid profile response");
        }

        const data = res.data.users;
        setProfile(data);

        setFormData({
          newUsername: data.username || "",
          newEmail: data.email || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
        if (err.response?.status === 401) {
          toast.warn("Please log in to access your profile.", {
            onClose: () => navigate("/login"),
            autoClose: 2000,
          });
        } else {
          toast.error(
            err.response?.data?.message || "Failed to load profile details."
          );
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequestUpdate = async (e) => {
    e.preventDefault();

    const { newUsername, newEmail } = formData;

    if (!newUsername.trim() || !newEmail.trim()) {
      toast.warn("Please fill in both username and email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.warn("Please enter a valid email address.");
      return;
    }

    if (
      profile &&
      newUsername.trim() === profile.username &&
      newEmail.trim() === profile.email
    ) {
      toast.info("No changes detected in profile.");
      return;
    }

    try {
      setRequestingOtp(true);
      const res = await api.post(
        '/user/profile/request-update',
        {
          newEmail: newEmail.trim(),
          newUsername: newUsername.trim(),
        }
      );

      toast.success(
        res.data?.message ||
          `OTP sent to ${newEmail.trim()}. Please check your inbox.`
      );
      setOtpRequested(true);
    } catch (err) {
      console.error("Request update error:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to initiate profile update. Please try again."
      );
    } finally {
      setRequestingOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.warn("Please enter the OTP.");
      return;
    }

    try {
      setVerifyingOtp(true);
      const res = await api.post(
        '/user/profile/verify-update',
        {
          otp: otp.trim(),
        }
      );

      toast.success(res.data?.message || "Profile updated successfully.");

      if (res.data?.user) {
        setProfile(res.data.user);
        setFormData({
          newUsername: res.data.user.username,
          newEmail: res.data.user.email,
        });
      }

      if (typeof checkAuthStatus === "function") {
        checkAuthStatus();
      }

      setOtp("");
      setOtpRequested(false);
    } catch (err) {
      console.error("Verify OTP error:", err);
      toast.error(
        err.response?.data?.message || "Invalid or expired OTP. Please try again."
      );
    } finally {
      setVerifyingOtp(false);
    }
  };

  if (loadingProfile) {
    return <Loader message="Loading profile..." />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Unable to load profile
          </h2>
          <p className="text-gray-600 mb-6">
            Please refresh the page or log in again.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-10">
          <div className="flex items-center border-b p-4 border-gray-300 ">
            <div className="flex items-center space-x-3">
              {/* <button
                onClick={() => navigate(-1)}
                className="group flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button> */}
            </div>
            <div className="">
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your account and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Multi Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Card & Navigation */}
          <div className="lg:col-span-1 space-y-8">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-105">
                    <span className="text-3xl font-bold text-white">
                      {profile.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {profile.username}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{profile.email}</p>
                {profile.role && (
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
                    {profile.role}
                  </span>
                )}
              </div>

              {/* Stats Grid */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate("/myorders")}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group"
                >
                  <span className="text-sm font-medium text-gray-900">View Orders</span>
                  <svg className="w-4 h-4 text-gray-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Profile & OTP */}
          <div className="lg:col-span-2 space-y-8">
            {/* Edit Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Edit Profile
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Update your personal information and email preferences
                  </p>
                </div>
                {/* <div className="hidden sm:block px-3 py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200">
                  <span className="text-xs font-semibold text-gray-700">Step {otpRequested ? '2' : '1'} of 2</span>
                </div> */}
              </div>

              {/* Current Info Preview */}
              <div className="mb-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 font-medium">Current Username</div>
                    <div className="text-sm font-semibold text-gray-900">{profile.username}</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 font-medium">Current Email</div>
                    <div className="text-sm font-semibold text-gray-900">{profile.email}</div>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleRequestUpdate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                      New Username
                    </label>
                    <div className="relative group">
                      <input
                        name="newUsername"
                        type="text"
                        value={formData.newUsername}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 group-hover:border-gray-900"
                        placeholder="Enter new username"
                      />
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gray-900/20 pointer-events-none transition-all duration-300"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                      New Email Address
                    </label>
                    <div className="relative group">
                      <input
                        name="newEmail"
                        type="email"
                        value={formData.newEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 group-hover:border-gray-900"
                        placeholder="Enter new email"
                      />
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gray-900/20 pointer-events-none transition-all duration-300"></div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={requestingOtp}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {requestingOtp ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Sending OTP...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send OTP to New Email
                    </div>
                  )}
                </button>
              </form>

              {/* OTP Verification Section */}
              {otpRequested && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Identity</h3>
                    <p className="text-sm text-gray-600">
                      We've sent a 6-digit verification code to{" "}
                      <span className="font-semibold text-gray-900 bg-gradient-to-r from-gray-200 to-gray-300 px-2 py-1 rounded">
                        {formData.newEmail}
                      </span>
                      . Please enter it below to complete your profile update.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Enter Verification Code
                      </label>
                      <div className="flex justify-center">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength="6"
                          className="w-64 px-4 py-3 text-center text-xl font-semibold tracking-[0.3em] rounded-xl border-2 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-300 hover:border-gray-900"
                          placeholder="000000"
                        />
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Enter the 6-digit code from your email
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={verifyingOtp}
                      className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {verifyingOtp ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          Verifying OTP...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Verify & Update Profile
                        </div>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setOtpRequested(false)}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                      ← Go back to edit form
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gray-900 group-hover:bg-gray-800 transition-colors duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">Account Status</div>
                      <div className="text-xs text-emerald-600 font-semibold">Active</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gray-900 group-hover:bg-gray-800 transition-colors duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">Member Since</div>
                      <div className="text-xs text-gray-600">Jan 2024</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gray-900 group-hover:bg-gray-800 transition-colors duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">Security Level</div>
                      <div className="text-xs text-gray-600">Two-Factor Ready</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default ProfilePage;