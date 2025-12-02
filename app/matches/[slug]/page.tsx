import Header from "@/app/components/header/header";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { Match } from "@/types/data-types";
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
  const match = data as Match;
  return (
    <div>
      <Header />
      <h2>Match: {match.name}</h2>
    </div>
  );
};

export default page;
