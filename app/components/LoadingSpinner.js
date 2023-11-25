import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const LoadingSpinner = ({ visible, size, styles }) => {
  const spinnerSize = size || "small";
  if (!visible) {
    return null;
  }

  return (
    <View>
      <View style={styles}>
        <ActivityIndicator
          animating={true}
          size={spinnerSize}
          color="#578296"
        />
      </View>
    </View>
  );
};

export default LoadingSpinner;
