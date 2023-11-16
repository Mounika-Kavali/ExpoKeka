import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import { loginApi } from "../utils/LoginApi";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState(""); // Initialize with an empty string
  const [password, setPassword] = useState(""); // Initialize with an empty string

  const handleSignIn = async () => {
    const payload = {
      username:username,
      password:password
    };
    navigation.navigate("Main");
    // const { success, token, user, error } = await loginApi(payload);

    // if (success) {
    //   // Handle successful login, e.g., navigate to another screen
    //   console.log("Login successful. Token:", token, "User:", user);
    //   navigation.navigate("Main");
    // } else {
    //   // Handle login failure, show error message to the user
    //   console.error("Login failed. Error:", error);
    // }
  };

  return (
    <ScrollView style={{ flex: 1, paddingVertical: SIZES.p30 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.h2}>Welcome Back!</Text>
        <Text style={[styles.p, { color: "pink" }]}>
          welcome back we missed you.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          onChangeText={setUsername}
          value={username}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              color: "blue",
              marginBottom: SIZES.p15,
              fontSize: SIZES.medium,
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <TouchableOpacity onPress={handleSignIn}>
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
              width: "100%",
              borderRadius: 10,
            }}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
