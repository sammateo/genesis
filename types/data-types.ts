export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export const StatusVariants = [
  "scheduled",
  "in progress",
  "completed",
  "cancelled",
] as const;

export type StatusVariant = (typeof StatusVariants)[number];

export interface Match {
  id: string;
  name: string | null;
  match_date: string | null; // ISO timestamp
  location_name: string | null;
  location_link: string | null;
  creator_id: string;
  match_code: string | null;
  visibility: "public" | "private" | null; // e.g. "public" | "private"
  team_size: number | null;
  created_at: string;
  updated_at: string;
  status: StatusVariant; //"scheduled" | "in progress" | "completed" | "cancelled";
}

export interface Team {
  id: string;
  name: string | null;
  match_id: string | null; // belongs to Match
  color: string | null;
  score: number | null;
  creator_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  user_id: string | null; // belongs to User
  team_id: string | null; // belongs to Team
  created_at: string;
  updated_at: string;
}
