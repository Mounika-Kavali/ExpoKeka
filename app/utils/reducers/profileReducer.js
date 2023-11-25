const initialState = {
  empId: 0,
  empDetails: null,
  isLoading: false,
  hasError: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMP_DETAILS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_EMP_DETAILS_SUCCESS":
      const { employee_id } = action.payload;
      return {
        ...state,
        empDetails: action.payload,
        empId: employee_id,
        isLoading: false,
      };
    case "GET_EMP_DETAILS_FAILURE":
      return {
        ...state,
        isLoading: false,
        hasError: action.error,
      };
    default:
      return state;
  }
};
export default profileReducer;
