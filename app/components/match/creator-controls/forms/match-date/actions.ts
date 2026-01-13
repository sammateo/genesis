"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// necessary to correct for timezone manipulation done on form population
const getUTCDatetimeString = (dateString: string) => {
  const date = new Date(dateString);
  // Calculate the local time offset and apply it to get a utc timestamp string
  const offset = date.getTimezoneOffset() * 60000; // minutes to milliseconds
  const localDatetime = new Date(date.getTime());
  // Use toISOString() to get a standard format, then slice to the required length (YYYY-MM-DDTHH:mm)
  return localDatetime.toISOString().slice(0, 16);
};
export const updateMatchDate = async (
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
    match_date: formData.get("match_date") as string,
  };

  if (!rawData.match_date || rawData.match_date.trim().length < 1) {
    return {
      success: false,
      message: "Match Date is required.",
      inputs: rawData,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("match")
    .update({ match_date: getUTCDatetimeString(rawData.match_date.trim()) })
    .eq("id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Error updating match date.",
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
