import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { validateEmail, validatePassword } from "../../helper/helper";
import Input from "../../helper/input/Input";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/auth/ProfilePhotoSelector";
import { initialRegisterData } from "../../config";
import { useDispatch } from "react-redux";
import { getRegister } from "../../store/Slice/User";
import { uploadImage } from "../../utils/UploadImage";


const SignUp = () => {

  const [error, seterror] = useState("");


  const [adminToken, setadminToken] = useState("");

  const [formdata, setformdata] = useState(initialRegisterData);
  const  navigate = useNavigate()

  const dispatch = useDispatch();


const handleLoginSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!validateEmail(formdata.email)) {
      seterror("Please enter a valid email");
      return;
    }

    let uploadedImageUrl = formdata.profileImageUrl;

    if (formdata.profileImageUrl !== "") {
      const response = await uploadImage(formdata.profileImageUrl);
      uploadedImageUrl = response?.imageurl || "";
    }

    const dataToSubmit = {
      ...formdata,
      profileImageUrl: uploadedImageUrl
    };

    dispatch(getRegister({ formdata: dataToSubmit, navigate }));
    console.log(dataToSubmit);

  } catch (error) {
    console.error(error);
    seterror("Something went wrong. Please try again.");
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
          {/* profile input component */}

          <ProfilePhotoSelector
            image={formdata?.profileImageUrl}
            setProfilePic={setformdata}
            formdata={formdata}
          />

          {/* name  feild*/}

          <Input
            type={"name"}
            placeholader={"Enter the name"}
            label={"Enter the name"}
            onChange={({ target }) =>
              setformdata((prev)=>({
                ...prev,
                name: target.value,
              }))
            }
          />
          {/* email  feild*/}
          <Input
            type={"email"}
            placeholader={"Enter the email"}
            label={"Enter the email"}
            onChange={({ target }) =>
              setformdata((prev)=>({ ...prev, email: target.value }))
            }
          />
          {console.log(formdata)}

          {/* password feild */}
          <Input
            type={"password"}
            label={"Enter the password"}
            placeholader={"Enter the password"}
            onChange={({ target }) =>
              setformdata((prev)=>({ ...prev, password: target.value }))
            }
          />

          <Input
            type={"text"}
            label={"Enter the Invite Token "}
            placeholader={"Enter the Token"}
            onChange={({ target }) => {
              setformdata((prev)=>({ ...prev, adminInviteToken: target.value }));
            }}
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
