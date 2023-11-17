// reducers.js
import { GET_STARTED_BUTTON } from "../actions/action-types";

const initialState = {
  buttonClicked: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STARTED_BUTTON:
      return {
        ...state,
        buttonClicked: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
