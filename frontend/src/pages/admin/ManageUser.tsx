import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllUsersService, handleDownloadReportService } from "../../api";
import { User } from "../../store/Slice/User";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import axiosInstance from "../../utils/axiosInstance";
import { apiPaths } from "../../constants";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [allUsers, setallUsers] = useState<User[]>([]);

  const getAllUsers = async () => {
    try {
      const res = await getAllUsersService();

      if (res?.sucess) {
        setallUsers(res?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  const handleDownloadReport = async ()=>{
    try {


       const res =await axiosInstance.get(apiPaths.DOWNLOAD_REPORT.DOWNLOAD_USER_REPORT , {
        responseType : "blob"
       })

       // creating URL for the blob
       const url  = window.URL.createObjectURL(new Blob([res?.data]))
       const link = document.createElement("a")
       link.href = url
       link.setAttribute("download" , "user_details.xlsx")
       document.body.appendChild(link)
       window.URL.revokeObjectURL(url)
 
    } catch (error : any) {
      console.log(error)
      toast.error(error)
    }
  }

  console.log(allUsers, "allusers");
  return <DashboardLayout activeMenue="Team Members">
  <div className="mt-5 mb-10">
  <div className="flex md:flex-row md:items-center justify-between">
    <h2 className="text-xl md:text-xl  font-medium">Team Members</h2>

    <button className="flex  md:flex  items-center download-btn" onClick={()=>handleDownloadReport()}>
      <LuFileSpreadsheet/>
      Download Report</button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 ">

    {
      allUsers?.map((user)=>(
        <UserCard key={user?._id}  userInfo={user} />
      ))
    }

  </div>
  </div>
  </DashboardLayout>;
};

export default ManageUser;
