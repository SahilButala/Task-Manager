import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data = [],
  label,
  color = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
}: any) => {
  const hasData =
    Array.isArray(data) && data.some((item: any) => item.count > 0);

  if (!hasData) {
    return (
      <div className="h-[325px] flex items-center justify-center text-sm text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          label={label}
        >
          {data.map((_: any, i: number) => (
            <Cell
              key={`cell-${i}`}
              fill={color[i % color.length]}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
