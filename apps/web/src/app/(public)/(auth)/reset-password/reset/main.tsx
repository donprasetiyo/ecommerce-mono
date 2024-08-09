"use client";

import { useState } from "react";
import { toast } from "sonner";

import { usePost } from "@repo/next-lib/fetchWrapper";
import { redirectToClientSide } from "@repo/next-lib/redirectToNext";

import { ResetPasswordSchema } from "../../schema";
import { Reset } from "./reset";

const ResetMain = ({ token }: { token: string }) => {
  const [isResetting, setIsResetting] = useState(false);

  const resetRequest = usePost<ResetPasswordSchema, { success: boolean }>(
    "/api/reset-password/reset",
  );

  async function reset(values: ResetPasswordSchema) {
    const response = await resetRequest.mutateAsync(values);
    return response.data;
  }

  const handleContinue = (data: ResetPasswordSchema) => {
    setIsResetting(true);
    reset(data as ResetPasswordSchema)
      .then((data) => {
        if (data && data.success) {
          toast.success("Reset password success", {
            duration: 5000,
            description: `You can log in with your new password.`,
          });
          setIsResetting(false);
          redirectToClientSide("/login");
        }
      })
      .catch(() => {
        toast.error("Reset password failed", {
          duration: 5000,
          description: `Something went wrong when resetting your password.`,
        });
        setIsResetting(false);
      });
  };

  return <Reset handleContinue={handleContinue} isResetting={isResetting} />;
};

export default ResetMain;
