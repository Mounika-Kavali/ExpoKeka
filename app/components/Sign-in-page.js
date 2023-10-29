import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState(""); // Initialize with an empty string
  const [password, setPassword] = useState(""); // Initialize with an empty string

  const handleSignIn = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={{ flex: 1, paddingVertical: SIZES.p30 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.h2}>Welcome Back!</Text>
        <Text style={{ ...styles.p, color: "pink" }}>
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
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
