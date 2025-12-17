import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

interface AttachmentProps {
  attachment: string[];
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddAttachmentInput = ({ attachment, setAttachments } : AttachmentProps) => {
  const [options, setOptions] = useState("");

  // handle to add options
  const hanldeToAddOptions = () => {
    if (options?.trim()) {
      setAttachments([...attachment, options?.trim()]);
      setOptions("")
    }
  };

  const handleToDeleteOption = (index : any) => {
    const updatedArray = attachment?.filter((_ : any,  i : any) => i !== index);
    setAttachments(updatedArray);
  };

  return (
    <div>
      {attachment?.map((at, i) => (
        <div key={at} className="flex justify-between bg-gray-50 border-gray-100 px-3 py-2  rounded-md mt-3">


          <div className="flex-1 flex items-center  gap-3 border  border-gray-100">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs  text-black">{at}</p>
          </div>

          <button className="cursor-pointer text-red-500" onClick={() => handleToDeleteOption(i)}>
            <HiOutlineTrash className="" />
          </button>

        </div>
      ))}
          <div className="flex items-center gap-5  mt-4">
            <div className="flex-1 flex items-center gap-3 border border-gray-300 px-3 rounded-md py-2">
              <LuPaperclip className="text-gray-400" />
              <input
                className="w-full text-[13px] text-black outline-none"
                type="text"
                value={options}
                placeholder="Add File Link"
                onChange={({ target }) => setOptions(target?.value)}
              />
            </div>

            <button className="card-btn" onClick={hanldeToAddOptions}>
              {" "}
              <HiMiniPlus className="text-lg" />
              Add
            </button>
          </div>
    </div>
  );
};

export default AddAttachmentInput;
