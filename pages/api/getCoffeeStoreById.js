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
    res.json({ message: `Id is created: ${id}` });
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

// 2. Function needs to be exported by default.
export default getCoffeeStoreById;
