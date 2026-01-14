"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updateTeamName = async (
  {
    matchId,
    teamAId,
    teamBId,
  }: {
    teamAId: string;
    teamBId: string;
    matchId: string;
  },
  _: any,
  formData: FormData
): Promise<any> => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  console.log("formdata", formData);
  const rawData = {
    team_a_name: formData.get("team_a_name") as string,
    team_b_name: formData.get("team_b_name") as string,
  };

  if (!rawData.team_a_name || rawData.team_a_name.trim().length < 1) {
    return {
      success: false,
      message: "Team A name is required.",
      inputs: rawData,
    };
  }
  if (!rawData.team_b_name || rawData.team_b_name.trim().length < 1) {
    return {
      success: false,
      message: "Team B name is required.",
      inputs: rawData,
    };
  }

  const supabase = await createClient();

  //update team A score
  const { data, error } = await supabase
    .from("team")
    .update({
      name: rawData.team_a_name?.trim() || "",
    })
    .eq("id", teamAId)
    .eq("match_id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Error updating team A name.",
      inputs: rawData,
    };
  }
  const { data: teamBData, error: teamBError } = await supabase
    .from("team")
    .update({
      name: rawData.team_b_name?.trim() || "",
    })
    .eq("id", teamBId)
    .eq("match_id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (teamBError) {
    console.error(teamBError);
    return {
      success: false,
      message: "Error updating team B name.",
      inputs: rawData,
    };
  }
  if (data || teamBData) {
    revalidatePath(`/matches`);
    revalidatePath(`/matches/${matchId}`);
    return {
      success: true,
      message: "",
    };
  }
  return data;
};
