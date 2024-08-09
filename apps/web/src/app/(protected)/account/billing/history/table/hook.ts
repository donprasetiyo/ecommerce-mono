import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useQuery } from "react-query";

import { BillingHistory } from "../data/schema";

export interface BillignHistoryGetProps {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  initialData: BillingHistory[];
}

export const useGetBillingHistory = ({
  sorting,
  columnFilters,
  pagination,
  setTotal,
  initialData,
}: BillignHistoryGetProps) => {
  const limit = pagination.pageSize;
  const offset = pagination.pageIndex * pagination.pageSize;
  const sortBy =
    sorting.length > 0 && sorting[0]
      ? `${sorting[0].id} ${sorting[0].desc ? "desc" : "asc"}`
      : "transaction_updated_at desc";

  const { data: billingHistoryData, isFetching: isBillingHistoryLoading } =
    useQuery({
      queryKey: ["billinghistory", sorting, columnFilters, pagination],
      queryFn: async () => {
        const response = await fetch(
          `/api/billing-history?limit=${limit}&offset=${offset}&sortBy=${sortBy}`,
        );

        const data = await response.json();

        setTotal(data.billingHistory.total);

        return data.billingHistory.results;
      },
      initialData: initialData,
      refetchOnWindowFocus: false,
      // staleTime: 1000
    });

  return { billingHistoryData, isBillingHistoryLoading };
};
