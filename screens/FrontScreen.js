import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const FrontScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // Navigate to the SignInPage
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/NeonFrontPage.jpg")}
        style={styles.backgroundImage}
      />

      <View style={styles.overlay}>
        <ImageBackground
          source={require("../assets/images/mainScreen.jpg")}
          style={styles.logo}
        >
          <View style={styles.textArea}>
            <Text style={styles.h2}>Welcome to HR Portal</Text>
            <Text style={styles.p}>welcome back we missed you</Text>
          </View>
          <View style={styles.buttonArea}>
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
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:'100%',
    width: "100%",
    overflow: "auto",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: "transparent",
    // backgroundColor: "rgba(0,0,0,0.5)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  logo: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
 
    // opacity: 0.8,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  textArea:{
    
  },
  h2: {
    color: "white",
    fontSize: 42,
  },
  p: {
    color: "white",
    fontSize: 18,
  },
});

export default FrontScreen;
