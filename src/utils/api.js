import axios from "axios";

const api = axios.create({
  baseURL: "https://xpg4jlf7-5000.inc1.devtunnels.ms/",
  headers: { "Content-Type": "application/json" },
});

export default api;
