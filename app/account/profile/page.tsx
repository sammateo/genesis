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
      <div className="w-full min-h-7/12 flex flex-col gap-12 items-center justify-center">
        <img
          className="rounded-full w-32"
          src={session.user.image || ""}
          alt={session.user.name || "profile photo"}
        />
        <p className="text-2xl font-medium">{session.user.name}</p>
      </div>
    </div>
  );
};

export default page;
