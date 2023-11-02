import React, { useState } from "react";
import { View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

import UpcomingLeavesTab from "../components/leaves-attendance/UpcomingLeavesTab";
import PastLeavesTab from "../components/leaves-attendance/PastLeavesTab";

const LeavesTabs = () => {
  const [tabIndexSelect, setTabIndex] = useState(0);

  const handleSingleIndexSelect = (index) => {
    setTabIndex(index);
  };
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <SegmentedControlTab
        values={["Upcoming", "Past"]}
        selectedIndex={tabIndexSelect}
        onTabPress={handleSingleIndexSelect}
        borderRadius={15}
        tabsContainerStyle={{
          width: "70%",
          borderRadius: 15,
          backgroundColor: "#e3e3e4",//light gray
        }} 
        tabStyle={{
          backgroundColor: "#e3e3e4", //light gray
          borderWidth: 0,
          borderRadius: 15,
          borderColor: "transparent", // removes blue line partition.
          
        }}
        activeTabStyle={{
          backgroundColor: "#3f3f94",
          paddingHorizontal:40,
        }}
        
        tabTextStyle={{ color: "black", fontSize: 16,}}
        activeTabTextStyle={{ color: "white", fontSize: 18, }}
      />

      {tabIndexSelect === 0 && (
        <View>
          <UpcomingLeavesTab />
        </View>
      )}
      {tabIndexSelect === 1 && (
        <View>
          <PastLeavesTab />
        </View>
      )}
    </View>
  );
};

export default LeavesTabs;
