// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "../utils/api";
// import socket from "../utils/socket";

// const NotificationContext = createContext();

// export const useNotifications = () => useContext(NotificationContext);

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // 🔹 Fetch old notifications (DB)
//   const fetchNotifications = async () => {
//     try {
//       const res = await api.get("/notifications/admin");

//       console.log("response notification" , res.data );
      
//       setNotifications(res.data);

//       const unread = res.data.filter((n) => !n.isRead).length;
//       setUnreadCount(unread);
//     } catch (err) {
//       console.error("Notification fetch failed");
//     }
//   };

//   // 🔹 Mark single notification as read
//   const markAsRead = async (id) => {
//     try {
//       await api.put(`/notifications/${id}/read`);

//       setNotifications((prev) =>
//         prev.map((n) =>
//           n._id === id ? { ...n, isRead: true } : n
//         )
//       );

//       setUnreadCount((prev) => Math.max(prev - 1, 0));
//     } catch (err) {
//       console.error("Mark as read failed");
//     }
//   };

//   // 🔹 Socket logic
// useEffect(() => {
//   fetchNotifications();

//   if (!socket.connected) {
//     socket.connect();
//   }

//   socket.on("admin-notification", (notification) => {
//     setNotifications((prev) => [notification, ...prev]);
//     setUnreadCount((prev) => prev + 1);
//   });

//   return () => {
//     socket.off("admin-notification");
//   };
// }, []);



//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         unreadCount,
//         markAsRead,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };




import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import socket from "../utils/socket";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // 🔹 Fetch old notifications (DB)
  const fetchNotifications = async () => {
    try {
      // Matches Backend Route: router.get("/admin", ...)
      const res = await api.get("/notifications/admin");
      console.log("notification admin ", res.data);
      
      
      setNotifications(res.data);
      const unread = res.data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Notification fetch failed:", err);
    }
  };

  // 🔹 Mark single notification as read
  const markAsRead = async (id) => {
    try {
      // Optimistic Update (Update UI immediately)
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));

      // API Call
      await api.put(`/notifications/admin/${id}/read`);
    } catch (err) {
      console.error("Mark as read failed", err);
      // Optional: Revert state if API fails
    }
  };

  // 🔹 Socket Logic
  useEffect(() => {
    fetchNotifications();

    if (!socket.connected) {
      socket.connect();
    }

    // Listener for 'admin-notification' event from Backend
    const handleNotification = (notification) => {
      console.log("🔔 New Admin Notification:", notification);
      
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
      
      // Optional: Browser built-in audio or toast can go here
    };

    socket.on("admin-notification", handleNotification);

    return () => {
      socket.off("admin-notification", handleNotification);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        fetchNotifications, // Exposed in case you need to manually refresh
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};