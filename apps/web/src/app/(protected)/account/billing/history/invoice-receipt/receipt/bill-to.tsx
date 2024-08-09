import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { ReceiptSchema } from "../../data/schema";

const styles = StyleSheet.create({
  boxContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
    flexDirection: "row",
    fontSize: 10,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica",
  },
  seller: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  sellerContainer: {
    marginRight: 40,
  },
});

const BillTo = ({
  receipt,
  seller,
}: {
  receipt: ReceiptSchema;
  seller: any;
}) => (
  <View style={styles.boxContainer}>
    <View style={styles.sellerContainer}>
      <Text style={{ fontWeight: 600 }}>{seller.company}</Text>
      <Text>{seller.email}</Text>
    </View>
    <View>
      <Text style={styles.billTo}>Bill To:</Text>
      <Text>{receipt.receipt_customer_email}</Text>
      <Text>{receipt.receipt_customer_name}</Text>
      <Text>{receipt.receipt_customer_address_line_1}</Text>
      <Text>{receipt.receipt_customer_address_line_2}</Text>
      <Text>{receipt.receipt_customer_postal_code}</Text>
      <Text>{receipt.receipt_customer_city}</Text>
      <Text>{receipt.receipt_customer_country}</Text>
    </View>
  </View>
);

export default BillTo;
