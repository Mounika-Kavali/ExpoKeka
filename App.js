import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./app/navigation/AppNavigator";
import { AppContextProvider } from "./app/utils/AppContext";
import useCachedResources from "./app/hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        {/* <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        > */}
        <AppNavigator />
        {/* </SafeAreaView> */}
      </AppContextProvider>
    </SafeAreaProvider>
  );
}
