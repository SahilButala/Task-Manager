import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type InputProps = {
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: "text" | "email" | "password";
};

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div>
      {label && (
        <label className="text-[13px] text-slate-800 font-medium">
          {label}
        </label>
      )}

      <div className="input-box">
        <input
          required
          className="w-full bg-transparent outline-none"
          placeholder={placeholder}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={22}
              onClick={togglePassword}
              className="text-blue-400 cursor-pointer"
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              onClick={togglePassword}
              className="text-blue-400 cursor-pointer"
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
