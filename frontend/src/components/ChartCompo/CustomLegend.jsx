import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 space-x-6 mt-4">
      {payload.map((entry, i) => (
        <div className="flex items-center space-x-2" key={`legend ${i}`}>
          <div className="h-2.5 w-2.5 rounded-full " style={{ backgroundColor: entry?.color }}></div>

          <span className="text-xs text-gray-700  font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
