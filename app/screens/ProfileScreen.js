import React from "react";
import { View, StyleSheet } from "react-native";
import ProfilePage from "../components/ProfilePage";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfilePage />
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

export default ProfileScreen;
