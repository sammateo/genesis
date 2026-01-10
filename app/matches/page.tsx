import { auth } from "@/auth";
import Header from "../components/header/header";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Match } from "@/types/data-types";
import Link from "next/link";
import { FaPlus, FaRegEyeSlash } from "react-icons/fa6";
import PrimaryLink from "../ui/link/primary-link";
import { LuMapPin } from "react-icons/lu";
import {
  MatchResponse,
  MatchWithSimpleTeams,
} from "@/types/extended-data-types";
import { MdOutlinePublic } from "react-icons/md";
import { HiSearch } from "react-icons/hi";
import SecondaryLink from "../ui/link/secondary-link";
import { getMatchesForUser } from "./actions";

const page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const matches = await getMatchesForUser();
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {matches && matches.length > 0 ? (
          <>
            <div className="flex justify-end gap-5 flex-wrap my-4">
              <SecondaryLink
                label="Join Match"
                href={"/matches/join"}
                Icon={HiSearch}
              />
              <PrimaryLink
                label="New Match"
                href={"/matches/new"}
                Icon={FaPlus}
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {matches.map((match) => (
                <article
                  key={match.id}
                  className="rounded-xl bg-white p-4 ring-3 ring-blue-50 sm:p-6 lg:p-8"
                >
                  <div className="flex items-start sm:gap-8">
                    <div
                      className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-blue-500"
                      aria-hidden="true"
                    >
                      <div className="flex items-center gap-1">
                        <span className="h-8 w-0.5 rounded-full bg-blue-500"></span>
                        <span className="h-6 w-0.5 rounded-full bg-blue-500"></span>
                        <span className="h-4 w-0.5 rounded-full bg-blue-500"></span>
                        <span className="h-6 w-0.5 rounded-full bg-blue-500"></span>
                        <span className="h-8 w-0.5 rounded-full bg-blue-500"></span>
                      </div>
                    </div>

                    <div>
                      <strong className="rounded-sm border border-blue-500 bg-blue-500 px-3 py-1.5 text-[10px] font-medium text-white">
                        {match.name}
                      </strong>
                      <div className="text-xs text-gray-500 my-2">
                        {match.visibility === "public" ? (
                          <div className="flex items-center gap-1">
                            <MdOutlinePublic />
                            <span>public</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <FaRegEyeSlash />
                            <span>private</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-medium sm:text-xl">
                        <Link
                          href={`/matches/${match.id}`}
                          className="hover:underline"
                        >
                          {" "}
                          {match.teams[0]?.name} vs {match.teams[1]?.name}{" "}
                        </Link>
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                      </p>

                      <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                        <div className="flex items-center gap-1 text-gray-500">
                          <svg
                            className="size-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>

                          <p className="text-xs font-medium">
                            {match.match_date &&
                              new Date(match.match_date).toLocaleString()}
                          </p>
                        </div>

                        <span className="hidden sm:block" aria-hidden="true">
                          ·
                        </span>

                        <div className="flex items-center gap-1 text-gray-500">
                          <LuMapPin />

                          {match.location_link ? (
                            <a
                              href={match.location_link}
                              className="text-xs font-medium"
                            >
                              {match.location_name}
                            </a>
                          ) : (
                            <p className="text-xs font-medium">
                              {match.location_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-md text-center mx-auto my-40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto size-20 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              ></path>
            </svg>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No matches found
            </h2>

            <p className="mt-4 text-pretty text-gray-700">
              Get started by creating or joining your first match. It only takes
              a few seconds.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <PrimaryLink label={"Create Match"} href={"/matches/new"} />
              <SecondaryLink label={"Join Match"} href={"/matches/join"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
