import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { FONTS } from "../constants/Assets";
import { ScrollView } from "react-native-gesture-handler";

export const HolidaysListModal = ({
  show,
  title,
  showSpinner,
  modalVisibility,
  data,
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("en-us", { month: "short" });
  const currentDay = currentDate.getDate();

  const upcomingHolidays = data.filter((holiday) => {
    const holidayYear = parseInt(holiday.Year);
    const holidayMonth = holiday.Month;
    const holidayDay = parseInt(holiday.Date);

    // Compare the year, month, and date
    if (
      holidayYear > currentYear ||
      (holidayYear === currentYear && holidayMonth > currentMonth) ||
      (holidayYear === currentYear &&
        holidayMonth === currentMonth &&
        holidayDay > currentDay)
    ) {
      return true;
    }

    return false;
  });
  // console.log(upcomingHolidays, "upcomingHolidays");

  const backgroundColorOfMonth = {
    Jan: "#9d95f7",
    Feb: "#f7d295",
    Mar: "#febdfd",
    Apr: "#95f7e7",
    May: "#d295f7",
    Jun: "#f795b0",
    Jul: "#bdf795",
    Aug: "#f7c995",
    Sep: "#f5f795",
    Oct: "#6ebe86",
    Nov: "#8ac8db",
    Dec: "#c88adb",
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
            height: 400, // for fixed modal height
            width: "100%",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONTS.RobotoMedium,
              marginBottom: 15,
            }}
          >
            {title}
          </Text>

          <ScrollView>
            <View>
              {data.map((holiday, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <View
                    style={{
                      width: "30%",
                      alignItems: "center",
                      borderWidth: 1,
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: backgroundColorOfMonth[holiday.Month],
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: holiday.UpcomingHoliday ? "#000" : "#e6e4e5",
                          paddingVertical: 3,
                          fontSize: 20,
                          fontFamily: FONTS.RobotoBold,
                        }}
                      >
                        {holiday.Month}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: FONTS.RobotoBold,
                          color: holiday.UpcomingHoliday ? "#000" : "#e6e4e5",
                        }}
                      >
                        {holiday.Date}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        margin: 10,
                        fontSize: 16,
                        fontFamily: FONTS.RobotoRegular,
                        color: holiday.UpcomingHoliday ? "#000" : "#cccbcc",
                      }}
                    >
                      {holiday.HolidayName}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
