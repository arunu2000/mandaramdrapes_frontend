// import api from "./api";

// export const checkAuthStatus = async () => {
//   try {
    
//     const res = await api.get("/auth/status");
//     return res.data; // { isLoggedIn, role, email, id }
//   } catch {
//     return { isLoggedIn: false };
//   }
// };



import apiPlain from "./apiPlain";

export const checkAuthStatus = async () => {
  try {
    const res = await apiPlain.get("/auth/status");
    return res.data;
  } catch {
    return { isLoggedIn: false };
  }
};

