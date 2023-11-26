import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import { ProfileDataListItem } from "./ListItem";
import { AppContext } from "../utils/AppContext";
import DocumentPickerScreen from "./DocumentPickerScreen";

const ProfilePage = () => {
  const state = useContext(AppContext);
  const empDetails = state.profile.empDetails;

  const leaves_summary = state.leaves.empLeavesSummary;
  const annual_leaves_consumed =
    leaves_summary.total_annual_leaves -
    (leaves_summary.sick_leaves_consumed +
      leaves_summary.casual_leaves_consumed);
  const available_annual_leaves =
    leaves_summary.total_annual_leaves - annual_leaves_consumed;
  const available_sick_leaves =
    leaves_summary.total_sick_leaves - leaves_summary.sick_leaves_consumed;
  const available_casual_leaves =
    leaves_summary.total_casual_leaves - leaves_summary.casual_leaves_consumed;

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
  const Box = ({ text, borderBottomColor, available_leaves }) => (
    <View
      style={{
        width: "30%",
        height: 70,
        backgroundColor: "#adcaca",
        alignItems: "center",
        borderRadius: 8,
      }}
    >
      <View
        style={{ borderBottomWidth: 2, borderBottomColor: borderBottomColor }}
      >
        <Text
          style={{
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: 24, color: "#685cf0" }}>
          {available_leaves}
        </Text>
      </View>
    </View>
  );

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
          >
            <View
              style={{
                bottom: 0,
                position: "absolute",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Box
                  text="Annual Leaves"
                  borderBottomColor="#008B8B"
                  available_leaves={available_annual_leaves}
                />
                <Box
                  text="Sick Leaves"
                  borderBottomColor="#DB7093"
                  available_leaves={available_sick_leaves}
                />
                <Box
                  text="Casual Leaves"
                  borderBottomColor="#FF7F50"
                  available_leaves={available_casual_leaves}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* Overlaying View */}

      <View
        style={{
          width: "100%",
          height: 280,
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
              height: "60%", // to display circle not in middle of overlay view
              marginVertical: 15,
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
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 28 }}>
              {empDetails.employee_name}
            </Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>
              {empDetails.employee_role}
            </Text>
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
