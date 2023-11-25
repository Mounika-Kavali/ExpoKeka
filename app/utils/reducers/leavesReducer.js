const initialState = {
  empLeavesHistory: [],
  empLeavesSummary: {},
  isLoading: false,
  hasError: "",
};

const leavesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMP_LEAVES_SUMMARY_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_EMP_LEAVES_SUMMARY_SUCCESS":
      return {
        ...state,
        empLeavesSummary: action.payload,
        isLoading: false,
      };
    case "GET_EMP_LEAVES_SUMMARY_FAILURE":
      return {
        ...state,
        isLoading: false,
        hasError: action.error,
      };
    case "GET_LEAVES_HISTORY_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_LEAVES_HISTORY_SUCCESS":
      return {
        ...state,
        empLeavesHistory: action.payload,
        isLoading: false,
      };
    case "GET_LEAVES_HISTORY_FAILURE":
      return {
        ...state,
        isLoading: false,
        hasError: action.error,
      };
    default:
      return state;
  }
};
export default leavesReducer;
