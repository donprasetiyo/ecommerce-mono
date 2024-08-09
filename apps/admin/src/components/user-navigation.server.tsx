import { postgresClient } from "@repo/database";
import { UserNavigation } from "@repo/ui/components/next/UserNavigation";

import "server-only";

import { validateRequestAdmin } from "@admin/auth/validateRequest";

import MiniAuthMenu from "./mini-auth-menu";

const UserNavigationServer = async () => {

  const { session, user } = await validateRequestAdmin();

  if (user && user.email_verified === false) {
    return <></>;
  }

  if (!session) {
    return <MiniAuthMenu />;
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
