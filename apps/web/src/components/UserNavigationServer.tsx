
import "server-only";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import { postgresClient } from "@repo/database";
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

  const activeSubscriptionData = await postgresClient.getActiveSubscription(
    user.id,
  );
  const planCardData = activeSubscriptionData
    ? {
        product: activeSubscriptionData.product,
      }
    : undefined;

  return <UserNavigation user={user} session={session} plan={planCardData} />;
};

export default UserNavigationServer;
