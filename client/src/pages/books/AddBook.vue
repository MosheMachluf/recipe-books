<template>
  <v-card
    :disabled="isLoading"
    :loading="isLoading"
    class="mx-auto"
    max-width="700"
    outlined
    rounded="lg"
  >
    <v-card-title>יצירת ספר חדש</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          filled
          v-model="title"
          label="כותרת"
          required
          clearable
        ></v-text-field>

        <v-textarea
          filled
          v-model="description"
          label="תיאור"
          clearable
        ></v-textarea>

        <v-text-field
          filled
          v-model="image"
          label="תמונה"
          required
          clearable
        ></v-text-field>

        <v-img
          class="mx-auto mb-5"
          v-show="previewImageLoaded"
          :src="image"
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


    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          לאן תרצה לעבור?
        </v-card-title>
        <v-card-text>הספר שלך נוצר בהצלחה! אנו ממליצים לך להתחיל להוסיף אליו מתכונים</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              :to="{ name: 'Home' }"
              depressed
              style="min-width: 50%;"
              @click="dialog = false"
          >
            חזור לדף הבית
          </v-btn>
          <v-btn
              :to="{ name: 'AddBookRecipe', params: { bookId: newBookId } }"
              color="primary"
              depressed
              style="min-width: 50%;"
              @click="dialog = false"
          >
            הוסף מתכון
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    error: null,
    valid: true,
    title: null,
    description: null,
    image: null,
    previewImageLoaded: false,
    dialog: false,
    newBookId: null,
  }),
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
        const payload = {
          title: this.title,
          description: this.description,
          image: this.image,
        };
        await this.$store.dispatch("books/createBook", payload);
        const newBook = this.$store.getters["books/newBookAdded"];
        this.newBookId = newBook._id;
        this.dialog = true;
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
  },
};
</script>
