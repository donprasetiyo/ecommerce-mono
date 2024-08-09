
import { Navigation } from "@repo/ui/components/next/Navigation";

const MainNavigation = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const links = [
    {
      href: "/",
      content: "Dashboard",
    },
    {
      href: "/chat",
      content: "Chat",
    },
    {
      href: "/pricing",
      content: "Pricing",
    },
  ];
  return <Navigation isLoggedIn={isLoggedIn} links={links} />;
};

export default MainNavigation;
