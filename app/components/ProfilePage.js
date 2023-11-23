import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import {ProfileDataListItem} from "./ListItem";
import { AppContext } from "../utils/AppContext";
import DocumentPickerScreen from "./DocumentPickerScreen";

const ProfilePage = () => {
  const state = useContext(AppContext);
  const empDetails = state.empDetails;

  const empLabels = {
    employee_id: "Employee ID",
    employee_name: "Name",
    email: "Email",
    gender: "Gender",
    date_of_birth: "DOB",
    employee_role: "Role",
    employee_phone: "Mobile No",
    experience: "Experience",
    employee_date_of_join: "Date of Joining",
    nationality: "Nationaliy",
    martial_status: "Martial Status",
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
      <View style={{ marginHorizontal: 30, marginTop: 50 }}>
        {Object.entries(empDetails).map((item, index) => {
          if (item[0] !== "user" && item[0] !== "employee_position") {
            return (
              <ProfileDataListItem
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

      <View>
        <DocumentPickerScreen />
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
