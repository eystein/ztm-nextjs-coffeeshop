import { createContext } from "react";
import "../styles/globals.css";

// Create context
const StoreContext = createContext();

// Create a provider that allows me to initialise all my states
const StoreProvider = ({ children }) => {
  // Initialise a state to give it something to work with
  const initialState = {
    latLong: "",
    coffeStores: [],
  };

  return (
    <StoreContext.Provider value={{ state: initialState }}>
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
