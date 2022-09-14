/*
 * Rules of API routes:
 * 1. File needs to be a function.
 * 2. Function needs to be exported by default.
 * 3. Every function should be it's own file.
 */

import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

// 1. File needs to be a function.
// Bring in reqest and response properties
const getCoffeeStoreById = async (req, res) => {
  // Declare id,  from the request query
  const { id } = req.query;

  // Wrap in a try/catch block for errors
  try {
    // If there is an ID
    if (id) {
      // Use the function from airtable.js
      const records = await findRecordByFilter(id);
      // If it exists -> retrieve it.
      if (records.length !== 0) {
        // only return the records, not the whole table
        res.json(records);
      } else {
        res.json({ message: `id could not be found` });
      }
    } else {
      // return an error message (can read in postman)
      res.status(400);
      res.json({ message: "Id is missing" });
    }
  } catch (error) {
    // return an error message (can read in postman)
    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

// 2. Function needs to be exported by default.
export default getCoffeeStoreById;
