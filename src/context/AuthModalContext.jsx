// import React, { createContext, useContext, useState } from "react";

// const AuthModalContext = createContext();

// export const AuthModalProvider = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true); // true = Login, false = Signup

//   const openAuthModal = (loginMode = true) => {
//     setIsLogin(loginMode);
//     setIsOpen(true);
//   };

//   const closeAuthModal = () => setIsOpen(false);

//   return (
//     <AuthModalContext.Provider
//       value={{ isOpen, isLogin, openAuthModal, closeAuthModal, setIsLogin }}
//     >
//       {children}
//     </AuthModalContext.Provider>
//   );
// };

// export const useAuthModal = () => useContext(AuthModalContext);
