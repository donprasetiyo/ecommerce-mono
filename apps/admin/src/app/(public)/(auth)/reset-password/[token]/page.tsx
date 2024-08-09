import { Metadata } from "next";
import { redirect } from "next/navigation";
import { validateRequestAdmin } from "@admin/auth/validateRequest";

import TokenMain from "./main";

export const metadata: Metadata = {
  title: `Redirecting...`,
  description: "",
};

const ResetPasswordPage = async ({ params }: { params: { token: string } }) => {
  const { session } = await validateRequestAdmin();

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
