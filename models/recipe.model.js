const mongoose = require("mongoose");
const recipeYupSchema = require("../schemas/recipe.schema");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  description: { type: String, trim: true, minlength: 2, maxlength: 1024 },
  image: { type: String, trim: true },
  ingredients: { type: String, trim: true },
  preparation: { type: String, trim: true },
  totalTime: { type: String, trim: true },
  tags: { type: Array },
  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  bookId: { type: mongoose.Types.ObjectId, required: true, ref: "Book" },
});

const recipeValidate = (data) =>
  recipeYupSchema.validate(data, { abortEarly: false });

const Recipe = new mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe, recipeValidate };
