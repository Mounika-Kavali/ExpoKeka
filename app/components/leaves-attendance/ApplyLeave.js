import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../styles";

import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { FONTS, IMAGES, SIZES } from "../../constants/Assets";
import LeaveDetailsModal from "../../modals/BottomModals";
import { AppContext, AppDispatchContext } from "../../utils/AppContext";
import {
  EmployeesByPositionApi,
  applyLeaveApi,
  leavesSummaryApi,
  leavesTrackingApi,
} from "../../utils/LeavesApi";
import { employeeDetailsApi } from "../../utils/ProfileApi";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfirmModal from "../../modals/BottomModals";

const ApplyLeave = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState(null);
  const [reason, setReason] = useState("");
  const [notifyManager, setNotifyManager] = useState(null);
  const [notifyManagerId, setNotifyManagerId] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [range, setRange] = useState({});

  const [leaveDetails, setLeaveDetails] = useState({});
  const [curMonth, setCurMonth] = useState("");

  const [managerList, setManagerList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useContext(AppDispatchContext);
  const state = useContext(AppContext);
  const empId = state.profile.empId;
  const loader = state.leaves.isLoading; // loader in bottomModal
  const hasError = state.leaves.hasError; // thumbdown in bottom Modal
  const leaves_summary = state.leaves.empLeavesSummary;

  const available_sick_leaves =
    leaves_summary.total_sick_leaves - leaves_summary.sick_leaves_consumed;
  const available_casual_leaves =
    leaves_summary.total_casual_leaves - leaves_summary.casual_leaves_consumed;

  const type_of_leaves = [
    {
      label: "Medical leave",
      value: "sick",
      availableLeaves: available_sick_leaves,
    },
    {
      label: "Casual Leave",
      value: "casual",
      availableLeaves: available_casual_leaves,
    },
    { label: "Unpaid leave", value: "unpaid" },
  ];

  useEffect(() => {
    setCurMonth(new Date());
    getNotifyEmployeeNames();
  }, []);

  const getNotifyEmployeeNames = async () => {
    const position = "Manager";
    const { empByPosition } = await EmployeesByPositionApi({ pos: position });
    console.log(empByPosition, "empByPosition");
    const list = empByPosition.map((employee) => ({
      label: employee.employee_name,
      value: employee.employee_id,
    }));
    setManagerList(list);
  };
  const handleApplyLeave = async () => {
    setModalVisible(true); //to get bottom modal

    const leaveDetails = {
      from_date: fromDate,
      to_date: toDate,
      leave_type: leaveType,
      notify: notifyManagerId,
      reason: reason,
      status: "PENDING",
      employee: empId,
    };
    console.log(leaveDetails, "leaveDetails");
    setLeaveDetails(leaveDetails);
    await applyLeaveApi({ leaveDetails, dispatch });
    leavesTrackingApi({ empId, dispatch });

    //to update leaves summary
    await leavesSummaryApi({
      empId,
      dispatch,
    });
  };

  function CustomCalendar(props) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1
    const minDateString = format(currentDate, "yyyy-MM-dd");

    // Create the initial date in the 'YYYY-MM-DD' format
    const initDate = `${currentYear}-${
      currentMonth < 10 ? "0" : ""
    }${currentMonth}-01`;

    // Using useMemo to perform calculations only if range is modified
    const marked = useMemo(() => {
      let start = new Date(range.startDate).getTime();
      let end = new Date(range.endDate || range.startDate).getTime();
      let dat = new Date(1);
      let marked = {};
      // Mark the current date
      const currentDayStr = format(currentDate, "yyyy-MM-dd");
      marked[currentDayStr] = {
        marked: true,
        selected: true,
        selectedColor: "blue",
        selectedTextColor: "pink",
        dotColor: "red",
        textColor: "blue",
      };
      for (let cur = start; cur <= end; cur += 60 * 60 * 24000) {
        let curDate = new Date(cur);
        let curStr = curDate.toISOString().substr(0, 10);
        marked[curStr] = {
          selected: true,
          color: "yellow",
          textColor: "black",
          startingDay: cur == start,
          endingDay: cur == end,
        };
      }

      return marked;
    }, [range.startDate, range.endDate, currentDate]);

    function handleDayPress(day) {
      if (range.startDate && !range.endDate) {
        let newRange = { ...range, ...{ endDate: day.dateString } };
        props.onRangeSelected && props.onRangeSelected(newRange);
        setRange(newRange);
        if (newRange.endDate >= newRange.startDate) {
          setFromDate(format(new Date(range.startDate), "yyyy-MM-dd"));
          setToDate(format(new Date(day.dateString), "yyyy-MM-dd"));
        }
      } else {
        // startDate isn't selected. Start the range selection
        setRange({
          startDate: day.dateString,
        });
        // Update the current month when a day is pressed
        setCurMonth(new Date(day.dateString));
      }
    }

    return (
      <View>
        <Calendar
          // initialDate={initDate}
          minDate={minDateString}
          firstDay={1} // week starts from monday
          current={curMonth}
          key={curMonth}
          markingType={"period"}
          markedDates={marked}
          disableAllTouchEventsForDisabledDays={true}
          onDayPress={handleDayPress}
          {...props}
          theme={{
            "stylesheet.calendar.header": {
              dayTextAtIndex6: {
                color: "green",
              },
            },
            monthTextColor: "#57B9BB",
            arrowColor: "#57B9BB",
            textDayFontWeight: "800",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "800",
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ margin: 20 }}>
          <CustomCalendar />

          {toDate ? (
            <>
              <View style={leaveApplyStyles.labelInputContainer}>
                <View style={leaveApplyStyles.labelContainer}>
                  <Text>From Date</Text>
                </View>
                <View style={leaveApplyStyles.inputContainer}>
                  <TextInput
                    value={fromDate}
                    style={{ fontSize: SIZES.p15 }}
                    readOnly={true}
                  />
                </View>
              </View>

              <View style={leaveApplyStyles.labelInputContainer}>
                <View style={leaveApplyStyles.labelContainer}>
                  <Text>To Date</Text>
                </View>
                <View style={leaveApplyStyles.inputContainer}>
                  <TextInput
                    value={toDate}
                    style={{ fontSize: SIZES.p15 }}
                    readOnly={true}
                  />
                </View>
              </View>
            </>
          ) : (
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              Please select the From Date & To Date in above calendar!
            </Text>
          )}

          <View style={leaveApplyStyles.labelInputContainer}>
            <View style={leaveApplyStyles.labelContainer}>
              <Text>Leave type</Text>
            </View>
            <View style={leaveApplyStyles.inputContainer}>
              <Dropdown
                placeholderStyle={{ color: "gray" }}
                selectedTextStyle={{ color: "#865be3" }}
                data={type_of_leaves.map((item) => ({
                  ...item,
                  disabled: item.availableLeaves <= 0,
                }))}
                labelField="label"
                valueField="value"
                placeholder="Select Leave type"
                value={leaveType}
                dropdownPosition="bottom"
                renderItem={(item, isSelected) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (!item.disabled) {
                        setLeaveType(item.value);
                      } else {
                        setLeaveType(null);
                      }
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: isSelected ? "#fae4f9" : "#fff",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: item.disabled
                            ? "#777"
                            : isSelected
                            ? "#865be3"
                            : "#000",
                        }}
                      >
                        {item.label}
                      </Text>
                      {item.availableLeaves && (
                        <Text style={{ color: "gray", fontSize: 12 }}>
                          {item.availableLeaves} Available
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                //when disabled option is clicked onChange() is triggered.
                onChange={(selectedItem) => {
                  setLeaveType(null);
                  console.log("Selected Item: ", selectedItem);
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>Reason for Leave</Text>
            <TextInput
              multiline
              numberOfLines={3}
              value={reason}
              onChangeText={(text) => setReason(text)}
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 5,
                borderRadius: 10,
                color: "#865be3",
                fontSize: 18,
              }}
            />
          </View>

          <View style={leaveApplyStyles.labelInputContainer}>
            <View style={leaveApplyStyles.labelContainer}>
              <Text>Notify to</Text>
            </View>
            <View style={leaveApplyStyles.inputContainer}>
              <Dropdown
                placeholderStyle={{ color: "gray" }}
                selectedTextStyle={{ color: "#865be3" }}
                inputSearchStyle={{ color: "grey" }}
                data={managerList}
                search
                labelField="label"
                valueField="value"
                value={notifyManagerId}
                dropdownPosition="top"
                placeholder={!isFocused ? "Reporting manager " : "..."}
                searchPlaceholder="Search..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                // renderItem={(item, isSelected) => (
                //   <TouchableOpacity
                //     onPress={() => {
                //       setNotifyManager(item.label);
                //       setNotifyManagerId(item.value);
                //       setIsFocused(false);
                //     }}
                //     style={{
                //       padding: 10,
                //       backgroundColor: isSelected ? "#fae4f9" : "#fff",
                //     }}
                //   >
                //     <Text
                //       style={{
                //         color: isSelected ? "#865be3" : "#000",
                //       }}
                //     >
                //       {item.label}
                //     </Text>
                //   </TouchableOpacity>
                // )}
                onChange={(item) => {
                  setNotifyManager(item.label);
                  setNotifyManagerId(item.value);
                  setIsFocused(false);
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 80 }}>
            <TouchableOpacity onPress={handleApplyLeave}>
              <Text
                style={[
                  styles.btn,
                  { textAlign: "center", paddingVertical: 10, fontSize: 16 },
                ]}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {
              <ConfirmModal
                show={modalVisible}
                title="Leave Request"
                okButtonText="Done"
                showSpinner={loader}
                error={hasError}
                okButtonColor="#865be3"
                handleOkButton={() => setModalVisible(false)} // Close the modal when the OK button is pressed
              />
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const leaveApplyStyles = StyleSheet.create({
  labelInputContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
    backgroundColor: "white",
  },
  labelContainer: {
    marginStart: 12,
  },
  inputContainer: {
    paddingLeft: 12,
    paddingBottom: 5,
  },
});

export default ApplyLeave;
