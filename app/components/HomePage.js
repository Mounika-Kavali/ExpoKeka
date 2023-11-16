import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";

const HomePage = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  useEffect(() => {
    // fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      // Fetch employee details from your API endpoint
      const response = await fetch("YOUR_API_ENDPOINT");
      const data = await response.json();

      // Assuming data structure is an array of objects with label and value
      setEmployeeDetails(data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };
  const exampleEmployeeDetails = [
    { label: "Employee ID", value: "00321" },
    { label: "Email", value: "john123@gmail.com" },
    { label: "Gender", value: "Male" },
    { label: "DOB", value: "Dec 12 1993" },
    { label: "Martial status", value: "Single" },
  ];

  const renderDetailItem = ({ item }) => (
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
      <Text
        style={{ width: "40%", fontWeight: "600", fontSize: 18, color: "#000" }}
      >
        {item.label}
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
        {item.value}
      </Text>
    </View>
  );
  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 400,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={IMAGES.neonFrontPage}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </ImageBackground>
      </View>
      {/* Overlaying View */}

      <View
        style={{
          width: "100%",
          height: 300,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          overflow: "hidden",
          position: "absolute",
          top: 0,
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <ImageBackground
          source={IMAGES.mainScreen}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          {/* PROFILE IMG CIRCLE */}
          <View
            style={{
              height:"70%", // to display circle not in middle of overlay view
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View  style={{
              width:"40%",
              height: 150,
              borderRadius:100,
              backgroundColor:"pink",
              borderWidth:1,
              borderColor:"#fff"
            }}>

            </View>
          </View>
        </ImageBackground>
      </View>

      {/* DETAILS */}
      {/* <View style={{ marginHorizontal: 30, marginTop: 50 }}>
        <View
          style={{
            width: "100%",
            borderBottomWidth: 0.6,
            borderBottomColor: "#a7a7a7",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingBottom:10,
            marginBottom:15,
          }}
        >
          <Text style={{width:"35%",fontWeight:"600",fontSize:18}}>Employee ID</Text>
          <Text style={{width:"55%",textAlign:"right",fontWeight:"400",fontSize:16,color:"#3e2e7e"}}>00321</Text>
        </View>

      </View> */}
      <FlatList
        data={
          employeeDetails.length > 0 ? employeeDetails : exampleEmployeeDetails
        }
        renderItem={renderDetailItem}
        keyExtractor={(item) => item.label}
        style={{ marginHorizontal: 30, marginTop: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default HomePage;
