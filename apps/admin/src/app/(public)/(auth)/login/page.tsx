import { validateRequestAdmin } from "@admin/auth/validateRequest";
import { siteconfig } from "@admin/constants/siteconfig";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { redirectToLoginIfUnauthorized, redirectToVerifyIfUnverified } from "@repo/next-lib/auth/services";

import MainLogin from "./main";

export const metadata: Metadata = {
  title: `Log in to ${siteconfig.name}`,
  description: "See and manage your generations.",
};

const Page = async () => {
  const { session, user } = await validateRequestAdmin();

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
