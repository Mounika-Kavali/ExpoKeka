import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import UpcomingLeavesTab from '../components/leaves-attendance/UpcomingLeavesTab';
import PastLeavesTab from '../components/leaves-attendance/PastLeavesTab';

const Tab = createMaterialTopTabNavigator();

const LeavesTabs = () => {
  return (
    <View  style={{
      height: 850,
    }}>
     
      <Tab.Navigator
      // style={{alignItems:"center"}}
         screenOptions={{
          tabBarLabelStyle: {
              color:"white",
            },
          tabBarStyle: {
             backgroundColor: '#e1e1e4' ,//light gray
             width: '90%',
            borderRadius: 20,
            marginLeft:15
            },
            tabBarIndicatorStyle: {
              backgroundColor: 'pink', // Background color for the active tab
              width:"40%",
              padding:"15%",
              borderRadius: 20,
            },
          
        }}
      >
       
        <Tab.Screen
        
          name="Upcoming Leaves"
          component={UpcomingLeavesTab}
          options={{
            tabBarLabel: 'Upcoming ',
           
            
          }}
        />
        <Tab.Screen
          name="Past Leaves"
          component={PastLeavesTab}
          options={{
            tabBarLabel: 'Past ',
            
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default LeavesTabs;
