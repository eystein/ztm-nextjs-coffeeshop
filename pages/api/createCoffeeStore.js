const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

// Make const with everything from the table
const table = base("coffee-stores");

const createCoffeeStore = (req, res) => {
  // check if the API can POST or GET
  if (req.method === "POST") {
    res.json({ message: "hi there!" });
  } else {
    res.json({ message: "method is GET" });
  }
};

export default createCoffeeStore;
