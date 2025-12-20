import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserDetailsByIdService, updateUserByIdService } from "../../api";
import { initialRegisterDataType } from "../../interfaces";
import { initialRegisterData } from "../../config";
import ProfilePhotoSelector from "../../components/auth/ProfilePhotoSelector";
import Input from "../../helper/input/Input";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setEditUserdata } from "../../store/Slice/User";

const EditProfile = () => {
  const location = useLocation();
  const { userid } = location.state || {};
  const {user}  = useSelector((state : RootState)=>state.auth)
  const role = user?.role
  const [error, seterror] = useState("");
  const dispatch = useDispatch<AppDispatch>()



  const [formdata, setformdata] =
    useState<initialRegisterDataType>(initialRegisterData);
  const navigate = useNavigate();

  const id = userid;

  const getUserDetailsById = async () => {
    try {
      if (id) {
        const res = await getUserDetailsByIdService(id);
        if (res?.sucess === true) {
          console.log(res?.data);
          setformdata(res?.data);
        }
      }
    } catch (error) {}
  };

  const handleLoginSubmit = async (e : any) => {

    try {
        e.preventDefault()
      if (id) {
        const res = await updateUserByIdService(id , formdata);

        if (res?.sucess) {
          toast.success("user updated");
          dispatch(setEditUserdata(formdata))
           if(role === "admin"){
              navigate("/admin/dashboard")
           }else{
            navigate("/user/dashboard")
           }
          setformdata(res?.data);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserDetailsById();
  }, [id]);
  return (
    <DashboardLayout activeMenue="">
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col  mt-7">
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
            type="text"
            placeholder="Enter the name"
            label="Enter the name"
            value={formdata.name}
            onChange={(e) =>
              setformdata((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          {/* Email */}
          <Input
            type="email"
            placeholder="Enter the email"
            label="Enter the email"
            value={formdata.email}
            onChange={(e) =>
              setformdata((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          {error && <div className="text-red-500 text-xs pb-2.5">{error}</div>}

          <button className="btn-primary">Edit Profile</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;
