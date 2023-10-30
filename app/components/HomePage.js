import React from "react";
import { View, TextInput, Text } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import MyDrawer from "../navigation/DrawerNavigator";

const HomePage = () => {
  const [value, onChangeText] = React.useState(" Multiline Placeholder");

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View>
      {/* <NavigationContainer>
      <MyDrawer/>
    </NavigationContainer> */}
      <View
        style={{
          backgroundColor: value,
          borderBottomColor: "#000000",
          borderBottomWidth: 1,
        }}
      >
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          value={value}
          style={{ padding: 10 }}
        />
        <Text>HOME PAGE</Text>
      </View>
    </View>
  );
};

export default HomePage;
