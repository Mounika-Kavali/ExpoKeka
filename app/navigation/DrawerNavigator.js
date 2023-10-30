import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';

import ChatScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LeavesAttendanceScreen from '../screens/LeavesAttendanceScreen';

const Drawer = createDrawerNavigator();

const MyDrawer=()=> {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="profile">
      <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{ drawerLabel: 'Profile' }}
      />
      <Drawer.Screen
        name="leaves"
        component={LeavesAttendanceScreen}
        options={{ drawerLabel: 'Attendance' }}
      />
      <Drawer.Screen
        name="chat"
        component={ChatScreen}
        options={{ drawerLabel: 'Chat' }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;