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

export const FileUploader = async ({ formData }) => {
  console.log(formData._parts, "FORMDATA");
  // const file = formData._parts.find((part) => part[0] === "file")[1];
  // const name = formData._parts.find((part) => part[0] === "name")[1];
  // const description = formData._parts.find((part) => part[0] === "uri")[1].uri;

  // const payload = {
  //   name,
  //   description,
  //   file,
  // };
  // console.log(payload,"PAYLOAD")
  try {
    const response = await axios.post(`${FILE_UPLOAD_API}`, formData);
    console.log("Document upload successful:", response.data);
  } catch (error) {
    console.error("Error uploading document:", error);
  }
};
