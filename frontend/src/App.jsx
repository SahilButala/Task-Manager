import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import PrivateRoute from "./route/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import ManageTask from "./pages/admin/ManageTask";
import CreateTask from "./pages/admin/CreateTask";
import ManageUser from "./pages/admin/ManageUser";
import UserDashboard from "./pages/User/Dashboard";
import MyTask from "./pages/User/MyTask";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
import SignUp from "./pages/auth/Signin";
import { useSelector } from "react-redux";
import PublicRoute from "./route/PublicRoute";
import { NotFound_page } from "./Not_found";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div>
      <Router>
        <Routes>
          {/* auth routes */}

          <Route
            element={
              <PublicRoute
                isAuthenticated={isAuthenticated}
                allowRoles={user?.role}
              />
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* admin routes */}
          <Route
            element={
              <PrivateRoute
                allowRoles={user?.role}
                isAuthenticated={isAuthenticated}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTask />} />
            <Route path="/admin/create" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUser />} />
          </Route>

          {/* users route */}
          <Route
            element={
              <PrivateRoute
                allowRoles={user?.role}
                isAuthenticated={isAuthenticated}
              />
            }
          >
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/task" element={<MyTask />} />
            <Route path="/user/details/:id" element={<ViewTaskDetails />} />
          </Route>

          <Route
            element={
              <PrivateRoute
                allowRoles={user?.role}
                isAuthenticated={isAuthenticated}
              />
            }
          >
            <Route path="*" element={<NotFound_page />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
