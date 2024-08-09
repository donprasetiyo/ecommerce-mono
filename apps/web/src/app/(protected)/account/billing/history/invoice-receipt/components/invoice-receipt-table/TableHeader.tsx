import { StyleSheet, Text, View } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "left",
    fontStyle: "bold",
    flexGrow: 1,
    fontSize: 10,
  },
  description: {
    width: "60%",
    fontSize: 10,
    // borderRightColor: borderColor,
    // borderRightWidth: 1
  },
  qty: {
    width: "10%",
    fontSize: 10,
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "right",
  },
  rate: {
    width: "15%",
    fontSize: 10,
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "right",
  },
  amount: {
    width: "15%",
    textAlign: "right",
    fontSize: 10,
  },
});

const InvoiceReceiptTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Item Description</Text>
    <Text style={styles.qty}>Qty</Text>
    <Text style={styles.rate}>Unit price</Text>
    <Text style={styles.amount}>Amount</Text>
  </View>
);

export default InvoiceReceiptTableHeader;
