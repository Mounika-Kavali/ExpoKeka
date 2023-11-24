import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/index";
import { useNavigation } from "@react-navigation/native";
import { FONTS, IMAGES, SIZES } from "../../constants/Assets";
import LeavesTabs from "../../navigation/LeavesNavigator";
import { AppContext, AppDispatchContext } from "../../utils/AppContext";
import {
  EmployeesByPositionApi,
  leavesSummaryApi,
} from "../../utils/LeavesApi";
import { LeavesOverviewListItem } from "../ListItem";

const LeavesAttendancePage = () => {
  const navigation = useNavigation();
  const dispatch = useContext(AppDispatchContext);
  const state = useContext(AppContext);
  const empId = state.empId;

  useEffect(() => {
    getEmpLeavesSummary();
  }, []);
  const getEmpLeavesSummary = async () => {
    await leavesSummaryApi({
      empId,
      dispatch,
    });
  };
  const leaves_summary = state.empLeavesSummary;
  const annual_leaves_consumed =
    leaves_summary.total_annual_leaves -
    (leaves_summary.sick_leaves_consumed +
      leaves_summary.casual_leaves_consumed);

  const AllLeaves = {
    1: {
      id: 1,
      label: "Annual Leaves",
      consumedLeaves: annual_leaves_consumed,
      totalLeaves: leaves_summary.total_annual_leaves,
      styles: { borderColor: "#008B8B", backgroundColor: "#a5d9ed" },
    },
    2: {
      id: 2,
      label: "Sick Leaves",
      consumedLeaves: leaves_summary.sick_leaves_consumed,
      totalLeaves: leaves_summary.total_sick_leaves,
      styles: { borderColor: "#DB7093", backgroundColor: "#f2cad7" },
    },
    3: {
      id: 3,
      label: "Casual Leaves",
      consumedLeaves: leaves_summary.casual_leaves_consumed,
      totalLeaves: leaves_summary.total_casual_leaves,
      styles: { borderColor: "#FF7F50", backgroundColor: "#ffd9cb" },
    },
    4: {
      id: 4,
      label: "Unpaid Leaves",
      consumedLeaves: leaves_summary.unpaid_leaves_consumed,
      styles: { borderColor: "#cd2921", backgroundColor: "#f7a7a3" },
    },
  };

  const handleApplyLeave = () => {
    navigation.navigate("ApplyLeave");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
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

          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {Object.values(AllLeaves).map(
                ({ id, label, consumedLeaves, totalLeaves, styles }) => (
                  <LeavesOverviewListItem
                    key={id}
                    label={label}
                    consumedLeaves={consumedLeaves}
                    totalLeaves={totalLeaves}
                    leaveStyles={styles}
                  />
                )
              )}
            </View>
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
});

export default LeavesAttendancePage;
