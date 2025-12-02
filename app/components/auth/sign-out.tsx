import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        className="cursor-pointer rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
}
