"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@repo/ui/components/ui/button";

const MiniAuthMenu = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);

  function redirectToSignIn(number: number) {
    if (number === 2) {
      setIsLoading2(true);
      setIsLoading(false);
      router.push("/register");
    } else {
      setIsLoading(true);
      setIsLoading2(false);
      router.push("/login");
    }
  }

  const pathname = usePathname();

  useEffect(() => {
    setIsLoading2(false);
    setIsLoading(false);
  }, [pathname]);

  return (
    <div className="flex items-center">
      {pathname !== "/login" ? (
        <Button
          size={"sm"}
          variant={"default"}
          className="mr-2"
          disabled={isLoading}
          onClick={() => redirectToSignIn(1)}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Log In
        </Button>
      ) : null}
      {pathname !== "/register" ? (
        <Button
          size={"sm"}
          variant={"secondary"}
          disabled={isLoading2}
          onClick={() => redirectToSignIn(2)}
        >
          {isLoading2 ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Sign Up
        </Button>
      ) : null}
    </div>
  );
};

export default MiniAuthMenu;
