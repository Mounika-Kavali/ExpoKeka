const initialState = {
  token: "",
  userId: 0,
  isLoading: false,
  hasError: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOGIN_DETAILS_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_LOGIN_DETAILS_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isLoading: false,
      };
    case "GET_LOGIN_DETAILS_FAILURE":
      return {
        ...state,
        isLoading: false,
        hasError: action.error,
      };

    default:
      return state;
  }
};
export default loginReducer;
