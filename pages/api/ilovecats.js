// 1. Create a Serverless Function called "ilovecats".

export default function handler(req, res) {
  // 2. take in a query from the request object in your function called "breed"
  const query = req.query.breed;
  // 3. Return a JSON response.
  res.status(200).json({ message: `I love ${query}` });
}
