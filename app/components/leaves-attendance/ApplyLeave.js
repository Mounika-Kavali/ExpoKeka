import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { format,isToday  } from 'date-fns';

function CustomCalendar(props) {
    // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1

    // Create the initial date in the 'YYYY-MM-DD' format
    const initDate = `${currentYear}-${currentMonth < 10 ? '0' : ''}${currentMonth}-01`;

  const [range, setRange] = useState({});

  // Using useMemo to perform calculations only if range is modified
  const marked = useMemo(() => {
    if (!range.startDate) return {};

    let start = new Date(range.startDate).getTime();
    let end = new Date(range.endDate || range.startDate).getTime();
    let marked = {};

    for (let cur = start; cur <= end; cur += 60 * 60 * 24000) {
        let curDate = new Date(cur);
      let curStr = new Date(cur).toISOString().substr(0, 10);
      marked[curStr] = {
        selected: true,
        color: '#aabbee',
        textColor: 'black',
        startingDay: cur == start,
        endingDay: cur == end,
      };
      if (isToday(curDate)) {
        marked[curStr].dots = [{ key: 'today', color: 'red', selectedDotColor: 'red' }];
      }
    }
    return marked;
  }, [range]);

  function handleDayPress(day) {
    if (range.startDate && !range.endDate) {
      // startDate is selected. Complete the range selection
      let newRange = { ...range, ...{ endDate: day.dateString } };
      props.onRangeSelected && props.onRangeSelected(newRange);
      setRange(newRange);
    } else {
      // startDate isn't selected. Start the range selection
      setRange({
        startDate: day.dateString,
      });
    }
  }

  return (
    <View>
      <Calendar
        initialDate={initDate}
        markedDates={marked}
        markingType="period"
        onDayPress={handleDayPress}
        {...props}
      />
    </View>
  );
}

const ApplyLeave = () => {
  const [fromDate, setFromDate] = useState(''); // Initialize fromDate state
  const [toDate, setToDate] = useState(''); // Initialize toDate state
  const [leaveType, setLeaveType] = useState('Vacation');
  const [reason, setReason] = useState('');
  const [notifyManager, setNotifyManager] = useState(false);

  const type_of_leaves = [
    'Bereavement leave',
    "Comp off's",
    'Earned leave',
    'Marriage leave',
    'Unpaid leave',
  ];

  const handleApplyLeave = () => {
    console.log('Leave Applied');
  };

  return (
    <ScrollView>
      <View style={{ margin: 20 }}>
        <CustomCalendar
          onRangeSelected={(range) => {
            // Update the fromDate and toDate state based on the selected range
            // Format and set the fromDate and toDate in the "DD-MM-YYYY" format
            setFromDate(format(new Date(range.startDate), 'dd-MM-yyyy'));
            setToDate(format(new Date(range.endDate || range.startDate), 'dd-MM-yyyy'));
         }}
        />

        <Text>From Date</Text>
        <TextInput
          value={fromDate}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
          }}
          readOnly={true}
        />

        <Text>To Date</Text>
        <TextInput
          value={toDate}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
          }}
          readOnly={true}
        />

        <Text>Select Type of Leave</Text>
        <Picker
          selectedValue={leaveType}
          onValueChange={(itemValue) => setLeaveType(itemValue)}
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 60,
          }}
        >
          {type_of_leaves.map((typeIs) => (
            <Picker.Item key={typeIs} label={typeIs} value={typeIs} />
          ))}
        </Picker>

        <Text>Reason for Leave</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={reason}
          onChangeText={(text) => setReason(text)}
          style={{ borderWidth: 1, borderColor: 'gray', padding: 5 }}
        />

        <Text>Notify to Manager</Text>
        <Switch
          value={notifyManager}
          onValueChange={(value) => setNotifyManager(value)}
        />

        <Button title="Apply" onPress={handleApplyLeave} />
      </View>
    </ScrollView>
  );
};

export default ApplyLeave;
