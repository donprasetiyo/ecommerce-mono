import { Metadata } from "next";
import { redirect } from "next/navigation";
import { validateRequestAdmin } from "@admin/auth/validateRequest";
import { siteconfig } from "@admin/constants/siteconfig";

import RequestMain from "./main";

export const metadata: Metadata = {
  title: `Reset password | ${siteconfig.name}`,
  description: "Forgot your password?",
};

const RequestPage = async () => {
  const { session } = await validateRequestAdmin();

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <div className="bg-card text-card-foreground m-auto max-w-sm rounded-lg border shadow-sm">
        <RequestMain />
      </div>
    </>
  );
};

export default RequestPage;
