const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const BooksController = require("../controllers/books.controller");

router.get("/all", BooksController.getAll);

router.get("/single/:id", BooksController.getOne);

router.get("/", auth, BooksController.getMyBooks);

router.post("/", auth, BooksController.create);

router.put("/:id", auth, BooksController.update);

router.delete("/:id", auth, BooksController.delete);

module.exports = router;
