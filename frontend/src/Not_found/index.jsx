import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NotFound_page = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex justify-center items-center h-screen flex-col">
      <span className="text-xl">404 | Not Found Page Please try again..</span>
      <span
        onClick={() => navigate("/login")}
        className="text-sm text-blue-400 cursor-pointer hover:underline"
      >
        Click here to <span className="text-black">redirect To Page</span>
      </span>
    </div>
  );
};
