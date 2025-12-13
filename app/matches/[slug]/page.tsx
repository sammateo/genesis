import Header from "@/app/components/header/header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMatchDetails } from "../actions";
import { TeamWithPlayers } from "@/types/extended-data-types";
import PrimaryButton from "@/app/ui/button/primary-button";
import JoinTeam from "@/app/components/team/join-team";
import { Team } from "@/types/data-types";
import LeaveTeam from "@/app/components/team/leave-team";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const { slug } = await params;
  if (!slug) {
    redirect("/matches");
  }
  const completeData = await getMatchDetails(slug);

  const isTeamFull = (team: TeamWithPlayers): boolean => {
    //determines if team is full
    if (!completeData) {
      //don't allow joining if data is not there
      return true;
    }
    //if a team size has not been set, return false
    if (completeData.team_size == null || completeData.team_size == undefined) {
      return false;
    }
    //if a team size has been set, the team is full when the number of players is equal to the team size
    if (
      team.players == null ||
      team.players == undefined ||
      team.players.length == 0
    ) {
      return false;
    }

    if (team.players.length == completeData.team_size) {
      return true;
    }
    if (team.players.length < completeData.team_size) {
      return false;
    }

    //if team meets no conditions - default to team being full to prevent joining team
    return true;
  };

  const canUserJoinTeam = (team: TeamWithPlayers): boolean => {
    // determines if user can join team
    if (!completeData) {
      return false;
    }
    // if the the team is not full (team is full if team_size is equal to number of players on the team)
    if (isTeamFull(team)) {
      return false;
    }
    //user can join a team if the user is not already a part of the match
    let userInMatch = false;
    completeData.teams.forEach((team) => {
      if (team.players && team.players.length > 0) {
        if (team.players.find((player) => player.user_id === session.user.id)) {
          userInMatch = true;
        }
      }
    });
    if (userInMatch) return false;
    return true;
  };

  const canUserLeaveTeam = (team: TeamWithPlayers): boolean => {
    if (!team || !team.players) {
      return false;
    }
    console.log(team);
    let playerInTeam = false;
    team.players.forEach((player) => {
      if (player.user_id == session.user.id) {
        playerInTeam = true;
      }
    });
    if (playerInTeam) return true;
    return false;
  };

  return (
    <div>
      <Header />

      {!completeData && <div></div>}

      {completeData && (
        <div>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold text-xl">{completeData.name}</span>
              <span className="font-medium text-md">
                {completeData.match_code}
              </span>
              <span className="block">{completeData.match_date}</span>
            </div>
            {/* Teams and Players */}
            <div className="grid grid-cols-2">
              {completeData.teams &&
                completeData.teams.map((team) => (
                  <div key={team.id} className="">
                    <div className="flex flex-col justify-start items-center gap-2">
                      <span
                        style={{ backgroundColor: `#${team.color}` }}
                        className={`block rounded-full w-10 h-10 border border-gray-500`}
                      ></span>
                      <span className="text-xl">{team.name}</span>
                    </div>
                    {/* players */}
                    {team.players && (
                      <div>
                        <h3>Players</h3>

                        <div className="flex flex-col gap-4 my-4">
                          {canUserJoinTeam(team) && (
                            <div>
                              <JoinTeam
                                matchId={completeData.id}
                                teamId={team.id}
                              />
                            </div>
                          )}
                          <div>
                            {team.players.map((player) => (
                              <div
                                key={player.id}
                                className="border-t-2 border-blue-800 h-16 py-4 px-4 flex justify-between items-center hover:bg-blue-900 hover:text-gray-300 transition-colors duration-500 ease-in-out"
                              >
                                <span>{player.user?.name}</span>
                                {player.user_id === session.user.id && (
                                  <LeaveTeam
                                    teamId={team.id}
                                    matchId={completeData.id}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
