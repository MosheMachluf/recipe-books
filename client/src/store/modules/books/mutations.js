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
    state.allBooks = payload;
    state.myBooks = payload;
  },
};
