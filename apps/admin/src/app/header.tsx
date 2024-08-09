"use client";

import { usePathname } from "next/navigation";

import { cn } from "@repo/ui/lib/util";

const Header = ({
  isPublic,
  children,
}: {
  isPublic: boolean;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const isChat = pathname.startsWith("/chat");

  return (
    <header
      className={cn(
        `border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 top-0 z-50 w-full border-b backdrop-blur`,
        isPublic ? "sticky mt-4 border-none" : "",
        isChat ? "absolute" : "",
      )}
    >
      {children}
    </header>
  );
};

export default Header;
