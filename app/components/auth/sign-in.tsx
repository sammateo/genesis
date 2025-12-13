import PrimaryButton from "@/app/ui/button/primary-button";
import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <PrimaryButton type="submit" label="Sign In" />
    </form>
  );
}
