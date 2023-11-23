import React, { useContext, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import { loginApi } from "../utils/LoginApi";
import { employeeDetailsApi } from "../utils/ProfileApi";
import BiometricAuth from "./BiometricAuth";
import LoadingSpinner from "./LoadingSpinner";
import { AppDispatchContext } from "../utils/AppContext";

const SignInPage = () => {
  const navigation = useNavigation();
  const dispatch = useContext(AppDispatchContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSignIn = async () => {
    const payload = {
      username: username,
      password: password,
    };
    setLoading(true); // Set loading state to true when API call starts
    const { success, token, userId, error } = await loginApi({payload,dispatch});


    if (success) {
      console.log("Login successful. Token:", token, "User:", userId);
      await employeeDetailsApi({userId:userId ,dispatch});
      setLoading(false);

      setErrorMessage("");
      navigation.navigate("Main");
    } else {
      console.error("Login failed. Error:", error);
      setErrorMessage(error);
      setLoading(false);
    }
  };

  const onBlurUsername = () => {
    if (username.trim() == "") {
      setErrorMessage("Username is required");
    } else {
      setErrorMessage("");
    }
  };

  const onBlurPassword = () => {
    if (password.trim() == "") {
      setErrorMessage("Password is required");
    } else {
      setErrorMessage("");
    }
  };

  const isSignInDisabled = () => {
    // Disable the sign-in button if there are validation errors
    return username.trim() === "" || password.trim() === "";
  };
  const passwordInputRef = useRef(null);
  return (
    <View style={{ flex: 1, paddingVertical: SIZES.p30 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.h2}>Welcome Back!</Text>
        <Text style={[styles.p, { color: "pink", marginBottom: 10, }]}>
          welcome back we missed you.
        </Text>
        <View style={{ width: "80%" }}>
          {errorMessage ? (
            <View style={{ alignItems: "flex-start" }}>
              <Text
                style={{
                  color: "red",
                  fontSize: 16,
                  marginTop: 5,
                  paddingLeft: 10,
                }}
              >
                {errorMessage}
              </Text>
            </View>
          ) : (
            ""
          )}
          <TextInput
            mode="outlined"
            dense={true}
            label={<Text style={{ color: "#000" }}> Username </Text>}
            style={styles.input}
            outlineColor={"#000"}
            outlineStyle={{ borderRadius: 20 }}
            activeOutlineColor={"#2963f1"}
            placeholder="Username"
            placeholderTextColor="#cdced0"
            onChangeText={setUsername}
            value={username}
            onBlur={onBlurUsername}
          />

          <TextInput
            mode="outlined"
            dense={true}
            label={<Text style={{ color: "#000" }}> Password </Text>}
            style={[styles.input,{ marginTop: 20,}]}
            placeholder="Password"
            outlineColor={"#000"}
            outlineStyle={{ borderRadius: 20 }}
            activeOutlineColor={"#2963f1"}
            placeholderTextColor="#cdced0"
            secureTextEntry={secureTextEntry}
            ref={passwordInputRef}
            right={
              <TextInput.Icon
                iconColor="#7986e4"
                icon={secureTextEntry ? "eye-off" : "eye"}
                onPress={() => {
                  toggleSecureTextEntry();
                  // Blur the TextInput when icon is clicked
                  if (
                    secureTextEntry ||
                    (!secureTextEntry && passwordInputRef.current)
                  ) {
                    passwordInputRef.current.blur();
                  }
                }}
              />
            }
            onChangeText={setPassword}
            value={password}
            onBlur={onBlurPassword}
          />
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: "80%" }}>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                color: "#79efe7",
                marginBottom: SIZES.p15,
                fontSize: SIZES.medium,
              }}
            >
              Forgot Password?
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isSignInDisabled()}
          >
            <LinearGradient
              colors={[
                isSignInDisabled()
                  ? "rgba(184, 71, 230, 0.5)"
                  : "rgba(184, 71, 230, 1)",
                isSignInDisabled()
                  ? "rgba(224, 34, 220, 0.5)"
                  : "rgba(224, 34, 220, 1)",
                isSignInDisabled()
                  ? "rgba(204, 55, 118, 0.5)"
                  : "rgba(204, 55, 118, 1)",
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
              <View style={{ flexDirection: "row" }}>
                {loading && <LoadingSpinner visible={loading}/>}
                <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>
                  Sign In
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <Text
            style={{ textAlign: "center", color: "#666", marginVertical: 20 }}
          >
            Or, login with ...
          </Text>
          <BiometricAuth />
        </View>
      </View>
    </View>
  );
};


export default SignInPage;
