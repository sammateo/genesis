import React, { ReactNode } from "react";

export interface AccordionInterface {
  summaryText: string;
  details: ReactNode;
  defaultOpen?: boolean;
}
const Accordion = ({
  accordionItems,
}: {
  accordionItems: AccordionInterface[];
}) => {
  return (
    <div className="space-y-2">
      {accordionItems.map((accordionItem) => (
        <details
          key={accordionItem.summaryText}
          open={accordionItem.defaultOpen || false}
          className="group [&amp;_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
            <span>{accordionItem.summaryText}</span>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </summary>

          <div className="p-4">{accordionItem.details}</div>
        </details>
      ))}
    </div>
  );
};

export default Accordion;
