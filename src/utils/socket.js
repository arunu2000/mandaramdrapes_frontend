import { io } from "socket.io-client";
import { domainUrl } from "./constant";

// IMPORTANT:
// - withCredentials: true → sends cookies (jwt)
// - transports: ["websocket"] → avoids polling issues
// - autoConnect: false → we control when to connect

// const socket = io(domainUrl, {
//   withCredentials: true,
//   transports: ["websocket"],
//   autoConnect: false,
// });


// const socket = io(domainUrl, {
//   withCredentials: true,
//   transports: ["websocket"],
//   autoConnect: false,
//   reconnection: false,        // ✅ THIS STOPS THE LOOP
// });

console.log("🔥 SOCKET CONFIG LOADED — POLLING ONLY");


const socket = io(domainUrl, {
  withCredentials: true,
  autoConnect: false,
  reconnection: false,
  transports: ["polling"],   // ✅ FIX
});



// Optional: debug logs (remove in production)
socket.on("connect", () => {
  console.log("✅ Admin socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Admin socket disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Socket connection error:", err.message);
});

export default socket;
