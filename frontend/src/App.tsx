import React, { useEffect } from "react";
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
import { AppDispatch, RootState } from "./store/index.js";
import { disconnectSocket, initSocket } from "./utils/Socket";
import { toast } from "react-toastify";
import {
  clearOldNotifications,
  incrementCount,
  setNotificationData,
} from "./store/Slice/Task";
import { useDispatch } from "react-redux";
import CreateUser from "./pages/admin/CreateUser";
import EditProfile from "./pages/admin/EditProfile";

const App = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state?.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      const socket = initSocket(user._id);

      //  Notification event
      socket.on("notification", (data) => {
        console.log(" Notification received:", data);
        toast.info(data.message);
      });

      //  Task update event
      socket.on("task:updated", (data) => {
        console.log(data, "sa");
        dispatch(
          setNotificationData({
            task: data?.task,
            type: data?.action === "TASK_UPDATED" ? "updated" : null,
          })
        );
        dispatch(incrementCount());
      });

      socket.on("task:created", (data) => {

        dispatch(
          setNotificationData({
            task: data?.task,
            type: data?.action === "TASK_CREATED" ? "created" : null,
          })
        );
        dispatch(incrementCount());
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated, user?._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(clearOldNotifications());
    }, 60 * 60 * 1000); // every 1 hr

    return () => clearInterval(interval);
  }, []);
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
            <Route path="/admin/create-user" element={<CreateUser />} />
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
          <Route
            element={
              <PrivateRoute
                allowRoles={user?.role}
                isAuthenticated={isAuthenticated}
              />
            }
          >
            <Route path="/edit/profile" element={<EditProfile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
