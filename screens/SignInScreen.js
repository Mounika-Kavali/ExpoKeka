import React from "react";
import { View, StyleSheet } from "react-native";
import Sign_in_page from "../components/Sign-in-page";

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Sign_in_page />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInScreen;
