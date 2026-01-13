"use client";
import PrimaryButton from "@/app/ui/button/primary-button";
import SecondaryButton from "@/app/ui/button/secondary-button";
import { useActionState, useRef } from "react";
import { updateMatchDate } from "./actions";
const initialState = {
  success: false,
  message: "",
};

const getLocalDatetimeString = (dateString: string) => {
  const date = new Date(dateString);
  // Calculate the local time offset and apply it to get a local timestamp string
  const offset = date.getTimezoneOffset() * 60000; // minutes to milliseconds
  const localDatetime = new Date(date.getTime() - offset);
  // Use toISOString() to get a standard format, then slice to the required length (YYYY-MM-DDTHH:mm)
  return localDatetime.toISOString().slice(0, 16);
};

const MatchDateModal = ({
  matchId,
  matchDate,
  closeModal,
}: {
  matchId: string;
  matchDate: string;
  closeModal: () => void;
}) => {
  const UpdateMatchDateWithId = updateMatchDate.bind(null, { matchId });

  const [state, formAction, pending] = useActionState(
    UpdateMatchDateWithId,
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
              Match Date
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

              <input
                id="match_date"
                name="match_date"
                type="datetime-local"
                className="mt-1 w-full rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white px-4 py-2"
                defaultValue={
                  matchDate ? getLocalDatetimeString(matchDate) : ""
                }
              />
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

export default MatchDateModal;
