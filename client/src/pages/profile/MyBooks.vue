<template>
    <card-loading v-if="isLoading"></card-loading>
    <v-list-item v-else>
      <v-list-item-content v-if="hasBooks">
        <div style="display: flex; gap:10px;" v-for="book of books" :key="book._id">
          <div>
            <router-link :to="{ name: 'Book', params: { bookId: book._id } }">
              <img :src="book.image || require('@/assets/recipe-placeholder.webp')" class="image-item"/>
            </router-link>
          </div>
          <div style="flex:1;">
            <v-list-item-title>
              <router-link :to="{ name: 'Book', params: { bookId: book._id } }">
                {{ book.title }}
              </router-link>
            </v-list-item-title>
            <small class="desc-item">{{ book.description }}</small>
          </div>
        </div>
      </v-list-item-content>

      <v-list-item-content v-else>
        עדיין לא יצרת ספרים
      </v-list-item-content>
    </v-list-item>
</template>

<script>
import CardLoading from "@/components/UI/CardLoading";

export default {
  components: { CardLoading },

  data: () => ({
    isLoading: false,
    error: null,
  }),
  computed: {
    hasBooks() {
      return this.$store.getters["books/hasMyBooks"];
    },

    books() {
      return this.$store.getters["books/myBooks"];
    }
  },
  created() {
    this.isLoading = true;

    if (!this.books) {
      this.$store.dispatch("books/fetchMyBooks");
    }

    this.isLoading = false;
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.desc-item {
  color: grey;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}

.image-item {
  width: 100px; height: 80px; object-fit: cover;
}
</style>