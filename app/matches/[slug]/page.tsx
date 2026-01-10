import Header from "@/app/components/header/header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMatchDetails } from "../actions";
import { MatchWithTeams, TeamWithPlayers } from "@/types/extended-data-types";
import MatchOverview from "@/app/components/match/match-overview/match-overview";
import MatchSummary from "@/app/components/match/match-summary/match-summary";
import MatchLineup from "@/app/components/match/match-lineup/match-lineup";
import CreatorControls from "@/app/components/match/creator-controls/creator-controls";

const isTeamFull = (
  completeData: MatchWithTeams | null,
  team: TeamWithPlayers
): boolean => {
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

export const canUserJoinTeam = (
  completeData: MatchWithTeams | null,
  team: TeamWithPlayers,
  user_id: string
): boolean => {
  // determines if user can join team
  if (!completeData) {
    return false;
  }
  // if the the team is not full (team is full if team_size is equal to number of players on the team)
  if (isTeamFull(completeData, team)) {
    return false;
  }
  //user can join a team if the user is not already a part of the match
  let userInMatch = false;
  completeData.teams.forEach((team) => {
    if (team.players && team.players.length > 0) {
      if (team.players.find((player) => player.user_id === user_id)) {
        userInMatch = true;
      }
    }
  });
  if (userInMatch) return false;
  return true;
};

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
      <div className="bg-blue-200">
        <Header />
      </div>

      {!completeData && (
        <div>
          <h2>Match Not Found</h2>
        </div>
      )}

      {/* Match Overview */}

      {completeData && (
        <div>
          <div className="bg-blue-200">
            <div className="mx-auto max-w-2xl px-4 py-8 pb-12 sm:px-6 lg:px-8">
              <MatchOverview
                completeData={completeData}
                user_id={session.user.id}
              />
            </div>
          </div>
          <div className="mx-auto max-w-4xl px-4 py-8 pb-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5">
              <MatchSummary completeData={completeData} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <MatchLineup
                  team={completeData.teams[0]}
                  user_id={session.user.id}
                />
                <MatchLineup
                  team={completeData.teams[1]}
                  user_id={session.user.id}
                />
              </div>
              {completeData.creator_id === session.user.id && (
                <CreatorControls completeData={completeData} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
