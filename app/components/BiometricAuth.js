import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { employeeDetailsApi } from "../utils/ProfileApi";
import { AppDispatchContext } from "../utils/AppContext";
import { FingerPrintSVG } from "../../assets/images/svg-images/FingerPrintSVG";

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
      await employeeDetailsApi({ userId: 2, dispatch }); // when biometric is success then employeeDetails API have to be called.
      navigation.navigate("Main");
      setSvgColor("#fdfdfd");
    }
  };
  const scaleFactor = 0.15;
  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <FingerPrintSVG
          svgColor={svgColor}
          handleBiometricAuth={handleBiometricAuth}
        />
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
