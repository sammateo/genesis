import { MatchWithTeams } from "@/types/extended-data-types";
import TeamName from "./team-name";
import { canUserJoinTeam } from "@/app/matches/[slug]/page";
import JoinTeam from "../../team/join-team";

const MatchOverview = ({
  completeData,
  user_id,
}: {
  completeData: MatchWithTeams;
  user_id: string;
}) => {
  const teamA = completeData.teams[0];
  const teamB = completeData.teams[1];
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-center">
        <TeamName name={teamA.name || ""} color={teamA.color || ""} />
        {canUserJoinTeam(completeData, teamA, user_id) && (
          <div>
            <JoinTeam matchId={completeData.id} teamId={teamA.id} />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm">
          {completeData.match_date
            ? new Date(completeData.match_date).toLocaleString()
            : "no match date specified"}
        </span>
        <span className="font-bold text-4xl text-blue-500">
          {teamA.score || 0} - {teamB.score || 0}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <TeamName name={teamB.name || ""} color={teamB.color || ""} />
        {canUserJoinTeam(completeData, teamB, user_id) && (
          <div>
            <JoinTeam matchId={completeData.id} teamId={teamB.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchOverview;
