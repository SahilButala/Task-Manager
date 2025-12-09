import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { initialcreateTaskData, Priority_Data } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import { apiPaths } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropDown from "../../helper/SelectDrop/SelectDropDown";
import SelectedUsers from "../../helper/SelectDrop/SelectedUsers";

const CreateTask = () => {
  const [taskData, settaskData] = useState(initialcreateTaskData);

  const location = useLocation();
  const { taskId } = location.state || {};

  const [currentTask, setcurrentTask] = useState(null);

  const [error, seterror] = useState("");
  const [isloading, setisloading] = useState(false);
  const [openDialogAlert, setopenDialogAlert] = useState(false);

  // accepting key and value like title : "task 01"
  const handleValueChange = (key, val) => {
    settaskData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const clearData = () => {
    settaskData(initialcreateTaskData);
  };

  const createTaskhandler = () => {
    try {
    } catch (error) {}
  };
  const updateTaskhandler = () => {
    try {
    } catch (error) {}
  };
  const getTaskDetailsById = () => {
    try {
    } catch (error) {}
  };
  const deleteTaskById = () => {
    try {
    } catch (error) {}
  };
  const handleSubmit = () => {
    try {
    } catch (error) {}
  };


  console.log(taskData , "sasasasas")

  return (
    <DashboardLayout activeMenue={"Create Task"}>
      <div className="mt-5">
        <div className="grid  grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text:xl  font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-red-50 rounded px-2 py-1 border border-rose-100  hover:border-rose-300 cursor-pointer"
                  onClick={() => setopenDialogAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Titile
              </label>

              <input
                placeholder="Create App Ui"
                className="form-input"
                value={taskData?.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />

              <div className="mt-3">
                <label className="text-xs font-medium  text-slate-600">
                  Description
                </label>

                <textarea
                  placeholder="Describe Task"
                  className="form-input"
                  rows={4}
                  value={taskData?.description}
                  onChange={({ target }) =>
                    handleValueChange("description", target?.value)
                  }
                />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-6  md:col-span-4">
                  <label className="text-xs font-medium text-slate-600">
                    Priority
                  </label>

                  {/* custom select dropdown */}
                  <SelectDropDown options={Priority_Data}
                    value={taskData?.priority}
                    onChange={(value) => handleValueChange("priority", value)}
                    placeholder={"Select Priority"}
                  />
                </div>
                  <div className="col-span-6 md:col-span-4 ">
                    <label className="text-xs font-medium text-slate-600">
                      Due Date
                    </label>

                    <input
                      placeholder="Select Date"
                      className="form-input"
                      value={taskData?.dueDate}
                      onChange={({ target }) =>
                        handleValueChange("dueDate", target.value)
                      }
                      type="date"
                    />
                  </div>

                  <div className="col-span-12 md:col-span-3">

                    <label className="text-xs font-medium text-slate-600">
                      Assigned To
                    </label>

                    <SelectedUsers
                    usersSelected={taskData?.assignedTo}
                    setSelectedUsers={(value)=>{
                      handleValueChange("assignedTo" , value)
                    }}
                    />
                     
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
