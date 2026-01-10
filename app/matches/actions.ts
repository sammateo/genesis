"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { Match } from "@/types/data-types";
import { MatchResponse } from "@/types/extended-data-types";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { da } from "zod/v4/locales";

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
  team_a_name: z.string(),
  team_a_color: z.string(),
  team_b_name: z.string(),
  team_b_color: z.string(),
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
    visibility: formData.get("visibility")?.valueOf() as
      | "public"
      | "private"
      | null,
    team_size: formData.get("team_size")?.valueOf() as number | null,
    created_at: "",
    updated_at: "",
  };

  const { data: matchData, error } = await supabase
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
    console.error(error);
    return {
      success: false,
      errors: null,
      message: "Error saving new match",
    };
  }
  let savedMatchData = matchData as Match[];

  //create teams
  const teamData = {
    team_a_name: formData.get("team_a_name")?.valueOf() as string,
    team_a_color: formData.get("team_a_color")?.valueOf() as string,
    team_b_name: formData.get("team_b_name")?.valueOf() as string,
    team_b_color: formData.get("team_b_color")?.valueOf() as string,
  };
  //create team a
  const { data: teamAData, error: teamAError } = await supabase
    .from("team")
    .insert([
      {
        name: teamData.team_a_name?.trim() || "Team A",
        match_id: savedMatchData[0].id,
        color: teamData.team_a_color?.trim().replace("#", "") || "FFFFFF",
        score: null,
        creator_id: rawFormData.creator_id,
      },
    ])
    .select();

  if (teamAError) {
    console.error(teamAError);
    return {
      success: false,
      errors: null,
      message: "Error creating team A",
    };
  }

  //create team b
  const { data: teamBData, error: teamBError } = await supabase
    .from("team")
    .insert([
      {
        name: teamData.team_b_name?.trim() || "Team B",
        match_id: savedMatchData[0].id,
        color: teamData.team_b_color?.trim().replace("#", "") || "000000",
        score: null,
        creator_id: rawFormData.creator_id,
      },
    ])
    .select();

  if (teamBError) {
    console.error(teamBError);
    return {
      success: false,
      errors: null,
      message: "Error creating team B",
    };
  }

  if (savedMatchData && savedMatchData[0] && savedMatchData[0].id) {
    revalidatePath("/matches");
    redirect(`/matches/${savedMatchData[0].id}`);
  }

  return {
    success: true,
    errors: null,
    message: "",
  };
};

export const getMatchDetails = async (
  matchId: string
): Promise<MatchResponse | null> => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
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
    creator_id,
    teams:team (
      id,
      name,
      color,
      score,
      creator_id,
      match_id,
      created_at,
      updated_at,
      players:player (
        id,
        user_id,
        created_at,
        updated_at,
        team_id,
        user:users (
          id,
          name,
          email,
          image
        )
      )
    )
  `
    )
    .eq("id", matchId)
    .single();
  if (error) {
    console.error(error);
  }
  return data;
};

export const getMatchesForUser = async (): Promise<MatchResponse[] | null> => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const supabase = await createClient();
  // get matches where user is a player
  const { data: playerMatchesForUser, error: playerMatchesErrorForUser } =
    await supabase
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
    creator_id,
    teams:team!inner (
      id,
      name,
      color,
      score,
      creator_id,
      match_id,
      created_at,
      updated_at,
      players:player!inner (
        id,
        user_id,
        created_at,
        updated_at,
        team_id,
        user:users!inner (
          id,
          name,
          email,
          image
        )
      )
    )
  `
      )
      .eq("teams.players.user_id", session.user.id);

  if (playerMatchesErrorForUser) {
    console.error(playerMatchesErrorForUser);
  }

  //get matches where user is creator
  const { data: creatorMatchesForUser, error: creatorMatchesErrorForUser } =
    await supabase
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
      .eq("creator_id", session.user.id);

  if (creatorMatchesErrorForUser) {
    console.error(creatorMatchesErrorForUser);
  }
  //get all match details for both

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
    creator_id,
    teams:team (
      id,
      name,
      color,
      score,
      creator_id,
      match_id,
      created_at,
      updated_at,
      players:player (
        id,
        user_id,
        created_at,
        updated_at,
        team_id,
        user:users (
          id,
          name,
          email,
          image
        )
      )
    )
  `
    )
    .in("id", [
      ...(playerMatchesForUser?.map((pMatch) => pMatch.id) || []),
      ...(creatorMatchesForUser?.map((cMatch) => cMatch.id) || []),
    ]);
  return data;
};
