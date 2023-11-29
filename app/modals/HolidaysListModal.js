import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { FONTS } from "../constants/Assets";

export const HolidaysListModal = ({
  show,
  title,
  showSpinner,
  modalVisibility,
  data,
}) => {
  const formattedHolidays = data.map((holiday) => {
    const date = new Date(holiday.date);
    const day = date.getDate();
    const month = date.toLocaleString("en-us", { month: "short" });

    // Creating a new object with formatted date and month
    return {
      formattedDate: `${day} ${month}`,
    };
  });

  const customDates = () => {
    return (
      <View style={{ width: "20%", height: 200, alignItems: "center" }}>
        <View>
          <Text
            style={{
              backgroundColor: "#457",
              fontSize: 20,
              fontFamily: FONTS.RobotoBold,
            }}
          >
            Jan
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 30, fontFamily: FONTS.RobotoBold }}>23</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Modal
        isVisible={show}
        onBackdropPress={() => {
          modalVisibility();
        }}
        backdropColor="#a6a6a7"
        style={{ alignItems: "center" }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>{title}</Text>
          {/* STRUCTURE */}
          <View style={{ width: "30%", alignItems: "center", borderWidth: 1 }}>
            <View style={{ width: "100%", backgroundColor: "#457" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontFamily: FONTS.RobotoBold,
                }}
              >
                Jan
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 30, fontFamily: FONTS.RobotoBold }}>
                23
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
