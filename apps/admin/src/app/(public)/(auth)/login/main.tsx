"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBoundStore } from "@admin/store/store";
import { nanoid } from "nanoid";
import { toast } from "sonner";

import { usePost } from "@repo/next-lib/fetchWrapper";
import {
  redirectToClientSide,
  redirectToNextUrl,
} from "@repo/next-lib/redirectToNext";

import { LoginSchema } from "../schema";
import { Login } from "./steps/login";
import { LoginResponse } from "./types";

const MainLogin = () => {
  const [
    [updateLoginResponse, loginResponse, loginStatus, updateLoginStatus],
    boundStore,
  ] = useBoundStore((state) => [
    state.updateLoginResponse,
    state.loginResponse,
    state.loginStatus,
    state.updateLoginStatus,
  ]);

  useEffect(() => {
    boundStore.persist.rehydrate();
  }, [boundStore.persist]);

  const loginRequest = usePost<LoginSchema, LoginResponse>("/api/login");

  async function login(values: LoginSchema) {
    const response = await loginRequest.mutateAsync(values);
    return response.data;
  }

  const toastId = nanoid();

  const handleContinue = (data: LoginSchema) => {
    updateLoginStatus({
      status: "LOGGING_IN",
      message: "",
    });
    login(data as LoginSchema)
      .then((data) => {
        if (data && !data.email_verified) {
          updateLoginResponse(data);
          updateLoginStatus({
            status: "SUCCESS",
            message: "",
          });
          redirectToClientSide("/login/verify");
        } else if (data && data.success) {
          updateLoginStatus({
            status: "SUCCESS",
            message: "",
          });
          redirectToNextUrl();
        }
      })
      .catch((error) => {
        toast.error("Login failed", {
          id: toastId,
          duration: 5000,
          description: `Check the data you have submitted.`,
        });
        updateLoginStatus({
          status: "ERROR",
          message: "",
        });
      });
  };

  return (
    <>
      <Login handleContinue={handleContinue} />
    </>
  );
};

export default MainLogin;
