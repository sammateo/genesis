import { auth } from "@/auth";
import React from "react";
import Header from "../components/header/header";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Match } from "@/types/data-types";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const supabase = await createClient();
  let matches: Match[];
  let { data, error } = await supabase.from("match").select("*");
  if (error) {
    console.error(error);
    return <div>An error occurred</div>;
  }
  matches = data as Match[];
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-end my-4">
          <Link
            href={"/matches/new"}
            className="fcursor-pointer flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            <FaPlus />
            New Match
          </Link>
        </div>
        {matches && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {matches.map((match) => (
              <article
                key={match.id}
                className="rounded-xl bg-white p-4 ring-3 ring-indigo-50 sm:p-6 lg:p-8"
              >
                <div className="flex items-start sm:gap-8">
                  <div
                    className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
                    aria-hidden="true"
                  >
                    <div className="flex items-center gap-1">
                      <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                      <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                      <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
                      <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                      <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                    </div>
                  </div>

                  <div>
                    <strong className="rounded-sm border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                      {match.name}
                    </strong>

                    <h3 className="mt-4 text-lg font-medium sm:text-xl">
                      <Link
                        href={`/matches/${match.id}`}
                        className="hover:underline"
                      >
                        {" "}
                        Team A vs Team B{" "}
                      </Link>
                    </h3>

                    <p className="mt-1 text-sm text-gray-700">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ipsam nulla amet voluptatum sit rerum, atque, quo culpa ut
                      necessitatibus eius suscipit eum accusamus, aperiam
                      voluptas exercitationem facere aliquid fuga. Sint.
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

                        <p className="text-xs font-medium">match date & time</p>
                      </div>

                      <span className="hidden sm:block" aria-hidden="true">
                        ·
                      </span>

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

                        <p className="text-xs font-medium">match location</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
