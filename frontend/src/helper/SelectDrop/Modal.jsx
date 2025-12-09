import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, isopen, onClose, title }) => {
  if (!isopen) return;
  return (
    <div className="fixed top-0 right-0 left-0 z-50  flex justify-center items-center w-full h-[calc  (100%- 60vh)]  overflow-y-auto  overflow-x-hidden bg-black/20 bg-opacity-500">
      <div className="relative bg-white max-w-2xl max-h-full p-4 w-full ">
        {/* modal content */}

        <div className="bg-white relative  shadow-sm">
          {/* modal header */}

          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600  border-gray-200">
            <h2 className="text-lg font-medium  text-gray-900 ">{title}</h2>

            <button
              className="cursor-pointer text-2xl"
              type="button"
              onClick={onClose}
            >
              <IoClose />{" "}
            </button>
          </div>

          {/* modal body */}

          <div className="p-4 space-y-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
