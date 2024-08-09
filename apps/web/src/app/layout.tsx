import Link from "next/link";
import { BoundStoreProvider } from "@web/store/provider";
import { GeistSans } from "geist/font";

import { ProjectLogo } from "@repo/ui/components/logo/project-logo";
import { BreadcrumbWithCusstomSeparator } from "@repo/ui/components/next/Breadcrumb";
import { ThemeProvider } from "@repo/ui/components/theme/ThemeProvider";
import { Toaster } from "@repo/ui/components/ui/sonner";

import "./globals.css";

import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import Header from "./header";
import MainLayout from "./main";
import QueryProvider from "./query-provider";

import "@repo/ui/globals.css";

import Navigation from "@web/components/MainNavigation";
import UserNavigationServer from "@web/components/UserNavigationServer";

import { siteconfig } from "@repo/business-config";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { cn } from "@repo/ui/lib/util";

import { MobileNav } from "../components/mobile-nav";
import { TRPCReactProvider } from "../trpc/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateRequestRegular();

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
                  <div className="min-h-screen flex-col md:flex">
                    <Header isPublic={isPublic}>
                      <div
                        className={cn(
                          `relative flex h-12 items-center px-7`,
                          isPublic
                            ? " border-border bg-background/95 supports-[backdrop-filter]:bg-background/20 m-auto mt-0 w-full rounded-none border-b p-[1.75rem_0.75rem_1.75rem_0.75rem] backdrop-blur lg:mt-4 lg:w-[54rem] lg:rounded-lg lg:border"
                            : "",
                        )}
                      >
                        <div className="flex flex-1 items-center justify-start">
                          <Link href={"/"} className="flex">
                            {/* <Image className='fill-foreground' src={logo} alt='logo' width={40} height={40}></Image> */}
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
                        <div className="m-auto flex w-fit items-center justify-center">
                        </div>
                        <div className="ml-auto flex flex-1 items-center justify-end space-x-4">
                          <Navigation isLoggedIn={session ? true : false} />
                          <UserNavigationServer />
                        </div>
                      </div>
                    </Header>
                    <MainLayout isPublic={isPublic}>{children}</MainLayout>
                  </div>
                  <Toaster richColors theme="system" />
                </TooltipProvider>
              </TRPCReactProvider>
            </ThemeProvider>
          </body>
        </html>
      </BoundStoreProvider>
    </QueryProvider>
  );
}
