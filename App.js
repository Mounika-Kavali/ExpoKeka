import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./app/navigation/AppNavigator";
import useCachedResources from "./app/hooks/useCachedResources";
import MyTabs from "./app/navigation/BottomTabNavigator";

import { Provider } from "react-redux";
import store from "./app/store";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
