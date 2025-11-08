// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://xpg4jlf7-5000.inc1.devtunnels.ms/",
//   headers: { "Content-Type": "application/json" },
// });

// export default api;



// src/utils/api.js
import axios from "axios";
import { domainUrl } from "./constant";

const api = axios.create({
  baseURL: domainUrl,
  withCredentials: true, // Automatically send/receive cookies
  headers: { "Content-Type": "application/json" },
});

export default api;


