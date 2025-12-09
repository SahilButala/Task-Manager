import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsersService, LoginService, RegisterService } from "../../api";

const initialState = {
  isLoading: false,
  user: [] || null,
  isAuthenticated: false,
  adminUsers : [] || null
};

export const getLogin = createAsyncThunk(
  "/auth/login",
  async ({ formdata, navigate }) => {
    const res = await LoginService(formdata);

    if (res["sucess"] === true) {
      const { token, role } = res?.data;

      localStorage.setItem("token", token);

      if (role === "") return;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
    return res;
  }
);

// this api for only admin 
export const adminSideUsers = createAsyncThunk("/admin/getusers" , async()=>{
      const res = await getAllUsersService()
      return res?.data
})


export const getRegister = createAsyncThunk("/auth/register" , async ({formdata , navigate})=>{
    const res = await RegisterService(formdata)
    if(res?.sucess === true){
          navigate("/login")
    }
    return res
})
const UserSlice = createSlice({
  name: "auth",
  reducers: {
        clearUserData : (state , action)=>{
              state.isAuthenticated = false,
              state.user = null
        }
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.user = [];
      })
      .addCase(getLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload?.data;
      })
      .addCase(getLogin.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.user = [];
      }).addCase(adminSideUsers.pending , (state , action)=>{
          state.adminUsers = null
      }).addCase(adminSideUsers?.fulfilled , (state , action)=>{
          state.adminUsers = action?.payload
      }).addCase(adminSideUsers.rejected , (state , action)=>{
          state.adminUsers = null
      })
  },
});


export const {clearUserData} = UserSlice.actions

export default UserSlice.reducer;
