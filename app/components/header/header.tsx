import { auth } from "@/auth";
import { SignOut } from "../auth/sign-out";
import Link from "next/link";
import PrimaryLink from "@/app/ui/link/primary-link";
import { GiSoccerKick } from "react-icons/gi";
import { RiAccountCircleLine } from "react-icons/ri";

const Header = async () => {
  const session = await auth();
  return (
    <header className="w-full flex justify-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex h-16 items-center justify-between w-full">
          <div className="md:flex md:items-center md:gap-12">
            <Link
              className="block text-blue-600"
              href={session?.user ? "/matches" : "/"}
            >
              <span className="sr-only">Home</span>
              <GiSoccerKick className="text-5xl" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <PrimaryLink
                label={<RiAccountCircleLine className="text-2xl" />}
                href="/account/profile"
              />

              <div className="hidden sm:flex">
                <SignOut />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
