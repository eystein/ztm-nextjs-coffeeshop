const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

// Make const with everything from the table
const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
  // check if POST (not GET)
  if (req.method === "POST") {
    // take in request.body (from POST) and assign it the keys.
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    // use "try" so I can catch errors
    try {
      // only run if there is an id
      if (id) {
        // find a record
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

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

          if (id && name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            // Same filtering as if exists above
            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });
            // Return only the filtered records fields
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "Name is missing." });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing." });
      }
    } catch (err) {
      // console log error
      console.log("Error creating or finding a store", err);
      // Send a response
      res.status(500);
      // Also give user an error
      res.json({ message: "Error creating or finding a store", err });
    }
  }
};

export default createCoffeeStore;
