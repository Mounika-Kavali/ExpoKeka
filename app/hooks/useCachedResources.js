import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          PlayfairDisplayRegular: require("../../assets/fonts/PlayfairDisplayRegular.ttf"),
          PlayfairDisplayMedium: require("../../assets/fonts/PlayfairDisplayMedium.ttf"),
          PlayfairDisplayBold: require("../../assets/fonts/PlayfairDisplayBold.ttf"),
          PlayfairDisplayItalic: require("../../assets/fonts/PlayfairDisplayItalic.ttf"),
          //ROBOTO FONT
          RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
          RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
          RobotoMediumItalic: require("../../assets/fonts/Roboto-MediumItalic.ttf"),
          RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
