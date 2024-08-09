import Link from "next/link";
import { validateRequestAdmin } from "@admin/auth/validateRequest";
import MainNavigation from "@admin/components/main-nav";
import UserNavigationServer from "@admin/components/user-navigation.server";
import { siteconfig } from "@admin/constants/siteconfig";
import { BoundStoreProvider } from "@admin/store/provider";
import { GeistSans } from "geist/font";

import { ProjectLogo } from "@repo/ui/components/logo/project-logo";
import { BreadcrumbWithCusstomSeparator } from "@repo/ui/components/next/Breadcrumb";
import { ThemeProvider } from "@repo/ui/components/theme/ThemeProvider";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { cn } from "@repo/ui/lib/util";

import "./globals.css";

import Header from "./header";
import MainLayout from "./main";
import QueryProvider from "./query-provider";

import "@repo/ui/globals.css";

import { TRPCReactProvider } from "@admin/trpc/react";

import { TooltipProvider } from "@repo/ui/components/ui/tooltip";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateRequestAdmin();

  const isPublic = session === null || (user && !user.email_verified);

  return (
    <QueryProvider>
      <BoundStoreProvider>
        <html lang="en">
          <body
            className={cn(`${GeistSans.className} bg-background min-h-screen`)}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <TRPCReactProvider>
                <TooltipProvider>
                  <div className="hidden min-h-screen flex-col md:flex">
                    <Header isPublic={isPublic}>
                      <div
                        className={cn(
                          `relative flex h-12 items-center px-7`,
                          isPublic
                            ? " border-border m-auto w-[54rem] rounded-lg border p-[1.75rem_0.75rem_1.75rem_0.75rem]"
                            : "",
                        )}
                      >
                        <div className="flex flex-1 items-center justify-start">
                          <Link href={"/"} className="flex">
                            <ProjectLogo
                              className="fill-foreground"
                              width="30"
                              height="30"
                              viewBox="0 0 300 300"
                            />
                            <h1 className=" ml-[2px] text-xl font-normal">
                              {siteconfig.name}
                            </h1>
                          </Link>
                          {isPublic === false && (
                            <BreadcrumbWithCusstomSeparator className="ml-4" />
                          )}
                        </div>
                        <div className="m-auto flex w-fit items-center justify-center"></div>
                        <div className="ml-auto flex flex-1 items-center justify-end space-x-4">
                          <MainNavigation isLoggedIn={session ? true : false} />
                          <UserNavigationServer />
                        </div>
                      </div>
                    </Header>
                    <MainLayout isPublic={isPublic}>{children}</MainLayout>
                  </div>
                </TooltipProvider>
              </TRPCReactProvider>
              <Toaster richColors theme="system" />
            </ThemeProvider>
          </body>
        </html>
      </BoundStoreProvider>
    </QueryProvider>
  );
}
