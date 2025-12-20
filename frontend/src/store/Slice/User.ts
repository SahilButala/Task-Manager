import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  createUserService,
  getAllUsersService,
  LoginService,
  RegisterService,
} from "../../api/index.js";
import { toast } from "react-toastify";

// =====================
// Types
// =====================
interface LoginPayload {
  formdata: any;
  navigate: (path: string) => void;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  profileImageUrl: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
  pendingTask: number;
  inprogressTask: number;
  CompleteTask: number;
}

interface RegisterPayload {
  formdata: any;
  navigate: (path: string) => void;
}

interface UserState {
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  adminUsers: any[] | null;
}

// =====================
// Initial State
// =====================
const initialState: UserState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  adminUsers: [],
};

// =====================
// Thunks
// =====================
export const getLogin = createAsyncThunk(
  "/auth/login",
  async ({ formdata, navigate }: any) => {
    const res = await LoginService(formdata);

    if (res?.sucess === true) {
      const { token, role } = res?.data;
      toast.success("Login Successfully..");

      localStorage.setItem("token", token);

      if (!role) return res;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }

    return res;
  }
);

// admin only
export const adminSideUsers = createAsyncThunk("/admin/getusers", async () => {
  const res = await getAllUsersService();
  return res?.data;
});

export const getRegister = createAsyncThunk(
  "/auth/register",
  async ({ formdata, navigate }: any) => {
    const res = await RegisterService(formdata);

    if (res?.sucess === true) {
      toast.success("Register Successfully");
      navigate("/login");
    }

    return res;
  }
);

export const createUser = createAsyncThunk(
  "/user/create",
  async ({ formdata, navigate, setloading }: any) => {
    const res = await createUserService(formdata);
    if (res?.sucess === true) {
      toast.success("User Created Successfully");
      navigate("/admin/users");
      setloading(false);
    }
  }
);

// =====================
// Slice
// =====================
const UserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setEditUserdata : (state , action)=>{
        state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.user = null;
      })
      .addCase(getLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload?.data;
      })
      .addCase(getLogin.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.user = null;
      })
      .addCase(adminSideUsers.pending, (state) => {
        state.adminUsers = null;
      })
      .addCase(
        adminSideUsers.fulfilled,
        (state, action: PayloadAction<any[] | null>) => {
          state.adminUsers = action.payload;
        }
      )
      .addCase(adminSideUsers.rejected, (state) => {
        state.adminUsers = null;
      });
  },
});

// =====================
// Exports
// =====================
export const { clearUserData  , setEditUserdata} = UserSlice.actions;

export default UserSlice.reducer;
