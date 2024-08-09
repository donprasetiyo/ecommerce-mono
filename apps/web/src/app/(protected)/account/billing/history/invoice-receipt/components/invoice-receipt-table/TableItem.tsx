import { StyleSheet, View } from "@react-pdf/renderer";

import { PaymentItemSchema } from "../../../data/schema";
import InvoiceReceiptTableFooter from "./TableFooter";
import InvoiceReceiptTableHeader from "./TableHeader";
import InvoiceReceiptTableRow from "./TableRow";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    fontSize: 10,
  },
});

const InvoiceReceiptItemsTable = ({
  invoiceReceipt,
}: {
  invoiceReceipt: PaymentItemSchema[];
}) => {
  return (
    <View style={styles.tableContainer}>
      <InvoiceReceiptTableHeader />
      <InvoiceReceiptTableRow items={invoiceReceipt} />
      {/* <InvoiceReceiptTableBlankSpace rowsCount={ tableRowsCount - invoiceReceipt.items.length} /> */}
      <InvoiceReceiptTableFooter items={invoiceReceipt} />
    </View>
  );
};

export default InvoiceReceiptItemsTable;
