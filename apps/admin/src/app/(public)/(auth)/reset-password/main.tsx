"use client";

import { useState } from "react";
import { toast } from "sonner";

import { usePost } from "@repo/next-lib/fetchWrapper";

import { ResetPasswordRequestSchema } from "../schema";
import { ResetPasswordRequest } from "./request";

const RequestMain = () => {
  const [isSending, setIsSending] = useState(false);

  const successMessage =
    "If account matches our records, you will get an email with reset instructions shortly. Check your spam/junk folder if you don't see it in your inbox.";
  const resendRequest = usePost<
    ResetPasswordRequestSchema,
    { success: boolean }
  >("/api/reset-password", successMessage);

  async function resend(values: ResetPasswordRequestSchema) {
    const response = await resendRequest.mutateAsync(values);
    return response.data;
  }

  const handleResend = (values: ResetPasswordRequestSchema) => {
    setIsSending(true);
    resend(values)
      .then((data) => {
        if (data && data.success) {
          toast.success("Reset password link sent", {
            duration: 15000,
            description: ``,
          });
          setIsSending(false);
        }
      })
      .catch(() => {
        toast.error("Reset password link failed to be sent", {
          duration: 5000,
          description: `Something went wrong.`,
        });
        setIsSending(false);
      });
  };

  return (
    <>
      <ResetPasswordRequest handleResend={handleResend} isSending={isSending} />
    </>
  );
};

export default RequestMain;
