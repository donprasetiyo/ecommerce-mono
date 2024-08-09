"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/util";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    isComingSoon?: boolean;
    hasTabs?: boolean;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  function isCurrentSidebarTab(item: any) {
    if (item.hasTabs) {
      return pathname.startsWith(item.href);
    } else {
      return pathname === item.href;
    }
  }

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item, index) =>
        !item.isComingSoon ? (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isCurrentSidebarTab(item)
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start",
            )}
          >
            {item.title}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "cursor-default justify-start",
              "text-gray-500 hover:bg-transparent hover:text-gray-500",
            )}
          >
            {item.title}
            <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
              Coming Soon
            </span>
          </span>
        ),
      )}
    </nav>
  );
}
