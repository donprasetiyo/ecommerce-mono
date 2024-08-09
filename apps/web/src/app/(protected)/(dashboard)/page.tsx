import { Metadata } from "next";
import HomepagePublic from "@web/app/(public)/(homepage)/homepage";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import { siteconfig } from "@repo/business-config";
import { redirectToLoginIfUnauthorized, redirectToVerifyIfUnverified } from "@repo/next-lib/auth/services";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";


export async function generateMetadata(): Promise<Metadata> {
  const { user, session } = await validateRequestRegular();

  if (!session) {
    return {
      title: `${siteconfig.name} - ${siteconfig.capitalizedDescription}`,
      description: `${siteconfig.description}`,
      // openGraph: {
      //   images: ['/some-specific-page-image.jpg', ...previousImages],
      // }
    };
  }

  return {
    title: "Dashboard",
    description: "Your dashboard.",
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // }
  };
}

export default async function Dashboard(test: any) {
  const { user, session } = await validateRequestRegular();

  if (user && !user.email_verified) {
    return redirectToVerifyIfUnverified("/");
  }

  if (!session) {
    return <HomepagePublic />;
  }

  return (
   <>
   </>
  );
}
