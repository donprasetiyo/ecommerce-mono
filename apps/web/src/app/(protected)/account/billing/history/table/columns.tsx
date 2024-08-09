"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import currency from "currency.js";
import {
  AlertCircle,
  CalendarIcon,
  CircleSlash2,
  DollarSign,
  ExternalLink,
} from "lucide-react";

import { siteconfig } from "@repo/business-config";
import { parseDate, PickStartsWith } from "@repo/lib";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { buttonVariants } from "@repo/ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { cn } from "@repo/ui/lib/util";

import { statuses } from "../data/data";
import { BillingHistory } from "../data/schema";
import { DownloadReceipt } from "../invoice-receipt/receipt/download";
import { DownloadInvoice } from "./../invoice-receipt/invoice/download";
import { DataTableColumnHeader } from "./column-header";

export const columns: ColumnDef<BillingHistory>[] = [
  {
    accessorKey: "invoice_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("invoice_number")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoiceitem_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          {/* {label && <Badge variant="outline" className="border-border">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("invoiceitem_name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "transaction_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("transaction_status"),
      );

      if (!status) {
        return null;
      }

      const isPending = status.label === "Pending";

      return (
        <>
          {isPending ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`border-border flex items-center border-b border-dashed`}
                  >
                    {status.icon && (
                      <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
                    )}
                    <span>{status.label}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[500px] bg-transparent">
                  <Alert
                    variant="default"
                    className="bg-popover border-border p-4"
                  >
                    <AlertCircle className="h-5 w-5" size={100} />
                    <AlertTitle>Your payment is pending</AlertTitle>
                    <AlertDescription>
                      <p>
                        If you have paid your payment and think it&apos;s a
                        delay on our side, please wait every few minutes until
                        your payment status becomes &quot;Paid&quot;. Contact us
                        if the status is still pending.
                      </p>
                      <p className="mt-4">
                        If you haven&apos;t paid, please click the payment link
                        on the same row to pay.
                      </p>
                    </AlertDescription>
                  </Alert>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className={`flex items-center`}>
              {status.icon && (
                <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
              )}

              <span>{status.label}</span>
            </div>
          )}
        </>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "transaction_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const transactionAmount = currency(
        row.getValue("transaction_amount"),
      ).toString();

      return (
        <div className="flex items-center">
          <DollarSign className="text-muted-foreground h-4 w-4" />
          <span>{transactionAmount}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "transaction_created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center">
          <CalendarIcon className="text-muted-foreground mr-2 h-4 w-4" />
          <span className="overflow-hidden whitespace-nowrap">
            {parseDate(row.getValue("transaction_created_at") as string, true)}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "receiptdownload",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Receipt" />
    ),
    cell: ({ row, cell }) => {
      const receipt: PickStartsWith<BillingHistory, "receipt"> = Object.entries(
        row.original,
      )
        .filter(([key, value]) => key.startsWith("receipt"))
        .reduce((acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      const invoiceNumber = row.getValue("invoice_number");

      if (!receipt.receipt_public_id) {
        return (
          <div className="m-auto flex w-fit items-center">
            <CircleSlash2 className="text-muted-foreground mr-2 h-4 w-4" />
          </div>
        );
      }

      console.log("payment method client", receipt.receipt_payment_method);

      const seller = {
        company: `${siteconfig.name}`,
        email: `${siteconfig.companyInfo.email}`,
      };

      return (
        <div className="flex w-fit items-center">
          <DownloadReceipt
            receiptData={receipt}
            invoiceNumber={parseInt(invoiceNumber as string)}
            receiptItems={receipt.receiptitems}
            seller={seller}
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "invoicedownload",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice" />
    ),
    cell: ({ row, cell }) => {
      const invoice: PickStartsWith<BillingHistory, "invoice"> = Object.entries(
        row.original,
      )
        .filter(([key, value]) => key.startsWith("invoice"))
        .reduce((acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      const invoiceNumber = row.getValue("invoice_number");

      if (!invoice.invoice_public_id) {
        return (
          <div className="m-auto flex w-fit items-center">
            <CircleSlash2 className="text-muted-foreground mr-2 h-4 w-4" />
          </div>
        );
      }

      const seller = {
        company: `${siteconfig.name}`,
        email: `${siteconfig.companyInfo.email}`,
      };

      return (
        <div className="flex w-fit items-center">
          <DownloadInvoice
            invoiceData={invoice}
            invoiceNumber={parseInt(invoiceNumber as string)}
            invoiceItems={invoice.invoiceitems}
            seller={seller}
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "paymentlink",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Link" />
    ),
    cell: ({ row, cell }) => {
      const invoice: PickStartsWith<BillingHistory, "invoice"> = Object.entries(
        row.original,
      )
        .filter(([key, value]) => key.startsWith("invoice"))
        .reduce((acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      const link = invoice.invoice_payment_link;

      if (!link) {
        return (
          <div className="m-auto flex w-fit items-center">
            <CircleSlash2 className="text-muted-foreground mr-2 h-4 w-4" />
          </div>
        );
      }

      return (
        <div className="m-auto flex w-fit items-center">
          <Link
            className={cn(
              "!text-sm",
              buttonVariants({ variant: "ghost", size: "xs" }),
            )}
            href={link}
            target="_blank"
          >
            <ExternalLink size={15} className="mr-[0.2rem]" />
            Link
          </Link>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }
];
