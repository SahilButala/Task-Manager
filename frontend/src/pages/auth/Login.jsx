import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../helper/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../helper/helper";
import axiosInstance from "../../utils/axiosInstance";
import { apiPaths } from "../../constants";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      seterror("Please enter a valid email");
      return;
    }

    // if (!validatePassword(password)) {
    //   seterror(
    //     "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    //   );
    //   return;
    // }

    try {
      const res = await axiosInstance.post(apiPaths.AUTH.LOGIN, {
        email,
        password,
      });

      if (res.data["sucess"] === true) {
        const { token, role } = res?.data?.data;

        localStorage.setItem("token", token);
        console.log(role);

        //redirect based on role

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
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
            placeholader={"Enter the email"}
            label={"Enter the email"}
            onChange={({ target }) => setemail(target.value)}
          />

          {/* password feild */}
          <Input
            type={"password"}
            label={"Enter the password"}
            placeholader={"Enter the password"}
            onChange={({ target }) => setpassword(target.value)}
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
