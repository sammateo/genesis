import { auth } from "@/auth";
import React from "react";
import Header from "../components/header/header";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <div>
      <Header />
      <p>{session.user.name}</p>
    </div>
  );
};

export default page;
