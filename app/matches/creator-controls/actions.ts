"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updateMatchName = async (
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
    match_name: formData.get("match_name") as string,
  };

  if (!rawData.match_name || rawData.match_name.trim().length < 1) {
    return {
      success: false,
      message: "Match Name is required.",
      inputs: rawData,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("match")
    .update({ name: rawData.match_name.trim() })
    .eq("id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Error updating match name.",
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
