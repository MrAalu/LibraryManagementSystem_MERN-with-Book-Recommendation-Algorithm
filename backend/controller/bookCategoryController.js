// Fetches Books Category
const BooksModel = require("../models/bookScheme");

const postBookCategory = async (req, res) => {
  const userInputCategory = req.body.user_input_category; // Access the specific field

  // Use a regular expression to match categories containing the user input letters
  const similarCategories = await BooksModel.distinct("category", {
    category: { $regex: userInputCategory, $options: "i" },
  });

  return res.status(200).json({
    success: true,
    book_category: similarCategories,
  });
};

module.exports = {
  postBookCategory,
};
