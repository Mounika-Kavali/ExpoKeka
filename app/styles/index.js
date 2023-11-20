import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import { StyleSheet } from "react-native";
import COLORS from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    color: COLORS.white,
    flex: 1,
  },
  h2: {
    color: "white",
    fontSize: SIZES.p40,
    fontFamily: FONTS.bold,
  },
  h3: {
    color: "black",
    fontSize: SIZES.p30,
    fontFamily: FONTS.bold,
  },
  h4: {
    color: "black",
    fontSize: SIZES.p20,
    fontFamily: FONTS.bold,
  },
  h5: {
    color: "black",
    fontSize: SIZES.p15,
    fontFamily: FONTS.bold,
  },
  h6: {
    color: "white",
    fontSize: SIZES.p10,
    fontFamily: FONTS.bold,
  },
  p: {
    color: "white",
    fontSize: SIZES.p15,
    fontFamily: FONTS.regular,
  },

  input: {
    marginTop: 20,
    paddingTop: 10, // to display label text within the field
    fontSize: 18,
  },

  btn: {
    borderWidth: 1.2,
    borderColor: "white",
    borderRadius: 50,
    color: "white",
    backgroundColor: "#6c0787",
    padding: 5,
  },
});

export default styles;
