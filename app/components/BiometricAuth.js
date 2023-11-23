import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { employeeDetailsApi } from "../utils/ProfileApi";
import { AppDispatchContext } from "../utils/AppContext";

export default function BiometricAuth() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [svgColor, setSvgColor] = useState("#fdfdfd"); // Initial color
  const navigation = useNavigation();
  const dispatch = useContext(AppDispatchContext);


  // for face detection or fingerprint scan
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const fallBackToDefaultAuth = () => {
    console.log("fall back to password authentication");
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    // Change the color when the SVG is clicked
    const newColor = svgColor === "#fdfdfd" ? "#81cbf4" : "#81cbf4";
    setSvgColor(newColor);
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        "Please enter your password",
        "Biometric Authentication not supported",
        "OK",
        () => fallBackToDefaultAuth()
      );

    // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
    let supportedBiometrics;
    if (isBiometricAvailable)
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        "Biometric record not found",
        "Please login with your password",
        "OK",
        () => fallBackToDefaultAuth()
      );

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Touch ID for "ExpoKeka" ',
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });


    if (biometricAuth.success) {

      await employeeDetailsApi({userId:2,dispatch});// when biometric is success then employeeDetails API have to be called. 
      navigation.navigate("Main");
      setSvgColor("#fdfdfd");
    }
    
  };
  const scaleFactor = 0.15;
  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={handleBiometricAuth}>
          <Svg width={512 * scaleFactor} height={512 * scaleFactor}>
            <G transform={`scale(${scaleFactor})`}>
              <Path
                d="M68.922 87.914c-2.11 1.602-3.14 4.324-2.573 6.906a6.802 6.802 0 0 0 5.183 5.169c2.127.467 4.1.435 10.164-4.226A55.49 55.49 0 0 0 92.05 85.346l1.608-2.135c13.772-18.315 46.016-61.202 92.583-58.875 38.403 2.803 65.634 31.806 78.724 83.879.444 1.769.719 2.855 1.02 3.689 1.999 8.516 5.359 19.126 10.191 22.617a6.737 6.737 0 0 0 3.963 1.283 6.758 6.758 0 0 0 5.503-2.815 6.772 6.772 0 0 0-1.219-9.229c-1.342-1.731-3.86-8.981-5.352-15.461a6.542 6.542 0 0 0-.37-1.121c-.123-.441-.366-1.406-.582-2.271-2.08-8.254-7.59-30.18-20.96-50.799-17.279-26.626-40.823-41.192-70.015-43.299-.048-.003-.092-.003-.144-.008-53.796-2.75-89.105 44.207-104.177 64.259l-1.588 2.106c-4.127 5.455-8.999 8.852-10.684 9.835a6.894 6.894 0 0 0-1.629.913z"
                fill={svgColor}
                opacity="1"
                data-original="#000000"
                class=""
              ></Path>
              <Path
                d="M241.351 125.994c5.113-12.784 5.236-25.992.336-36.234-4.374-9.136-12.525-15.759-23.565-19.14-16.214-4.962-35.871 4.043-53.88 24.674-.231.251-25.865 27.214-52.778 43.694-.199.12-19.91 11.943-40.484 17.547a6.771 6.771 0 0 0-4.755 8.323 6.77 6.77 0 0 0 8.322 4.758c22.381-6.095 43.056-18.495 43.961-19.042 29.198-17.879 55.687-46.061 55.911-46.319 10.93-12.525 27.109-24.534 39.727-20.668 7.423 2.274 12.58 6.321 15.308 12.029 3.274 6.831 3.019 16.063-.695 25.339-6.909 17.263-28.417 38.109-60.573 58.697-16.127 10.331-56.721 35.68-85.388 47.938a6.779 6.779 0 0 0-3.575 8.897 6.78 6.78 0 0 0 8.897 3.569c29.607-12.658 70.969-38.475 87.382-48.981 24.414-15.635 55.659-39.622 65.849-65.081zM132.15 75.371c-3.082 3.393-5.838 7.029-8.817 10.506-3.893 4.555-8.152 8.81-12.602 12.821-4.565 4.129-8.267 7.084-13.66 10.178-5.715 3.283-11.546 6.602-17.472 9.486-2.04.996-3.785 1.639-6.076 2.33-3.54 1.061-5.737 4.712-4.738 8.34.956 3.498 4.796 5.801 8.336 4.738 6.935-2.086 13.222-5.652 19.481-9.209 5.284-3.006 10.533-5.713 15.395-9.409 9.471-7.202 17.623-15.612 25.119-24.811 3.03-3.725 6.276-7.275 9.664-10.68a140.317 140.317 0 0 1 5.722-5.407c1.02-.912 2.055-1.802 3.096-2.681.532-.445 1.067-.883 1.608-1.321.144-.117 1.198-.946 1.465-1.164 4.724-3.617 9.751-6.83 15.043-9.549 4.997-2.568 10.011-4.37 16.1-5.634 2.019-.421 2.457-.466 3.97-.621 3.675-.382 6.782-2.796 6.782-6.779 0-3.411-3.101-7.163-6.782-6.781-24.517 2.527-45.48 17.852-61.634 35.647z"
                fill={svgColor}
                opacity="1"
                data-original="#000000"
                class=""
              ></Path>
              <Path
                d="M79.382 205.204c14.729-5.054 90.365-33.297 132.71-92.663a6.77 6.77 0 0 0-1.582-9.454c-3.045-2.176-7.282-1.47-9.448 1.579-39.95 55.995-112.043 82.89-126.084 87.715-.303.1-.481.164-.548.191a6.79 6.79 0 0 0-3.942 8.747 6.787 6.787 0 0 0 6.347 4.381c.768 0 1.552-.138 2.313-.411l.234-.085zM263.889 245.569c-9.396-3.132-20.902-11.321-32.018-19.24-16.111-11.471-30.012-21.381-41.346-19.427-8.515 1.472-23.389 10.975-46.872 26.456-16.933 11.163-36.119 23.809-44.466 26.057a6.78 6.78 0 0 0-4.783 8.309 6.782 6.782 0 0 0 6.542 5.024c.582 0 1.177-.075 1.766-.236 10.458-2.816 28.89-14.965 48.405-27.825 15.762-10.391 35.38-23.322 41.714-24.414 5.76-.985 19.849 9.041 31.173 17.11 11.933 8.494 24.276 17.286 35.594 21.061a6.779 6.779 0 0 0 8.576-4.285c1.184-3.566-.739-7.406-4.285-8.59z"
                fill={svgColor}
                opacity="1"
                data-original="#000000"
                class=""
              ></Path>
              <Path
                d="M246.909 278.784c-5.462-1.978-14.346-7.464-22.942-12.771-18.15-11.214-29.684-18.021-37.965-16.59-8.388 1.447-25.99 13.418-55.552 34.994-3.619 2.636-6.742 4.922-8.904 6.455-3.06 2.155-3.792 6.393-1.629 9.444a6.764 6.764 0 0 0 5.544 2.875 6.76 6.76 0 0 0 3.908-1.246c2.252-1.591 5.414-3.901 9.076-6.577 11.764-8.586 43.013-31.401 49.792-32.572 4.229-.287 19.489 9.124 28.603 14.75 9.6 5.934 18.668 11.539 25.461 13.989a6.78 6.78 0 1 0 4.608-12.751z"
                fill={svgColor}
                opacity="1"
                data-original="#000000"
                class=""
              ></Path>
              <Path
                d="M224.008 312.496c-3.806-2.487-7.311-4.986-10.698-7.402-11.122-7.939-20.731-14.801-31.265-12.97-11.87 2.047-30.759 21.046-34.427 24.831a6.78 6.78 0 0 0 .158 9.586 6.752 6.752 0 0 0 4.716 1.913c1.774 0 3.54-.691 4.875-2.067 9.076-9.38 21.976-20.037 26.986-20.902 4.948-.849 12.429 4.476 21.091 10.649 3.329 2.382 7.107 5.078 11.156 7.721 3.138 2.046 7.347 1.163 9.387-1.972a6.794 6.794 0 0 0-1.979-9.387zM283.676 172.531c-5.653-2.387-11.56-4.895-16.316-8.856-5.243-4.354-7.68-10.078-8.768-16.683-1.417-8.614-14.482-4.949-13.072 3.605 2.895 17.592 15.844 27.11 31.312 33.647 3.404 1.437 7.234 1.061 9.273-2.434 1.692-2.877.98-7.838-2.429-9.279zM270.515 207.911c-5.093-1.567-8.952-3.559-14.346-6.741-9.87-5.831-18.87-14.284-23.243-25.071-1.39-3.42-4.463-5.804-8.344-4.735-3.251.894-6.125 4.909-4.736 8.342 8.083 19.924 26.632 34.984 47.062 41.278 8.384 2.583 11.936-10.505 3.607-13.073zM10.617 10.679h65.887V.166H.104v76.399h10.513zM276.565.166v10.513h65.891v65.886h10.512V.166zM10.513 276.402H0v76.401h76.396V342.29H10.513zM342.346 342.29h-65.89v10.513h76.403v-76.401h-10.513z"
                fill={svgColor}
                opacity="1"
                data-original="#000000"
                class=""
              ></Path>
            </G>
          </Svg>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
});
