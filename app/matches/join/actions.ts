"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const findMatch = async (_: any, formData: FormData): Promise<any> => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  const rawData = {
    match_code: formData.get("match_code") as string,
  };

  if (!rawData.match_code || rawData.match_code.trim().length < 1) {
    return {
      success: false,
      message: "Match Code is required.",
      inputs: rawData,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("match")
    .select(
      `
    id,
    name,
    match_date,
    location_name,
    location_link,
    match_code,
    visibility,
    team_size,
    created_at,
    updated_at,
    creator_id
  `
    )
    .eq("match_code", rawData.match_code)
    .single();
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Match not found.",
      inputs: rawData,
    };
  }
  if (data && data.id) {
    redirect(`/matches/${data.id}`);
  }
  return data;
};
