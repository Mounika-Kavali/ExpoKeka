import axios from "axios";
import { LOGIN_API } from "../environment.development";

export const loginApi = async ({ payload, dispatch }) => {
  try {
    dispatch({ type: "GET_LOGIN_DETAILS_PENDING" });
    const response = await axios.post(`${LOGIN_API}`, payload);
    const { token, userId } = response.data;

    // Dispatch action to update context
    dispatch({ type: "GET_LOGIN_DETAILS_SUCCESS", payload: response.data });
    return { success: true, token, userId };
  } catch (error) {
    dispatch({ type: "GET_LOGIN_DETAILS_FAILURE", error });
    return { success: false, error: "Login failed. Please try again." };
  }
};
