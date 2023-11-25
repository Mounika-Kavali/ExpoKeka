import React, { createContext, useReducer, useContext } from "react";
import { combineReducers } from "redux";
import loginReducer from "./reducers/loginReducer";
import profileReducer from "./reducers/profileReducer";
import leavesReducer from "./reducers/leavesReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  leaves: leavesReducer,
});

const initialAppState = {
  login: {
    token: "",
    userId: 0,
    isLoading: false,
    hasError: "",
  },
  profile: {
    empId: 0,
    empDetails: null,
    isLoading: false,
    hasError: "",
  },
  leaves: {
    empLeavesHistory: [],
    empLeavesSummary: {},
    isLoading: false,
    hasError: "",
  },
};

// Create the context
export const AppContext = createContext(null);
export const AppDispatchContext = createContext(null);

// Create the context provider
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialAppState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

//CUSTOM HOOK
// const SignInPage = () => {
//   const { state, dispatch } = useAppContext();
//   const loader = state.login.isLoading;

// const useAppContext = () => {
//   const state = useContext(AppContext);
//   const dispatch = useContext(AppDispatchContext);
//   return { state, dispatch };
// };

export { AppContextProvider };
