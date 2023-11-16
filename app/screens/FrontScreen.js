import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import styles from "../styles";
import Colors from "../constants/Colors";
import SignInScreen from "../screens/SignInScreen";
import { ScrollView } from "react-native-gesture-handler";

const FrontScreen = () => {
  const navigation = useNavigation();
  const [showSignIn, setShowSignIn] = useState(false);

  const handleGetStarted = () => {
    // navigation.navigate("SignIn");
    setShowSignIn(true);
  };
  

  return (
    // <SafeAreaView style={[styles.container]}>
      <View style={[styles.container]}>
        <ImageBackground
          source={IMAGES.neonFrontPage}
          style={{
            resizeMode: "cover",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
               flex: 1,
              backgroundColor: Colors.white,
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
                <View  style={{
                   flex: 1,
                }}>
                  <SignInScreen />
                </View>
              ) : (
                <>
                  <View
                    style={{
                       flex: 1,
                      paddingHorizontal: SIZES.p20,
                      paddingTop: SIZES.p20,
                      justifyContent:"center"
                    }}
                  >
                    <Text style={styles.h2}>Welcome to HR Portal</Text>
                    <Text style={styles.p}>welcome back we missed you</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingVertical:110
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
                </>
              )}
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
    // </SafeAreaView>
  );
};

export default FrontScreen;
