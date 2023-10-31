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
  ];

  return (
    <FlatList
      backgroundColor="#d0ddfa"
      style={gridStyles.flatList}
      data={pastLeavesData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={gridStyles.leaveItem}>
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
          <View style={gridStyles.underLine}></View>
          <View style={gridStyles.row}>
            <ListItem title={`Apply Days`} subtitle={item.applyDays} />
            <ListItem title={`Leave Balance`} subtitle={item.leaveBalance} />
            <ListItem title={`Approved By`} subtitle={item.approvedBy} />
          </View>
        </View>
      )}
    />
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
  leaveItem: {
    padding: 16,
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#ebebeb",
    borderWidth: 1,
    borderColor: "#8d8d8e",
  },
  subtitle: {
    color: "black",
  },

  approvedLabelText: {
    color: "white",
    backgroundColor: "#6bbdf2",
    padding: 5,
    borderRadius: 20,
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  underLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#8d8d8e",
    marginVertical: 10,
  },
});

export default PastLeavesTab;
