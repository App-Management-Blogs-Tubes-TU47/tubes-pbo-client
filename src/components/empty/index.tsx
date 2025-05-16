import React from "react";
import { EmptySvg } from "@/assets";

const Empty: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col py-5">
      <img src={EmptySvg} className="w-32" alt="" />
      <h1 className="text-base font-semibold text-gray-500 mt-5">
        No Data Available
      </h1>
    </div>
  );
};

export default Empty;
