import StandardLoadingIcon from "@/app/ui/loaders/StandardLoadingIcon";
import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <StandardLoadingIcon />
    </div>
  );
};

export default Loading;
