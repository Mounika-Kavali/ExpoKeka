import React, { createContext, useReducer, useContext } from "react";

// Define the initial state
const initialState = {
  token: "",
  empId: 0,
  empDetails: null,
  empLeavesHistory: [],
  empLeavesSummary: {},
};

// Create the context
export const AppContext = createContext(null);
export const AppDispatchContext = createContext(null);

// Create the reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case "GET_LOGIN_DETAILS":
      console.log(action.payload.token, "action.payload.token");
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case "GET_EMP_DETAILS":
      const { employee_id } = action.payload;
      return {
        ...state,
        empDetails: action.payload,
        empId: employee_id,
      };
    case "GET_EMP_LEAVES_SUMMARY":
      return {
        ...state,
        empLeavesSummary: action.payload,
      };
    case "GET_LEAVES_HISTORY":
      return {
        ...state,
        empLeavesHistory: action.payload,
      };
    default:
      return state;
  }
};

// Create the context provider
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
// export const useAppContext = () => {
//   return useContext(AppContext);
// };

export { AppContextProvider };
