// import { Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
// import { useNotifications } from "../context/NotificationContext";

// export default function NotificationSlideOver({
//   open,
//   onClose,
// }) {
//   const { notifications, markAsRead } = useNotifications();
//   const navigate = useNavigate();

//   return (
//     <Transition show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         {/* Backdrop */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-in-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in-out duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-300"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-300"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
//                   <div className="h-full flex flex-col bg-white shadow-2xl">

//                     {/* Header */}
//                     <div className="flex items-center justify-between px-6 py-5">
//                       <Dialog.Title className="text-xl font-bold text-pink-900">
//                         Notifications
//                       </Dialog.Title>
//                       <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-900"
//                       >
//                         <XMarkIcon className="h-6 w-6" />
//                       </button>
//                     </div>

//                     {/* Body */}
//                     {/* <div className="flex-1 overflow-y-auto">
//                       {notifications.length === 0 && (
//                         <p className="p-6 text-sm text-gray-500 text-center">
//                           No notifications
//                         </p>
//                       )}

//                       {notifications.map((n) => (
//                         <div
//                           key={n._id}
//                           onClick={() => {
//                             markAsRead(n._id);

//                             if (n.orderId) {
//                               navigate(
//                                 `/admindashboard/adminordermanagement/${n.orderId}`
//                               );
//                             }

//                             onClose();
//                           }}
//                           className={`px-6 py-4 border-b cursor-pointer hover:bg-gray-50 ${
//                             !n.isRead ? "bg-gray-50 font-medium" : ""
//                           }`}
//                         >
//                           <p className="text-sm text-gray-900">
//                             {n.message}
//                           </p>
//                           <p className="text-xs text-gray-400 mt-1">
//                             {new Date(n.createdAt).toLocaleString()}
//                           </p>
//                         </div>
//                       ))}
//                     </div> */}



//                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
//   {notifications.length === 0 && (
//     <p className="text-sm text-gray-500 text-center mt-10">
//       No notifications
//     </p>
//   )}

//   {notifications.map((n) => (
//     <div
//       key={n._id}
//       onClick={() => {
//         // ✅ Only mark as read
//         if (!n.isRead) {
//           markAsRead(n._id);
//         }
//       }}
//       className={`
//         relative rounded-xl bg-white px-5 py-4 cursor-pointer
//         border transition-all duration-200
//         hover:shadow-md
//         ${!n.isRead ? "border-amber-400" : "border-gray-200 opacity-80"}
//       `}
//     >
//       {/* 🔴 Unread Dot */}
//       {!n.isRead && (
//         <span className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-red-500" />
//       )}

//       {/* Message */}
//       <p className="text-sm font-medium text-gray-900">
//         {n.message}
//       </p>

//       {/* User Email (from backend populate) */}
//       {n.triggeredBy?.email && (
//         <p className="text-xs text-gray-600 mt-1">
//           User: <span className="font-medium">{n.triggeredBy.email}</span>
//         </p>
//       )}

//       {/* Time */}
//       <p className="text-xs text-gray-400 mt-1">
//         {new Date(n.createdAt).toLocaleString()}
//       </p>
//     </div>
//   ))}
// </div>



//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }





// import { Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
// import { useNotifications } from "../context/NotificationContext";

// export default function NotificationSlideOver({ open, onClose }) {
//   const { notifications, markAsRead } = useNotifications();
//   const navigate = useNavigate();

//   return (
//     <Transition show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         {/* Backdrop */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-in-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in-out duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-300"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-300"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
//                   <div className="h-full flex flex-col bg-white shadow-2xl">
                    
//                     {/* Header */}
//                     <div className="flex items-center justify-between px-6 py-5 bg-white border-b">
//                       <Dialog.Title className="text-xl font-bold text-gray-900">
//                         Notifications
//                       </Dialog.Title>
//                       <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-900 transition-colors"
//                       >
//                         <XMarkIcon className="h-6 w-6" />
//                       </button>
//                     </div>

//                     {/* Body */}
//                     <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
//                       {notifications.length === 0 && (
//                         <div className="flex flex-col items-center justify-center h-40 text-gray-500">
//                           <p>No new notifications</p>
//                         </div>
//                       )}

//                       {notifications.map((n) => (
//                         <div
//                           key={n._id}
//                           onClick={() => {
//                             // 1. Mark as read locally and in DB
//                             if (!n.isRead) {
//                               markAsRead(n._id);
//                             }

//                             // 2. Navigate to Order Details
//                             // Note: Backend populates orderId, so we access n.orderId._id
//                             if (n.orderId && n.orderId._id) {
//                               navigate(
//                                 `/admindashboard/adminordermanagement/${n.orderId._id}`
//                               );
//                               onClose();
//                             }
//                           }}
//                           className={`
//                             relative rounded-xl bg-white px-5 py-4 cursor-pointer
//                             border transition-all duration-200
//                             hover:shadow-md hover:border-pink-300
//                             ${
//                               !n.isRead
//                                 ? "border-l-4 border-l-pink-500 border-y-gray-100 border-r-gray-100"
//                                 : "border-gray-200 opacity-75"
//                             }
//                           `}
//                         >
//                           <div className="flex justify-between items-start">
//                             <div>
//                               {/* Message */}
//                               <p
//                                 className={`text-sm ${
//                                   !n.isRead
//                                     ? "font-semibold text-gray-900"
//                                     : "font-medium text-gray-700"
//                                 }`}
//                               >
//                                 {n.message}
//                               </p>

//                               {/* Triggered By User Info */}
//                               {n.triggeredBy && (
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   User:{" "}
//                                   <span className="font-medium text-gray-700">
//                                     {n.triggeredBy.username ||
//                                       n.triggeredBy.email}
//                                   </span>
//                                 </p>
//                               )}

//                               {/* Order Amount (If available from populate) */}
//                               {n.orderId && n.orderId.finalAmount && (
//                                 <p className="text-xs text-green-600 font-medium mt-1">
//                                   Amount: ₹{n.orderId.finalAmount}
//                                 </p>
//                               )}
//                             </div>

//                             {/* Unread Indicator Dot */}
//                             {!n.isRead && (
//                               <span className="h-2 w-2 rounded-full bg-pink-500 shrink-0 mt-1.5" />
//                             )}
//                           </div>

//                           {/* Time */}
//                           <p className="text-[10px] text-gray-400 mt-2 text-right">
//                             {new Date(n.createdAt).toLocaleString("en-IN", {
//                               day: "numeric",
//                               month: "short",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }



// import { Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
// import { useNotifications } from "../context/NotificationContext";

// export default function NotificationSlideOver({ open, onClose }) {
//   const { notifications, markAsRead } = useNotifications();
//   const navigate = useNavigate();

//   return (
//     <Transition show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         {/* Backdrop */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-in-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in-out duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-300"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-300"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
//                   <div className="h-full flex flex-col bg-white shadow-2xl">
                    
//                     {/* Header */}
//                     <div className="flex items-center justify-between px-6 py-5 bg-white border-b">
//                       <Dialog.Title className="text-xl font-bold text-gray-900">
//                         Notifications
//                       </Dialog.Title>
//                       <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-900 transition-colors"
//                       >
//                         <XMarkIcon className="h-6 w-6" />
//                       </button>
//                     </div>

//                     {/* Body */}
//                     <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
//                       {notifications.length === 0 && (
//                         <div className="flex flex-col items-center justify-center h-40 text-gray-500">
//                           <p>No new notifications</p>
//                         </div>
//                       )}

//                       {notifications.map((n) => (
//                         <div
//                           key={n._id}
//                           onClick={() => {
//                             // 1. Mark as read locally and in DB
//                             if (!n.isRead) {
//                               markAsRead(n._id);
//                             }

//                             // 2. Navigate to Order Details
//                             // Note: Backend populates orderId, so we access n.orderId._id
//                             if (n.orderId && n.orderId._id) {
//                               navigate(
//                                 `/admindashboard/adminordermanagement/${n.orderId._id}`
//                               );
//                               onClose();
//                             } else {
//                                 console.log("No valid Order ID found in notification");
//                             }
//                           }}
//                           className={`
//                             relative rounded-xl bg-white px-5 py-4 cursor-pointer
//                             border transition-all duration-200
//                             hover:shadow-md hover:border-pink-300
//                             ${
//                               !n.isRead
//                                 ? "border-l-4 border-l-pink-500 border-y-gray-100 border-r-gray-100"
//                                 : "border-gray-200 opacity-75"
//                             }
//                           `}
//                         >
//                           <div className="flex justify-between items-start">
//                             <div className="w-full">
//                               {/* Message */}
//                               <p
//                                 className={`text-sm ${
//                                   !n.isRead
//                                     ? "font-semibold text-gray-900"
//                                     : "font-medium text-gray-700"
//                                 }`}
//                               >
//                                 {n.message}
//                               </p>

//                               {/* ✅ UPDATED: Triggered By User Info */}
//                               {/* Checks for TriggeredBy object, then Username, then Email, then Fallback */}
//                               {n.triggeredBy ? (
//                                 <p className="text-xs text-gray-600 mt-1">
//                                   Purchased by:{" "}
//                                   <span className="font-semibold text-gray-800">
//                                     {n.triggeredBy.username ||
//                                       n.triggeredBy.email ||
//                                       "Unknown User"}
//                                   </span>
//                                 </p>
//                               ) : (
//                                 <p className="text-xs text-gray-400 mt-1 italic">
//                                   User info unavailable
//                                 </p>
//                               )}

//                               {/* Order Amount (If available from populate) */}
//                               {n.orderId && n.orderId.finalAmount && (
//                                 <p className="text-xs text-green-600 font-medium mt-1">
//                                   Amount: ₹{n.orderId.finalAmount}
//                                 </p>
//                               )}
//                             </div>

//                             {/* Unread Indicator Dot */}
//                             {!n.isRead && (
//                               <span className="h-2 w-2 rounded-full bg-pink-500 shrink-0 mt-1.5 ml-2" />
//                             )}
//                           </div>

//                           {/* Time */}
//                           <p className="text-[10px] text-gray-400 mt-2 text-right">
//                             {new Date(n.createdAt).toLocaleString("en-IN", {
//                               day: "numeric",
//                               month: "short",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }





// import { Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// // Removed useNavigate since we don't need redirection anymore
// import { useNotifications } from "../context/NotificationContext";

// export default function NotificationSlideOver({ open, onClose }) {
//   const { notifications, markAsRead } = useNotifications();
//   // const navigate = useNavigate(); // Removed

//   return (
//     <Transition show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         {/* Backdrop */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-in-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in-out duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-300"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-300"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
//                   <div className="h-full flex flex-col bg-white shadow-2xl">
                    
//                     {/* Header */}
//                     <div className="flex items-center justify-between px-6 py-5 bg-white border-b">
//                       <Dialog.Title className="text-xl font-bold text-gray-900">
//                         Notifications
//                       </Dialog.Title>
//                       <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-900 transition-colors"
//                       >
//                         <XMarkIcon className="h-6 w-6" />
//                       </button>
//                     </div>

//                     {/* Body */}
//                     <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
//                       {notifications.length === 0 && (
//                         <div className="flex flex-col items-center justify-center h-40 text-gray-500">
//                           <p>No new notifications</p>
//                         </div>
//                       )}

//                       {notifications.map((n) => (
//                         <div
//                           key={n._id}
//                           onClick={() => {
//                             // Only mark as read. No navigation.
//                             if (!n.isRead) {
//                               markAsRead(n._id);
//                             }
//                           }}
//                           className={`
//                             relative rounded-xl bg-white px-5 py-4 cursor-default
//                             border transition-all duration-200
//                             ${
//                               !n.isRead
//                                 ? "border-l-4 border-l-pink-500 border-y-gray-100 border-r-gray-100"
//                                 : "border-gray-200 opacity-75"
//                             }
//                           `}
//                         >
//                           <div className="flex justify-between items-start">
//                             <div className="w-full">
//                               {/* Message */}
//                               <p
//                                 className={`text-sm ${
//                                   !n.isRead
//                                     ? "font-semibold text-gray-900"
//                                     : "font-medium text-gray-700"
//                                 }`}
//                               >
//                                 {n.message}
//                               </p>

//                               {/* Triggered By User Info */}
//                               {n.triggeredBy ? (
//                                 <p className="text-xs text-gray-600 mt-1">
//                                   Purchased by:{" "}
//                                   <span className="font-semibold text-gray-800">
//                                     {n.triggeredBy.username ||
//                                       n.triggeredBy.email ||
//                                       "Unknown User"}
//                                   </span>
//                                 </p>
//                               ) : (
//                                 <p className="text-xs text-gray-400 mt-1 italic">
//                                   User info unavailable
//                                 </p>
//                               )}

//                               {/* Order Amount */}
//                               {n.orderId && n.orderId.finalAmount && (
//                                 <p className="text-xs text-green-600 font-medium mt-1">
//                                   Amount: ₹{n.orderId.finalAmount}
//                                 </p>
//                               )}
//                             </div>

//                             {/* REMOVED THE RED DOT SPAN HERE */}
                            
//                           </div>

//                           {/* Time */}
//                           <p className="text-[10px] text-gray-400 mt-2 text-right">
//                             {new Date(n.createdAt).toLocaleString("en-IN", {
//                               day: "numeric",
//                               month: "short",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }




import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationSlideOver({ open, onClose }) {
  const { notifications, markAsRead } = useNotifications();

  // 🔹 Helper function to mark all currently visible notifications as read
  const handleMarkAllRead = () => {
    notifications.forEach((n) => {
      if (!n.isRead) {
        markAsRead(n._id);
      }
    });
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <div className="h-full flex flex-col bg-white shadow-2xl">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 bg-white border-b">
                      <div>
                        <Dialog.Title className="text-xl font-bold text-gray-900">
                          Notifications
                        </Dialog.Title>
                        
                        {/* ✅ NEW: Mark All as Read Button */}
                        {notifications.some(n => !n.isRead) && (
                          <button
                            onClick={handleMarkAllRead}
                            className="text-xs text-pink-600 hover:text-pink-800 font-medium mt-1 underline"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>

                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                      {notifications.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                          <p>No new notifications</p>
                        </div>
                      )}

                      {notifications.map((n) => (
                        <div
                          key={n._id}
                          onClick={() => {
                            if (!n.isRead) {
                              markAsRead(n._id);
                            }
                          }}
                          className={`
                            relative rounded-xl bg-white px-5 py-4 cursor-default
                            border transition-all duration-200
                            ${
                              !n.isRead
                                ? "border-l-4 border-l-pink-500 border-y-gray-100 border-r-gray-100"
                                : "border-gray-200 opacity-75"
                            }
                          `}
                        >
                          <div className="flex justify-between items-start">
                            <div className="w-full">
                              {/* Message */}
                              <p
                                className={`text-sm ${
                                  !n.isRead
                                    ? "font-semibold text-gray-900"
                                    : "font-medium text-gray-700"
                                }`}
                              >
                                {n.message}
                              </p>

                              {/* Customer Info */}
                              {n.triggeredBy ? (
                                <p className="text-xs text-gray-600 mt-1">
                                  Purchased by:{" "}
                                  <span className="font-semibold text-gray-800">
                                    {n.triggeredBy.username ||
                                      n.triggeredBy.email ||
                                      "Unknown User"}
                                  </span>
                                </p>
                              ) : (
                                <p className="text-xs text-gray-400 mt-1 italic">
                                  User info unavailable
                                </p>
                              )}

                              {/* Amount */}
                              {n.orderId && n.orderId.finalAmount && (
                                <p className="text-xs text-green-600 font-medium mt-1">
                                  Amount: ₹{n.orderId.finalAmount}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Time */}
                          <p className="text-[10px] text-gray-400 mt-2 text-right">
                            {new Date(n.createdAt).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}