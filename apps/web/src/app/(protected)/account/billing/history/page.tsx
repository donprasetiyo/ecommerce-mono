import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import { postgresClient } from "@repo/database";
import { redirectToLoginIfUnauthorized, redirectToVerifyIfUnverified } from "@repo/next-lib/auth/services";

import { billingHistoryArraySchema } from "./data/schema";
import TableMain from "./table/table-main";

const BillingHistory = async () => {
  const { session, user } = await validateRequestRegular();

  if (user && !user.email_verified) {
    return redirectToVerifyIfUnverified("/history");
  }

  if (!session) {
    return redirectToLoginIfUnauthorized("/history");
  }

  const result = await postgresClient.getBillingHistory(
    session.userId,
    0,
    10,
    "transaction_updated_at desc",
  );
  const billingHistoryRawData = result.results;

  const total = result.total;

  const transactions = billingHistoryArraySchema.parse(billingHistoryRawData);

  return <TableMain initialData={transactions} initialTotal={total} />;
};

export default BillingHistory;
