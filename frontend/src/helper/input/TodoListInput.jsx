import {} from "react-icons";
import { HiMiniPlus } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";

const TodoListInput = ({ todolist, setTodoList }) => {
  const [options, setoptions] = useState("");

  // for adding options
  const handleToAddOptions = () => {
    if (options.trim()) {
      setTodoList([...todolist, options.trim()]);
      setoptions("");
    }
  };

  const handleTodeleteOptions = (index) => {
    // setTodoList((prev)=>(
    //     prev.filter((item)=>item?._id !== index)
    // ))

    const updatedArray = todolist.filter((_, i) => i !== index);
    setTodoList(updatedArray);
  };
  return (
    <div>
      {todolist?.map((item, i) => (
        <div
          className="flex justify-between bg-gray-50  border border-gray-100 px-3 py-2  rounded-md  mb-3 "
          key={i}
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {i < 9 ? `0${i + 1}` : i + 1}
            </span>
            {item}
          </p>

          <button
            className="cursor-pointer"
            onClick={() => handleTodeleteOptions(i)}
          >
            <HiOutlineTrash className="text-lg   text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex gap-5 items-center mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={options}
          onChange={({ target }) => setoptions(target?.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100/50 px-3 py-2  rounded-md"
        />

        <button className="card-btn text-nowrap" onClick={handleToAddOptions}>
          <HiMiniPlus className="" /> Add
        </button>
      </div>
      
    </div>
  );
};

export default TodoListInput;
