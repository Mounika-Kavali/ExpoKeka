import axios from "axios";
import {
  EMPLOYEE_DETAILS_API,
  FILE_UPLOAD_API,
} from "../environment.development";

export const employeeDetailsApi = async ({ userId, dispatch }) => {
  try {
    dispatch({ type: "GET_EMP_DETAILS_PENDING" });
    const response = await axios.get(`${EMPLOYEE_DETAILS_API}${userId}/`);
    const emp_details = response.data;

    // Dispatch action to update context
    dispatch({ type: "GET_EMP_DETAILS_SUCCESS", payload: emp_details });
  } catch (error) {
    dispatch({ type: "GET_EMP_DETAILS_FAILURE", error });
    console.error("Employee details fetching error:", error);
  }
};

export const FileUploader = async (data) => {
  try {
    console.log(data, "data");

    const inputArray = data._parts;
    console.log(inputArray, "inputArray");
    
    const response = await axios.post(`${FILE_UPLOAD_API}`, {
      method: "post",
      body: inputArray,
      headers: {
        "Content-Type": "multipart/form-data; boundary=some-unique-string",
      },
    });
    console.log("Document upload successful:", response.data);
  } catch (error) {
    console.error("Error uploading document:", error);
  }
};
