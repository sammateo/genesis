import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignOut } from "../auth/sign-out";
import Link from "next/link";
import { IoMenuOutline } from "react-icons/io5";
import PrimaryLink from "@/app/ui/link/primary-link";
import { GiSoccerField, GiSoccerKick } from "react-icons/gi";

const Header = async () => {
  const session = await auth();
  return (
    <header className="bg-white w-full flex justify-center">
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
              <PrimaryLink label="Profile" href="/account/profile" />

              <div className="hidden sm:flex">
                <SignOut />
              </div>
            </div>

            {/* <div className="block md:hidden">
              <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <IoMenuOutline />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
