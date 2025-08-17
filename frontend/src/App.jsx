import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signin from "./pages/auth/Signin";
import PrivateRoute from "./route/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import ManageTask from "./pages/admin/ManageTask";
import CreateTask from "./pages/admin/CreateTask";
import ManageUser from "./pages/admin/ManageUser";
import UserDashboard from "./pages/User/Dashboard";
import MyTask from "./pages/User/MyTask";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />

          {/* admin routes */}
          <Route element={<PrivateRoute allowRoles={["admin"]} />}>
            <Route path='"/admin/dashboard' element={<Dashboard />} />
            <Route path='"/admin/tasks' element={<ManageTask />} />
            <Route path='"/admin/create' element={<CreateTask />} />
            <Route path='"/admin/users' element={<ManageUser />} />
          </Route>

          {/* users route */}
          <Route element={<PrivateRoute allowRoles={["member"]} />}>
            <Route path='"/user/dashboard' element={<UserDashboard />} />
            <Route path='"/user/task' element={<MyTask />} />
            <Route path='"/user/details/:id' element={<ViewTaskDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
