import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, label, color = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"] } : any) => {

  console.log(data , "data")
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
          {data && data.length > 0
            ? data.map((_ :any, i :any) => <Cell key={`cell-${i}`} fill={color[i % color.length]} />)
            : null}
        </Pie>
        <Tooltip  content={<CustomToolTip/>}/>
        <Legend content={<CustomLegend/>} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
