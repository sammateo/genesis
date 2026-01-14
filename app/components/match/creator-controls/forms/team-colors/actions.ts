"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updateTeamColors = async (
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
    team_a_color: formData.get("team_a_color") as string,
    team_b_color: formData.get("team_b_color") as string,
  };

  if (!rawData.team_a_color || rawData.team_a_color.trim().length < 1) {
    return {
      success: false,
      message: "Team A color is required.",
      inputs: rawData,
    };
  }
  if (!rawData.team_b_color || rawData.team_b_color.trim().length < 1) {
    return {
      success: false,
      message: "Team B color is required.",
      inputs: rawData,
    };
  }

  const supabase = await createClient();

  //update team A score
  const { data, error } = await supabase
    .from("team")
    .update({
      color: rawData.team_a_color?.trim().replace("#", "") || "FFFFFF",
    })
    .eq("id", teamAId)
    .eq("match_id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Error updating team A color.",
      inputs: rawData,
    };
  }
  const { data: teamBData, error: teamBError } = await supabase
    .from("team")
    .update({
      color: rawData.team_b_color?.trim().replace("#", "") || "000000",
    })
    .eq("id", teamBId)
    .eq("match_id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (teamBError) {
    console.error(teamBError);
    return {
      success: false,
      message: "Error updating team B color.",
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
