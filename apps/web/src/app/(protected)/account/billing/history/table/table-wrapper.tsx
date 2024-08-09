"use client";

import { useMemo, useState } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

import { Skeleton } from "@repo/ui/components/ui/skeleton";

import { BillingHistory } from "../data/schema";
import { columns } from "./columns";
import { useGetBillingHistory } from "./hook";
import { DataTable } from "./table";

const TableWrapper = ({
  initialData,
  initialTotal,
}: {
  initialData: BillingHistory[];
  initialTotal: number;
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size,
  });

  const [total, setTotal] = useState(initialTotal);

  const { billingHistoryData, isBillingHistoryLoading } = useGetBillingHistory({
    initialData,
    sorting,
    columnFilters,
    pagination,
    setTotal,
  });

  const rowCountInCurrentPage = parseInt(
    pagination.pageIndex + 1 === Math.ceil(total / pagination.pageSize)
      ? total > pagination.pageSize
        ? total - pagination.pageSize
        : total
      : (pagination.pageSize as any),
  ); //somehow this calculated number becomes string if i use change filter status

  const tableData = useMemo(
    () =>
      isBillingHistoryLoading
        ? Array(rowCountInCurrentPage).fill({})
        : billingHistoryData,
    [isBillingHistoryLoading, rowCountInCurrentPage, billingHistoryData],
  );

  const tableColumns = useMemo(
    () =>
      isBillingHistoryLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => (
              <Skeleton
                isOn={true}
                className="left-3 top-[39px] h-[21.5px] w-[60%] rounded-sm"
              />
            ),
          }))
        : columns,
    [isBillingHistoryLoading],
  );

  return (
    <DataTable
      currentPageTotal={rowCountInCurrentPage}
      disabledDuringLoading={isBillingHistoryLoading}
      data={tableData}
      columns={tableColumns}
      sorting={sorting}
      setSorting={setSorting}
      setColumnFilters={setColumnFilters}
      columnFilters={columnFilters}
      pagination={pagination}
      setPagination={setPagination}
      setTotal={setTotal}
      total={total}
    />
  );
};

export default TableWrapper;
