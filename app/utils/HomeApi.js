import axios from "axios";
import { HOLIDAYS_LIST_API } from "../environment.development";

export const holidayslistApi = async () => {
  try {
    const response = await axios.get(`${HOLIDAYS_LIST_API}`);
    const holidays_list = response.data;

    return { success: true, holidays_list };
  } catch (error) {
    console.error("Holidays list fetching error:", error);
  }
};
