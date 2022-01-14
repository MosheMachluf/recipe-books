<template>
  <!-- <v-sheet min-height="70vh" rounded="lg"> -->
  <v-row v-if="isLoading">
    <v-col cols="12" v-for="n in 5" :key="n">
      <card-loading></card-loading>
    </v-col>
  </v-row>

  <v-row v-else-if="hasBooks">
    <v-col cols="12" v-for="book in allBooks" :key="book._id">
      <book-item
        :id="book._id"
        :image="book.image || require('@/assets/recipe-placeholder.webp')"
        :title="book.title"
        :desc="book.description"
        :created="book.createdAt"
        :user="book.userId"
      ></book-item>
    </v-col>
  </v-row>

  <h3 v-else>לא נמצאו ספרים</h3>

  <!-- </v-sheet> -->
</template>

<script>
import BookItem from "../components/books/BookItem.vue";
import CardLoading from "../components/UI/CardLoading.vue";

export default {
  name: "Home",
  components: { BookItem, CardLoading },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    allBooks() {
      return this.$store.getters["books/allBooks"];
    },

    hasBooks() {
      return this.allBooks && this.allBooks.length > 0;
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.$store.dispatch("books/fetchAllBooks");
    } catch (error) {
      this.error = error.message || "Something went wrong";
    }
    this.isLoading = false;
  },
};
</script>
