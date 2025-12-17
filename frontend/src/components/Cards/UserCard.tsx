import React from "react";
import { User } from "../../store/Slice/User";

const UserCard = ({ key, userInfo }: { key: string; userInfo: User }) => {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex  items-center gap-3">
          <img
            src={userInfo?.profileImageUrl}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />

          <div className="">
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-xs  text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      <div
        className="
      flex items-end gap-3 mt-5
      "
      >
        <StatCard
        label="Pending"
        count={userInfo?.pendingTask || 0}
        status="Pending"

        />
        <StatCard
        label="Complete"
        count={userInfo?.CompleteTask || 0}
        status="Completed"

        />
        <StatCard
        label="In Progress"
        count={userInfo?.inprogressTask || 0}
        status="In Progress"

        />
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  count,
  status,
}: {
  label: string;
  count: number;
  status: string;
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-white  bg-cyan-500 border border-cyan-500/10";
      case "Completed":
        return "texr-lime-500 bg-lime-50 border border-lime-500/20";

      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  return (
    <div className={`flex-1 text-[10px]  font-medium  ${getStatusTagColor()} px-4 py-0.5 rounded-2xl`}> 

    <span className="text-[12px] font-medium ">{count}</span><br/>{label}

    </div>
  )
};

export default UserCard;
