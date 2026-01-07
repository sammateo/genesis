"use client";
import { findMatch } from "@/app/matches/join/actions";
import PrimaryButton from "@/app/ui/button/primary-button";
import { useActionState } from "react";
import { HiSearch } from "react-icons/hi";

const initialState = {
  success: false,
  message: "",
};
const FindMatchForm = () => {
  const [state, formAction, pending] = useActionState(findMatch, initialState);

  return (
    <form
      action={formAction}
      className="mx-auto flex flex-col w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 gap-5 lg:px-8 lg:py-32"
    >
      <h1 className="mx-auto font-bold text-3xl capitalize text-blue-900">
        Enter match code
      </h1>
      <input
        id="match_code"
        name="match_code"
        className="border-2 border-blue-900 outline-none px-5 py-3 rounded-full mx-auto w-full max-w-2xl transition-shadow duration-300 ease-in-out focus:shadow-xl shadow-blue-200"
        type="text"
        placeholder="match code"
        required
        defaultValue={state?.inputs?.match_code}
      />
      <div className="flex justify-center">
        <PrimaryButton
          type="submit"
          label={"Search"}
          Icon={HiSearch}
          pill={true}
          loading={pending}
        />
      </div>
      <p className="text-center">{state?.message}</p>
    </form>
  );
};

export default FindMatchForm;
