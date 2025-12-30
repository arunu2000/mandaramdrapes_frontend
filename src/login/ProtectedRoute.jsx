
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();

//   // Wait until AuthContext finishes initial auth check
//   if (user.isInitialLoad) {
//     return null; // Or loading spinner
//   }

//   if (!user.isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;




import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If auth context is still initializing, do nothing
  if (!user || user.isInitialLoad) {
  
    
    return null; // or a loading spinner
  }

  // If NOT authenticated, block the route
  if (!user.isAuthenticated) {
 

    return <Navigate to="/login" replace />;
  }

  // If authenticated, allow access
  return children;
};

export default ProtectedRoute;



