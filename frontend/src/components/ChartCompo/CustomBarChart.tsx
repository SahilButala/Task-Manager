import React from "react";

import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { priorityLevelDataType } from "../../interfaces";

const CustomBarChart = ({ data, color }: any) => {
  console.log("hello", data);
  const getColor = (entry: any) => {
    switch (entry?.priority) {
      case "Low":
        return "#00bc7d";
      case "Medium":
        return "#fe9900";
      case "High":
        return "#ff1f57";

      default:
        return "#00bc7d";
    }
  };

  function CustomToolTip({ active, payload }: any) {
    if (payload && active && payload.length) {
      return (
        <div className="bg-white rounded-lg shadow-md p-2 border border-gray-300">
          <div className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].name}
          </div>
          <p className="text-sm text-gray-600">
            Count :{" "}
            <span className="text-sm text-gray-900 font-medium">
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="bg-white mt-5">
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey={"priority"}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={CustomToolTip} cursor={{ fill: "transparent" }} />

          <Bar
            dataKey={"count"}
            name="priority"
            fill="#ff8042"
            radius={[8, 8, 0, 0]}
            barSize={38}
          >
            {data?.map((item: any, i: any) => (
              <Cell key={i} fill={getColor(item)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
