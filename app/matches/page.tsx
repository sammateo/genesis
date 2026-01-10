import { auth } from "@/auth";
import Header from "../components/header/header";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaPlus, FaRegEyeSlash } from "react-icons/fa6";
import PrimaryLink from "../ui/link/primary-link";
import { LuMapPin } from "react-icons/lu";
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
                  className="rounded-xl bg-white p-4 ring-3 ring-blue-50 sm:p-6 lg:p-8 transition-shadow duration-200 ease-in-out hover:shadow-lg"
                >
                  <div className="flex items-start sm:gap-8">
                    <svg
                      width="128"
                      height="128"
                      viewBox="0 0 128 128"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full"
                    >
                      <path
                        d="M95.4585 31.819C97.2489 33.6109 98.8879 35.5479 100.359 37.6102L100.366 37.6172C104.306 43.1813 106.93 49.5676 108.042 56.2942C109.153 63.0209 108.721 69.912 106.78 76.4475C104.838 82.983 101.437 88.9921 96.8339 94.0211C92.2306 99.0502 86.545 102.968 80.2062 105.478L80.1992 105.485C78.325 106.23 76.4019 106.844 74.4433 107.324C68.383 108.821 62.0776 109.043 55.927 107.976C49.7763 106.908 43.9146 104.574 38.7132 101.123C36.2353 99.4647 33.9262 97.5676 31.8189 95.4586C30.8573 94.4969 29.9451 93.4999 29.0895 92.4746L29.0825 92.4676C21.6964 83.6141 17.9906 72.2632 18.7297 60.7571C19.4688 49.2509 24.5963 38.4674 33.0544 30.6317C41.5125 22.7959 52.6556 18.5057 64.1846 18.6464C75.7136 18.7871 86.7488 23.3479 95.0131 31.3877L95.0202 31.3948C95.1757 31.5361 95.31 31.6705 95.4585 31.819Z"
                        fill={`url(#paint0_linear_6_380_${match.id})`}
                      />
                      <path
                        d="M74.5367 48.7891H54.3825L44.3048 31.3389L51.1403 19.4912L51.5397 19.3838C60.1929 17.0716 69.3319 17.3271 77.8424 20.1191L78.2047 20.2393L84.6144 31.3389L74.5367 48.7891ZM55.5367 46.7891H73.3825L82.3048 31.3389L76.8556 21.9014C68.9475 19.3937 60.4946 19.1541 52.4572 21.21L46.6144 31.3389L55.5367 46.7891Z"
                        fill="white"
                      />
                      <path
                        d="M73.5367 84.79H53.3825L43.3048 67.3359L53.3825 49.8818H73.5368L83.6144 67.3359L73.5367 84.79ZM54.5367 82.79H72.3825L81.3048 67.3359L72.3825 51.8818H54.5368L45.6144 67.3359L54.5367 82.79Z"
                        fill="white"
                      />
                      <path
                        d="M63.4596 109.819C57.1744 109.831 50.9546 108.543 45.1911 106.036L44.1632 105.59L54.382 87.8789H74.5368L84.3248 104.834L83.3527 105.301C77.1483 108.291 70.3469 109.836 63.4596 109.819ZM47.0226 104.636C52.521 106.848 58.4092 107.928 64.3348 107.811C70.2603 107.694 76.1013 106.382 81.5079 103.954L73.3825 89.8789H55.5372L47.0226 104.636Z"
                        fill="white"
                      />
                      <path
                        d="M107.537 66.7891H87.3825L77.3048 49.3389L87.382 31.8789H96.5592L96.8551 32.1904C104.814 40.5634 109.313 51.6355 109.45 63.1865V63.4765L107.537 66.7891ZM88.5367 64.7891H106.382L107.446 62.9482C107.253 52.1403 103.068 41.7859 95.6969 33.8789H88.5373L79.6144 49.3389L88.5367 64.7891Z"
                        fill="white"
                      />
                      <path
                        d="M87.1046 103.301L77.3048 86.3389L87.382 68.8789H107.536L108.83 71.1094L108.816 71.5566C107.723 77.9249 105.304 83.9923 101.715 89.3653C98.1265 94.7383 93.4482 99.2968 87.984 102.745L87.1046 103.301ZM79.6144 86.3389L87.7892 100.487C92.7417 97.1969 96.9774 92.9387 100.242 87.9689C103.506 82.9991 105.731 77.4204 106.784 71.5684L106.383 70.8789H88.5372L79.6144 86.3389Z"
                        fill="white"
                      />
                      <path
                        d="M40.5656 103.732L39.6926 103.205C34.2316 99.9045 29.515 95.5065 25.8412 90.2894C22.1674 85.0722 19.6163 79.1493 18.3493 72.8955L18.275 72.5254L20.3825 68.8789H40.5372L50.6144 86.3389L40.5656 103.732ZM20.3859 72.8701C21.6005 78.6116 23.9484 84.0531 27.2924 88.8757C30.6363 93.6984 34.9089 97.8054 39.86 100.956L48.3048 86.3389L39.382 70.8789H21.5368L20.3859 72.8701Z"
                        fill="white"
                      />
                      <path
                        d="M40.5368 64.789H20.3829L17.6398 60.0478V59.7792C18.6271 48.4466 23.791 37.8853 32.1286 30.1465L32.4166 29.8789H40.5372L50.6144 47.3389L40.5368 64.789ZM21.5363 62.789H39.3825L48.3049 47.3388L39.382 31.8788H33.2057C25.4908 39.1601 20.6793 48.993 19.6642 59.5527L21.5363 62.789Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id={`paint0_linear_6_380_${match.id}`}
                          x1="31.8198"
                          y1="31.8198"
                          x2="95.4585"
                          y2="95.4586"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor={`#${match.teams[0].color}`} />
                          <stop
                            offset="1"
                            stopColor={`#${match.teams[1].color}`}
                          />
                        </linearGradient>
                      </defs>
                    </svg>

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
