"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { Match } from "@/types/data-types";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const generateMatchCode = () => {
  return randomBytes(8).toString("hex").slice(0, 8).toUpperCase();
};

const matchSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Match name is required"),
  match_date: z.string().min(1, "Match date is required"),
  location_name: z.string().min(1, "Location name is required"),
  location_link: z.string(),
  creator_id: z.string().min(1, "Match creator is required"),
  match_code: z.string(),
  visibility: z.string(),
  team_size: z.coerce.number(),
  created_at: z.string(),
  updated_at: z.string(),
});
const newMatchSchema = z.object({
  name: z.string().min(1, "Match name is required"),
  match_date: z.string().min(1, "Match date is required"),
  location_name: z.string().min(1, "Location name is required"),
  location_link: z.string(),
  visibility: z.enum(["private", "public"]),
  team_size: z.coerce.number(),
});

export const createMatch = async (
  _prevState: any,
  formData: FormData
): Promise<any> => {
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      errors: {},
      message: "User not found",
    };
  }

  const dataToValidate = Object.fromEntries(formData.entries());
  const validation = newMatchSchema.safeParse(dataToValidate);
  if (!validation.success) {
    console.error(z.treeifyError(validation.error).properties);
    return {
      success: false,
      errors: z.treeifyError(validation.error).properties,
      message: "",
    };
  }
  const supabase = await createClient();
  const rawFormData: Match = {
    id: "",
    name: formData.get("name")?.valueOf() as string,
    match_date: formData.get("match_date")?.valueOf()?.toLocaleString() || null,
    location_name: formData.get("location_name")?.valueOf() as string,
    location_link: formData.get("location_link")?.valueOf() as string,
    creator_id: session.user.id,
    match_code: generateMatchCode(),
    visibility: formData.get("visibility")?.valueOf() as string,
    team_size: formData.get("team_size")?.valueOf() as number | null,
    created_at: "",
    updated_at: "",
  };
  console.log(rawFormData);

  //TODO: validate form

  const { data, error } = await supabase
    .from("match")
    .insert([
      {
        name: rawFormData.name,
        match_date: rawFormData.match_date,
        location_name: rawFormData.location_name,
        location_link: rawFormData.location_link,
        creator_id: rawFormData.creator_id,
        match_code: rawFormData.match_code,
        visibility: rawFormData.visibility,
        team_size: rawFormData.team_size ? rawFormData.team_size : null,
      },
    ])
    .select();

  if (error) {
    //TODO: handle error
    console.error(error);
    return {
      success: false,
      errors: null,
      message: "Error saving new match",
    };
  }

  if (data) {
    console.log(data);
    const savedMatchData = data as Match[];
    if (savedMatchData && savedMatchData[0] && savedMatchData[0].id) {
      redirect(`/matches/${savedMatchData[0].id}`);
    }
  }
  revalidatePath("/posts");

  return {
    success: true,
    errors: null,
    message: "",
  };

  //
};
