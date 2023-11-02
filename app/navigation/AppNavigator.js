import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Define your screens and navigator here
import FrontScreen from "../screens/FrontScreen";
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen'
import MyTabs from "./BottomTabNavigator";
import applyLeave from "../components/leaves-attendance/ApplyLeave";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FrontScreen">
        <Stack.Screen name="FrontScreen" component={FrontScreen} />
        <Stack.Screen name="Main" component={MyTabs} />
        <Stack.Screen name="ApplyLeave" component={applyLeave} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
