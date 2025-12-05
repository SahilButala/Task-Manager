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

  useEffect(() => {
    getdashboardData();
  }, []);

  return (
    <DashboardLayout activeMenue={"Dashboard"}>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
