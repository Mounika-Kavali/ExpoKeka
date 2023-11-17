import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import styles from "../styles";
import Colors from "../constants/Colors";
import SignInPage from "../components/Sign-in-page";
import FrontPage from "../components/FrontPage";
import { ScrollView } from "react-native-gesture-handler";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    
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
        <ScrollView style={{ bottom: 0, position: "relative", width: "100%" }}>
          <View
            style={{
              minHeight: 770,
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
                {showSignIn ? (
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <SignInPage />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <SignInPage />
                    {/* <SignInPage /> */}
                  </View>
                )}
              </ImageBackground>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
