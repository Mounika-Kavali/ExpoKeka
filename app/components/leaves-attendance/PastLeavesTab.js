import React, { useContext, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { AppContext, AppDispatchContext } from "../../utils/AppContext";
import { leavesTrackingApi } from "../../utils/LeavesApi";
import { LeavesListItem } from "../ListItem";
import LoadingSpinner from "../LoadingSpinner";

function PastLeavesTab() {
  const dispatch = useContext(AppDispatchContext);
  const state = useContext(AppContext);
  const empId = state.profile.empId;
  const EmpLeavesHistory = state.leaves.empLeavesHistory;
  const loader = state.leaves.isLoading;
  const currentDate = new Date();

  useEffect(() => {
    async function fetchData() {
      await leavesTrackingApi({ empId, dispatch });
    }
    fetchData();
  }, []);

  // Filter EmpLeavesHistory based on the condition
  const pastLeavesData = EmpLeavesHistory.filter((item) => {
    const fromDate = new Date(item.from_date);
    return fromDate <= currentDate;
  });

  return (
    <View>
      {loader ? (
        <LoadingSpinner
          visible={loader}
          size={"large"}
          styles={{ marginVertical: 40 }}
        />
      ) : (
        <>
          {pastLeavesData.map((item) => (
            <LeavesListItem
              key={item.id}
              value={`${item.from_date} - ${item.to_date}`}
              status={item.status}
              applyDays={item.number_of_days}
              leaveType={item.leave_type}
              approvedBy={item.approved_by}
            />
          ))}
        </>
      )}
    </View>
  );
}

export default PastLeavesTab;
