import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

function PastLeavesTab() {
  // Sample data for past leaves
  const pastLeavesData = [
    {
      id: 1,
      date: '2023-01-10',
      appliedDays: 2,
      leaveBalance: 10,
      approved: true,
      approvedBy: 'John Doe',
    },
    {
      id: 2,
      date: '2023-02-05',
      appliedDays: 3,
      leaveBalance: 7,
      approved: false,
      approvedBy: null,
    },
    // Add more data items as needed
  ];

  return (
    <FlatList
      data={pastLeavesData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.leaveItem}>
          <Text style={styles.leaveDate}>{item.date}</Text>
          <Text style={styles.appliedDays}>{`${item.appliedDays} days`}</Text>
          <Text style={styles.leaveBalance}>{`Balance: ${item.leaveBalance} days`}</Text>
          {item.approved ? (
            <View style={styles.approvedLabel}>
              <Text style={styles.approvedLabelText}>APPROVED</Text>
            </View>
          ) : null}
          {item.approved ? (
            <Text style={styles.approvedBy}>{`Approved by: ${item.approvedBy}`}</Text>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  leaveItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leaveDate: {
    fontSize: 16,
  },
  appliedDays: {
    fontSize: 16,
  },
  leaveBalance: {
    fontSize: 16,
  },
  approvedLabel: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  approvedLabelText: {
    color: 'white',
  },
  approvedBy: {
    fontSize: 16,
  },
});

export default PastLeavesTab;
