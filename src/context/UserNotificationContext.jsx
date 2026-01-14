import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import socket from "../utils/socket";
import { useAuth } from "./AuthContext";


const UserNotificationContext = createContext();

export const useUserNotifications = () =>
  useContext(UserNotificationContext);




export const UserNotificationProvider = ({ children }) => {
    const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const res = await api.get("/notifications/user");
    console.log("customer notification" , res.data)
    setNotifications(res.data);
    setUnreadCount(res.data.filter(n => !n.isRead).length);
  };


// useEffect(() => {
//   if (!user?.isAuthenticated) return;

//   // ✅ connect only once
//   if (!socket.connected) {
//     socket.connect();
//   }

//   fetchNotifications();

//   socket.on("user-notification", (notification) => {
//     setNotifications((prev) => [notification, ...prev]);
//     setUnreadCount((prev) => prev + 1);
//   });

//   return () => {
//     socket.off("user-notification");
//     // ❌ DO NOT disconnect here
//   };
// }, [user?.isAuthenticated]);



useEffect(() => {
  if (!user?.isAuthenticated) return;

  // ✅ DO NOT try socket if browser is offline
  if (!navigator.onLine) return;

  // ✅ connect only once
  if (!socket.connected) {
    socket.connect();
  }

  fetchNotifications();

  const handleNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  socket.on("user-notification", handleNotification);

  return () => {
    socket.off("user-notification", handleNotification);
  };
}, [user?.isAuthenticated]);




  const markAsRead = async (id) => {
    await api.put(`/notifications/${id}/read`);
    setNotifications(prev =>
      prev.map(n => n._id === id ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => Math.max(prev - 1, 0));
  };

  return (
    <UserNotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead }}
    >
      {children}
    </UserNotificationContext.Provider>
  );
};
