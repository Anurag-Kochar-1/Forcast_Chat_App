import React from "react";

interface IAvatar {
  letter: any;
  bgColor?: string
}

const Avatar = ({ letter, bgColor = `bg-[#6E40CE]` }: IAvatar) => {

  return (
    <div
      className={`w-10 h-10 rounded-full ${bgColor} flex justify-center items-center`}
    >
      <span className="font-medium text-white text-lg">{letter}</span>
    </div>
  );
};

export default Avatar;
