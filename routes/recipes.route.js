const express = require("express");
const router = express.Router();
const RecipesController = require("../controllers/recipes.controller");
const auth = require("../middlewares/auth");

router.get("/", auth, RecipesController.getUserRecipes);
router.get("/all", RecipesController.getAll);
router.get("/book/:bookId", RecipesController.getRecipesByBookId);
// router.get("/search", RecipesController.search);
router.get("/:id", RecipesController.getOne);
router.post("/", auth, RecipesController.create);
router.put("/:id", auth, RecipesController.update);
router.delete("/:id", auth, RecipesController.delete);

module.exports = router;
