"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updateTeamSize = async (
  {
    matchId,
  }: {
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
    team_size: formData.get("team_size") as string,
  };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("match")
    .update({ team_size: rawData.team_size.trim() || null })
    .eq("id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Error updating team size.",
      inputs: rawData,
    };
  }
  if (data) {
    revalidatePath(`/matches`);
    revalidatePath(`/matches/${matchId}`);
    return {
      success: true,
      message: "",
    };
  }
  return data;
};
