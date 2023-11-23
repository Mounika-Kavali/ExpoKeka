import axios from "axios";
import {
  EMPS_BY_POSITION_API,
  EMP_LEAVES_SUMMARY_API,
  LEAVES_TRACKING_API,
  LEAVE_APPLY_API,
} from "../environment.development";

export const leavesSummaryApi = async ({ empId, dispatch }) => {
  try {
    const response = await axios.get(`${EMP_LEAVES_SUMMARY_API}${empId}/`);
    const leaves_summary = response.data;
    console.log(leaves_summary, "leaves_summary");
    // Dispatch action to update context
    dispatch({ type: "GET_EMP_LEAVES_SUMMARY", payload: leaves_summary });
    return { success: true, leaves_summary };
  } catch (error) {
    console.error("Employee leaves histoty fetching error:", error);
  }
};

export const leavesTrackingApi = async ({ empId, dispatch }) => {
  try {
    const response = await axios.get(`${LEAVES_TRACKING_API}${empId}/`);
    const leaves_history = response.data;

    // Dispatch action to update context
    dispatch({ type: "GET_LEAVES_HISTORY", payload: leaves_history });
  } catch (error) {
    console.error("Employee leaves histoty fetching error:", error);
  }
};

export const applyLeaveApi = async ({ leaveDetails }) => {
  try {
    console.log(leaveDetails, "leaveDetails");
    const response = await axios.post(`${LEAVE_APPLY_API}`, leaveDetails);
    const status = response.data;
    return { success: true, status };
  } catch (error) {
    console.error("Leave Apply error:", error);
    return { success: false };
  }
};

export const EmployeesByPositionApi = async ({ pos }) => {
  try {
    const response = await axios.get(`${EMPS_BY_POSITION_API}${pos}/`);
    const empByPosition = response.data;
    console.log(empByPosition, "empByPosition");
    return { success: true, empByPosition };
  } catch (error) {
    console.error("EmployeesByPosition API error:", error);
    return {
      success: false,
      error: "Fetching Emps by position is failed. Please try again.",
    };
  }
};
