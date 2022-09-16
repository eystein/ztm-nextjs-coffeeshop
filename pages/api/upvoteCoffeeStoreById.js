import { findRecordByFilter } from "../../lib/airtable";

const upvoteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      // res.json({ message: "this does not works", id });

      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          res.json({ message: "Coffee store id doesn't exist", id });
        }
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Error upvoting your coffeestore", error });
    }
  }
};

export default upvoteCoffeeStoreById;
