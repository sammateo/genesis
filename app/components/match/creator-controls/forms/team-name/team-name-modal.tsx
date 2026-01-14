"use client";
import PrimaryButton from "@/app/ui/button/primary-button";
import SecondaryButton from "@/app/ui/button/secondary-button";
import { useActionState, useRef } from "react";
import { updateTeamName } from "./actions";
const initialState = {
  success: false,
  message: "",
};
const TeamNameModal = ({
  matchId,
  teamAScoreDetails,
  teamBScoreDetails,
  closeModal,
}: {
  matchId: string;
  teamAScoreDetails: {
    teamId: string;
    teamName: string;
  };
  teamBScoreDetails: {
    teamId: string;
    teamName: string;
  };
  closeModal: () => void;
}) => {
  const UpdateTeamNameWithId = updateTeamName.bind(null, {
    matchId,
    teamAId: teamAScoreDetails.teamId,
    teamBId: teamBScoreDetails.teamId,
  });

  const [state, formAction, pending] = useActionState(
    UpdateTeamNameWithId,
    initialState
  );

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  if (state?.success) {
    closeButtonRef.current?.click();
  }

  return (
    <div>
      <div
        className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <form
          action={formAction}
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        >
          <div className="flex items-start justify-between">
            <h2
              id="modalTitle"
              className="text-xl font-bold text-gray-900 sm:text-2xl"
            >
              Team Names
            </h2>

            <button
              onClick={closeModal}
              type="button"
              className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <label htmlFor="Confirm" className="mt-4 block">
              <span className="text-sm font-medium text-gray-700">
                Click "Done" to complete update
              </span>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col items-center">
                  <span>{teamAScoreDetails.teamName}</span>
                  <input
                    id="team_a_name"
                    name="team_a_name"
                    type="text"
                    className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
                    defaultValue={teamAScoreDetails.teamName}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span>{teamBScoreDetails.teamName}</span>
                  <input
                    id="team_b_name"
                    name="team_b_name"
                    type="text"
                    className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
                    defaultValue={teamBScoreDetails.teamName}
                  />
                </div>
              </div>
            </label>
          </div>

          <footer className="mt-6 flex justify-end gap-2">
            <SecondaryButton
              ref={closeButtonRef}
              label={"Cancel"}
              onClick={closeModal}
            />
            <PrimaryButton loading={pending} type="submit" label="Done" />
          </footer>
        </form>
      </div>
    </div>
  );
};

export default TeamNameModal;
