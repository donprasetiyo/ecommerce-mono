import { StateCreator } from "zustand";

export enum RegistrationSteps {
  Register,
  Verification,
}

interface RegisterStatus {
  status: "IDLE" | "REGISTRING" | "ERROR" | "SUCCESS";
  message: string;
}

export interface RegistrationSlice {
  registrationStatus: RegisterStatus;
  updateRegistrationStatus: (value: RegisterStatus) => void;
}

export const registrationSlice: StateCreator<
  RegistrationSlice & RegistrationSlice,
  [],
  [],
  RegistrationSlice
> = (set) => ({
  registrationStatus: {
    status: "IDLE",
    message: "",
  },
  updateRegistrationStatus: (value) => set({ registrationStatus: value }),
});
