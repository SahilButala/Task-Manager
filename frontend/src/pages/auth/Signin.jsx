import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { validateEmail, validatePassword } from "../../helper/helper";
import Input from "../../helper/input/Input";
import { Link } from "react-router-dom";
import ProfilePhotoSelector from "../../components/auth/ProfilePhotoSelector";

const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [error, seterror] = useState("");
  const [ProfilePic, setProfilePic] = useState("");

  const [adminToken, setadminToken] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      seterror("Please enter a valid email");
      return;
    }

    if (!validatePassword(password)) {
      seterror(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    console.log("login api heated ... . . . .");
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
          {/* profile input component */}

          <ProfilePhotoSelector
            image={ProfilePic}
            setProfilePic={setProfilePic}
          />

          {/* name  feild*/}

          <Input
            type={"name"}
            placeholader={"Enter the name"}
            label={"Enter the name"}
            onChange={({ target }) => setname(target.value)}
          />
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

          <Input
            type={"text"}
            label={"Enter the Invite Token "}
            placeholader={"Enter the Token"}
            onChange={({ target }) => setadminToken(target.value)}
          />

          {error && <div className="text-red-500 text-xs pb-2.5">{error}</div>}

          <button className="btn-primary">Sign Up</button>

          <p className="text-[13px] text-slate-800 mt-3">
            Do you have an account ? {""}
            <Link
              className="font-medium underline  blue capitalize"
              to={"/login"}
            >
              login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
