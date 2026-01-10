import StandardLoadingIcon from "@/app/ui/loaders/StandardLoadingIcon";
import React from "react";
import { GiSoccerKick } from "react-icons/gi";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <GiSoccerKick className="text-5xl" />
      <StandardLoadingIcon />
    </div>
  );
};

export default Loading;
