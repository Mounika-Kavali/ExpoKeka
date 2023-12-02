import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Define your screens and navigator here
import LoginScreen from "../screens/LoginScreen";
import MyTabs from "./BottomTabNavigator";
import ApplyLeave from "../components/leaves-attendance/ApplyLeave";
import OnboardingScreen from "../screens/OnboardingScreen";
import AttendanceLogScreen from "../screens/AttendanceLogScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MyTabs} />
        <Stack.Screen name="ApplyLeave" component={ApplyLeave} />
        <Stack.Screen name="Attendance Log" component={AttendanceLogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
