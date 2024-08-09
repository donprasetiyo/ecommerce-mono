import { Document, Page, StyleSheet } from "@react-pdf/renderer";

import { PaymentItemSchema, ReceiptSchema } from "../../data/schema";
import ReceiptTitle from "./../components/invoice-receipt-header/title";
import ReceiptItemsTable from "./../components/invoice-receipt-table/TableItem";
import BillTo from "./bill-to";
import ReceiptNo from "./ReceiptNo";

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

const ReceiptFile = ({
  receiptData,
  seller,
  invoiceNumber,
  receiptItems,
}: {
  receiptData: ReceiptSchema;
  receiptItems: PaymentItemSchema[];
  seller: any;
  invoiceNumber: number;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ReceiptTitle title={"Receipt"} />
        <ReceiptNo receipt={receiptData} invoiceNumber={invoiceNumber} />
        <BillTo receipt={receiptData} seller={seller} />
        <ReceiptItemsTable invoiceReceipt={receiptItems} />
      </Page>
    </Document>
  );
};

export default ReceiptFile;
