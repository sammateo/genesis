import Accordion, { AccordionInterface } from "@/app/ui/accordion/accordion";
import { TeamWithPlayers } from "@/types/extended-data-types";
import LineupDetails from "./lineup-details";
import { StatusVariant } from "@/types/data-types";

const MatchLineup = ({
  team,
  user_id,
  matchStatus,
}: {
  team: TeamWithPlayers;
  user_id: string;
  matchStatus: StatusVariant;
}) => {
  const lineUpData: AccordionInterface = {
    summaryText: `Lineup - ${team.name}`,
    details: (
      <LineupDetails team={team} user_id={user_id} matchStatus={matchStatus} />
    ),
    defaultOpen: true,
  };
  return (
    <div>
      <Accordion accordionItems={[lineUpData]} />
    </div>
  );
};

export default MatchLineup;
