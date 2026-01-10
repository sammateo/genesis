"use client";
import SecondaryButton from "@/app/ui/button/secondary-button";
import { leaveTeamAction } from "./actions";
import { useActionState } from "react";
const initialState = {
  success: false,
  message: "",
};
const LeaveTeam = ({
  matchId,
  teamId,
}: {
  matchId: string;
  teamId: string;
}) => {
  const LeaveTeamWithId = leaveTeamAction.bind(null, { matchId, teamId });
  const [state, formAction, pending] = useActionState(
    LeaveTeamWithId,
    initialState
  );
  return (
    <form action={formAction}>
      <SecondaryButton loading={pending} type="submit" label="Leave" />
    </form>
  );
};

export default LeaveTeam;
