import React, { useState } from "react";
import   { FaRegEyeSlash ,FaRegEye}   from "react-icons/fa6"

const Input = ({ value, onChange, label, placeholader, type }) => {
  const [showpassword, setshowpassword] = useState(false);

  const togglePassword = ()=>{
      setshowpassword(!showpassword)
  }
  return (
    <div>
      <label className="text-[13px] text-slate-800 font-medium ">{label}</label>

      <div className="input-box">
        <input
        required
        className="w-full bg-transparent outline-none"
          placeholder={placeholader}
          type={
            type === "password" ? (showpassword ? "text" : "password") : type
          }
          value={value}
          onChange={(e) => onChange(e)}
        />

        {
          type === "password" && (
            <>
             {
              showpassword ? <FaRegEye
              size={22}
               onClick={()=>togglePassword()}
               className="text-blue-400 cursor-pointer"
              /> : <FaRegEyeSlash 
              size={22}
               onClick={()=>togglePassword()}
                              className="text-blue-400 cursor-pointer"
              />
             }
            </>
          )
        }
      </div>
    </div>
  );
};

export default Input;
