<template>
  <v-card
    :disabled="isLoading"
    :loading="isLoading"
    class="mx-auto"
    max-width="700"
    outlined
    rounded="lg"
  >
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          filled
          v-model="recipe.title"
          label="כותרת"
          required
          clearable
        ></v-text-field>

        <v-textarea
          filled
          v-model="recipe.description"
          label="תיאור"
          clearable
        ></v-textarea>

        <v-autocomplete
          filled
          v-if="!bookId"
          v-model="recipe.bookId"
          :items="bookNames"
          item-text="text"
          item-value="value"
          label="בחר ספר"
          clearable
        ></v-autocomplete>

        <!-- <vue-editor
          v-model="recipe.ingredients"
          :editorToolbar="customToolbar"
          ref="vue-editor"
          placeholder="מצרכים"
        ></vue-editor> -->
        <v-textarea
          filled
          v-model="recipe.ingredients"
          label="מצרכים"
          clearable
        ></v-textarea>

        <v-textarea
          filled
          v-model="recipe.preparation"
          label="אופן ההכנה"
          clearable
        ></v-textarea>

        <v-text-field
          filled
          v-model="recipe.totalTime"
          label="זמן הכנה"
          required
          clearable
        ></v-text-field>

        <v-text-field
          filled
          v-model="recipe.tags"
          label="תגיות (יש להפריד בפסיקים)"
          required
          clearable
        ></v-text-field>

        <v-switch v-model="recipe.status" :label="statusLabel" disabled></v-switch>

        <v-text-field
          filled
          v-model="recipe.image"
          label="תמונה"
          required
          clearable
        ></v-text-field>

        <v-img
          class="mx-auto mb-5"
          v-show="previewImageLoaded"
          :src="recipe.image"
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
// import { VueEditor } from "vue2-editor";

export default {
  components: {
    // VueEditor,
  },

  data: () => ({
    title: "יצירת מתכון חדש",
    operation: "createRecipe",
    isLoading: false,
    error: null,
    valid: true,
    recipe: {
      title: null,
      description: null,
      ingredients: null,
      preparation: null,
      totalTime: null,
      bookId: null,
      status: null,
      tags: null,
      image: null,
    },
    previewImageLoaded: false,
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
    ],
    userId: null,
  }),

  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    },
    bookId() {
      return this.$route.params.bookId;
    },
    currentBook() {
      return this.$store.getters["books/currentBook"];
    },
    bookNames() {
      return this.$store.getters["books/myBooks"]?.map((book) => ({
        text: book.title,
        value: book._id,
      }));
    },
    statusLabel() {
      return this.recipe.status ? "ציבורי" : "פרטי";
    },
  },

  watch: {
    recipe: {
      image(currentValue) {
        this.previewImageLoaded = false;

        if (currentValue?.length > 10) {
          this.error = "תמונה לא תקינה";
          return;
        }
        this.error = "";
      },
    },
  },

  async created() {
    if (this.recipeId) {
      this.title = "עריכת מתכון";
      this.operation = "updateRecipe";
      await this.loadRecipe();
    }

    if (this.bookId) {
      // check if the book is own to the user
      this.userId = localStorage.getItem("userId");
      if (!this.currentBook) {
        await this.$store.dispatch("books/fetchBook", {
          bookId: this.bookId,
        });
      }

      if (this.currentBook.userId._id !== this.userId) {
        this.$router.replace({ name: "Book", params: { bookId: this.bookId } });
      }
    } else {
      await this.$store.dispatch("books/fetchMyBooks");
    }
  },

  mounted() {
    // this.$refs["vue-editor"].quill.format("direction", "rtl");
    // this.$refs["vue-editor"].quill.format("align", "right");
  },

  methods: {
    onImgLoad() {
      this.previewImageLoaded = true;
      this.error = "";
    },
    async loadRecipe() {
      await this.$store.dispatch("recipes/fetchRecipe", {
        recipeId: this.recipeId,
      });
      const theRecipe = this.$store.getters["recipes/currentRecipe"];
      this.recipe.title = theRecipe.title;
      this.recipe.description = theRecipe.description;
      this.recipe.totalTime = theRecipe.totalTime;
      this.recipe.image = theRecipe.image;
      this.recipe.ingredients = theRecipe.ingredients;
      this.recipe.preparation = theRecipe.preparation;
      this.recipe.tags = theRecipe.tags;
      this.recipe.bookId = theRecipe.bookId;
    },

    loadBook() {},

    async submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }

      // const action = this.recipeId ?"recipes/updateRecipe" : "recipes/createRecipe";

      this.isLoading = true;

      let tags = [];
      if (Array.isArray(this.recipe.tags) && this.recipe.tags.length > 0) {
        tags = this.recipe.tags;
      } else if (this.recipe.tags) {
        tags = this.recipe.tags.split(",");
      }

      try {
        const payloadData = { ...this.recipe, tags };
        let successRedirect = "/";
        if (this.bookId) {
          successRedirect = {
            name: "Book",
            params: { bookId: this.bookId },
          };
          payloadData.bookId = this.bookId;
        }

        if (this.recipeId) {
          successRedirect = {
            name: "RecipeDetails",
            params: { recipeId: this.recipeId },
          };
          payloadData.recipeId = this.recipeId;
        }

        await this.$store.dispatch(`recipes/${this.operation}`, payloadData);

        this.$router.replace(successRedirect);
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.quillWrapper {
  overflow: hidden;
}

.ql-editor.ql-blank {
  text-align: right !important;
}
</style>
