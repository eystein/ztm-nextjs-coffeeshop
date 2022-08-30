import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  // configure latLong and limit

  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, 6);

    // return, otherwise it gets stuck in a loop
    res.status(200);
    res.json(response);
  } catch (err) {
    console.error("There is an error", err);
    // return, otherwise it gets stuck in a loop
    res.status(500);
    res.json({ message: "oh no! something went wrong.", err });
  }
};

export default getCoffeeStoresByLocation;
