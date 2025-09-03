import React, { useRef, useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";
const ProfilePhotoSelector = ({ image, setProfilePic }) => {
  const inputRef = useRef(null);
  const [previewUrl, setpreviewUrl] = useState("");

  const hanndleimageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePic(file);

      // generating preview  url from file

      const preview = URL.createObjectURL(file);
      setpreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    setpreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={hanndleimageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-blue" />
          <button type="button" className="w-8 h-8 flex items-center  justify-center bg-blue-300 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer" onClick={onChooseFile}>
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img src={previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover"
          />

          <button type="button" className="
          w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1  -right-1
          " onClick={handleRemoveImage}>
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
