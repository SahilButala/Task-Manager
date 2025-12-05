import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../store/Slice/User";
import { adminSideBarMenuData, userSideBarMenuData } from "../config";

const SideMenu = ({ activeMenue }) => {
  const { user } = useSelector((state) => state.auth);
  const [sideMenuData, setsideMenuData] = useState([]);

  const navigate = useNavigate();
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear("");
    clearUserData();
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      setsideMenuData(
        user?.role === "admin" ? adminSideBarMenuData : userSideBarMenuData
      );
    }

    return () => {};
  }, [user]);

  console.log(sideMenuData);
  return (
    <div className="w-64 h-[calc(100vh-62px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img src={user?.profileImageUrl} alt="Profile Image"
           className="w-20 h-20 rounded-full bg-slate-400 object-cover"
          />
        </div>

        {user?.role === "admin" && <div className="text-[10px]  font-medium text-white bg-blue-400 px-3 py-0.5  rounded mt-4">Admin</div>}

        <h5 className="text-gray-950 font-medium leading-6 mt-3 capitalize">{user?.name || ""}</h5>

        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>

      {sideMenuData && sideMenuData.length > 0 ? (
        sideMenuData?.map((item) => (
          <button
            key={item?.id}
            className={`w-full  flex items-center gap-4 text-[15px]   ${
              activeMenue === item?.label
                ? "text-blue-400 bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
                : ""
            } py-3 px-6 mb-3 cursor-pointer`}
            onClick={() => handleClick(item?.path)}
          >
            {<item.icon className={"text-xl"} />}
            {item.label}
          </button>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideMenu;
