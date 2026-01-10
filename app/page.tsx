import SignIn from "./components/auth/sign-in";
import { auth } from "@/auth";
import { SignOut } from "./components/auth/sign-out";
import HomeLanding from "./components/landing/home-landing";
import { redirect } from "next/navigation";
import HomeBody from "./components/body/home-body";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/matches");
  }
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HomeLanding />
      <HomeBody />
    </div>
  );
}
