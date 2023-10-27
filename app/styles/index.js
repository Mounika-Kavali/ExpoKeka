import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import { StyleSheet } from "react-native";
import COLORS from "../constants/Colors";

const styles = StyleSheet.create({
    container: {
   
      color: COLORS.white,
      flex: 1,
      
    },
    h2:{
        color:"white",
        fontSize:SIZES.p40,
        fontFamily:FONTS.bold
    },
    p:{
        color:"white",
        fontSize:SIZES.p15,
        fontFamily:FONTS.regular
    },
    input:{
        width:"100%",
        height: 50,
        margin: 12,
        padding: 10,
        fontSize:18,
        color:"white",
        borderWidth: 1.2,
        borderColor: 'white',
        borderRadius: 10,
    }

});

export default styles;







