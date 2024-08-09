import { Fragment } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import currency from "currency.js";

import { PaymentItemSchema } from "../../../data/schema";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    fontSize: 10,
  },
  description: {
    width: "60%",
    textAlign: "left",
    fontSize: 10,
  },
  qty: {
    width: "10%",
    fontSize: 10,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    fontSize: 10,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    fontSize: 10,
  },
});

const InvoiceReceiptTableRow = ({ items }: { items: PaymentItemSchema[] }) => {
  const rows = items.map(
    (item, i) =>
      item.quantity &&
      item.unit_price && (
        <View style={styles.row} key={i}>
          <Text style={styles.description}>{item.name}</Text>
          <Text style={styles.qty}>{item.quantity}</Text>
          <Text style={styles.rate}>
            {currency(item.unit_price).format({
              negativePattern: `-!#`,
            })}
          </Text>
          <Text style={styles.amount}>
            {currency(item.quantity).multiply(item.unit_price).format({
              negativePattern: `-!#`,
            })}
          </Text>
        </View>
      ),
  );
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceReceiptTableRow;
