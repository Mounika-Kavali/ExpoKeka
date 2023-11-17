import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import styles from "../styles";
import { ScrollView } from "react-native-gesture-handler";

const FrontPage = () => {
  handleGetStarted = () => {
    console.log("GET start button clicked!");
  };
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SIZES.p20,
          paddingTop: SIZES.p20,
          justifyContent: "center",
        }}
      >
        <Text style={styles.h2}>Welcome to HR Portal</Text>
        <Text style={styles.p}>welcome back we missed you</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 110,
        }}
      >
        <TouchableOpacity onPress={handleGetStarted}>
          <LinearGradient
            colors={[
              "rgba(184, 71, 230, 1)",
              "rgba(224, 34, 220, 1)",
              "rgba(204, 55, 118, 1)",
            ]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              borderRadius: 10,
            }}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FrontPage;
