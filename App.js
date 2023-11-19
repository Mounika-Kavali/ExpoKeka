import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./app/navigation/AppNavigator";
import useCachedResources from "./app/hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
