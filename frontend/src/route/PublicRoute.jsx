import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, allowRoles }) => {
  // If user is authenticated, redirect to their dashboard
  if (isAuthenticated) {
    if (allowRoles === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (allowRoles === "member") {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  // Otherwise allow access to public route
  return <Outlet />;
};

export default PublicRoute;
