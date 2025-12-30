// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://xpg4jlf7-5000.inc1.devtunnels.ms/",
//   headers: { "Content-Type": "application/json" },
// });

// export default api;



// src/utils/api.js
// 


// import axios from "axios";
// import { domainUrl } from "./constant";

// const api = axios.create({
//     baseURL: domainUrl,
//     withCredentials: true,
//     headers: { "Content-Type": "application/json" }, //  CRITICAL: This allows sending/receiving cookies
// });

// // Response Interceptor
// api.interceptors.response.use(
//     (response) => {
//         // If the request succeeds, just return the response
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         // Check if error is 401 (Unauthorized) and we haven't retried yet
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; // Mark this request as retried so we don't loop forever

//             try {
//                 // 1. Call the Refresh Endpoint
//                 // We don't need to pass data; cookies are sent automatically because of 'withCredentials: true'
               
//                 await api.post('/auth/refresh');

//                 // 2. If successful, retry the original request
//                 // The new cookies are already set by the browser automatically!
//                 return api(originalRequest);

//             } catch (refreshError) {
//                 // 3. If refresh fails (e.g., token expired after 7 days), force logout
      
//                 // window.location.href = "/login"; // Redirect to login page
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;






import axios from "axios";
import { domainUrl } from "./constant";

const api = axios.create({
    baseURL: domainUrl,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }, //  CRITICAL: This allows sending/receiving cookies
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
