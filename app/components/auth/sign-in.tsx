import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className=" cursor-pointer" type="submit">
        Signin
      </button>
    </form>
  );
}
