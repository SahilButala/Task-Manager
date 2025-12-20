import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllUsersService } from "../../api";
import { User } from "../../store/Slice/User";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import axiosInstance from "../../utils/axiosInstance";
import { apiPaths } from "../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate()

  // 1️⃣ Fetch users
  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getAllUsersService();

      if (res?.sucess) {
        setAllUsers(res.data || []);
      }
    } catch (error: any) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // 2️⃣ Download report
  const handleDownloadReport = async () => {
    try {
      const res = await axiosInstance.get(
        apiPaths.DOWNLOAD_REPORT.DOWNLOAD_USER_REPORT,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click(); // ✅ important
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast.error("Failed to download report");
    }
  };

  const hasUsers = allUsers.length > 0;

  return (
    <DashboardLayout activeMenue="Team Members">
      <div className="mt-5 mb-10">
        {/* Header */}
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl font-medium">Team Members</h2>

          {/* {hasUsers && (
            <button
              className="flex items-center download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet />
              Download Report
            </button>
          )} */}
        </div>

        {/* Content */}
        {isLoading ? (
          <Loader/>
        ) : hasUsers ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {allUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))}
          </div>
        ) : (
          // 3️⃣ Empty state
          <div className="h-[300px] flex flex-col items-center justify-center text-sm ">
            <p className="text-gray-500">No team members found</p>
            <p className="text-xs mt-1">
              <span className="hover:underline text-blue-400 cursor-pointer" onClick={()=>navigate("/admin/create-user")}> Create users</span> to start collaborating
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageUser;
