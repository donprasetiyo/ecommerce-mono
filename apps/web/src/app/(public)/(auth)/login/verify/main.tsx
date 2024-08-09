"use client";

import { useEffect } from "react";
import { useBoundStore } from "@web/store/store";
import { toast } from "sonner";

import { siteconfig } from "@repo/business-config";
import { AuthError } from "@repo/lib";
import { usePost } from "@repo/next-lib/fetchWrapper";
import {
  redirectToClientSide,
  redirectToNextUrl,
} from "@repo/next-lib/redirectToNext";

import { EmailVerificationCodeSchema } from "../../schema";
import { VerifyAccount } from "../steps/verify";
import { LoginResponse } from "../types";

const VerifyMain = () => {
  const [
    [
      updateLoginResponse,
      loginResponse,
      loginStatus,
      updateLoginStatus,
      resetLoginState,
    ],
    boundStore,
  ] = useBoundStore((state) => [
    state.updateLoginResponse,
    state.loginResponse,
    state.loginStatus,
    state.updateLoginStatus,
    state.resetLoginState,
  ]);

  useEffect(() => {
    boundStore.persist.rehydrate();
  }, [boundStore.persist]);

  const verifyRequest = usePost<EmailVerificationCodeSchema, undefined>(
    "/api/email-verification/verify",
  );
  const resendRequest = usePost<
    Pick<LoginResponse, "resendToken">,
    Pick<
      LoginResponse,
      "email_verified" | "lastSentVerificationCode" | "success"
    >
  >("/api/email-verification/resend-code");

  async function verify(values: EmailVerificationCodeSchema) {
    const response = await verifyRequest.mutateAsync(values);
    return response.data;
  }

  const handleContinue = (data: EmailVerificationCodeSchema) => {
    updateLoginStatus({
      status: "VERIFYING",
      message: "",
    });
    verify(data as EmailVerificationCodeSchema)
      .then((data) => {
        if (data) {
          toast.success("Verification success", {
            duration: 5000,
            description: `You are now logged in to ${siteconfig.name}`,
          });
          updateLoginStatus({
            status: "VERIFICATION_SUCCESS",
            message: "Email verification success",
          });
          resetLoginState();
          redirectToNextUrl();
        }
      })
      .catch(() => {
        toast.error("Verification failed", {
          duration: 5000,
          description: `Check the verification code you have submitted.`,
        });
        updateLoginStatus({
          status: "VERIFICATION_ERROR",
          message: "Email verification failed",
        });
      });
  };

  async function resend() {
    const body: Pick<LoginResponse, "resendToken"> = {
      resendToken: loginResponse.resendToken,
    };
    const response = await resendRequest.mutateAsync(body, {
      onError: (error: any) => {
        updateLoginStatus({
          status: "RESEND_ERROR",
          message: error.error,
        });
        const errorClass = AuthError.errorMessage["RESEND_FAILED_MUST_RELOGIN"];
        if (
          errorClass &&
          error.error ===
          errorClass.message
        ) {
          redirectToClientSide("/login");
          resetLoginState();
        }
      },
    });
    return response.data;
  }

  const handleResend = () => {
    updateLoginStatus({
      status: "RESENDING",
      message: "",
    });
    resend()
      .then((data) => {
        if (data && data.success) {
          const previousResendToken = loginResponse.resendToken;
          updateLoginResponse({
            email_verified: data.email_verified,
            resendToken: previousResendToken,
            success: data.success,
            lastSentVerificationCode: data.lastSentVerificationCode,
          });
          toast.success("Resend success", {
            duration: 5000,
            description: `Check your email inbox (or spam folder) for code`,
          });
          updateLoginStatus({
            status: "RESEND_SUCCESS",
            message: "Resend success",
          });
        }
        if (data && data.success === false) {
          const previousResendToken = loginResponse.resendToken;
          updateLoginResponse({
            email_verified: data.email_verified,
            resendToken: previousResendToken,
            success: data.success,
            lastSentVerificationCode: data.lastSentVerificationCode,
          });
          toast.warning("Resend code limit", {
            duration: 5000,
            description: `We have already sent you verification code. Use recent one we sent instead of requesting a new one.`,
          });
          updateLoginStatus({
            status: "RESEND_ERROR",
            message: "Resend failed.",
          });
        }
      })
      .catch(() => {
        toast.error("Resend failed", {
          duration: 5000,
          description: `Something went wrong when sending you verification code through email.`,
        });
        updateLoginStatus({
          status: "RESEND_ERROR",
          message: "Resend failed",
        });
      });
  };

  return (
    <VerifyAccount
      handleContinue={handleContinue}
      handleResend={handleResend}
    />
  );
};

export default VerifyMain;
