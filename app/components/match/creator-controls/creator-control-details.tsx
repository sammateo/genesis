"use client";

import { MatchWithTeams } from "@/types/extended-data-types";
import SecondaryButton from "@/app/ui/button/secondary-button";
import { useState } from "react";
import MatchNameModal from "./forms/match-name-modal";

export enum CREATOR_CONTROL_MODALS {
  MATCH_NAME,
}

export interface SummaryDetailsInterface {
  title: string;
  data: string;
  copyEnabled?: boolean;
}
const CreatorControlDetails = ({
  completeData,
}: {
  completeData: MatchWithTeams;
}) => {
  const creatorControlDetails = [
    { title: "Match Name", data: completeData.name },
    // {
    //   title: "Match Date",
    //   data: completeData.match_date
    //     ? new Date(completeData.match_date).toLocaleString()
    //     : "no match date specified",
    // },
    // { title: "Location", data: completeData.location_name },
    // // { title: "Status", data: completeData. },
    // {
    //   title: "Score",
    //   data: `${completeData.teams[0].score || "0"} - ${
    //     completeData.teams[1].score || "0"
    //   }`,
    // },
    // { title: "Team Names", data: `${completeData.team_size || "not specified"}` },
    // { title: "Team Size", data: `${completeData.team_size || "not specified"}` },
  ];

  const [showModal, setShowModal] = useState<CREATOR_CONTROL_MODALS | null>(
    null
  );

  const closeCreatorControlModal = () => setShowModal(null);

  return (
    <div className="flow-root">
      <dl className="-my-3 divide-y divide-gray-200 text-sm *:even:bg-gray-50">
        {creatorControlDetails.map((creatorControlDetail) => (
          <div
            key={creatorControlDetail.title}
            className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:gap-4 items-center"
          >
            <dt className="font-medium text-gray-900">
              {creatorControlDetail.title}
            </dt>
            <dd className="text-gray-600 sm:col-span-1">
              <SecondaryButton
                label={"Update"}
                onClick={() => setShowModal(CREATOR_CONTROL_MODALS.MATCH_NAME)}
              />
            </dd>
          </div>
        ))}
      </dl>
      {showModal === CREATOR_CONTROL_MODALS.MATCH_NAME && (
        <MatchNameModal
          matchId={completeData.id}
          matchName={completeData.name || ""}
          closeModal={closeCreatorControlModal}
        />
      )}
    </div>
  );
};

export default CreatorControlDetails;
