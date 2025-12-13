import PrimaryButton from "@/app/ui/button/primary-button";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const JoinTeam = ({ matchId, teamId }: { matchId: string; teamId: string }) => {
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

        const { data, error } = await supabase
          .from("player")
          .insert([{ user_id: session.user.id, team_id: teamId }])
          .select();

        if (error) {
          console.error(error);
        }
        if (data) {
          revalidatePath(`/matches/${matchId}`);
        }

        //revalidate match path
      }}
    >
      <PrimaryButton type="submit" label="Join Team" />
    </form>
  );
};

export default JoinTeam;
