import { Navigation } from "@repo/ui/components/next/Navigation";
import { ILink } from "@repo/ui/types/link";

const links: ILink[] = [
  {
    content: "Users",
    href: "/users",
  },
  {
    content: "Billing",
    href: "/billing",
  },
  {
    content: "Models",
    href: "/models",
  },
  {
    content: "Subscription Plans",
    href: "/plans",
  },
];

const MainNavigation = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return <Navigation isLoggedIn={isLoggedIn} links={links} />;
};

export default MainNavigation;
