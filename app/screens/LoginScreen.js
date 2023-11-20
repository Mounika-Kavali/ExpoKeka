import React, { useState } from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import styles from "../styles";
import SignInPage from "../components/Sign-in-page";
import { ScrollView } from "react-native-gesture-handler";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
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
        <ScrollView
          style={{
            flex: 1,
            bottom: 0,
            position: "absolute",
            width: "100%",
          }}
        >
          <View>
            <View>
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
                <SignInPage />
              </ImageBackground>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
