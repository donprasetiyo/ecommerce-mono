"use client";

import { BillingHistory } from "../data/schema";
import TableWrapper from "./table-wrapper";

const TableMain = ({
  initialData,
  initialTotal,
}: {
  initialData: BillingHistory[];
  initialTotal: number;
}) => {
  return <TableWrapper initialData={initialData} initialTotal={initialTotal} />;
};

export default TableMain;
