import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { FONTS, IMAGES, SIZES } from "../constants/Assets";
import { format } from "date-fns";
import { AppContext } from "../utils/AppContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HomePage = () => {
  const state = useContext(AppContext);
  const empDetails = state.profile.empDetails;

  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEE, dd MMM yyyy");

  const [currentTime, setCurrentTime] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ width: 30, fontSize: 20, fontFamily: FONTS.RobotoMedium }}
          >
            {hours}
          </Text>
          <Text>Hr</Text>
        </View>
        <Text
          style={{ width: 15, fontSize: 20, fontFamily: FONTS.RobotoMedium }}
        >
          {" "}
          :
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ width: 35, fontSize: 20, fontFamily: FONTS.RobotoMedium }}
          >
            {minutes}
          </Text>
          <Text>Min</Text>
        </View>
        <Text
          style={{ width: 15, fontSize: 20, fontFamily: FONTS.RobotoMedium }}
        >
          {" "}
          :
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ width: 35, fontSize: 20, fontFamily: FONTS.RobotoMedium }}
          >
            {seconds}
          </Text>
          <Text>Sec</Text>
        </View>
      </View>
    );
  };

  const calculateDuration = () => {
    let hours = 0;
    let minutes = 0;

    if (checkInTime) {
      const start = currentDateTime;
      const end = new Date(); // Current time
      const durationMs = end - start;
      hours = Math.floor(durationMs / 3600000);
      minutes = Math.floor((durationMs % 3600000) / 60000);

      return `${hours}h:${minutes}m `;
    } else {
      return "0h:0m";
    }
  };

  const handleCheckInOut = () => {
    if (!checkInTime) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentDateTime(new Date());
      setCheckInTime(currentTime);

      setCheckOutTime(null);
    } else {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCheckOutTime(currentTime);
      //API CALL
      setCheckInTime(null);
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={IMAGES.mainScreen}
          resizeMode="cover"
          style={{ height: "100%" }}
        >
          <View
            style={{
              flex: 1,
              marginLeft: 20,
              marginTop: 40,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 28 }}>
              Hello, {empDetails.employee_name}
            </Text>
            <Text style={{ color: "#fff", fontSize: 18 }}>{formattedDate}</Text>
          </View>
        </ImageBackground>
      </View>

      {/* FIRST VIEW UPON SECOND VIEW */}
      <View
        style={{
          width: "80%",
          backgroundColor: "#fff",
          borderRadius: 15,
          position: "relative",
          top: "-12%",
          borderWidth: 1,
          borderColor: "white",
          elevation: 5, // Add elevation for box shadow
          shadowColor: "black",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            margin: 15,
          }}
        >
          <Text style={{ color: "#959494" }}>Logged In Duration</Text>
          <Text style={{ color: "#4c994c", fontWeight: 600 }}>
            REQUEST LEAVE
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30 }}>{currentTime}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            marginHorizontal: 30,
            alignItems: "center",
          }}
        >
          <View>
            <Text>Check In</Text>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#c3f6a7",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONTS.RobotoMedium,
                }}
              >
                {checkInTime ? checkInTime : "-"}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 30 }}>-</Text>
          <View>
            <Text>Check Out</Text>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#f6a7b1",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: FONTS.RobotoMedium }}>
                {checkOutTime ? checkOutTime : "-"}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 30, marginTop: 15 }}>
          <Text>
            <Text style={{ color: "#2030d9" }}>{calculateDuration()}</Text>
            Since Last Login
          </Text>
        </View>

        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <TouchableOpacity onPress={handleCheckInOut}>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 25,
                backgroundColor: "#d1a7f6",
                borderWidth: 1,
                borderRadius: 15,
              }}
            >
              <Text style={{ fontSize: 15, fontFamily: FONTS.RobotoMedium }}>
                {!checkInTime ? "CHECK IN" : "CHECK OUT"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* FOR 4 ICONS */}
      <View
        style={{
          width: "100%",
          top: "-5%",
          position: "relative",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={styles.iconLabelContainer}>
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: "#f7b627" }]}
            >
              <MaterialIcons name="access-time" color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.iconText}>Attendance Log</Text>
          </View>

          <View style={styles.iconLabelContainer}>
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: "#f72789" }]}
            >
              <MaterialIcons name="assignment" color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.iconText}>Timesheets</Text>
          </View>

          <View style={styles.iconLabelContainer}>
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: "#27c1f7" }]}
            >
              <MaterialIcons name="beach-access" color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.iconText}>Leave</Text>
          </View>

          <View style={styles.iconLabelContainer}>
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: "#dc27f7" }]}
            >
              <MaterialIcons name="person" color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.iconText}>HR Request</Text>
          </View>
        </View>
        {/* HOLIDAYS VIEW */}
        <View
          style={{
            width: "100%",
            marginVertical: "10%",
          }}
        >
          <LinearGradient
            colors={["#f58ed2", "#f5d68e", "#8eecf5"]}
            start={{ x: 0.6, y: 0.1 }}
            style={{
              borderRadius: 20,
            }}
          >
            <LinearGradient
              colors={["#eff58e", "transparent"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0.5, y: 0.5 }}
              style={{
                borderRadius: 20,
              }}
            >
              <View style={{ padding: 10 }}>
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                  <TouchableOpacity>
                    <Text style={{ color: "white", fontSize: 14 }}>
                      VIEW ALL
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: 30,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="calendar-today"
                      color="white"
                      size={35}
                    />
                    <Text style={{ color: "white", marginLeft: 5 }}>
                      CALENDAR
                    </Text>
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{ color: "white", fontSize: 30, fontWeight: 400 }}
                    >
                      28 Nov
                    </Text>
                    <Text style={{ color: "white", fontSize: 16 }}>Diwali</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLabelContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#000",
    marginTop: 8,
  },
});
export default HomePage;
