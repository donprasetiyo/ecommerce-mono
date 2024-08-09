import { StyleSheet, Text, View } from "@react-pdf/renderer";
import currency from "currency.js";

import { PaymentItemSchema } from "../../../data/schema";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    // borderTopColor: '#888',
    // borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 24,
    fontSize: 10,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    paddingRight: 70,
    fontSize: 10,
  },
  amountDue: {
    width: "85%",
    textAlign: "right",
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    paddingRight: 70,
    fontStyle: "bold",
    fontSize: 10,
  },
  total: {
    width: "20%",
    textAlign: "right",
    paddingRight: 0,
    fontSize: 10,
  },
});

const InvoiceReceiptTableFooter = ({
  items,
}: {
  items: PaymentItemSchema[];
}) => {
  const total = items
    .map((item) => {
      if (item.quantity && item.unit_price)
        return currency(item.quantity).multiply(item.unit_price).value;
    })
    .reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0,
    );
  return (
    <View style={{ display: "flex", marginTop: 30 }}>
      <View style={styles.row}>
        <Text style={styles.description}>Subtotal</Text>
        <Text style={styles.total}>{currency(total).toString()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Total</Text>
        <Text style={styles.total}>{currency(total).toString()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.amountDue}>Amount due</Text>
        <Text style={styles.total}>{currency(total).toString()} USD</Text>
      </View>
    </View>
  );
};

export default InvoiceReceiptTableFooter;
