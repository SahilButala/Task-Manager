import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../helper/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../helper/helper";
import axiosInstance from "../../utils/axiosInstance";
import { apiPaths } from "../../constants";
import { getLogin } from "../../store/Slice/User";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  

  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.auth)



  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formdata.email)) {
      seterror("Please enter a valid email");
      return;
    }

    try {
      dispatch(getLogin({formdata , navigate}));
    } catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong...");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <div>
          <h2 className="text-xl font-semibold">Welcome Back</h2>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            please enter your details to log in
          </p>
        </div>

        {/*  form sections */}

        <form onSubmit={handleLoginSubmit}>
          {/* email  feild*/}
          <Input
            type={"email"}
            value={formdata.email}
            placeholader={"Enter the email"}
            label={"Enter the email"}
            onChange={({ target }) =>
              setformdata({
                ...formdata,
                email: target.value,
              })
            }
          />

          {/* password feild */}
          <Input
            type={"password"}
            value={formdata.password}
            label={"Enter the password"}
            placeholader={"Enter the password"}
            onChange={({ target }) =>
              setformdata({
                ...formdata,
                password: target.value,
              })
            }
          />

          {error && <div className="text-red-500 text-xs pb-2.5">{error}</div>}

          <button className="btn-primary">Login</button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account ? {""}
            <Link
              className="font-medium underline  blue capitalize"
              to={"/signup"}
            >
              signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
