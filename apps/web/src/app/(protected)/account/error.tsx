"use client";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-fit items-center space-x-4 rounded-md border p-4">
      <AlertCircle size={60} />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Something went wrong</p>
        <p className="text-muted-foreground text-sm">
          Please try again within a few minutes.
        </p>
      </div>
      <Button
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
