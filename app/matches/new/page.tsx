import NewMatchForm from "@/app/components/forms/new-match-form";
import Header from "@/app/components/header/header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
