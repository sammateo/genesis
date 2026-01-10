import Accordion, { AccordionInterface } from "@/app/ui/accordion/accordion";
import { MatchWithTeams } from "@/types/extended-data-types";
import SummaryDetails from "./summary-details";

const MatchSummary = ({ completeData }: { completeData: MatchWithTeams }) => {
  const summaryData: AccordionInterface = {
    summaryText: "Summary",
    details: <SummaryDetails completeData={completeData} />,
    defaultOpen: true,
  };
  return (
    <div>
      <Accordion accordionItems={[summaryData]} />
    </div>
  );
};

export default MatchSummary;
