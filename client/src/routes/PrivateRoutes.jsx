import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role, children }) => {
  let user = null;
  try {
    const userData = localStorage.getItem("user");
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    localStorage.removeItem("user");
  }

  if (!user) return <Navigate to="/auth" />; // not logged in
  
  // Support single role or array of roles
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" />; // wrong role
    }
  }

  return children;
};

// const PrivateRoute = ({ role, children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user) return <Navigate to="/auth" />;

//   if (role && !role.includes(user.role)) return <Navigate to="/" />;

//   return children;
// };

export default PrivateRoute;
