import { Fragment } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { parseDate } from "@repo/lib";

import { ReceiptSchema } from "../../data/schema";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-start",
    fontSize: 10,
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 10,
  },
  invoiceDate: {
    fontSize: 10,
    fontStyle: "bold",
  },
  label: {
    width: 90,
    fontSize: 10,
  },
});

const ReceiptNo = ({
  receipt,
  invoiceNumber,
}: {
  receipt: ReceiptSchema;
  invoiceNumber: number;
}) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice number:</Text>
      <Text style={styles.invoiceDate}>{invoiceNumber}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Receipt number:</Text>
      <Text style={styles.invoiceDate}>{receipt.receipt_number}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date paid: </Text>
      <Text>
        {receipt.receipt_paid_at ? parseDate(receipt.receipt_paid_at) : ""}
      </Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Payment method: </Text>
      <Text>{receipt.receipt_payment_method}</Text>
    </View>
  </Fragment>
);

export default ReceiptNo;
