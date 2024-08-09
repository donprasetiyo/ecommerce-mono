import { StateCreator } from "zustand";

import { LoginResponse } from "./types";

export enum LoginSteps {
  Login,
  Verification,
}

interface LoginStatus {
  status:
    | "IDLE"
    | "LOGGING_IN"
    | "ERROR"
    | "SUCCESS"
    | "VERIFYING"
    | "VERIFICATION_SUCCESS"
    | "VERIFICATION_ERROR"
    | "RESENDING"
    | "RESEND_SUCCESS"
    | "RESEND_ERROR";
  message: string;
}

export interface LoginSlice {
  loginStatus: LoginStatus;
  updateLoginStatus: (value: LoginStatus) => void;
  loginResponse: LoginResponse;
  resetLoginState: () => void;
  updateLoginResponse: (data: LoginResponse) => void;
}

export const loginSlice: StateCreator<
  LoginSlice & LoginSlice,
  [],
  [],
  LoginSlice
> = (set) => ({
  loginStatus: {
    status: "IDLE",
    message: "",
  },
  updateLoginStatus: (value) => set({ loginStatus: value }),
  loginResponse: {
    email_verified: false,
    resendToken: "",
    success: false,
  },
  updateLoginResponse: (data) => set({ loginResponse: data }),
  resetLoginState: () =>
    set({
      loginStatus: {
        status: "IDLE",
        message: "",
      },
      loginResponse: {
        email_verified: false,
        resendToken: "",
        success: false,
      },
    }),
});
