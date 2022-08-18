import { createApi } from "unsplash-js";

// API Function from https://github.com/unsplash/unsplash-js#usage
const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
})

const getURLForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

const getListOfCoffeeStorePhotos = async () => {
	const photos = await unsplash.search.getPhotos({
		query: 'coffee shop',
		perPage: 30,
	});

	const unsplashResults = photos.response.results
	return unsplashResults.map(
		(result) => result.urls["small"]
	);

	console.log({ unsplashResults });
}

export const fetchCoffeeStores = async () => {
	const photos = await getListOfCoffeeStorePhotos();
    const options = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: process.env.FOURSQUARE_API_KEY,
		}
	};

	const response = await fetch(
		getURLForCoffeeStores(
			"45.931574%2C6.766988",
			"coffee",
			6
		), 
		options
	);

	const data = await response.json();
	return data.results.map((result, index) => {
		const neighborhood = result.location.locality; // NB: Some places use location.neighborhood
		return {
			id: result.fsq_id,
			address: result.location.address,
			neighborhood: neighborhood.length > 0 ? neighborhood[0] : "",
			imgUrl: photos[index], // but also add an image URL
		}		
	});

	// .catch(err => console.error(err));
}