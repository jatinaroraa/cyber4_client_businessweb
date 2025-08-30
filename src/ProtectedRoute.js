import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user, "userr");
  if (user) return children;
  else return <Navigate to="/login" />;
  //   return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
