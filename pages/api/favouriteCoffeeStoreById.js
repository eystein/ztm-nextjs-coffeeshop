import { findRecordByFilter, table } from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    // const { id } = req.query;
    // res.json({ message: "body is", id });
    try {
      const { id } = req.query;

      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          // I already know record exists because of the check above
          const record = records[0];

          // parseInt, turn a string into a number
          const calculateVoting = parseInt(record.voting) + parseInt(1);

          // check that it works
          console.log({ calculateVoting, id: record.id });

          // update a record
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);

          if (updateRecord) {
            return res.json(updateRecord);
          }

          res.json(records);
        } else {
          res.json({ message: "Coffee store id doesn't exist", id });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Error upvoting coffee store", error });
    }
  }
};

export default favouriteCoffeeStoreById;
