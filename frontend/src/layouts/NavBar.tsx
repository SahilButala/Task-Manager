import { JSX, useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import SideMenu from "./SideMenu";
import { getSocket } from "../utils/Socket";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useDispatch } from "react-redux";
import { clearNotificationCount } from "../store/Slice/Task";

interface NavBarProps {
  activeMenue: string;
}

const NavBar = ({ activeMenue }: NavBarProps): JSX.Element => {
  const [openSideBarMenu, setOpenSideBarMenu] = useState<boolean>(false);
  const {notification} = useSelector((state : RootState)=>state.task)
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>()

  // useEffect(() => {
  //   let socket : any;

  //   try {
  //     socket = getSocket();

  //     socket.on("notification", () => {
  //       setUnreadCount((prev) => prev + 1);
  //     });
  //   } catch (error) {
  //     // socket not initialized yet (user not logged in)
  //   }

  //   return () => {
  //     socket?.off("notification");
  //   };
  // }, []);

  console.log(unreadCount , "unreadCount")

  const handleNotificationClick = () => {
    console.log("Open notification panel");
    dispatch(clearNotificationCount())
  };

  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideBarMenu(!openSideBarMenu)}
        >
          {openSideBarMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="font-medium text-lg">Task Manager</h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button
          onClick={handleNotificationClick}
          className="relative text-gray-700 hover:text-black"
        >
          <IoNotificationsOutline className="text-2xl" />

          {notification > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5">
              {notification}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {openSideBarMenu && (
        <div className="fixed top-[62px] left-0 bg-white w-full z-40">
          <SideMenu activeMenue={activeMenue} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
