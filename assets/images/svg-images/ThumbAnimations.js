import React from "react";
import { View, Image } from "react-native";
import { Svg, Defs, ClipPath, Rect, G, Path } from "react-native-svg";

export const ThumbUpAnimated = () => {
  return (
    <View>
      <Image
        source={require("../svg-images/thumbUpAnimation.gif")}
        style={{ width: 60, height: 70 }}
      />
    </View>
  );
};

export const ThumbDownAnimated = () => {
  return (
    <View>
      <Image
        source={require("../svg-images/thumbDownAnimation.gif")}
        style={{ width: 60, height: 70 }}
      />
    </View>
  );
};
