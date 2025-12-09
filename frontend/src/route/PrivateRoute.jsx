import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ allowRoles, isAuthenticated }) => {
  if (!isAuthenticated || allowRoles === undefined) {
    return <Navigate to="/login" replace />;
  }

  if (
    isAuthenticated &&
    allowRoles === "member" &&
    ["/login", "/signup", "/admin/dashboard" , "/"].includes(location.pathname)
  ) {
    return <Navigate to={"/user/dashboard"} />;
  }
  if (
    isAuthenticated &&
    allowRoles === "admin" &&
    ["/login", "/signup", "/user/dashboard" , "/"].includes(location.pathname)
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
