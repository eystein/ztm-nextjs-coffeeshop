import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  // check if POST (not GET)
  if (req.method === "POST") {
    // take in request.body (from POST) and assign it the keys.
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    // use "try" so I can catch errors
    try {
      // only run if there is an id
      if (id) {
        // Use the function from airtable.js
        const records = await findRecordByFilter(id);

        // if it exists
        if (records.length !== 0) {
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
            const records = getMinifiedRecords(createRecords); // function in airtable.js
            // Return only the filtered records fields
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "Id or name is missing." });
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
