import React from 'react';
import { FlatList, View, Text, StyleSheet ,ScrollView} from 'react-native';
import styles from '../../styles'

function UpcomingLeavesTab() {
  const UpcomingLeavesData = [
    {
      id: 1,
      fromDate: 'Apr 15, 2023',
      toDate:'Apr 18, 2023',
      applyDays: 4,
      leaveBalance: 15,
      approved: true,
      approvedBy: 'John Gozman',
    },
    {
      id: 2,
      fromDate: 'Mar 25, 2023',
      toDate:'Mar 18, 2023',
      applyDays: 2,
      leaveBalance: 19,
      approved: true,
      approvedBy: 'Jack mengji',
    },
    {
      id: 3,
      fromDate: 'Mar 2, 2023',
      toDate:'Mar 5, 2023',
      applyDays: 5,
      leaveBalance: 19,
      approved: false,
      approvedBy: ' ',
    },
    // Add more data items as needed
  ];

  return (
    // <ScrollView>
    <FlatList
    backgroundColor="#d0ddfa"
    style={gridStyles.flatList}
      data={UpcomingLeavesData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={gridStyles.leaveItem}>
          <View style={gridStyles.row}>
            <ListItem title={`Date`} subtitle={`${item.fromDate} - ${item.toDate}`} />
            {item.approved ? (
              <View >
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
    //  </ScrollView>
  );
}

const ListItem = ({ title, subtitle }) => {
  return (
    <View >
      <Text >{title}</Text>
      <Text style={[gridStyles.subtitle]}>{subtitle}</Text>
    </View>
  );
}

const gridStyles = StyleSheet.create({
  leaveItem: {
    
    padding: 16,
    borderRadius:20,
    marginVertical:20,
    marginHorizontal:20,
    backgroundColor:"white",
    borderWidth: 1,
    borderColor:"#8d8d8e",
   
  },
  subtitle:{
    color:"black"
  },
  
  approvedLabelText: {
    color: 'yellow',
    backgroundColor: 'blue',
    padding: 5,
    borderRadius:20,
    fontSize: 12,
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  underLine:{
    borderBottomWidth: 1,
    borderBottomColor: '#8d8d8e',
    marginVertical:10
  }
});

export default UpcomingLeavesTab;
