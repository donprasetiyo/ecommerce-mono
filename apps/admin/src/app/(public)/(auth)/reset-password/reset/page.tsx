import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { siteconfig } from "@admin/constants/siteconfig";

import { postgresClient } from "@repo/database";

import { Invalid } from "./invalid";
import ResetMain from "./main";

export const metadata: Metadata = {
  title: `Reset password | ${siteconfig.name}`,
  description: "Forgot your password?",
};

const ResetPage = async () => {
  const reset_token = cookies().get("reset_token");

  if (!reset_token) {
    return <Invalid />;
  }

  const url = `${process.env.ADMIN_BASE_URL}/reset-password/${reset_token.value}`;
  const referer = headers().get("Referer");

  if (!reset_token || reset_token.value.trim() === "" || url !== referer) {
    return <Invalid />;
  }

  const token = await postgresClient.getResetPasswordToken(reset_token.value);

  if (!token) {
    return <Invalid />;
  }

  return (
    <div className="bg-card text-card-foreground m-auto max-w-sm rounded-lg border shadow-sm">
      <ResetMain token={reset_token.value} />
    </div>
  );
};

export default ResetPage;
