import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { InvoiceSchema } from "../../data/schema";

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
  invoice,
  seller,
}: {
  invoice: InvoiceSchema;
  seller: any;
}) => (
  <View style={styles.boxContainer}>
    <View style={styles.sellerContainer}>
      <Text style={{ fontWeight: 600 }}>{seller.company}</Text>
      <Text>{seller.email}</Text>
    </View>
    <View>
      <Text style={styles.billTo}>Bill To:</Text>
      <Text>{invoice.invoice_customer_email}</Text>
      <Text>{invoice.invoice_customer_name}</Text>
      <Text>{invoice.invoice_customer_address_line_1}</Text>
      <Text>{invoice.invoice_customer_address_line_2}</Text>
      <Text>{invoice.invoice_customer_postal_code}</Text>
      <Text>{invoice.invoice_customer_city}</Text>
      <Text>{invoice.invoice_customer_country}</Text>
    </View>
  </View>
);

export default BillTo;
