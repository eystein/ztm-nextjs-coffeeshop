/*
 * Rules of API routes:
 * 1. File needs to be a function.
 * 2. Function needs to be exported by default.
 * 3. Every function should be it's own file.
 */

// 1. File needs to be a function.
// Bring in reqest and response properties
const getCoffeeStoreById = (req, res) => {
  // Declare id,  from the request query
  const { id } = req.query;

  // Wrap in a try/catch block for errors
  try {
    // Check if id exists
    if (id) {
      // return a message (can read in postman)
      res.json({ message: `Id is created: ${id}` });
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
