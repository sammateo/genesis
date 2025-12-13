import { auth } from "@/auth";
import Header from "../components/header/header";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Match } from "@/types/data-types";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import PrimaryLink from "../ui/link/primary-link";

const page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const supabase = await createClient();
  let matches: Match[];
  let { data, error } = await supabase
    .from("match")
    .select("*")
    .eq("creator_id", session.user.id);
  if (error) {
    console.error(error);
    return <div>An error occurred</div>;
  }
  matches = data as Match[];
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {matches && matches.length > 0 ? (
          <>
            <div className="flex justify-end my-4">
              <PrimaryLink
                label="New Match"
                href={"/matches/new"}
                Icon={FaPlus}
              />
              {/* <Link
                
                className="fcursor-pointer flex items-center gap-2 rounded border border-blue-600 bg-blue-600 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <FaPlus />
                New Match
              </Link> */}
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
                            match date & time
                          </p>
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
              Get started by creating your first match. It only takes a few
              seconds.
            </p>

            <Link
              href={"/matches/new"}
              className="mt-6 block w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Create Match
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
