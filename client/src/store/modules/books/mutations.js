export default {
  setAllBooks(state, payload) {
    state.allBooks = payload;
  },

  setMyBooks(state, payload) {
    state.myBooks = payload;
  },

  setBookRecipes(state, payload) {
    state.bookRecipes = payload;
  },

  setCurrentBook(state, payload) {
    state.currentBook = payload;
  },

  addBook(state, payload) {
    state.allBooks.push(payload);
    state.myBooks.push(payload);
  },

  newBookAdded(state, payload) {
    state.newBookAdded = payload;
  },

  deleteBook(state, bookId) {
    state.allBooks = state.allBooks.filter(book => book._id !== bookId);
    state.myBooks = state.myBooks.filter(book => book._id !== bookId);
  }
};
