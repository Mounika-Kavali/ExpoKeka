import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state
const initialState = {
  empDetails: null,
};

// Create the context
export const AppContext = createContext(null);
export const AppDispatchContext = createContext(null);


// Create the reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMP_DETAILS':
      return {
        ...state,
        empDetails: action.payload,
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

export { AppContextProvider};
