import Image from "next/image";
import SignIn from "./components/auth/sign-in";
import { auth } from "@/auth";
import { SignOut } from "./components/auth/sign-out";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      {session?.user ? (
        <div className="flex flex-col items-center gap-5">
          <p>{session.user.name}</p>
          <SignOut />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
