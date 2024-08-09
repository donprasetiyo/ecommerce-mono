"use client";

import { useEffect } from "react";

import { redirectToClientSide } from "@repo/next-lib/redirectToNext";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

import { checkToken } from "./action";

const TokenMain = ({ token }: { token: string }) => {
  useEffect(() => {
    checkToken(token)
      .then()
      .catch()
      .finally(() => {
        redirectToClientSide(`/reset-password/reset`);
      });
  }, [token]);

  return (
    <Card className="border-border bg-background mx-auto max-w-sm">
      <CardHeader className="">
        <CardTitle className="text-xl">Redirecting...</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TokenMain;
