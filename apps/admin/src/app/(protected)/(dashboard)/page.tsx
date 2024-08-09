import HomepagePublic from "@admin/app/(public)/(homepage)/homepage";
import { validateRequestAdmin } from "@admin/auth/validateRequest";
import { siteconfig } from "@admin/constants/siteconfig";
import { Metadata } from "next";

import { redirectToVerifyIfUnverified } from "@repo/next-lib/auth/services";


export async function generateMetadata(): Promise<Metadata> {
  const { user, session } = await validateRequestAdmin();

  if (!session) {
    return {
      title: `${siteconfig.name} - ${siteconfig.capitalizedDescription}`,
      description: `${siteconfig.description}`
    };
  }

  return {
    title: "Dashboard",
    description: "Your dashboard."
  };
}

export default async function Dashboard() {
  const { user, session } = await validateRequestAdmin();

  if (user && !user.email_verified) {
    return redirectToVerifyIfUnverified("/");
  }

  if (!session) {
    return <HomepagePublic />;
  }

  return (
    <>
      <div className="w-full max-w-2xl overflow-y-scroll">
      </div>
    </>
  );
}
