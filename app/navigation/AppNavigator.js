import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Define your screens and navigator here
import LoginScreen from "../screens/LoginScreen";
import MyTabs from "./BottomTabNavigator";
import applyLeave from "../components/leaves-attendance/ApplyLeave";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MyTabs} />
        <Stack.Screen name="ApplyLeave" component={applyLeave} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
