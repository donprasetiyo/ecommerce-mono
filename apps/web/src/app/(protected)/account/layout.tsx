import { SidebarNav } from "@web/components/SidebarNav";
import { Metadata } from "next";

import { siteconfig } from "@repo/business-config";
import { Separator } from "@repo/ui/components/ui/separator";

export const metadata: Metadata = {
  title: `Account | ${siteconfig.name}`,
  description: `Manage your ${siteconfig.name} account.`,
};

const sidebarNavItems = [
  {
    title: "Account",
    href: "/account",
  },
  {
    title: "Billing",
    href: "/account/billing",
    hasTabs: true,
  },
  {
    title: "Usage",
    href: "/account/usage",
    isComingSoon: true,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account, billings, see usage, and more.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </>
  );
}
