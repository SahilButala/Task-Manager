


import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { apiPaths } from "../../constants";
import moment from "moment";
import { addThousandsSeprator } from "../../helper/helper";
import InfoCard from "../../components/Cards/InfoCard";

import { IoMdCard } from "react-icons/io";
import Loader from "../../utils/Loader";
import { LuArrowRight } from "react-icons/lu";
import TaskTable from "../../components/Table/TaskTable";
import CustomPieChart from "../../components/ChartCompo/CustomPieChart";
import CustomBarChart from "../../components/ChartCompo/CustomBarChart";
import { RootState } from "../../store";
import { priorityLevelDataType, taskDistributionDataType } from "../../interfaces";

const UserDashboard = () => {
  const { user } = useSelector((state : RootState) => state.auth);

  const navigate = useNavigate();

  // all dashbord data here
  const [dahboardData, setdahboardData] = useState<any>(null);
  const [barChartData, setbarChartData] = useState<priorityLevelDataType[]>([]);
  const [pichartData, setpichartData] = useState<taskDistributionDataType[]>([]);

  const COLORS = ["#8d51FF", "#00B8db", "#7bce00  "];

  const [isLoading, setisLoading] = useState(false);

  // get dashboard data api

  const getdashboardData = async () => {
    try {
      setisLoading(true);
      const { data } = await axiosInstance.get(
        apiPaths.TASKS.GET_USER_DASHBOARD_DATA
      );

      if (data?.sucess === true) {
        setdahboardData(data?.data);
        prePairChartData(data?.data?.charts);
        setisLoading(false);
      }
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  console.log(dahboardData , "dah")

  // prepair ChartData
  const prePairChartData = (data :any) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskprioritylevels = data?.taskprioritylevels || null;
    console.log(taskDistribution, "zhandu");

    const taskDistributionData : taskDistributionDataType[]= [
      {
        status: "Pending",
        count: taskDistribution?.Pending || 0,
      },
      {
        status: "In Progress",
        count: taskDistribution?.InProgress || 0,
      },
      {
        status: "Completed",
        count: taskDistribution?.Completed || 0,
      },
    ];

    setpichartData(taskDistributionData);

    const priorityLevelData : priorityLevelDataType[]  = [
      {
        priority: "High",
        count: taskprioritylevels?.High || 0,
      },
      {
        priority: "Medium",
        count: taskprioritylevels?.Medium || 0,
      },
      {
        priority: "Low",
        count: taskprioritylevels?.Low || 0,
      },
    ];

    setbarChartData(priorityLevelData);
  };



  const onSeeMore = () => {
    if(user?.role === "admin"){

      navigate("/admin/tasks");
    }else{

      navigate("/user/task")
    }
  };

  useEffect(() => {
    getdashboardData();
  }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <DashboardLayout activeMenue={"Dashboard"}>
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-xl  ">
              {" "}
              Good Morning.. ! {user?.name}
            </h2>
            <p className="text-xl md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
            <p className="text-xl md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("h:mm a")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5 md:gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label={"Total Tasks"}
            value={addThousandsSeprator(
              dahboardData?.statistics?.totaltask || 0
            )}
            color={"bg-blue-400"}
          />
          <InfoCard
            icon={<IoMdCard />}
            label={"Pending Tasks"}
            value={addThousandsSeprator(
              dahboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color={"bg-violet-400"}
          />
          <InfoCard
            icon={<IoMdCard />}
            label={"In Progress Tasks"}
            value={addThousandsSeprator(
              dahboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color={"bg-orange-400"}
          />
          <InfoCard
            icon={<IoMdCard />}
            label={"Completed Tasks"}
            value={addThousandsSeprator(
              dahboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color={"bg-green-400"}
          />
        </div>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2  gap-6 my-4 md:my-6">
        <div className="">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5>Task Distrubution</h5>
            </div>

            <CustomPieChart data={pichartData} color={COLORS} />
          </div>
        </div>
        <div className="">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h5>Priority Distrubution</h5>
            </div>

            <CustomBarChart data={barChartData} color={COLORS} />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="card ">
            <div className="flex justify-between items-center">
              <h5>Recent Tasks</h5>

              <button
                className="card-btn flex items-center gap-2 cursor-pointer"
                onClick={onSeeMore}
              >
                See All <LuArrowRight className="text-base" />
              </button>
            </div>

            <TaskTable tableData={dahboardData?.recentTask || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
