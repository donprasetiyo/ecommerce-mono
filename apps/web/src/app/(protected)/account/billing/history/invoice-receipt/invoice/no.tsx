import { Fragment } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { parseDate } from "@repo/lib";

import { InvoiceSchema } from "../../data/schema";

const styles = StyleSheet.create({
  invoiceReceiptNoContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-start",
    fontSize: 10,
  },
  invoiceReceiptDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 10,
  },
  invoiceReceiptDate: {
    fontSize: 10,
    fontStyle: "bold",
  },
  label: {
    width: 90,
    fontSize: 10,
  },
});

const InvoiceReceiptNo = ({
  invoice,
  number,
}: {
  invoice: InvoiceSchema;
  number: number;
}) => (
  <Fragment>
    <View style={styles.invoiceReceiptNoContainer}>
      <Text style={styles.label}>Invoice number:</Text>
      <Text style={styles.invoiceReceiptDate}>{number}</Text>
    </View>
    <View style={styles.invoiceReceiptDateContainer}>
      <Text style={styles.label}>Issued at:</Text>
      <Text style={styles.invoiceReceiptDate}>
        {invoice.invoice_date ? parseDate(invoice.invoice_date) : ""}
      </Text>
    </View>
    <View style={styles.invoiceReceiptDateContainer}>
      <Text style={styles.label}>Due at: </Text>
      <Text>
        {invoice.invoice_due_date ? parseDate(invoice.invoice_due_date) : ""}
      </Text>
    </View>
    <View style={styles.invoiceReceiptDateContainer}>
      <Text style={styles.label}>Payment method: </Text>
      <Text>{invoice.invoice_payment_method}</Text>
    </View>
  </Fragment>
);

export default InvoiceReceiptNo;
