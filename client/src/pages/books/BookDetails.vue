<template>
  <card-loading v-if="isLoading"></card-loading>
  <v-card v-else-if="book" min-height="75vh" rounded="lg">
    <v-img
      :src="book.image || require('@/assets/recipe-placeholder.webp')"
      :lazy-src="book.image || require('@/assets/recipe-placeholder.webp')"
      height="200px"
      class="white--text align-end"
      gradient="to top, rgba(0, 0, 0, 0.7) 20%, transparent 70%"
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-row>
      </template>
      <v-card-title> {{ book.title }} </v-card-title>
    </v-img>

    <v-card-text>
      {{ book.description }}
    </v-card-text>

    <v-expansion-panels flat tile :value="0" v-if="hasRecipes">
      <v-expansion-panel>
        <v-expansion-panel-header> תוכן עניינים: </v-expansion-panel-header>
        <v-expansion-panel-content v-for="recipe in recipes" :key="recipe._id">
          <router-link
            :to="{ name: 'RecipeDetails', params: { recipeId: recipe._id } }"
            >{{ recipe.title }}</router-link
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card-text v-else>
      עדיין אין מתכונים בספר
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center my-5 flex-wrap">
      <v-btn
        v-if="hasRecipes"
        :to="recipesLink"
        color="success"
        min-width="150px"
        large
        depressed
        block
        class="mb-3"
      >
        <span class="font-weight-bold" style="font-size: 16px">
          המשך למתכונים
        </span>
      </v-btn>
      <v-btn
          v-else-if="isUserBook"
          :to="addRecipeLink"
          color="success"
          min-width="150px"
          large
          depressed
          block
          class="mb-3"
      >
        <span class="font-weight-bold" style="font-size: 16px">
          הוסף מתכון
        </span>
      </v-btn>

      <template v-if="isUserBook">
        <v-btn v-if="hasRecipes" :to="addRecipeLink" depressed>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn :to="editBookLink" depressed>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
            color="error"
            outlined
            @click="deleteBook"
            depressed
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

    </v-card-actions>
  </v-card>
  <p v-else>לא נמצא ספר</p>
</template>

<script>
import CardLoading from "../../components/UI/CardLoading.vue";

export default {
  components: { CardLoading },
  data() {
    return {
      panel: [0, 1, 2],
      isLoading: false,
      error: null,
    };
  },
  computed: {
    bookId() {
      return this.$route.params.bookId;
    },

    book() {
      const books = this.$store.getters["books/allBooks"];
      if (!books) {
        return this.$store.getters["books/currentBook"];
      }
      return books.find((book) => book._id === this.bookId);
    },

    recipes() {
      return this.$store.getters["books/bookRecipes"];
    },

    hasRecipes() {
      return this.recipes && this.recipes.length > 0;
    },

    recipesLink() {
      return { name: "Recipes", params: { bookId: this.bookId } };
    },

    addRecipeLink() {
      return { name: "AddBookRecipe", params: { bookId: this.bookId } };
    },

    userId() {
      return this.$store.getters["auth/userId"];
    },

    isUserBook() {
      return this.book.userId._id === this.userId;
    },

    editBookLink() {
      return {
        name: "EditBook",
        params: { bookId: this.bookId },
      };
    },
  },

  methods: {
    async loadBook() {
      try {
        await this.$store.dispatch("books/fetchBook", { bookId: this.bookId });
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },

    async init() {
      this.isLoading = true;
      const books = this.$store.getters["books/allBooks"];
      if (!books) {
        await this.loadBook();
      }
      this.isLoading = false;

      this.$store.dispatch("books/fetchBookRecipes", {
        bookId: this.bookId,
      });
    },

    async deleteBook() {
      if (confirm("אתה בטוח שברצונך למחוק?")) {
        try {
          await this.$store.dispatch("books/deleteBook", {
            bookId: this.bookId,
          });
          await  this.$router.push({name:'MyBooks'});
        } catch (error) {
          this.error = error.message || "שגיאה, אנא נסה שוב מאוחר יותר";
        }
      }
    },
  },
  watch: {
    async $route() {
      await this.init();
    },
  },
  async created() {
    await this.init();
  },
};
</script>
