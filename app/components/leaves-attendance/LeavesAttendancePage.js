import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { FONTS, IMAGES, SIZES } from "../../constants/Assets";
import LeavesTabs from "../../navigation/LeavesNavigator";

const LeavesAttendancePage = () => {
  const items = [
    {
      id: 1,
      title: "Annual Leaves",
      borderColor: "#008B8B",
      backgroundColor: "#a5d9ed",
      totalCount: "24",
      usedCount: "20",
    },
    {
      id: 2,
      title: "Sick Leaves",
      borderColor: "#DB7093",
      backgroundColor: "#f2cad7",
      totalCount: "4",
      usedCount: "9",
    },
    {
      id: 3,
      title: "Unpaid Leaves",
      borderColor: "#FF7F50",
      backgroundColor: "#ffd9cb",
      count: "6",
    },
    {
      id: 4,
      title: "Cancelled Leaves",
      borderColor: "#E9967A",
      backgroundColor: "#c7544e",
      count: "2",
    },
  ];

  const navigation = useNavigation();
  const handleApplyLeave = () => {
    navigation.navigate("FrontScreen");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: "100%",
            borderRadius: 20,
            backgroundColor: "white",
          }}
        >
          <View style={gridStyles.title}>
            <Text style={styles.h4}>All Leaves</Text>

            <TouchableOpacity onPress={handleApplyLeave}>
              <Text style={[styles.btn, styles.h6]}> + Apply Leave</Text>
            </TouchableOpacity>
          </View>
          <View style={gridStyles.rowContainer}>
            {items.slice(0, 2).map((item) => (
              <View
                key={item.id}
                style={[
                  gridStyles.gridItem,
                  {
                    borderColor: item.borderColor,
                    backgroundColor: item.backgroundColor,
                  },
                ]}
              >
                <Text style={[styles.h5, gridStyles.gridItemText]}>
                  {item.title}
                </Text>
                {item.totalCount && (
                  <View>
                    <Text style={gridStyles.gridItemText}>
                      <Text style={styles.h3}>{item.usedCount}</Text>
                      <Text style={gridStyles.totalCount}>/</Text>
                      <Text style={[styles.p, gridStyles.totalCount]}>
                        {item.totalCount}
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
          <View style={gridStyles.rowContainer}>
            {items.slice(2).map((item) => (
              <View
                key={item.id}
                style={[
                  gridStyles.gridItem,
                  {
                    borderColor: item.borderColor,
                    backgroundColor: item.backgroundColor,
                  },
                ]}
              >
                <Text style={[styles.h5, gridStyles.gridItemText]}>
                  {item.title}
                </Text>
                {item.count && (
                  <View>
                    <Text style={gridStyles.gridItemText}>
                      <Text style={styles.h3}>{item.count}</Text>
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View
        style={{
          width: "100%",
          borderRadius: 20,
          backgroundColor: "#e2eafa",
          marginTop: 50,
        }}
        >
          <View
            style={{
              
              marginTop: 20,
            }}
          >
            <LeavesTabs />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const gridStyles = StyleSheet.create({
  title: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 5,
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "40%",
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 5,
    margin: 20,
  },
  gridItemText: {
    textAlign: "left",
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  totalCount: {
    color: "black",
    fontSize: 18,
  },
});

export default LeavesAttendancePage;
