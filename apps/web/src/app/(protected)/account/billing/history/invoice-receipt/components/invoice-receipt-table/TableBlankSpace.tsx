import { Fragment } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    color: "white",
    fontSize: 10,
  },
  description: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize: 10,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize: 10,
  },
  rate: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize: 10,
  },
  amount: {
    width: "15%",
    fontSize: 10,
  },
});

const InvoiceReceiptTableBlankSpace = ({ rowsCount }: any) => {
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((x, i) => (
    <View style={styles.row} key={`BR${i}`}>
      <Text style={styles.description}>-</Text>
      <Text style={styles.qty}>-</Text>
      <Text style={styles.rate}>-</Text>
      <Text style={styles.amount}>-</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceReceiptTableBlankSpace;
