import { useContext } from "react";
import axios from "axios";
import { EMPLOYEE_DETAILS_API, LOGIN_API } from "../environment.development";

const loginApi = async (payload) => {
  try {
    const response = await axios.post(`${LOGIN_API}`, payload);
    console.log("LOGIN API called");
    const { token, userId } = response.data;

    return { success: true, token, userId };
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
};
const employeeDetailsApi = async ({ empId, dispatch }) => {
  try {
    const response = await axios.get(`${EMPLOYEE_DETAILS_API}${empId}/`);
    const emp_details = response.data;

    // Dispatch action to update context
    dispatch({ type: "SET_EMP_DETAILS", payload: emp_details });
    return { success: true, emp_details };
  } catch (error) {
    console.error("Employee details fetching error:", error);
    return {
      success: false,
      error: "Emp details fetching failed. Please try again.",
    };
  }
};

export { loginApi, employeeDetailsApi };
