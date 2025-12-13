import SecondaryButton from "@/app/ui/button/secondary-button";
import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <SecondaryButton label="Sign Out" type="submit" />
    </form>
  );
}
