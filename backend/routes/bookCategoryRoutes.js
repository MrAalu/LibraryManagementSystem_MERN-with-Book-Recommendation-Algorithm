const express = require("express");
const bookCategoryRouter = express.Router();

const { postBookCategory } = require("../controller/bookCategoryController");

bookCategoryRouter.route("/").post(postBookCategory);

module.exports = bookCategoryRouter;
