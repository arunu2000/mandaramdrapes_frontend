import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#5e785a] border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Message */}
      <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
    </div>
  );
};

export const SmallLoader = () => (
  <div className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
);

export const OverlayLoader = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm z-50">
    <div className="w-10 h-10 border-4 border-[#5e785a] border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-white text-sm">{message}</p>
  </div>
);


export default Loader;
