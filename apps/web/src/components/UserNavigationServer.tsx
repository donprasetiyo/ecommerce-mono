
import "server-only";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";
import { UserNavigation } from "@repo/ui/components/next/UserNavigation";

import MiniAuthMenu from "./MiniAuthMenu";

const UserNavigationServer = async () => {
  const { session, user } = await validateRequestRegular();

  if (user && user.email_verified === false) {
    return <></>;
  }

  if (!session) {
    return  <MiniAuthMenu />
  }

  return <UserNavigation user={user} session={session} />;
};

export default UserNavigationServer;
