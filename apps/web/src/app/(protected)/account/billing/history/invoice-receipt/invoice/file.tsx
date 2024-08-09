import { Document, Page, StyleSheet } from "@react-pdf/renderer";

import { InvoiceSchema, PaymentItemSchema } from "../../data/schema";
import InvoiceReceiptTitle from "../components/invoice-receipt-header/title";
import InvoiceReceiptItemsTable from "../components/invoice-receipt-table/TableItem";
import BillTo from "./bill-to";
import InvoiceReceiptNo from "./no";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const InvoiceReceiptFile = ({
  invoiceData,
  seller,
  number,
  invoiceItems,
}: {
  invoiceData: InvoiceSchema;
  seller: any;
  number: number;
  invoiceItems: PaymentItemSchema[];
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceReceiptTitle title={"Invoice"} />
        <InvoiceReceiptNo invoice={invoiceData} number={number} />
        <BillTo invoice={invoiceData} seller={seller} />
        <InvoiceReceiptItemsTable invoiceReceipt={invoiceItems} />
      </Page>
    </Document>
  );
};

export default InvoiceReceiptFile;
