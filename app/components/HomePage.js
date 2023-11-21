import React, { Children, useContext, useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import ListItem from "./ListItem";
import { AppContext, useAppContext } from "../utils/AppContext";

const HomePage = () => {
  const state = useContext(AppContext);
  const empDetails = state.empDetails;

  const empLabels = {
    employeeId: "Employee ID",
    employeeName: "Name",
    email: "Email",
    gender: "Gender",
    dateOfBirth: "DOB",
    employeeRole: "Role",
    employeePhone: "Mobile No",
    experience: "Experience",
    employeeDateOfJoin: "Date of Joining",
    nationality: "Nationaliy",
    martialStatus: "Martial Status",
    address: "Address",
  };

  return (
    <ScrollView>
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
              height: "70%", // to display circle not in middle of overlay view
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "40%",
                height: 150,
                borderRadius: 100,
                backgroundColor: "pink",
                borderWidth: 1,
                borderColor: "#fff",
              }}
            ></View>
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
      <View style={{ marginHorizontal: 30, marginTop: 50 }}>
        {Object.entries(empDetails).map((item, index) => {
          if (item[0] !== "user") {
            return (
              <ListItem
                key={index}
                label={empLabels[item[0]]}
                value={item[1]}
              />
            );
          } else {
            return null;
          }
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default HomePage;
