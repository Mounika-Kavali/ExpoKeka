// Import necessary components and libraries
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AttendanceLogPage from "../components/attendance-logs-requests/AttendanceLogPage";
import AttendanceRequestPage from "../components/attendance-logs-requests/AttendanceRequestPage";
import { View } from "react-native";
import { Text } from "react-native";

// Create a material top tab navigator
const Tab = createMaterialTopTabNavigator();

// Define the AttendanceNavigator component
const AttendanceNavigator = () => {
  return (
    // <View>
    //   <Text>TABS</Text>
    // </View>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "blue", // Color of the active tab label
        inactiveTintColor: "gray", // Color of the inactive tab label
        style: {
          backgroundColor: "white", // Background color of the entire tab bar
        },
        labelStyle: {
          fontSize: 16, // Font size of the tab label
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={AttendanceLogPage}
        options={{
          tabBarLabel: "Home", // Custom label for the tab
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AttendanceRequestPage}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default AttendanceNavigator;
