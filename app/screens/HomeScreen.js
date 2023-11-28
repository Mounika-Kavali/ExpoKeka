import React from "react";
import { View, StyleSheet } from "react-native";
import HomePage from "../components/HomePage";
import { ScrollView } from "react-native-gesture-handler";
// import MyTabs from "../navigation/BottomTabNavigator";

const HomeScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <HomePage />
    </ScrollView>
  );
};

export default HomeScreen;
