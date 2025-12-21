import { ReactNode, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";

interface RightSliderProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Notifications = ({
  open,
  onClose,
  title = "Notifications",
  children,
}: RightSliderProps) => {
  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 z-40   transition-all  duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Slider */}
      <div
        className={`fixed top-0 right-0   max-h-[800px] min-h-full overflow-y-auto w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition"
          >
            <HiOutlineX className="text-xl cursor-pointer" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto h-[calc(100%-64px)]">
          <p className="text-[10px] font-semibold text-gray-500 flex justify-end">
             Once you log out then Notification will dissappear
          </p>
          {children}
        </div>
      </div>
    </>
  );
};

export default Notifications;
