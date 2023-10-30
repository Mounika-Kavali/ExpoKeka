import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./app/navigation/AppNavigator";
import useCachedResources from "./app/hooks/useCachedResources";
import MyTabs from "./app/navigation/BottomTabNavigator";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> */}
      <AppNavigator />
      {/* <MyTabs/> */}
      {/* </NavigationContainer> */}
     </SafeAreaProvider>
  );
}
