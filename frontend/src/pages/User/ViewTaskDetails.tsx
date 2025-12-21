import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Task } from "../../interfaces";
import { getTaskByIdService, updateTodoCheckListService } from "../../api";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import moment from "moment";
import AvatarGroup from "../../helper/Avatar/AvatarGroup";
import { LuSquareArrowUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
  const location = useLocation()

 const {id} = location.state || null  
  const [task, settask] = useState<Task>();

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

  const getDetailsById = async () => {
    try {
      if (id) {
        console.log(id , "bdhagduagdugda")
        const res = await getTaskByIdService(id);
        if (res?.sucess) {
          settask(res?.data);
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Validation Error");
    }
  };

const updateTodoCheckList = async (index: number) => {
  if (!task || !id) return;

  const updatedChecklist = task.todoChecklist.map((item, i) =>
    i === index ? { ...item, completed: !item.completed } : item
  );

  try {
    const res = await updateTodoCheckListService(id, updatedChecklist);
    if (res?.sucess === true) {
      settask(res.data);
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Validation Error");
  }
};


  const handleAttachmentLink = (link: string) => {
    if (!/^https?:\/\//i.test(link)) {
      link = `https://` + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getDetailsById();
    }
  }, [id]);

     {console.log(task?.todoChecklist , "sa")}

  return (
    <DashboardLayout>
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card  col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-xl  font-medium">
                  {task?.title}
                </h2>

                <div
                  className={`text-[13px] font-medium  ${getStatusTagColor(
                    task?.status || ""
                  )} px-4 py-0.5  rounded`}
                >
                  {task?.status || ""}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label={"Description"} value={task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : null
                    }
                  />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500">
                    Assigned To
                  </label>

                  <AvatarGroup
                    avatar={task?.assignedTo.map(
                      (item) => item?.profileImageUrl || []
                    )}
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-slate-500"
                >
                  Todo CheckList
                </label>

            

                {task?.todoChecklist?.map((item: any, index: any) => (
                  <TodoCheckList
                    key={`todo ${index}`}
                    text={item?.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoCheckList(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>

                  {task?.attachments?.map((item: any, index: any) => (
                    <Attachment
                      key={index}
                      link={item}
                      index={index}
                      onClick={() => handleAttachmentLink(item)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }: { label: string; value: any }) => {
  return (
    <>
      <label className="text-xs font-medium text-slate-500">{label}</label>

      <p className="text-[13px] md:text-[13px] font-medium text-gray-700 mt-0.5">
        {value}
      </p>
    </>
  );
};

const TodoCheckList = ({
  text,
  isChecked,
  onChange,
}: {
  text: string;
  isChecked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 cursor-pointer"
      />
      <p className="text-[13px] text-gray-800">{text}</p>
    </div>
  );
};

const Attachment = ({
  key,
  link,
  index,
  onClick,
}: {
  key: string;
  link: string;
  index: number;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex justify-between bg-gray-50 border border-gray-100  px-3 py-2  rounded-md mb-3 mt-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-1 items-center gap-3 border-gray-100 border">
        <span className="text-xs text-gray-400 font-semibold mr-2">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>

        <p className="text-xs text-black">{link}</p>
      </div>
      <LuSquareArrowUpRight className="text-gray-400" />
    </div>
  );
};
