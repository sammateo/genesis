"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const joinTeamAction = async (
  {
    matchId,
    teamId,
  }: {
    matchId: string;
    teamId: string;
  },
  formData: FormData
): Promise<any> => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  const supabase = await createClient();
  // new player record with team id and user id

  const { data, error } = await supabase
    .from("player")
    .insert([{ user_id: session.user.id, team_id: teamId }])
    .select();

  if (error) {
    console.error(error);
  }
  if (data) {
    revalidatePath(`/matches/${matchId}`);
  }
};
export const leaveTeamAction = async (
  {
    matchId,
    teamId,
  }: {
    matchId: string;
    teamId: string;
  },
  formData: FormData
): Promise<any> => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  const supabase = await createClient();
  // remove player record with team id and user id

  const { error } = await supabase
    .from("player")
    .delete()
    .eq("team_id", teamId)
    .eq("user_id", session.user.id);
  if (error) {
    console.error(error);
  }
  revalidatePath(`/matches/${matchId}`);
};
