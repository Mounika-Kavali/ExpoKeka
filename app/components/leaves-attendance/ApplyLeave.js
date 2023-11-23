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
import axios from "axios";

import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { FONTS, IMAGES, SIZES } from "../../constants/Assets";
import LeaveDetailsModal from "../../modals/BottomModals";
import { AppContext, AppDispatchContext } from "../../utils/AppContext";
import { EmployeesByPositionApi, applyLeaveApi } from "../../utils/LeavesApi";
import { employeeDetailsApi } from "../../utils/ProfileApi";
import { SafeAreaView } from "react-native-safe-area-context";

const ApplyLeave = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState(null);
  const [reason, setReason] = useState("");
  const [notifyManager, setNotifyManager] = useState(20236);
  const [isFocus, setIsFocus] = useState(false);
  const [range, setRange] = useState({});

  const [leaveDetails, setLeaveDetails] = useState({});
  const [employeeNames, setEmployeeNames] = useState([]);
  const [curMonth, setCurMonth] = useState("");

  const dispatch = useContext(AppDispatchContext);
  const state = useContext(AppContext);
  const empId = state.empId;

  const type_of_leaves = [
    { label: "Medical leave", value: "sick" },
    { label: "Casual Leave", value: "casual" },
    { label: "Unpaid leave", value: "unpaid" },
  ];

  useEffect(() => {
    setCurMonth(new Date());
    // getNotifyEmployeeNames();
  }, []);

  const getNotifyEmployeeNames = async () => {
    const position = "Manager";
    await EmployeesByPositionApi({ pos: position });
  };
  const handleApplyLeave = async () => {
    const leaveDetails = {
      from_date: fromDate,
      to_date: toDate,
      leave_type: leaveType,
      notify: notifyManager,
      reason: reason,
      status: "PENDING",
      employee: empId,
    };
    setLeaveDetails(leaveDetails);
    await applyLeaveApi({ leaveDetails });
    employeeDetailsApi({ empId, dispatch });
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
        if (newRange.endDate > newRange.startDate) {
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
                data={type_of_leaves}
                labelField="label"
                valueField="value"
                placeholder="Select Leave type"
                value={leaveType}
                onChange={(item) => {
                  setLeaveType(item.value);
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>Reason for Leave</Text>
            <TextInput
              multiline
              numberOfLines={4}
              value={reason}
              onChangeText={(text) => setReason(text)}
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 5,
                borderRadius: 10,
                color: "#865be3",
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
                data={employeeNames}
                search
                labelField="label"
                valueField="label"
                placeholder={!isFocus ? "Reporting manager " : "..."}
                searchPlaceholder="Search..."
                value={notifyManager}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setNotifyManager(item.label);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 80 }}>
            {/* <Button title="Apply" onPress={handleApplyLeave} /> */}
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
