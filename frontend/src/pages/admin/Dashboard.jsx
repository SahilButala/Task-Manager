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

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // all dashbord data here
  const [dahboardData, setdahboardData] = useState(null);
  const [barChartData, setbarChartData] = useState([]);
  const [pichartData, setpichartData] = useState([]);

  const [isLoading, setisLoading] = useState(false);

  // get dashboard data api

  const getdashboardData = async () => {
    try {
      setisLoading(true);
      const { data } = await axiosInstance.get(
        apiPaths.TASKS.GET_DASHBOARD_DATA
      );

      if (data?.sucess === true) {
        setdahboardData(data?.data);
        setisLoading(false);
      }
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  const onSeeMore = () => {
     navigate("/admin/tasks")
  };

  useEffect(() => {
    getdashboardData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
              {moment().format('h:mm a')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5 md:gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label={"Total Tasks"}
            value={addThousandsSeprator(
              dahboardData?.charts?.taskDistribution?.All || 0
            )}
            color={"bg-blue-400"}
          />
          <InfoCard
            icon={<IoMdCard />}
            label={"Pending Tasks"}
            value={addThousandsSeprator(
              dahboardData?.charts?.taskDistribution?.pending || 0
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
        <div className="md:col-span-2">
          <div className="card ">
            <div className="flex justify-between items-center">
              <h5>Recent Tasks</h5>

              <button className="card-btn flex items-center gap-2 cursor-pointer" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>

            <TaskTable tableData={dahboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
