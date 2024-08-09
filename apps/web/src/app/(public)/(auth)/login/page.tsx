import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import { redirectToLoginIfUnauthorized, redirectToVerifyIfUnverified } from "@repo/next-lib/auth/services";

import MainLogin from "./main";
import { siteconfig } from "~/src/constants/siteconfig";

export const metadata: Metadata = {
  title: `Log in to ${siteconfig.name}`,
  description: "See and manage your generations.",
};

const Page = async () => {
  const { session, user } = await validateRequestRegular();

  const next = cookies().get("next");

  if (user && !user.email_verified) {
    return redirectToVerifyIfUnverified("/");
  }

  if (session) return redirect("/");

  return (
    <>
      <div className="bg-card text-card-foreground m-auto max-w-sm rounded-lg border shadow-sm">
        <MainLogin />
      </div>
    </>
  );
};

export default Page;
