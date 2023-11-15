import React from "react";
import { FlatList, View, Text, StyleSheet, ScrollView } from "react-native";
import styles from "../../styles";

function UpcomingLeavesTab() {
  const UpcomingLeavesData = [
    {
      id: 1,
      fromDate: "Apr 15, 2023",
      toDate: "Apr 18, 2023",
      applyDays: 4,
      leaveBalance: 15,
      approved: true,
      approvedBy: "John Gozman",
    },
    {
      id: 2,
      fromDate: "Mar 25, 2023",
      toDate: "Mar 18, 2023",
      applyDays: 2,
      leaveBalance: 19,
      approved: true,
      approvedBy: "Jack mengji",
    },
    {
      id: 3,
      fromDate: "Mar 2, 2023",
      toDate: "Mar 5, 2023",
      applyDays: 5,
      leaveBalance: 19,
      approved: false,
      approvedBy: " ",
    },
    {
      id: 4,
      fromDate: "Mar 2, 2023",
      toDate: "Mar 5, 2023",
      applyDays: 5,
      leaveBalance: 19,
      approved: true,
      approvedBy: "musk ",
    },
  ];

  return (
    <View>
      {UpcomingLeavesData.map((item) => (
        <View style={gridStyles.leavesContainer} key={item.id}>
          <View style={gridStyles.leavesItem} key={item.id}>
            <View style={gridStyles.rowContainer}>
              <View style={gridStyles.row}>
                <ListItem
                  title={`Date`}
                  subtitle={`${item.fromDate} - ${item.toDate}`}
                />
                {item.approved ? (
                  <View>
                    <Text style={gridStyles.approvedLabelText}>APPROVED</Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={gridStyles.rowContainer}>
              <View style={gridStyles.underLine}></View>
              <View style={gridStyles.row}>
                <ListItem title={`Apply Days`} subtitle={item.applyDays} />
                <ListItem
                  title={`Leave Balance`}
                  subtitle={item.leaveBalance}
                />
                <ListItem title={`Approved By`} subtitle={item.approvedBy} />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const ListItem = ({ title, subtitle }) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text style={[gridStyles.subtitle]}>{subtitle}</Text>
    </View>
  );
};

const gridStyles = StyleSheet.create({
  leavesContainer: {
    alignItems: "center",
  },
  leavesItem: {
    width: "88%",
    padding: 16,
    borderRadius: 20,
    marginVertical: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#8d8d8e",
  },
  rowContainer: {
    width: "100%",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subtitle: {
    color: "black",
    fontWeight: "bold",
  },
  approvedLabelText: {
    color: "#63f0ee",
    backgroundColor: "#d3f9f9",
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  underLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#8d8d8e",
    marginVertical: 10,
  },
});

export default UpcomingLeavesTab;
