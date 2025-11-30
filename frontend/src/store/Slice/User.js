import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginService, RegisterService } from "../../api";

const initialState = {
  isLoading: false,
  user: [],
  isAuthenticated: false,
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


export const getRegister = createAsyncThunk("/auth/register" , async ({formdata , navigate})=>{
    const res = await RegisterService(formdata)
    if(res?.data){
          
    }
    return res
})
const UserSlice = createSlice({
  name: "auth",
  reducers: {},
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
      })
  },
});

export default UserSlice.reducer;
