import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";
import { RootState } from "../store";

interface DashboardLayoutProps {
  children?: import("react").ReactNode;
  activeMenue?: string;
}

// this is the admin side dashboard
const DashboardLayout = ({ children, activeMenue } : DashboardLayoutProps) => {
  const { user } = useSelector((state : RootState) => state.auth);
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
