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

import { PaymentItemSchema, ReceiptSchema } from "../../data/schema";
import ReceiptFile from "./file";
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

export const DownloadReceipt = ({
  receiptData,
  invoiceNumber,
  seller,
  receiptItems,
}: {
  receiptData: ReceiptSchema;
  receiptItems: PaymentItemSchema[];
  invoiceNumber: number;
  seller: any;
}) => {
  const fileName =
    `${siteconfig.name}_receipt_` + receiptData.receipt_id + ".pdf";

  return (
    <PDFDownloadLink
      document={
        <ReceiptFile
          receiptData={receiptData}
          invoiceNumber={invoiceNumber}
          seller={seller}
          receiptItems={receiptItems}
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
            <DownloadIcon size={15} className="mr-[0.2rem]" /> Receipt
          </Button>
        )
      }
    </PDFDownloadLink>
  );
};

export default MyDocument;
