import { Navigate, Outlet } from "react-router-dom";
interface Prop{
   isAuthenticated? : boolean;
   allowRoles? : string
}

const PublicRoute = ({ isAuthenticated, allowRoles } : Prop) => {
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
