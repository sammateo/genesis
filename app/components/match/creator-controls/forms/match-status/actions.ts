"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusVariant } from "@/types/data-types";
import { revalidatePath } from "next/cache";

export const updateMatchStatus = async (
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
    match_status: formData.get("match_status") as StatusVariant,
  };

  if (!rawData.match_status || rawData.match_status.trim().length < 1) {
    return {
      success: false,
      message: "Match Status is required.",
      inputs: rawData,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("match")
    .update({ status: rawData.match_status.trim() })
    .eq("id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Error updating match status.",
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
