import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import styles from "../styles";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";

const SignInScreen = () => {
  const [text, onChangeText] = React.useState();

  return (
    <View style={{ flex: 1, paddingVertical: SIZES.p30 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.h2}>Welcome Back!</Text>
        <Text style={{ ...styles.p, color: "pink" }}>
          welcome back we missed you.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          onChangeText={onChangeText}
          value={text}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
      </View>
      <View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              color: "blue",
              marginBottom: SIZES.p15,
              fontSize: SIZES.medium
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <Button
          title="Sign In"
          onPress={() => {
            // Handle sign-in logic here
            // Typically, you would validate the input and navigate to the next screen
          }}
        />
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   forgotPasswordLink: {
//     color: "blue",
//     textDecorationLine: "underline",
//     marginBottom: 10,
//   },
// });

export default SignInScreen;
