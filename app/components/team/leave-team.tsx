import SecondaryButton from "@/app/ui/button/secondary-button";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const LeaveTeam = ({
  matchId,
  teamId,
}: {
  matchId: string;
  teamId: string;
}) => {
  return (
    <form
      action={async () => {
        "use server";
        const session = await auth();
        if (!session || !session.user) {
          return;
        }
        const supabase = await createClient();
        // new player record with team id and user id

        const { error } = await supabase
          .from("player")
          .delete()
          .eq("team_id", teamId)
          .eq("user_id", session.user.id);
        if (error) {
          console.error(error);
        }
        revalidatePath(`/matches/${matchId}`);
      }}
    >
      <SecondaryButton type="submit" label="Leave Team" />
    </form>
  );
};

export default LeaveTeam;
