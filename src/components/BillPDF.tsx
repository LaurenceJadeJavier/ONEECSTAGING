// import React from "react";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { BillData, MeterData } from "../../types/usePdfTypes";

import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Document,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";

// Register a custom font if needed
// Font.register({ family: 'CustomFont', src: 'path/to/font.ttf' });

const styles = StyleSheet.create({
  page: {
    padding: 10,
    flex: 1,
    width: "100%",
  },
  logo: {
    // width: 200,
    // height: "auto",
    // marginBottom: 40,
  },
  inlineContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  header: {
    fontSize: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    fontWeight: "medium",
  },
  addressContainer: {
    marginBottom: 15,
  },
  formContainer: {
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    margin: 0,
  },
  title: {
    fontSize: 10,
    fontWeight: "medium",
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 2,
    display: "flex",
    marginHorizontal: 10,
    flexWrap: "wrap",
  },
  label: {
    fontSize: 10,
    fontWeight: "medium",
    marginHorizontal: 2,
  },
  boldText: {
    fontSize: 10,
    fontWeight: "medium",
    marginHorizontal: 2,
  },
  secondFormContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    border: "1px solid #c9c9c9",
    borderRadius: 5,
    backgroundColor: "#C0EECC",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    // alignContent: "space-between",
  },
  paymentTitle: {
    fontSize: 10,
    fontWeight: "medium",
  },
  paymentAmount: {
    fontSize: 10,
    fontWeight: "medium",
  },
  dueDateLabel: {
    fontSize: 10,
  },
  dueDate: {
    fontSize: 10,
    fontWeight: "medium",
  },
  flexContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  flexItem: {
    fontSize: 10,
    fontWeight: "medium",
    width: "50%",
    marginVertical: 2,
  },
  flexItemBold: {
    fontSize: 10,
    fontWeight: "bold",
    marginVertical: 2,
    width: "50%",
  },
  contactTitle: {
    fontSize: 10,
    fontWeight: "medium",
    marginBottom: 5,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
    width: 15,
    height: 15,
  },
  contactText: {
    fontSize: 10,
    fontWeight: "medium",
  },
  container: {
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distribute items evenly
    marginBottom: 10,
  },
});
interface Props {
  data?: BillData; // data is optional
  meterAcc?: MeterData;
}

const BillPDF = ({ data, meterAcc }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* <Image
        style={styles.logo}
        src="path/to/OneEC@300x.png" // Replace with the path to your image
      /> */}
      <View style={styles.inlineContainer}>
        <Text style={styles.header}>Account No.:</Text>
        <Text style={styles.text}>{meterAcc?.meterNumber}</Text>
      </View>
      <View style={styles.inlineContainer}>
        <Text style={styles.header}>Billing Statement No.:</Text>
        <Text style={styles.text}>{data?.referenceNumber}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.boldText}>{meterAcc?.meterAccountName}</Text>
        <Text style={styles.boldText}>{meterAcc?.meterAddress}</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Your Electric Bill</Text>

        {/* 1st Row */}
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Billing Period</Text>
            <Text style={styles.boldText}>
              {` ${
                data?.fromDate
                  ? format(new Date(data?.fromDate), "yyyy-MM-dd")
                  : "N/A"
              } - To: ${
                data?.toDate
                  ? format(new Date(data?.toDate), "yyyy-MM-dd")
                  : "N/A"
              }`}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Bill of date</Text>
            <Text style={styles.boldText}>
              {data?.billDate
                ? format(new Date(data?.billDate), "yyyy-MM-dd")
                : "NA"}
            </Text>
          </View>
          <View style={styles.formGroup}>
            {/* Empty space for alignment */}
            <Text style={styles.label}></Text>
            <Text style={styles.boldText}></Text>
          </View>
        </View>

        {/* 2nd Row */}
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Reading</Text>
            <Text style={styles.boldText}>
              {data?.readingDate
                ? format(new Date(data?.readingDate), "yyyy-MM-dd")
                : "NA"}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Electric Meter Number</Text>
            <Text style={styles.boldText}>{meterAcc?.meterNumber}</Text>
          </View>
          <View style={styles.formGroup}>
            {/* Empty space for alignment */}
            <Text style={styles.label}></Text>
            <Text style={styles.boldText}></Text>
          </View>
        </View>

        {/* 3rd Row */}
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Next Meter Reading</Text>
            <Text style={styles.boldText}>
              {data?.nextDate
                ? format(new Date(data?.nextDate), "yyyy-MM-dd")
                : "NA"}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Customer Type</Text>
            <Text style={styles.boldText}>{meterAcc?.customerType}</Text>
          </View>
          <View style={styles.formGroup}>
            {/* Empty space for alignment */}
            <Text style={styles.label}></Text>
            <Text style={styles.boldText}></Text>
          </View>
        </View>

        {/* 4th Row */}
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Current Reading</Text>
            <Text style={styles.boldText}>{data?.cRead}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Rate this month</Text>
            <Text style={styles.boldText}>
              {data?.rate ? ` ${data.rate} per kWh` : "Rate not available"}
            </Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Actual Consumption</Text>
            <Text style={styles.boldText}>
              {data?.kwhConsume ? ` ${data.kwhConsume}  kWh` : "N/A"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.secondFormContainer}>
        <View>
          <Text style={styles.paymentTitle}>Please Pay</Text>
          <Text style={styles.paymentAmount}>
            {/* {Number(data?.amount).toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })} */}
            {`P ${data?.amount}`}
          </Text>
        </View>
        <View>
          <Text style={styles.dueDateLabel}>Due Date</Text>
          <Text style={styles.dueDate}>
            {data?.dueDate
              ? format(new Date(data?.dueDate), "yyyy-MM-dd")
              : "NA"}
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bill Consumption Summary</Text>
        <View style={styles.flexContainer}>
          <Text style={styles.flexItem}>Generation:</Text>
          <Text style={styles.flexItemBold}>{data?.generation}</Text>
          <Text style={styles.flexItem}>Transmission:</Text>
          <Text style={styles.flexItemBold}>{data?.transmission}</Text>
          <Text style={styles.flexItem}>System Loss:</Text>
          <Text style={styles.flexItemBold}>{data?.sLoss}</Text>
          <Text style={styles.flexItem}>Distribution (oneEC):</Text>
          <Text style={styles.flexItemBold}>{data?.distribution}</Text>
          <Text style={styles.flexItem}>Subsidies:</Text>
          <Text style={styles.flexItemBold}>{data?.subsidies}</Text>
          <Text style={styles.flexItem}>Government Taxes:</Text>
          <Text style={styles.flexItemBold}>{data?.gTax}</Text>
          <Text style={styles.flexItem}>Universal Charges:</Text>
          <Text style={styles.flexItemBold}>{data?.uCharges}</Text>
          <Text style={styles.flexItem}>FiT-ALL:</Text>
          <Text style={styles.flexItemBold}>{data?.fitAll}</Text>
          <Text style={styles.flexItem}>Applied Charges:</Text>
          <Text style={styles.flexItemBold}>{data?.applied}</Text>
          <Text style={styles.flexItem}>Other Charges:</Text>
          <Text style={styles.flexItemBold}>{data?.other}</Text>
        </View>
      </View>
      <Text style={styles.contactTitle}>
        If you have any concerns, please feel free to contact us:
      </Text>
      {/* <View style={styles.contactContainer}>
        <Image
          style={styles.icon}
          src="path/to/phone.png" // Replace with the path to your image
        />
        <Text style={styles.contactText}>+123 456 7890</Text>
        <Image
          style={styles.icon}
          src="path/to/mail.png" // Replace with the path to your image
        />
        <Text style={styles.contactText}>oneec@gmail.com</Text>
      </View> */}
    </Page>
  </Document>
);

export default BillPDF;
