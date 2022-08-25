import { createContext, useReducer } from "react";

// Create context
export const StoreContext = createContext();

// Constants that can be referenced with the reducer
export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

// reducer
const storeReducer = (state, action) => {
  // action.type can be SET_LAT_LONG or SET_COFFEE_STORES
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create a provider that allows me to initialise all my states
const StoreProvider = ({ children }) => {
  // Initialise a state to give it something to work with
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };

  // hook up the reducer
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
