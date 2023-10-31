import React from "react";
import { View, StyleSheet } from "react-native";
import LeavesAttendancePage from "../components/leaves-attendance/LeavesAttendancePage";

const LeavesAttendanceScreen = () => {
  return (
    <View style={styles.container}>
      <LeavesAttendancePage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LeavesAttendanceScreen;
