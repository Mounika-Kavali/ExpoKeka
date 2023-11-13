import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Switch,
  StyleSheet,
} from "react-native";
import { DatePicker } from "react-native-week-month-date-picker";
import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from "react-native-element-dropdown";

import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
import { format, isToday, addDays } from "date-fns";
import { FONTS, IMAGES, SIZES } from "../../constants/Assets";

const ApplyLeave = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState(null);
  const [reason, setReason] = useState("");
  const [notifyManager, setNotifyManager] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const minDate = new Date();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const type_of_leaves = [
    { label: "Bereavement leave", value: "bereavementLeave" },
    { label: "Comp off's", value: "compOffsLeave" },
    { label: "Earned leave", value: "earnedLeave" },
    { label: "Marriage leave", value: "marriageLeave" },
    { label: "Unpaid leave", value: "unpaidLeave" },
  ];

  const handleApplyLeave = () => {
    console.log("Leave Applied");
  };

  return (
    <ScrollView>
      <DatePicker
        startDate={new Date()}
        markedDates={[new Date(), new Date()]}
        onDateChange={({ startDate, endDate }) => {
          setFromDate(startDate);
          setToDate(endDate);
        }}
        allowsPastDates={true}
        translations={{
          todayButtonText: "Today",
        }}
        theme={{
          primaryColor: "purple",
        }}
      />
      <View style={{ margin: 20 }}>
        <View style={styles.labelInputContainer}>
          <View style={styles.labelContainer}>
            <Text>From Date</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={fromDate}
              style={{ fontSize: SIZES.p20 }}
              readOnly={true}
            />
          </View>
        </View>

        <View style={styles.labelInputContainer}>
          <View style={styles.labelContainer}>
            <Text>To Date</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={toDate}
              style={{ fontSize: SIZES.p20 }}
              readOnly={true}
            />
          </View>
        </View>

        {/* <Picker
          selectedValue={leaveType}
          onValueChange={(itemValue) => setLeaveType(itemValue)}
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 60,
          }}
        >
          {type_of_leaves.map((typeIs) => (
            <Picker.Item key={typeIs} label={typeIs} value={typeIs} />
          ))}
        </Picker> */}
        {/* <SelectDropdown
          data={type_of_leaves}
        
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          dropdownStyle={{width:"60%",position:"absolute",backgroundColor:"pink",borderRadius:10,}}
          rowTextStyle={{fontSize:14}}
          buttonStyle={{width:"100%",backgroundColor:"white",}}
          buttonTextStyle={{color:"red",textAlign:"left"}}
        /> */}

        <View style={styles.labelInputContainer}>
          <View style={styles.labelContainer}>
            <Text>Leave type</Text>
          </View>
          <View style={styles.inputContainer}>
            <Dropdown
              placeholderStyle={{ color: "gray" }}
              selectedTextStyle={{ color: "coral" }}
              data={type_of_leaves}
              labelField="label"
              valueField="value"
              placeholder="Select Leave type"
              value={leaveType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setLeaveType(item.value);
                setIsFocus(false);
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
            }}
          />
        </View>

        <View style={styles.labelInputContainer}>
          <View style={styles.labelContainer}>
            <Text>Notify to</Text>
          </View>
          <View style={styles.inputContainer}>
            <Dropdown
              placeholderStyle={{ color: "gray" }}
              selectedTextStyle={{ color: "coral" }}
              inputSearchStyle={{ color: "grey" }}
              data={type_of_leaves}
              search
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Reporting manager " : "..."}
              searchPlaceholder="Search..."
              value={notifyManager}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setNotifyManager(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title="Apply" onPress={handleApplyLeave} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
