const initialState = {
  empLeavesHistory: [],
  empLeavesSummary: {},
  isLoading: false,
  hasError: "",
};

const homeReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case "GET_EMP_LEAVES_SUMMARY_PENDING":
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     case "GET_EMP_LEAVES_SUMMARY_SUCCESS":
  //       return {
  //         ...state,
  //         empLeavesSummary: action.payload,
  //         isLoading: false,
  //       };
  //     case "GET_EMP_LEAVES_SUMMARY_FAILURE":
  //       return {
  //         ...state,
  //         isLoading: false,
  //         hasError: action.error,
  //       };
  //     default:
  //       return state;
  //   }
};
export default homeReducer;
