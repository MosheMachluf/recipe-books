const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  description: { type: String, trim: true, minlength: 2, maxlength: 1024 },
  image: { type: String, trim: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now },
});

const Book = new mongoose.model("Book", bookSchema);

module.exports = Book;
