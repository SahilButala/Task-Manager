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

const MyTask = () => {
  const handleDownloadReport = () => {};
  const [allTabs, setallTabs] = useState<statusArrayType[]>([]);
  const [filterData, setfilterData] = useState<string>("All");

  const { task } = useSelector((state: RootState) => state.task);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const getTakshandler = () => {
    try {
      dispatch(getAllTasks({ filterData }));
      const statusSummary = task?.statusSummary;

      const statusArray: statusArrayType[] = [
        { label: "All", count: statusSummary?.all || 0 },
        { label: "Pending", count: statusSummary?.pendingTasks || 0 },
        { label: "Completed", count: statusSummary?.CompletedTasks || 0 },
        {
          label: "In Progress",
          count: statusSummary?.inProgressTasks || 0,
        },
      ];

      setallTabs(statusArray);
    } catch (error) {}
  };

  console.log(filterData, "aaa");
  const handleClick = (id: any) => {
    navigate(`/user/details/${id}`);
  };

  useEffect(() => {
    getTakshandler();
  }, [filterData]);
  return (
    <DashboardLayout activeMenue={"My Task"}>
      <div className="mt-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <h2 className="text-xl  md:text-xl  font-medium">My Tasks</h2>

          {allTabs?.[0]?.count > 0 && (
              <TaskStatusTabs
                tabs={allTabs}
                setActiveTab={setfilterData}
                activetab={filterData}
              />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {task?.tasks && task?.tasks?.length > 0 ? (
            task?.tasks?.map((tas) => (
              <TaskCard
                key={tas?._id}
                title={tas?.title}
                description={tas?.description}
                priority={tas?.priority}
                status={tas?.status}
                progress={tas?.progress}
                createdAt={tas?.createdAt}
                dueDate={tas?.dueDate}
                assignedTo={tas?.assignedTo?.map(
                  (ass: any) => ass?.profileImageUrl
                )}
                attachmentCount={tas?.attachments?.length || 0}
                completedTodoCount={tas?.completedTodoCount || 0}
                todoCheckList={tas?.todoChecklist || []}
                onClick={() => handleClick(tas?._id)}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyTask;
