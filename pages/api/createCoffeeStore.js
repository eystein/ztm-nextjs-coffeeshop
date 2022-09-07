const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

// Make const with everything from the table
const table = base("coffee-stores");

console.log({ table });

const createCoffeeStore = async (req, res) => {
  // check if POST (not GET)
  if (req.method === "POST") {
    // use "try" so I can catch errors
    try {
      // find a record
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="0"`,
        })
        .firstPage();

      console.log({ findCoffeeStoreRecords });

      // if it exists
      if (findCoffeeStoreRecords.length !== 0) {
        // loop the array and find the fields object
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          };
        });

        // only return the records, not the whole table
        res.json(records);
      } else {
        // create a record
        res.json({ message: "create a record" });
      }
    } catch (err) {
      // console log error
      console.log("Error finding store", err);
      // Send a response
      res.status(500);
      // Also give user an error
      res.json({ message: "Error finding store", err });
    }
  }
};

export default createCoffeeStore;
