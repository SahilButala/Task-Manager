import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { initialcreateTaskData, Priority_Data } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import { apiPaths } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropDown from "../../helper/SelectDrop/SelectDropDown";
import SelectedUsers from "../../helper/SelectDrop/SelectedUsers";
import TodoListInput from "../../helper/input/TodoListInput";
import AddAttachmentInput from "../../helper/input/AddAttachmentInput";
import { toast } from "react-toastify";
import { TaskType } from "../../interfaces";
import {
  deleteTaskByIdService,
  getAllTaskByIdService,
  updateTaskByIdService,
} from "../../api";

const CreateTask = () => {
  const [taskData, settaskData] = useState<TaskType>(initialcreateTaskData);

  const location = useLocation();
  const { taskId } = location.state || {};

  const navigate = useNavigate();

  const [currentTask, setcurrentTask] = useState(null);

  const [error, seterror] = useState<string | null>("");
  const [isloading, setisloading] = useState(false);
  const [openDialogAlert, setopenDialogAlert] = useState(false);

  // accepting key and value like title : "task 01"
  const handleValueChange = (key: any, val: any) => {
    settaskData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const clearData = () => {
    settaskData(initialcreateTaskData);
  };

  const createTaskhandler = async () => {
    setisloading(true);
    try {
      const todoList = taskData?.todoChecklist?.map((todo) => ({
        text: todo,
        completed: false,
      }));

      console.log(taskData, "taskData");
      console.log("taskData");

      const { data } = await axiosInstance.post(apiPaths.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData?.dueDate ?? "").toISOString(),
        todoChecklist: todoList,
      });

      if (data?.sucess === true) {
        toast.success("Task Created....");
        settaskData(initialcreateTaskData);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "ERROR FROM SERVER");
      setisloading(false);
    } finally {
      setisloading(false);
    }
  };
  const updateTaskhandler = async () => {
    setisloading(true);
    try {
      const todoList = taskData.todoChecklist.map((todo) => ({
        text: todo,
        completed: false,
      }));

      const payload = {
        ...taskData,
        dueDate: new Date(taskData?.dueDate ?? "").toISOString(),
        todoChecklist: todoList,
      };

      const res = await updateTaskByIdService(taskId, payload);

      if (res?.sucess === true) {
        toast.success("Task Updated Successfully");
        settaskData(initialcreateTaskData);
        navigate("/admin/tasks");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Validation Error");
    } finally {
      setisloading(false);
    }
  };

  const getTaskDetailsById = async () => {
    try {
      if (!taskId) return;

      const res = await getAllTaskByIdService(taskId);

      if (res?.sucess === true) {
        const task = res.data;

        console.log(task);

        settaskData({
          ...task,
          todoChecklist: task.todoChecklist.map(
            (todo: { text: string }) => todo.text
          ),
          assignedTo: task?.assignedTo?.map((item: any) => item?._id) || [],
          dueDate: task?.dueDate
            ? moment(task?.dueDate).format("YYYY-MM-DD")
            : null,
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Validation Error");
    }
  };

  const deleteTaskById = async (taskId: string) => {
    try {
      console.log("s'a''a''a''a", taskId);
      deleteTaskByIdService;

      if (!taskId) return;

      const res = await deleteTaskByIdService(taskId);

      if (res?.sucess === true) {
        toast.success("Task Deleted Successfully..");
        navigate("/admin/tasks");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Validation Error");
    }
  };
  const handleSubmit = () => {
    try {
      seterror(null);
      if (!taskData?.title.trim()) {
        seterror("Title is required");
        return;
      }
      if (!taskData?.description.trim()) {
        seterror("description is required");
        return;
      }
      if (!taskData?.priority.trim()) {
        seterror("priority is required");
        return;
      }
      if (!taskData?.dueDate) {
        seterror("Due Date is required");
        return;
      }
      if (taskData?.assignedTo.length === 0) {
        seterror("AssignedTo is required");
        return;
      }
      if (taskData?.todoChecklist.length === 0) {
        seterror("todo  is required");
        return;
      }
      if (taskData?.attachments.length === 0) {
        seterror("Attachements is required");
        return;
      }

      if (!taskId) {
        createTaskhandler();
      } else {
        updateTaskhandler();
      }
    } catch (error) {}
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      seterror("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    getTaskDetailsById();
  }, [taskId]);

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
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-red-50 rounded px-2 py-1 border border-rose-100  hover:border-rose-300 cursor-pointer z-10"
                  onClick={() => {
                    setopenDialogAlert(true), deleteTaskById(taskId);
                  }}
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
                  <SelectDropDown
                    options={Priority_Data}
                    value={taskData?.priority}
                    onChange={(value: any) =>
                      handleValueChange("priority", value)
                    }
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
                    value={taskData?.dueDate ?? ""}
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
                    usersSelected={taskData?.assignedTo ?? []}
                    setSelectedUsers={(value: any) => {
                      handleValueChange("assignedTo", value);
                    }}
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="text-xs font-medium  text-slate-600">
                  Todo
                </label>

                <TodoListInput
                  todolist={taskData?.todoChecklist}
                  setTodoList={(value: any) =>
                    handleValueChange("todoChecklist", value)
                  }
                />
              </div>

              <div className="mt-3">
                <label className="text-xs font-medium  text-slate-600">
                  Attachments
                </label>

                <AddAttachmentInput
                  attachment={taskData?.attachments}
                  setAttachments={(value) =>
                    handleValueChange("attachments", value)
                  }
                />
              </div>
            </div>
            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">
                {error || "Server Problem"}
              </p>
            )}

            <div className="mt-5">
              <button
                className="add-btn flex justify-end mt-7"
                onClick={handleSubmit}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
