import NewMatchForm from "@/app/components/forms/new-match-form";
import Header from "@/app/components/header/header";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { Match } from "@/types/data-types";
import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { FaLink } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

const page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <div>
      <Header />
      <NewMatchForm />
    </div>
  );
};

export default page;
