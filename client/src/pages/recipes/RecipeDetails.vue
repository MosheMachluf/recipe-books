<template>
  <v-card flat tile v-if="recipe">
    <v-card min-height="70vh">
      <v-img
        :src="recipe.image"
        lazy-src="https://static.wixstatic.com/media/79252d_03581aef9c324a42b48c22cd6fb9c9c7.jpg/v1/fill/w_388,h_382,al_c,lg_1,q_80/79252d_03581aef9c324a42b48c22cd6fb9c9c7.webp"
        height="200px"
        class="white--text"
        gradient="to top, rgba(0, 0, 0, 0.7) 20%, transparent 70%"
        @error="imageLoaded"
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            padding-top: 5px;
          "
        >
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                :to="{ name: 'EditRecipe', params: { recipeId: recipe._id } }"
              >
                <v-list-item-title>ערוך</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteRecipe">
                <v-list-item-title>מחק</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-card-title> {{ recipe.title }} </v-card-title>
        </div>
      </v-img>

      <v-card-text>
        <v-row>
          <v-col>
            <div class="my-4 text-subtitle">
              זמן הכנה כ - {{ recipe.totalTime }}
            </div>
          </v-col>
          <v-col>
            <div class="my-4 text-subtitle">•</div>
          </v-col>
        </v-row>

        <div>{{ recipe.description }}</div>
      </v-card-text>

      <v-expansion-panels flat tile multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header> מצרכים: </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-html="recipe.ingredients"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header> אופן ההכנה: </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ recipe.preparation }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card-text v-if="recipe.tags.length">
        <v-badge v-for="tag in recipe.tags" :key="tag" :content="tag" inline>
        </v-badge>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    panel: [0, 1],
    error: null,
    snackbar: true,
    vertical: true,
  }),
  computed: {
    recipe() {
      return this.$store.getters["recipes/currentRecipe"];
    },
  },

  async created() {
    await this.$store.dispatch("recipes/fetchRecipe", {
      recipeId: this.$route.params.recipeId,
    });
  },

  methods: {
    imageLoaded() {
      console.log("imageLoaded");
    },
    deleteRecipe() {
      if (confirm(`בטוח שברצונך למחוק את "${this.recipe.title}"?`)) {
        try {
          this.$store.dispatch("recipes/deleteRecipe", {
            recipeId: this.recipe._id,
          });

          this.$router.replace({
            name: "Book",
            params: { bookId: this.recipe.bookId },
          });
        } catch (error) {
          this.error = error.message;
        }
      }
    },
  },
};
</script>
