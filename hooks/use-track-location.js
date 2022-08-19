import { useState } from "react"

const useTrackLocation = () => {
	const [locationErrorMsg, setLocationErrorMsg] = useState('');
	const [latLong, setLatLong] = useState('');

	// create success handler
	const success = (position) => {
		const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

		setLatLong(`${latitude}, ${longitude}`);
		setLocationErrorMsg(''); // Empty possible previous error msg.
	};


	// create error handler
	const error = () => {
		setLocationErrorMsg('Unable to retrieve your location');
	};

	// function triggered from button on homepage
	const handleTrackLocation = () => {
		if (!navigator.geolocation) {
			// status.textContent = 'Geolocation is not supported by your browser'; // Plain JS
			setLocationErrorMsg('Geolocation is not supported by your browser');  // React
		} else {
			// status.textContent = 'Locating…';
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};

	return {
		latLong,
		handleTrackLocation,
		locationErrorMsg,
	};
};

export default useTrackLocation;