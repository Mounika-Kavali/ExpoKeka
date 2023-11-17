import axios from "axios";

const BASE_URL = "https://udaykiran1508.pythonanywhere.com/api/";

const loginApi = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}login/`, payload);
    const { token, userId } = response.data;

    return { success: true, token, userId };
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
};
const employeeDetailsApi = async (empId) => {
  try {
    const response = await axios.get(`${BASE_URL}employee-details/${empId}/`);
    const emp_details = response.data;
    console.log("emp_details",emp_details)
    return { success: true};
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
};

export { loginApi,employeeDetailsApi };
