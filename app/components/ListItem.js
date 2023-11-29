import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/index";
import { FONTS } from "../constants/Assets";

export const ProfileDataListItem = ({ label, value }) => (
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
      style={{
        width: "40%",
        fontWeight: "600",
        fontSize: 16,
        fontFamily: FONTS.RobotoRegular,
      }}
    >
      {label}
    </Text>
    <Text
      style={{
        width: "60%",
        textAlign: "right",
        fontFamily: FONTS.RobotoRegular,
        fontSize: 14,
        color: "#3e2e7e",
      }}
    >
      {value}
    </Text>
  </View>
);

export const LeavesListItem = ({
  value,
  status,
  applyDays,
  leaveType,
  approvedBy,
}) => {
  const ListItem = ({ title, subtitle, styles }) => {
    return (
      <View style={styles}>
        <Text style={{ fontSize: 14, fontFamily: FONTS.RobotoRegular }}>
          {title}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 14,
            fontFamily: FONTS.RobotoBold,
          }}
        >
          {subtitle}
        </Text>
      </View>
    );
  };

  const COLOR = {
    APPROVED: "#63f0ee",
    PENDING: "#92944a",
    CANCELLED: "#e4a89f",
  };
  const BGCOLOR = {
    APPROVED: "#d3f9f9",
    PENDING: "#e3e718",
    CANCELLED: "#d44530",
  };
  return (
    <View
      style={{
        alignItems: "center",
        marginHorizontal: "10%",
      }}
    >
      <View
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 20,
          marginVertical: 20,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#8d8d8e",
        }}
      >
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <ListItem
              title={`Date`}
              subtitle={value}
              styles={{ width: "70%" }}
            />
            {status && (
              <View>
                <Text
                  style={{
                    color: COLOR[status],
                    backgroundColor: BGCOLOR[status],
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 12,
                  }}
                >
                  {status}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#8d8d8e",
              marginVertical: 10,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <ListItem
              title={`Apply Days`}
              subtitle={applyDays}
              styles={{ width: "30%" }}
            />
            <ListItem
              title={`Leave Type`}
              subtitle={leaveType}
              styles={{ width: "30%" }}
            />
            <ListItem
              title={
                status === "APPROVED" || status === "PENDING"
                  ? "Approved By"
                  : "Cancelled By"
              }
              styles={{ width: "35%" }}
              subtitle={approvedBy}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export const LeavesOverviewListItem = ({
  label,
  consumedLeaves,
  totalLeaves,
  leaveStyles,
}) => {
  return (
    <View style={{ width: 150, justifyContent: "space-around" }}>
      <View
        style={[
          leaveStyles,
          {
            width: "100%",
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 5,
            margin: 10,
          },
        ]}
      >
        <Text
          style={{
            textAlign: "left",
            paddingTop: 5,
            paddingBottom: 10,
            paddingLeft: 5,
            fontSize: 16,
            fontFamily: FONTS.RobotoBold,
          }}
        >
          {label}
        </Text>

        <View>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 5,
              alignItems: "baseline",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontFamily: FONTS.RobotoBold,
              }}
            >
              {consumedLeaves}
            </Text>
            {totalLeaves && (
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FONTS.RobotoRegular,
                }}
              >
                /{totalLeaves}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
