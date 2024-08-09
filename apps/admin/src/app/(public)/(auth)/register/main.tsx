"use client";

import { useEffect } from "react";
import { useBoundStore } from "@admin/store/store";
import { nanoid } from "nanoid";
import { toast } from "sonner";

import { usePost } from "@repo/next-lib/fetchWrapper";
import { redirectToClientSide } from "@repo/next-lib/redirectToNext";

import { LoginResponse } from "../login/types";
import { RegisterSchema } from "../schema";
import { Register } from "./steps/register";

const MainRegister = () => {
  const [
    [registrationStatus, updateRegistrationStatus, updateLoginResponse],
    boundStore,
  ] = useBoundStore((state) => [
    state.registrationStatus,
    state.updateRegistrationStatus,
    state.updateLoginResponse,
  ]);

  useEffect(() => {
    boundStore.persist.rehydrate();
  }, [boundStore.persist]);

  const registerRequest = usePost<RegisterSchema, LoginResponse>(
    "/api/register",
  );

  async function register(values: RegisterSchema) {
    const response = await registerRequest.mutateAsync(values);
    return response.data;
  }

  const toastId = nanoid();

  const handleContinue = (data: RegisterSchema) => {
    updateRegistrationStatus({
      status: "REGISTRING",
      message: "",
    });
    register(data)
      .then((data) => {
        if (data && data.success) {
          updateLoginResponse(data);
          updateRegistrationStatus({
            status: "SUCCESS",
            message: "",
          });
          redirectToClientSide("/login");
        }
      })
      .catch(() => {
        updateRegistrationStatus({
          status: "ERROR",
          message: "",
        });
        toast.error("Registeration failed", {
          id: toastId,
          duration: 5000,
          description: `Check the data you have submitted.`,
        });
      });
  };

  return (
    <>
      <Register handleContinue={handleContinue} />
    </>
  );
};

export default MainRegister;
