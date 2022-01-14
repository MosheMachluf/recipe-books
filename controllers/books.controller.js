const Book = require("../models/book.model");

class BooksController {

    static async getAll(req, res) {
        try {
            const books = await Book.find().populate(
                "userId",
                "_id firstName lastName"
            );
            res.send(books);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async getOne(req, res) {
        try {
            const book = await Book.findById(req.params.id).populate(
                "userId",
                "_id firstName lastName"
            );
            res.send(book);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async getMyBooks(req, res) {
        try {
            const books = await Book.find({userId: req.user._id});
            res.send(books);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async create(req, res) {
        const userId = req.user._id;

        const data = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
        };

        try {
            const book = new Book({...data, userId});
            await book.save();
            res.send({success: 1, message: "Book created", book});
        } catch (error) {
            res
                .status(500)
                .send({success: 0, message: error.message || "Failed to create book"});
        }
    }

    static async update(req, res) {
        const userId = req.user._id;

        let updatedBook = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            userId: userId,
            updatedAt: new Date(),
        };

        try {
            updatedBook = await Book.findOneAndUpdate(
                {_id: req.params.id, userId},
                updatedBook,
                {returnOriginal: false}
            );
            res.send(updatedBook);
        } catch (error) {
            res.send(error);
        }
    }

    static async delete(req, res) {
        try {
            await Book.deleteOne({_id: req.params.id, userId: req.user._id});
            res.send("Book deleted successfully");
        } catch (error) {
            res.status(500).send({message: "Failed to delete book", error});
        }
    }

}

module.exports = BooksController;
