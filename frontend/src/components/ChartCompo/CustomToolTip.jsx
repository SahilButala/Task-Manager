import React from "react";

function CustomToolTip({ active, payload }) {
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

export default CustomToolTip;
