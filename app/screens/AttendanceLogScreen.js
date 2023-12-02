import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "../constants/Assets";
import AttendanceNavigator from "../navigation/AttendanceNavigator";

const AttendanceLogScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text
          style={{
            paddingHorizontal: 15,
            fontSize: 24,
            fontFamily: FONTS.RobotoRegular,
          }}
        >
          Logs & Requests
        </Text>
        <AttendanceNavigator />
      </View>
    </SafeAreaView>
  );
};

export default AttendanceLogScreen;
