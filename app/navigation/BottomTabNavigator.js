import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import {IMAGES} from '../constants/Assets'

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LeavesAttendanceScreen from '../screens/LeavesAttendanceScreen';

const Tab = createBottomTabNavigator();

const  MyTabs=()=> {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="home" color={color} size={size} />
            <Image
            source={IMAGES.home} 
            style={{ width: size, height: size, tintColor: color }}
          />
          ),
        }}
      />
      <Tab.Screen
        name="Leaves & Attendance"
        component={LeavesAttendanceScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Image
            source={IMAGES.calendar} 
            style={{ width: size, height: size, tintColor: color }}
          />
          ),
         
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Image
            source={IMAGES.profile} 
            style={{ width: size, height: size, tintColor: color }}
          />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Image
            source={IMAGES.chat} 
            style={{ width: size, height: size, tintColor: color }}
          />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;