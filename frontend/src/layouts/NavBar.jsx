import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const NavBar = ({ activeMenue }) => {
  const [OpenSideBarMenu, setOpenSideBarMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border border-b  border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30"> 
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideBarMenu(!OpenSideBarMenu);
        }}
      >
        {OpenSideBarMenu ? <HiOutlineX  className="text-2xl"/> : <HiOutlineMenu className="text-2xl"/>}
      </button>

      <h2>Expense Tracker</h2>

      {OpenSideBarMenu && (
        <div className="fixed top-[62px] -ml-4 bg-white">
          <SideMenu activeMenue={activeMenue} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
