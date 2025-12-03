import Header from "@/app/components/header/header";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { Match, Team } from "@/types/data-types";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const { slug } = await params;
  if (!slug) {
    redirect("/matches");
  }
  const supabase = await createClient();
  let { data, error } = await supabase
    .from("match")
    .select("*")
    .eq("id", slug)
    .single();
  if (error) {
    console.error(error);
    return <div>An error occurred</div>;
  }

  let { data: teamData, error: teamError } = await supabase
    .from("team")
    .select("*")
    .eq("match_id", slug);

  if (teamError) {
    console.error(teamError);
    return <div>An error occurred</div>;
  }
  const match = data as Match;
  const teams = teamData as Team[];
  console.log(teams);
  const teamA = teams[0];
  const teamB = teams[1];
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <span className="font-semibold text-xl">{match.name}</span>
          <span className="block">Date/Score</span>
        </div>
        {/* Teams and Players */}
        <div className="grid grid-cols-2">
          <div className="">
            <div className="flex flex-col justify-start items-center gap-2">
              <span className="block rounded-full w-10 h-10 bg-white border border-gray-500"></span>
              <span className="text-xl">{teamA.name}</span>
            </div>
            <div>
              <h3>Players</h3>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col justify-start items-center gap-2">
              <span className="block rounded-full w-10 h-10 bg-gray-800 border border-gray-500"></span>
              <span>{teamB.name}</span>
            </div>
            <div>
              <h3>Players</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
