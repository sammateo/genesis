import { Match, Player, Team, User } from "./data-types";

export type MatchResponse = MatchWithTeams;

export interface MatchWithSimpleTeams extends Match {
  teams: Team[];
}
export interface MatchWithTeams extends Match {
  teams: TeamWithPlayers[];
}

export interface TeamWithPlayers extends Team {
  players: PlayerWithUser[];
}

export interface PlayerWithUser extends Player {
  user: User | null;
}
