import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { apiPaths } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { adminSideUsers } from "../../store/Slice/User";
import { LuUsers } from "react-icons/lu";
import Modal from "./Modal";
import AvatarGroup from "../Avatar/AvatarGroup";

const SelectedUsers = ({ usersSelected, setSelectedUsers }) => {
  const [isModalOpen, setisModalOpen] = useState(true);
  const [tempSelectedUsers, settempSelectedUsers] = useState([]);

  const dispatch = useDispatch();

  // FIXED SELECTOR — adjust based on your slice name
  const { adminUsers } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(adminSideUsers());
  }, []);

  useEffect(() => {
    if (usersSelected.length === 0) {
      settempSelectedUsers([]);
    }
  }, [usersSelected]);

  const toggleUserSelection = (userId) => {
    settempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };
const handleAssgine = ()=>{
  setSelectedUsers(tempSelectedUsers)
  setisModalOpen(false)
}
  const selectedAvatar =
    adminUsers
      ?.filter((user) => usersSelected.includes(user?._id))
      ?.map((user) => user?.profileImageUrl) || [];

  return (
    <div className="space-y-4 mt-2">
      {selectedAvatar.length === 0 && (
        <button className="card-btn" onClick={() => setisModalOpen(true)}>
          <LuUsers /> Add Members
        </button>
      )}

      {
        selectedAvatar.length > 0 && (
          <div className="cursor-pointer" onClick={()=>setisModalOpen(true)}
          > 

          <AvatarGroup
           avatar={selectedAvatar} maxVisible={3}
          />


          </div>
        )
      }

      <Modal
        isopen={isModalOpen}
        onClose={() => setisModalOpen(false)}
        title={"Select Users"}
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {adminUsers?.map((user, i) => (
            <div
              className="
            flex items-center  gap-4 p-3  border-b border-gray-200
            "
              key={`user ${i}`}
            >
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.profileImageUrl}
                alt={user?.name}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-700">{user?.name}</p>
                <p className="font-medium text-gray-700">{user?.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user?._id)}
                onChange={() => toggleUserSelection(user?._id)}
                className="w-4 h-4 text-blue-300 bg-gray-100 border-gray-300 outline-none rounded-sm"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button className="card-btn" onClick={()=>setisModalOpen(false)}>Cancel</button>
        <button className="card-btn-fill" onClick={()=>handleAssgine()}>Done</button>
        </div>

      </Modal>
    </div>
  );
};

export default SelectedUsers;
