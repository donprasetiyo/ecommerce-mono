import { Metadata } from "next";
import { redirect } from "next/navigation";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import TokenMain from "./main";

export const metadata: Metadata = {
  title: `Redirecting...`,
  description: "",
};

const ResetPasswordPage = async ({ params }: { params: { token: string } }) => {
  const { session } = await validateRequestRegular();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="bg-card text-card-foreground m-auto max-w-sm rounded-lg border shadow-sm">
      <TokenMain token={params.token} />
    </div>
  );
};

export default ResetPasswordPage;
