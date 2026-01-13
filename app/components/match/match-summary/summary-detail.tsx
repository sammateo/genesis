"use client";
import { useState } from "react";
import { SummaryDetailsInterface } from "./summary-details";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiFileCopyLine } from "react-icons/ri";
import { IoCheckmarkDone } from "react-icons/io5";

const SummaryDetail = ({
  title,
  data,
  copyEnabled,
  isLink,
  link,
}: SummaryDetailsInterface) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:gap-4 items-center">
      {<dt className="font-medium text-gray-900">{title}</dt>}
      {!isLink && (
        <dd className="text-gray-600 sm:col-span-1 flex items-center gap-3">
          {data}
          {copyEnabled && !copied && (
            <RiFileCopyLine
              className="cursor-pointer text-lg"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(data);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 10000);
                } catch (error) {
                  console.error("Failed to copy code to clipboard");
                }
              }}
            />
          )}
          {copyEnabled && copied && (
            <div className="flex items-center gap-1 text-green-700">
              <IoCheckmarkDone className="text-lg" />
              <span>copied</span>
            </div>
          )}
        </dd>
      )}
      {isLink && (
        <dd className="text-gray-600 sm:col-span-1">
          <a
            href={link}
            target="_blank"
            className="flex w-fit items-center gap-2 hover:underline"
          >
            {data}
            <FaExternalLinkAlt />
          </a>
        </dd>
      )}
    </div>
  );
};

export default SummaryDetail;
