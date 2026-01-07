"use client";
import PrimaryButton from "@/app/ui/button/primary-button";
import { joinTeamAction } from "./actions";
import { useActionState } from "react";
const initialState = {
  success: false,
  message: "",
};
const JoinTeam = ({ matchId, teamId }: { matchId: string; teamId: string }) => {
  const JoinTeamWithId = joinTeamAction.bind(null, { matchId, teamId });
  const [state, formAction, pending] = useActionState(
    JoinTeamWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <PrimaryButton loading={pending} type="submit" label="Join Team" />
    </form>
  );
};

export default JoinTeam;
