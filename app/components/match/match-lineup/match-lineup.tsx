import Accordion, { AccordionInterface } from "@/app/ui/accordion/accordion";
import { TeamWithPlayers } from "@/types/extended-data-types";
import LineupDetails from "./lineup-details";

const MatchLineup = ({
  team,
  user_id,
}: {
  team: TeamWithPlayers;
  user_id: string;
}) => {
  const lineUpData: AccordionInterface = {
    summaryText: `Lineup - ${team.name}`,
    details: <LineupDetails team={team} user_id={user_id} />,
    defaultOpen: true,
  };
  return (
    <div>
      <Accordion accordionItems={[lineUpData]} />
    </div>
  );
};

export default MatchLineup;
