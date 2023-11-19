import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import styles from "../styles";
import SwipeButton from "../components/SwipeButton";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    console.log("handleGetStarted")
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={IMAGES.neonFrontPage}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          {/* OVERLAY VIEW */}
          <View
            style={{
              bottom: 0,
              position: "absolute",
              width: "100%",
            }}
          >
            <View
              style={{
                marginTop: SIZES.threeQuarters,
                borderTopLeftRadius: SIZES.p40,
                borderTopRightRadius: SIZES.p40,
              }}
            >
              <ImageBackground
                source={IMAGES.mainScreen}
                style={{
                  resizeMode: "cover",
                  width: "100%",
                  height: "100%",
                }}
                borderTopLeftRadius={SIZES.p40}
                borderTopRightRadius={SIZES.p40}
              >
                <View>
                  <View
                    style={{
                      paddingHorizontal: SIZES.p20,
                      paddingTop: SIZES.p20,
                      marginTop: SIZES.p30,
                    }}
                  >
                    <Text style={styles.h2}>Welcome to HR Portal</Text>
                    <Text style={styles.p}>welcome back we missed you</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 80,
                    }}
                  >
                    <SwipeButton onToggle={handleGetStarted} />
                    
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
