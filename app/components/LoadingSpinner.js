import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingSpinner = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View >
      <View >
        <ActivityIndicator animating={true} size="small" color="#578296" />
      </View>
    </View>
  );
};



export default LoadingSpinner;
