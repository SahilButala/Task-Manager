import { JSX, useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import SideMenu from "./SideMenu";
import { getSocket } from "../utils/Socket";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useDispatch } from "react-redux";
import { clearNotificationCount } from "../store/Slice/Task";
import Notifications from "../components/Notification/Notification";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  activeMenue: string;
}

const NavBar = ({ activeMenue }: NavBarProps): JSX.Element => {
  const [openSideBarMenu, setOpenSideBarMenu] = useState<boolean>(false);
  const { notification, notificationData } = useSelector(
    (state: RootState) => state.task
  );
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [rightSidebar, setrightSidebar] = useState<boolean>(false);
  const navigate = useNavigate();

  console.log(notificationData, "noti");

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

  const getPriorityTagColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "text-emerald-500  bg-emerald-100 border border-emerald-500/10";
      case "Medium":
        return "texr-amber-500 bg-amber-50 border border-amber-500/20";

      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  const getStatusTagColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-white  bg-cyan-500 border border-cyan-500/10";
      case "Completed":
        return "texr-lime-500 bg-lime-50 border border-lime-500/20";

      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  console.log(unreadCount, "unreadCount");

  const handleNotificationClick = () => {
    console.log("Open notification panel");
    dispatch(clearNotificationCount());
    setrightSidebar(true);
  };

  return (
    <>
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

        
        <div className="text-xs text-gray-500">
           CreatedBy <span>@Sahil Butala</span> <span className="underline">copyright 2025</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <button
            onClick={handleNotificationClick}
            className="relative text-gray-700 hover:text-black"
          >
            <IoNotificationsOutline className="text-2xl cursor-pointer" />

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
      {rightSidebar && (
        <Notifications
          open={rightSidebar}
          onClose={() => setrightSidebar(false)}
        >
          {notificationData && notificationData.length > 0 ? (
            [...notificationData]?.reverse().map((item) => {
              const { task } = item;

              // console.log(task , "task sahil")
              return (
                <div
                  className="card mt-2 cursor-pointer"
                  onClick={() => {
                    navigate(`/user/details/${task?._id}`);
                    setrightSidebar(false);
                  }}
                >
                  {item?.type === "updated" ? (
                    <div>
                      <div className="text-xs font-medium text-green-500">
                        Updated By task
                      </div>

                      <div className="flex items-center justify-between ">
                        <div className="text-[13px] font-medium text-gray-500 mt-2">
                          {task?.title}
                        </div>

                        <div className="text-xs underline">
                          Due date :{" "}
                          {task?.dueDate
                            ? moment(task?.dueDate).format("Do MMM YYYY")
                            : null}
                        </div>
                      </div>

                      <div className="grid-cols-1 md:grid-cols-2 gap-3 grid mt-2">
                        <div
                          className={`text-[11px]  font-medium   ${getPriorityTagColor(
                            task?.priority
                          )} px-4 py-0.5 rounded`}
                        >
                          Priority : {task?.priority}
                        </div>

                        <div
                          className={`text-[11px]  font-medium  ${getStatusTagColor(
                            task?.status
                          )} px-4 py-0.5 rounded`}
                        >
                          Status : {task?.status}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="text-[10px] mt-3   ">
                          Created At :
                          {task?.createdAt
                            ? moment(task?.createdAt).format("Do MMM YYYY")
                            : null}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="text-[10px] mt-3   capitalize font-medium">
                          Updated By : {task?.createdBy?.name}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="text-[10px] mt-1 text-gray-400">
                          {moment(item.createdAt).fromNow(true)} ago
                        </div>
                      </div>
                    </div>
                  ) : (
                   <div>
                      <div className="text-xs font-medium text-green-500">
                        New Task
                      </div>

                      <div className="flex items-center justify-between ">
                        <div className="text-[13px] font-medium text-gray-500 mt-2">
                          {task?.title}
                        </div>

                        <div className="text-xs underline">
                          Due date :{" "}
                          {task?.dueDate
                            ? moment(task?.dueDate).format("Do MMM YYYY")
                            : null}
                        </div>
                      </div>

                      <div className="grid-cols-1 md:grid-cols-2 gap-3 grid mt-2">
                        <div
                          className={`text-[11px]  font-medium   ${getPriorityTagColor(
                            task?.priority
                          )} px-4 py-0.5 rounded`}
                        >
                          Priority : {task?.priority}
                        </div>

                        <div
                          className={`text-[11px]  font-medium  ${getStatusTagColor(
                            task?.status
                          )} px-4 py-0.5 rounded`}
                        >
                          Status : {task?.status}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="text-[10px] mt-3   ">
                          Created At :
                          {task?.createdAt
                            ? moment(task?.createdAt).format("Do MMM YYYY")
                            : null}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="text-[10px] mt-3   capitalize font-medium">
                          Created By : {task?.createdBy?.name}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="text-[10px] mt-1 text-gray-400">
                          {moment(item.createdAt).fromNow(true)} ago
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-xs text-center mt-40">No Notication yet..</div>
          )}
        </Notifications>
      )}
    </>
  );
};

export default NavBar;
