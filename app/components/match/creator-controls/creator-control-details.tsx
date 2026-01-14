"use client";

import { MatchWithTeams } from "@/types/extended-data-types";
import SecondaryButton from "@/app/ui/button/secondary-button";
import { useState } from "react";
import MatchNameModal from "./forms/match-name/match-name-modal";
import MatchDateModal from "./forms/match-date/match-date-modal";
import LocationModal from "./forms/location/location-modal";
import ScoreModal from "./forms/score/score-modal";
import MatchStatusModal from "./forms/match-status/match-status-modal";
import TeamNameModal from "./forms/team-name/team-name-modal";
import TeamColorModal from "./forms/team-colors/team-colors-modal";
import TeamSizeModal from "./forms/team-size/team-size-modal";

export enum CREATOR_CONTROL_MODALS {
  MATCH_NAME,
  MATCH_DATE,
  LOCATION,
  SCORE,
  STATUS,
  TEAM_NAME,
  TEAM_COLOR,
  TEAM_SIZE,
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
    { title: "Status", modal_name: CREATOR_CONTROL_MODALS.STATUS },
    { title: "Score", modal_name: CREATOR_CONTROL_MODALS.SCORE },
    { title: "Team Names", modal_name: CREATOR_CONTROL_MODALS.TEAM_NAME },
    { title: "Team Colors", modal_name: CREATOR_CONTROL_MODALS.TEAM_COLOR },
    { title: "Team Size", modal_name: CREATOR_CONTROL_MODALS.TEAM_SIZE },
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
      {showModal === CREATOR_CONTROL_MODALS.TEAM_NAME && (
        <TeamNameModal
          matchId={completeData.id}
          teamAScoreDetails={{
            teamId: completeData.teams[0].id,
            teamName: completeData.teams[0].name || "",
          }}
          teamBScoreDetails={{
            teamId: completeData.teams[1].id,
            teamName: completeData.teams[1].name || "",
          }}
          closeModal={closeCreatorControlModal}
        />
      )}
      {showModal === CREATOR_CONTROL_MODALS.TEAM_COLOR && (
        <TeamColorModal
          matchId={completeData.id}
          teamAScoreDetails={{
            teamId: completeData.teams[0].id,
            teamName: completeData.teams[0].name || "",
            teamColor: completeData.teams[0].color || "",
          }}
          teamBScoreDetails={{
            teamId: completeData.teams[1].id,
            teamName: completeData.teams[1].name || "",
            teamColor: completeData.teams[1].color || "",
          }}
          closeModal={closeCreatorControlModal}
        />
      )}
      {showModal === CREATOR_CONTROL_MODALS.TEAM_SIZE && (
        <TeamSizeModal
          matchId={completeData.id}
          teamSize={completeData.team_size}
          closeModal={closeCreatorControlModal}
        />
      )}
    </div>
  );
};

export default CreatorControlDetails;
