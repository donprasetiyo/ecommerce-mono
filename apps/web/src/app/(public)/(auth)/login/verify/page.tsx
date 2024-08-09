import { Metadata } from "next";
import { redirect } from "next/navigation";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import VerifyMain from "./main";

export const metadata: Metadata = {
  title: `Verify your account`,
  description: "Verify your account.",
};

const VerifyPage = async () => {
  const { session, user } = await validateRequestRegular();

  if (user && user.email_verified) {
    redirect("/");
  } else if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-card text-card-foreground m-auto max-w-sm rounded-lg border shadow-sm">
      <VerifyMain />
    </div>
  );
};

export default VerifyPage;
