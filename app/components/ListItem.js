import React from "react";
import { View, Text } from "react-native";

const ListItem = ({ label, value }) => (
  <View
    style={{
      width: "100%",
      borderBottomWidth: 0.6,
      borderBottomColor: "#a7a7a7",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingBottom: 10,
      marginBottom: 15,
    }}
  >
    <Text style={{ width: "45%", fontWeight: "600", fontSize: 18 }}>
      {label}
    </Text>
    <Text
      style={{
        width: "55%",
        textAlign: "right",
        fontWeight: "400",
        fontSize: 16,
        color: "#3e2e7e",
      }}
    >
      {value}
    </Text>
  </View>
);

export default ListItem;
