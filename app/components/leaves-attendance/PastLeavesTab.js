import React from "react";
import { FlatList, View, Text, StyleSheet, ScrollView } from "react-native";

function PastLeavesTab() {
  // Sample data for past leaves
  const pastLeavesData = [
    {
      id: 1,
      fromDate: "Jan 15, 2023",
      toDate: "Jan 18, 2023",
      applyDays: 4,
      leaveBalance: 15,
      approved: true,
      approvedBy: "John Gozman",
    },
    {
      id: 2,
      fromDate: "Feb 25, 2023",
      toDate: "Feb 18, 2023",
      applyDays: 2,
      leaveBalance: 19,
      approved: true,
      approvedBy: "Jack mengji",
    },
    {
      id: 3,
      fromDate: "Feb 29, 2023",
      toDate: "Mar 4, 2023",
      applyDays: 5,
      leaveBalance: 24,
      approved: true,
      approvedBy: "steve jack",
    },
  ];

  return (
    <View>
      {pastLeavesData.map((item) => (
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
    backgroundColor: "#fff8f8",
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
    color: "white",
    backgroundColor: "#6bbdf2",
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

export default PastLeavesTab;
