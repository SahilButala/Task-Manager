import React from "react";
import Progress from "../Progress/Progress";
import AvatarGroup from "../../helper/Avatar/AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

interface TaskCardProp{
     key : string
  title : string
  description : string
  priority : string
  status : string
  progress : number
  createdAt : string
  dueDate : string | Date
  assignedTo : string[]
  attachmentCount :  number
  completedTodoCount :  number
  todoCheckList: any[]
  onClick  : ()=>void
}

const TaskCard = ({
  key,
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoCheckList,
  onClick,
} : TaskCardProp) => {
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

  console.log(status);

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500  bg-emerald-100 border border-emerald-500/10";
      case "Medium":
        return "texr-amber-500 bg-amber-50 border border-amber-500/20";

      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };
  return (
    <div
      className="bg-white rounded-xl  py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer"
      key={key}
      onClick={onClick}
    >
      <div className="flex items-end  gap-3 px-4">
        <div
          className={`text-[11px]  font-medium  ${getStatusTagColor()} px-4 py-0.5 rounded`}
        >
          {status}
        </div>
      <div>
        <div
          className={`text-[11px]  font-medium  ${getPriorityTagColor()} px-4 py-0.5 rounded`}
        >
          {" "}
          {priority}
        </div>
      </div>
      </div>
      

      <div
        className={`px-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-500"
            : status === "Completed"
            ? "border-indigo-500"
            : "border-violet-500"
        }`}
      >
        <p className="text-sm font-medium text-gray-800 mt-4  line-clamp-2">
          {title}
        </p>

        <p className="text-xs text-gray-800 line-clamp-2 mt-1.5 leading-[18px]">
          {description}
        </p>

        <p className="text-[13px] text-gray-700/50  font-medium mt-2 mb-2 leading-[18px]">
          Task Done : {""}
          <span className="font-semibold text-gray-700">
            {completedTodoCount} / {todoCheckList.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      <div className="px-4 ">
        <div className="flex justify-between items-center my-1">
          <div>
            <label htmlFor="" className="text-xs text-gray-500">
              Start Date
            </label>
            <p className="text-[13px] font-medium">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>
          <div>
            <label htmlFor="" className="text-xs text-gray-500">
              end Date
            </label>
            <p className="text-[13px] font-medium">
              {moment(dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <AvatarGroup avatar={assignedTo || []} />

          {attachmentCount && attachmentCount  > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg">
              <LuPaperclip className="text-blue-300" />
              <span className="text-xs text-gray-800">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
