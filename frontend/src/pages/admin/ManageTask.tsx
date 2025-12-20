import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../store/Slice/Task";
import { useNavigate } from "react-router-dom";
import TaskStatusTabs from "../../components/Tabs/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import { AppDispatch, RootState } from "../../store";
import { statusArrayType } from "../../interfaces";

const ManageTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { task, isLoading } = useSelector(
    (state: RootState) => state.task
  );

  const [allTabs, setAllTabs] = useState<statusArrayType[]>([]);
  const [filterData, setFilterData] = useState<string>("All");

  // ✅ NEW: dueDate filters
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // 1️⃣ Fetch tasks when filters change
  useEffect(() => {
    dispatch(
      getAllTasks({
        filterData,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      })
    );
  }, [filterData, startDate, endDate, dispatch]);

  // 2️⃣ Build tabs from API response
  useEffect(() => {
    if (!task?.statusSummary) return;

    const statusSummary = task.statusSummary;

    const statusArray: statusArrayType[] = [
      { label: "All", count: statusSummary.all || 0 },
      { label: "Pending", count: statusSummary.pendingTasks || 0 },
      { label: "Completed", count: statusSummary.CompletedTasks || 0 },
      {
        label: "In Progress",
        count: statusSummary.inProgressTasks || 0,
      },
    ];

    setAllTabs(statusArray);
  }, [task]);

  const handleClick = (taskData: any) => {
    navigate("/admin/create", { state: { taskId: taskData?._id } });
  };

  const handleDownloadReport = () => {};

  const hasTasks = task?.tasks && task.tasks.length > 0;

  return (
    <DashboardLayout activeMenue={"Manage Task"}>
      <div className="mt-5">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <h2 className="text-xl font-medium">My Tasks</h2>

          {allTabs?.[0]?.count > 0 && (
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
              <TaskStatusTabs
                tabs={allTabs}
                setActiveTab={setFilterData}
                activetab={filterData}
              />

              {/* ✅ Due date filters */}
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded px-2 py-1 text-sm outline-none"
                />

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />
              </div>

              {/* <button
                className="hidden lg:flex download-btn"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </button> */}
            </div>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center text-sm text-gray-500">
            Loading tasks...
          </div>
        ) : hasTasks ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {task.tasks.map((tas: any) => (
              <TaskCard
                key={tas._id}
                title={tas.title}
                description={tas.description}
                priority={tas.priority}
                status={tas.status}
                progress={tas.progress}
                createdAt={tas.createdAt}
                dueDate={tas.dueDate}
                assignedTo={tas.assignedTo?.map(
                  (ass: any) => ass.profileImageUrl
                )}
                attachmentCount={tas.attachments?.length || 0}
                completedTodoCount={tas.completedTodoCount || 0}
                todoCheckList={tas.todoChecklist || []}
                onClick={() => handleClick(tas)}
              />
            ))}
          </div>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center text-sm text-gray-500">
            <p>No tasks found</p>
            <p className="text-xs mt-1">
              Try changing filters or create a new task
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTask;
