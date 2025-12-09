import {
  LuClipboardCheck,
  LuLayoutDashboard,
  LuLogOut,
  LuSquarePlus,
  LuUsers,
} from "react-icons/lu";

// all forms initialData
export const initialRegisterData = {
  email: "",
  name: "",
  profileImageUrl: "",
  password: " ",
  adminInviteToken: "",
};

export const  initialcreateTaskData = {
  title: "",
  description: "",
  priority: "Low",
  dueDate: null,
  assignedTo: [],
  todoChecklist: [],
  attachements : []
};

export const adminSideBarMenuData = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Manage Task",
    icon: LuClipboardCheck,
    path: "/admin/tasks",
  },
  {
    id: "03",
    label: "Create Task",
    icon: LuSquarePlus,
    path: "/admin/create",
  },
  {
    id: "04",
    label: "Team Members",
    icon: LuUsers,
    path: "/admin/users",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];
export const userSideBarMenuData = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "My Task",
    icon: LuClipboardCheck,
    path: "/user/tasks",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const Priority_Data = [
  { label: "low", value: "Low" },
  { label: "high", value: "High" },
  { label: "medium", value: "Medium" },
];
export const Status_Data = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];
