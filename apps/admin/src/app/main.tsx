"use client";

import { usePathname } from "next/navigation";

import { cn } from "@repo/ui/lib/util";

const MainLayout = ({
  isPublic,
  children,
}: {
  isPublic: boolean;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const isChat = pathname.startsWith("/chat");

  return (
    <main
      className={cn(
        isPublic === false && isChat === false
          ? `flex-1 space-y-4 px-7 py-7`
          : "",
        isPublic ? "flex flex-1 flex-col space-y-4 p-8" : "",
        isChat ? "" : "",
      )}
    >
      {children}
    </main>
  );
};

export default MainLayout;
