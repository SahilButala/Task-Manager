import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";

// this is the admin side dashboard
const DashboardLayout = ({ children, activeMenue }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <NavBar activeMenue={activeMenue} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenue={activeMenue} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
