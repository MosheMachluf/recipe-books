<template>
  <v-card
    :disabled="isLoading"
    :loading="isLoading"
    class="mx-auto"
    max-width="700"
    outlined
    rounded="lg"
  >
    <v-card-title>ערוך ספר - {{ book.title }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          filled
          v-model="book.title"
          label="כותרת"
          required
          clearable
        ></v-text-field>

        <v-textarea
          filled
          v-model="book.description"
          label="תיאור"
          clearable
        ></v-textarea>

        <v-text-field
          filled
          v-model="book.image"
          label="תמונה"
          required
          clearable
        ></v-text-field>

        <v-img
          class="mx-auto mb-5"
          v-show="previewImageLoaded"
          :src="book.image"
          @load="onImgLoad"
          max-width="70%"
        ></v-img>

        <v-alert v-if="!!error" dense text type="error">
          {{ error }}
        </v-alert>

        <div class="text-center">
          <v-btn
            color="success"
            min-width="170px"
            min-height="50px"
            large
            depressed
            :loading="isLoading"
            :disabled="!valid"
            @click="submitForm"
          >
            <span class="font-weight-bold" style="font-size: 16px">שמור</span>
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    error: null,
    valid: true,
    book: {
      title: null,
      description: null,
      image: null,
    },
    previewImageLoaded: false,
    changesSaved: false,
  }),

  computed: {
    bookId() {
      return this.$route.params.bookId;
    },
  },

  watch: {
    image(currentValue) {
      this.previewImageLoaded = false;

      if (currentValue?.length > 10) {
        this.error = "תמונה לא תקינה";
        return;
      }
      this.error = "";
    },
  },

  beforeRouteLeave(to, from, next) {
    if (this.changesSaved) {
      next();
      return;
    }

    const confirmedToLeave = confirm("בטוח שברצונך לעזוב? שינויים לא נשמרו");
    next(confirmedToLeave);
  },
  async created() {
    const currentUserId = localStorage.getItem("userId");

    await this.$store.dispatch("books/fetchBook", { bookId: this.bookId });
    const theBook = this.$store.getters["books/currentBook"];

    if (currentUserId !== theBook.userId._id) {
      this.changesSaved = true;
      this.$router.replace({ name: "Book", params: { bookId: this.bookId } });
      return;
    }

    if (theBook) {
      this.book.title = theBook.title;
      this.book.description = theBook.description;
      this.book.image = theBook.image;
    }
  },

  methods: {
    onImgLoad() {
      this.previewImageLoaded = true;
      this.error = "";
    },

    async submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.isLoading = true;
      try {
        await this.$store.dispatch("books/updateBook", {
          ...this.book,
          bookId: this.bookId,
        });
        this.$router.replace({ name: "Book", params: { bookId: this.bookId } });
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
  },
};
</script>
