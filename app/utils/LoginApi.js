import axios from "axios";
import { LOGIN_API } from "../environment.development";

export const loginApi = async ({payload,dispatch}) => {
  try {
    const response = await axios.post(`${LOGIN_API}`, payload);
    console.log("LOGIN API called");
    const { token, userId } = response.data;

    // Dispatch action to update context
    dispatch({ type: "GET_LOGIN_DETAILS", payload: response.data });
    return { success: true, token, userId };
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
};
