import { createContext, useReducer } from "react";
import "../styles/globals.css";

// Create context
const StoreContext = createContext();

// Constants that can be referenced with the reducer
const ACTION_TYPES = {
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
      return { ...state, coffeStores: action.payload.coffeStores };
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
    coffeStores: [],
  };

  // hook up the reducer
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
