import api from "./api";

export const checkAuthStatus = async () => {
  try {
    const res = await api.get("/auth/status");
    return res.data; // { isLoggedIn, role, email, id }
  } catch {
    return { isLoggedIn: false };
  }
};
