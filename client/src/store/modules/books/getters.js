export default {
  allBooks(state) {
    return state.allBooks;
  },

  myBooks(state) {
    return state.myBooks;
  },

  hasMyBooks(state) {
    return state.myBooks && state.myBooks.length > 0;
  },

  newBookAdded(state) {
    return state.newBookAdded;
  },

  bookRecipes(state) {
    return state.bookRecipes;
  },

  currentBook(state) {
    return state.currentBook;
  },
};
