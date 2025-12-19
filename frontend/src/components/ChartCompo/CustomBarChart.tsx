import React from "react";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data = [] }: any) => {
  const hasData =
    Array.isArray(data) && data.some((item: any) => item.count > 0);

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

  const CustomToolTip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg shadow-md p-2 border border-gray-300">
          <div className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.priority}
          </div>
          <p className="text-sm text-gray-600">
            Count:{" "}
            <span className="text-gray-900 font-medium">
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (!hasData) {
    return (
      <div className="h-[300px] flex items-center justify-center text-sm text-gray-500 bg-white mt-5">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-white mt-5">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={<CustomToolTip />} cursor={{ fill: "transparent" }} />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            barSize={38}
          >
            {data.map((item: any, i: number) => (
              <Cell key={i} fill={getColor(item)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
