import { LoginSlice, loginSlice } from "@web/app/(public)/(auth)/login/slice";
import {
  RegistrationSlice,
  registrationSlice,
} from "@web/app/(public)/(auth)/register/slice";
import { useContext } from "react";
import { useStore } from "zustand";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { BoundStoreContext } from "./provider";

export interface BoundStore
  extends RegistrationSlice,
    LoginSlice {}

export const createBoundStore = () =>
  {
    return createStore<BoundStore>()(
      persist(
        (...a) =>
          ({
            ...registrationSlice(
              //@ts-ignore
              ...a,
            ),
            ...loginSlice(
              //@ts-ignore
              ...a,
            ),
          }) satisfies BoundStore,
        {
          skipHydration: true, // do not rehydrate this store after a full page load, we will rehydrate it manually,
          name: "persistSlice",
          partialize: (s) => ({
          }),
        },
        // )
      ),
    );
  };

export const useBoundStore = <T>(
  selector: (store: BoundStore) => T,
): [T, ReturnType<typeof createBoundStore>] => {
  const mainStoreContext = useContext(BoundStoreContext);

  if (!mainStoreContext) {
    throw new Error(`useBoundStore must be use within MainStoreProvider`);
  }

  return [useStore(mainStoreContext, selector), mainStoreContext];
};
