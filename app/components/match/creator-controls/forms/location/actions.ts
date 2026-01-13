"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updateLocation = async (
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
    location_name: formData.get("location_name") as string,
    location_pin: formData.get("location_pin") as string,
  };

  if (!rawData.location_name || rawData.location_name.trim().length < 1) {
    return {
      success: false,
      message: "Location Name is required.",
      inputs: rawData,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("match")
    .update({
      location_name: rawData.location_name?.trim(),
      location_link: rawData.location_pin?.trim(),
    })
    .eq("id", matchId)
    .eq("creator_id", session.user.id)
    .select();
  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Error updating match location.",
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
