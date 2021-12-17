const { Recipe, recipeValidate } = require("../models/recipe.model");
const Book = require("../models/book.model");

class RecipesController {
  static async getAll(req, res) {
    try {
      const recipes = await Recipe.find({
        userId: req.user._id,
      });

      res.status(200).send(recipes);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }

  static async getRecipesByBookId(req, res) {
    try {
      const recipes = await Recipe.find({ bookId: req.params.bookId });
      res.status(200).send(recipes);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }

  static async getUserRecipes(req, res) {
    try {
      const recipes = await Recipe.find({ userId: req.user._id });
      res.status(200).send(recipes);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }

  static async search(req, res) {}

  static async getOne(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    res.send(recipe);
  }

  static async create(req, res) {
    const checkBook = await Book.findOne({ _id: req.body.bookId });
    if (!checkBook) return res.status(400).send("Book not found");

    const {
      title,
      description,
      image,
      ingredients,
      preparation,
      totalTime,
      tags,
      bookId,
    } = req.body;

    let recipe = {
      title,
      description,
      image,
      ingredients,
      preparation,
      totalTime,
      tags,
      bookId,
    };
    // try {
    //   recipe = await recipeValidate(req.body);
    // } catch ({ errors }) {
    //   return res.status(400).send(errors[0]);
    // }

    try {
      recipe = new Recipe(recipe);
      recipe.userId = req.user._id;
      await recipe.save(recipe);

      return res.send(recipe);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send({ messgae: "Failed to create post", error });
    }
  }

  static async update(req, res) {
    let recipe;

    try {
      recipe = await recipeValidate(req.body);
    } catch ({ errors }) {
      return res.status(400).send(errors[0]);
    }

    recipe.updatedAt = new Date();

    try {
      let newRecipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        recipe
      );
      if (!recipe) return res.status(404).send("Recipe not found");
      newRecipe = { ...newRecipe._doc, ...recipe };
      return res.send(newRecipe);
    } catch (error) {
      return res
        .status(400)
        .send({ messgae: "Failed to update post", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await Recipe.deleteOne({ _id: req.params.id, userId: req.user._id });
      res.send("Transaction deleted successfully");
    } catch (error) {
      res.status(500).send({ message: "Failed to delete transaction", error });
    }
  }
}

module.exports = RecipesController;
