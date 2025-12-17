import React, { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { PriorityOption } from "../../interfaces";


// options : that we want to show
// value : iniital value of key
// onChange :  handler 

interface SelectDropDownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}


const SelectDropDown = ({ options, value, onChange, placeholder } : SelectDropDownProps) => {
  const [isopen, setisopen] = useState(false);

  const handleSelectChange = (option : any ) => {
    onChange(option);
    setisopen(false);
  };
  return (
    <div className="relative w-full">
      {/* dropdown btn */}

      <button className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md  mt-2 flex  justify-between items-center" onClick={() => setisopen(!isopen)}>
        {value
          ? options?.find((opt) => opt?.value === value)?.label
          : placeholder}

        <span className="cursor-pointer">
          {isopen ? <LuChevronUp     /> : <LuChevronDown />}
        </span>
      </button>

      {isopen && (
        <div className="absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10">
          {options?.map((op, i) => (
            <div
              className="px-3 py-2  text-sm cursor-pointer  hover:bg-gray-100"
              key={` option ${op.value}`}
              onClick={() => handleSelectChange(op.value)}
            >
              {op?.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropDown;
