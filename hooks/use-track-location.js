import { useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  // const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(StoreContext);

  // success handler
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`);

    // The dispatch function is provided in the state I gave the StoreProvider (_app.js)
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {
        latLong: `${latitude},${longitude}`,
      },
    });
    setLocationErrorMsg(""); // Empty possible previous error msg.
    setIsFindingLocation(false);
  };

  // error handler
  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindingLocation(false);
  };

  // function triggered from button on homepage
  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      // status.textContent = 'Geolocation is not supported by your browser'; // Plain JS
      setLocationErrorMsg("Geolocation is not supported by your browser"); // React
      setIsFindingLocation(false);
    } else {
      // status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
};

export default useTrackLocation;
