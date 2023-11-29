import axios from "axios";
import {
  EMPS_BY_POSITION_API,
  EMP_LEAVES_SUMMARY_API,
  LEAVES_TRACKING_API,
  LEAVE_APPLY_API,
} from "../environment.development";

export const leavesSummaryApi = async ({ empId, dispatch }) => {
  try {
    dispatch({ type: "GET_EMP_LEAVES_SUMMARY_PENDING" });
    const response = await axios.get(`${EMP_LEAVES_SUMMARY_API}${empId}/`);
    const leaves_summary = response.data;
    // Dispatch action to update context
    dispatch({
      type: "GET_EMP_LEAVES_SUMMARY_SUCCESS",
      payload: leaves_summary,
    });
    return { success: true, leaves_summary };
  } catch (error) {
    dispatch({ type: "GET_EMP_LEAVES_SUMMARY_FAILURE", error });
    console.error("Employee leaves history fetching error:", error);
  }
};

export const leavesTrackingApi = async ({ empId, dispatch }) => {
  try {
    dispatch({ type: "GET_LEAVES_HISTORY_PENDING" });
    const response = await axios.get(`${LEAVES_TRACKING_API}${empId}/`);
    const leaves_history = response.data;

    // Dispatch action to update context
    dispatch({ type: "GET_LEAVES_HISTORY_SUCCESS", payload: leaves_history });
  } catch (error) {
    dispatch({ type: "GET_LEAVES_HISTORY_FAILURE", error });
    console.error("Employee leaves histoty fetching error:", error);
  }
};

export const applyLeaveApi = async ({ leaveDetails, dispatch }) => {
  try {
    dispatch({ type: "POST_LEAVEAPPLY_DETAILS_PENDING" });
    const response = await axios.post(`${LEAVE_APPLY_API}`, leaveDetails);
    const status = response.data;
    dispatch({ type: "POST_LEAVEAPPLY_DETAILS_SUCCESS" });
    return { success: true, status };
  } catch (error) {
    dispatch({ type: "POST_LEAVEAPPLY_DETAILS_FAILURE", error });
    console.error("Leave Apply error:", error);
    return { success: false };
  }
};

export const EmployeesByPositionApi = async ({ pos }) => {
  try {
    const response = await axios.get(`${EMPS_BY_POSITION_API}${pos}/`);
    const empByPosition = response.data;

    return { success: true, empByPosition };
  } catch (error) {
    console.error("EmployeesByPosition API error:", error);
    return {
      success: false,
      error: "Fetching Emps by position is failed. Please try again.",
    };
  }
};
