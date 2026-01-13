import { MatchWithTeams } from "@/types/extended-data-types";
import SummaryDetail from "./summary-detail";

export interface SummaryDetailsInterface {
  title: string;
  data: string;
  copyEnabled?: boolean;
  isLink?: boolean;
  link?: string;
}
const SummaryDetails = ({ completeData }: { completeData: MatchWithTeams }) => {
  const summaryDetails: SummaryDetailsInterface[] = [
    { title: "Match Name", data: completeData.name || "" },
    {
      title: "Match Code",
      data: completeData.match_code || "",
      copyEnabled: true,
    },
    {
      title: "Match Date",
      data: completeData.match_date
        ? new Date(completeData.match_date).toLocaleString()
        : "no match date specified",
    },
    {
      title: "Location",
      data: completeData.location_name || "",
      isLink:
        completeData.location_link != null &&
        completeData.location_link?.trim()?.length > 0,
      link: completeData.location_link?.trim(),
    },
    // { title: "Status", data: completeData. },
    {
      title: "Score",
      data: `${completeData.teams[0].score || "0"} - ${
        completeData.teams[1].score || "0"
      }`,
    },
    { title: "Size", data: `${completeData.team_size || "not specified"}` },
  ];
  return (
    <div className="flow-root">
      <dl className="-my-3 divide-y divide-gray-200 text-sm *:even:bg-gray-50">
        {summaryDetails.map((summaryDetail) => (
          <SummaryDetail
            key={summaryDetail.title}
            title={summaryDetail.title}
            data={summaryDetail.data || ""}
            copyEnabled={summaryDetail.copyEnabled}
            isLink={summaryDetail.isLink}
            link={summaryDetail.link}
          />
        ))}
      </dl>
    </div>
  );
};

export default SummaryDetails;
