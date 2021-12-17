import Vue from "vue";
import Vuex from "vuex";

import authModule from "./modules/auth";
import booksModule from "./modules/books";
import recipesModule from "./modules/recipes";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
    books: booksModule,
    recipes: recipesModule,
  },
});
