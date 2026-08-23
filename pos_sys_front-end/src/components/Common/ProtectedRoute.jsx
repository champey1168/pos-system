import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth.js";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (currentUser?.role === "Cashier") {
    return <Navigate to="/products" replace />;
  }
  
  return children;
}
