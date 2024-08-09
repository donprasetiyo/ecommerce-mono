"use client";

import type { ReactNode } from "react";
import { createContext, useRef } from "react";

import {
  createBoundStore,
} from "./store";

export const BoundStoreContext = createContext<ReturnType<
  typeof createBoundStore
> | null>(null);

export interface BoundStoreProviderProps {
  children: ReactNode;
}

export const BoundStoreProvider = ({ children }: BoundStoreProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createBoundStore>>();
  if (!storeRef.current) {
    storeRef.current = createBoundStore();
  }

  return (
    <BoundStoreContext.Provider value={storeRef.current}>
      {children}
    </BoundStoreContext.Provider>
  );
};
