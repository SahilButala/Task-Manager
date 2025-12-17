import React from "react";

const TaskStatusTabs = ({ tabs, setActiveTab, activetab }: any) => {
  return (
    <div className="">
      <div className="">
        {tabs?.map((tab: any) => (
          <button
            key={tab?.label}
            className={`relative px-3  md:px-4 py-2 text-sm font-medium ${
              activetab === tab?.label
                ? "text-blue-300"
                : "text-gray-500 hover:text-gray-700"
            } cursor-pointer`}
            onClick={() => setActiveTab(tab?.label)}
          >
            <div className="">
              <span className="text-xs">{tab?.label}</span>

              <span
                className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                  activetab === tab?.label
                    ? "bg-blue-300 text-white"
                    : "bg-gray-200/50 text-gray-600"
                }`}
              >
                {tab?.count}
              </span>
            </div>

            {activetab === tab?.label && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
