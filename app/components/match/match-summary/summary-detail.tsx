import React from "react";
import { SummaryDetailsInterface } from "./summary-details";

const SummaryDetail = ({
  title,
  data,
  copyEnabled,
}: SummaryDetailsInterface) => {
  return (
    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:gap-4 items-center">
      <dt className="font-medium text-gray-900">{title}</dt>
      <dd className="text-gray-600 sm:col-span-1">{data}</dd>
    </div>
  );
};

export default SummaryDetail;
