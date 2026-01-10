import Accordion, { AccordionInterface } from "@/app/ui/accordion/accordion";
import { MatchWithTeams } from "@/types/extended-data-types";
import React from "react";
import CreatorControlDetails from "./creator-control-details";

const CreatorControls = ({
  completeData,
}: {
  completeData: MatchWithTeams;
}) => {
  const summaryData: AccordionInterface = {
    summaryText: "Creator Controls",
    details: <CreatorControlDetails completeData={completeData} />,
    defaultOpen: false,
  };
  return (
    <div>
      <Accordion accordionItems={[summaryData]} />
    </div>
  );
};

export default CreatorControls;
