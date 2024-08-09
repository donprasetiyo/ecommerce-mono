"use client";

import Link from "next/link";

import { buttonVariants } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/util";

export const Invalid = () => {
  return (
    <div className="bg-card text-card-foreground m-auto max-w-sm rounded-lg border shadow-sm">
      <Card className="border-border bg-background mx-auto max-w-sm">
        <CardHeader className="">
          <CardTitle className="text-center text-xl">
            Invalid reset password link
          </CardTitle>
          <CardDescription className="text-muted-foreground !mt-4 flex flex-col items-center justify-center text-center text-sm">
            <span>Try clicking the link from your email again.</span>
            <span className="mt-2">
              If the link clicked does not work anymore, it may be expired. In
              that case, you have to request a new reset password link again.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            className={cn(buttonVariants(), "w-full")}
            href={"/reset-password"}
          >
            Request a new link
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
