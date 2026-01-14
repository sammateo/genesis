"use client";

import { MatchWithTeams } from "@/types/extended-data-types";
import SecondaryButton from "@/app/ui/button/secondary-button";
import { useState } from "react";
import MatchNameModal from "./forms/match-name/match-name-modal";
import MatchDateModal from "./forms/match-date/match-date-modal";
import LocationModal from "./forms/location/location-modal";
import ScoreModal from "./forms/score/score-modal";
import MatchStatusModal from "./forms/match-status/match-status-modal";

export enum CREATOR_CONTROL_MODALS {
  MATCH_NAME,
  MATCH_DATE,
  LOCATION,
  SCORE,
  STATUS,
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
    { title: "Match Name", modal_name: CREATOR_CONTROL_MODALS.MATCH_NAME },
    { title: "Match Date", modal_name: CREATOR_CONTROL_MODALS.MATCH_DATE },
    { title: "Location", modal_name: CREATOR_CONTROL_MODALS.LOCATION },
    { title: "Score", modal_name: CREATOR_CONTROL_MODALS.SCORE },
    { title: "Status", modal_name: CREATOR_CONTROL_MODALS.STATUS },
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
                onClick={() => setShowModal(creatorControlDetail.modal_name)}
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
      {showModal === CREATOR_CONTROL_MODALS.MATCH_DATE && (
        <MatchDateModal
          matchId={completeData.id}
          matchDate={completeData.match_date || ""}
          closeModal={closeCreatorControlModal}
        />
      )}
      {showModal === CREATOR_CONTROL_MODALS.LOCATION && (
        <LocationModal
          matchId={completeData.id}
          locationName={completeData.location_name || ""}
          locationPin={completeData.location_link || ""}
          closeModal={closeCreatorControlModal}
        />
      )}
      {showModal === CREATOR_CONTROL_MODALS.SCORE && (
        <ScoreModal
          matchId={completeData.id}
          teamAScoreDetails={{
            teamId: completeData.teams[0].id,
            teamName: completeData.teams[0].name || "",
            teamScore: completeData.teams[0].score || 0,
          }}
          teamBScoreDetails={{
            teamId: completeData.teams[1].id,
            teamName: completeData.teams[1].name || "",
            teamScore: completeData.teams[1].score || 0,
          }}
          closeModal={closeCreatorControlModal}
        />
      )}
      {showModal === CREATOR_CONTROL_MODALS.STATUS && (
        <MatchStatusModal
          matchId={completeData.id}
          matchStatus={completeData.status}
          closeModal={closeCreatorControlModal}
        />
      )}
    </div>
  );
};

export default CreatorControlDetails;
