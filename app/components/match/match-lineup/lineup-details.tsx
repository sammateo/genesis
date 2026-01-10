import { TeamWithPlayers } from "@/types/extended-data-types";
import LeaveTeam from "../../team/leave-team";

const LineupDetails = ({
  team,
  user_id,
}: {
  team: TeamWithPlayers;
  user_id: string;
}) => {
  return (
    <div className="flow-root">
      <dl className="-my-3 divide-y divide-gray-200 text-sm *:even:bg-gray-50">
        {team.players &&
          team.players.length > 0 &&
          team.players.map((player) => (
            <div
              key={player.id}
              className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:gap-4 items-center"
            >
              <dt className="font-medium text-gray-900">{player.user?.name}</dt>
              <dd className="text-gray-600 sm:col-span-1">
                {player.user_id === user_id && (
                  <LeaveTeam teamId={team.id} matchId={team.match_id || ""} />
                )}
              </dd>
            </div>
          ))}
        {(!team.players || team.players.length < 1) && <div>No players</div>}
      </dl>
    </div>
  );
};

export default LineupDetails;
