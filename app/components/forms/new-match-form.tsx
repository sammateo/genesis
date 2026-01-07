"use client";
import { FaLink } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import Form from "next/form";
import { useActionState } from "react";
import { createMatch } from "@/app/matches/actions";
import SecondaryLink from "@/app/ui/link/secondary-link";

const NewMatchForm = () => {
  const [state, formAction, pending] = useActionState(createMatch, {
    success: false,
    errors: {},
    message: "",
  });

  return (
    <div>
      {pending ? (
        <div className="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6 h-100 flex justify-center items-center">
          <div className="inline-flex items-center gap-3">
            <svg
              className="size-6 animate-spin text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            <p className="font-medium text-gray-700">Saving Match...</p>
          </div>
        </div>
      ) : (
        <Form
          action={formAction}
          className="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6"
        >
          <h1 className="text-center font-medium text-2xl mb-5">
            Create a New Match
          </h1>
          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>

            <input
              className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
              id="name"
              name="name"
              type="text"
              placeholder="Match name"
              required
            />
            {/* {state?.errors?.name && (
              <div>
                {state?.errors?.name?.errors.map((error: string) => (
                  <span key={error} className="text-red-700">
                    {error}
                  </span>
                ))}
              </div>
            )} */}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="match_date"
            >
              Match Date
            </label>

            <input
              className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
              id="match_date"
              name="match_date"
              type="datetime-local"
              placeholder="Match date"
              required
            />
            {/* {state?.errors?.match_date && (
              <div>
                {state?.errors?.match_date?.errors.map((error: string) => (
                  <span key={error} className="text-red-700">
                    {error}
                  </span>
                ))}
              </div>
            )} */}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="location_name"
            >
              Location
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <LuMapPin />
              </div>
              <input
                type="text"
                id="location_name"
                name="location_name"
                className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white ps-9 pe-4 py-2"
                placeholder="Location name"
                required
              />
            </div>
            {/* {state?.errors?.location_name && (
              <div>
                {state?.errors?.location_name?.errors.map((error: string) => (
                  <span key={error} className="text-red-700">
                    {error}
                  </span>
                ))}
              </div>
            )} */}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="location_link"
            >
              Location pin
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaLink className="text-lg" />
              </div>
              <input
                type="text"
                id="location_link"
                name="location_link"
                className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white ps-9 pe-4 py-2"
                placeholder="Location pin"
              />
            </div>
            {/* {state?.errors?.location_link && (
              <div>
                {state?.errors?.location_link?.errors.map((error: string) => (
                  <span key={error} className="text-red-700">
                    {error}
                  </span>
                ))}
              </div>
            )} */}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="team_size"
            >
              Team Sizes
            </label>

            <input
              className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
              id="team_size"
              name="team_size"
              type="number"
              step="1"
              placeholder="Team sizes"
              min={1}
            />
            {/* {state?.errors?.team_size && (
              <div>
                {state?.errors?.team_size?.errors.map((error: string) => (
                  <span key={error} className="text-red-700">
                    {error}
                  </span>
                ))}
              </div>
            )} */}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <div>
                {" "}
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="team_a_name"
                >
                  Team A
                </label>
                <input
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
                  id="team_a_name"
                  name="team_a_name"
                  type="text"
                  placeholder="Team A"
                  required
                />
              </div>
              <div>
                {" "}
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="team_a_color"
                >
                  Color
                </label>
                <input
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-1"
                  id="team_a_color"
                  name="team_a_color"
                  type="color"
                  required
                  defaultValue={"#FFFFFF"}
                />
              </div>
            </div>

            <div>
              <div>
                {" "}
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="team_b_name"
                >
                  Team B
                </label>
                <input
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
                  id="team_b_name"
                  name="team_b_name"
                  type="text"
                  placeholder="Team B"
                  required
                />
              </div>
              <div>
                {" "}
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="team_b_color"
                >
                  Color
                </label>
                <input
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-1"
                  id="team_b_color"
                  name="team_b_color"
                  type="color"
                  required
                  defaultValue={"#000000"}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="visibility"
            >
              Visibility
            </label>

            <select
              className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
              id="visibility"
              name="visibility"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
            {/* {state?.errors?.visibility && (
              <div>
                {state?.errors?.visibility?.errors.map((error: string) => (
                  <span key={error} className="text-red-700">
                    {error}
                  </span>
                ))}
              </div>
            )} */}
          </div>

          <button
            className="block w-full rounded-lg border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-blue-600
         disabled:bg-gray-500 disabled:hover:hover:text-white disabled:border-gray-300
        "
            type="submit"
            disabled={pending}
          >
            {pending ? "Loading.." : "Submit"}
          </button>
          <SecondaryLink label={"Cancel"} href={"/matches"} />
        </Form>
      )}
    </div>
  );
};

export default NewMatchForm;
