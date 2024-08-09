"use client";

import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { DownloadIcon } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";

import { InvoiceSchema, PaymentItemSchema } from "../../data/schema";
import InvoiceReceiptFile from "./file";
import { siteconfig } from "~/src/constants/siteconfig";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <div className="h-[200px] w-[300px] bg-white"></div>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export const DownloadInvoice = ({
  invoiceData,
  invoiceNumber,
  seller,
  invoiceItems,
}: {
  invoiceData: InvoiceSchema;
  invoiceNumber: number;
  seller: any;
  invoiceItems: PaymentItemSchema[];
}) => {
  const fileName =
    `${siteconfig}_invoice_` + invoiceData.invoice_id + ".pdf";

  return (
    <PDFDownloadLink
      document={
        <InvoiceReceiptFile
          invoiceData={invoiceData}
          number={invoiceNumber}
          seller={seller}
          invoiceItems={invoiceItems}
        />
      }
      fileName={fileName}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <Button disabled size={"xs"} variant={"ghost"} className="text-sm">
            <DownloadIcon size={15} className="mr-[0.2rem]" /> Loading...
          </Button>
        ) : (
          <Button size={"xs"} variant={"ghost"} className="text-sm">
            <DownloadIcon size={15} className="mr-[0.2rem]" /> Invoice
          </Button>
        )
      }
    </PDFDownloadLink>
  );
};

export default MyDocument;
