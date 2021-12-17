<template>
  <v-card flat tile>
    <v-window v-model="onboarding" reverse>
      <v-window-item v-for="rec in recipes" :key="`card-${rec._id}`">
        <v-card min-height="70vh">
          <v-img
            :src="rec.image"
            :lazy-src="rec.image"
            height="200px"
            class="white--text align-end"
            gradient="to top, rgba(0, 0, 0, 0.7) 20%, transparent 70%"
          >
            <v-card-title> {{ rec.title }} </v-card-title>
          </v-img>

          <v-card-text>
            <v-row>
              <v-col>
                <div class="my-4 text-subtitle">
                  זמן הכנה כ - {{ rec.totalTime }}
                </div>
              </v-col>
              <v-col>
                <div class="my-4 text-subtitle">•</div>
              </v-col>
              <!-- <v-col>
                <div class="my-4 text-subtitle">טקסט</div>
              </v-col> -->
            </v-row>

            <div>{{ rec.description }}</div>
          </v-card-text>

          <v-expansion-panels flat tile multiple v-model="panel">
            <v-expansion-panel>
              <v-expansion-panel-header> מצרכים: </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-html="rec.ingredients"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header> אופן ההכנה: </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ rec.preparation }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-card-text v-if="rec.tags.length">
            <v-badge v-for="tag in rec.tags" :key="tag" :content="tag" inline>
            </v-badge>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn text @click="prev">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot="{ active, toggle }"
        >
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn text @click="next">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return { panel: [0, 1], onboarding: 0 };
  },

  computed: {
    recipes() {
      return this.$store.getters["books/bookRecipes"];
    },

    length() {
      return this.recipes?.length;
    },
  },

  created() {
    this.$store.dispatch("books/fetchBookRecipes", {
      bookId: this.$route.params.bookId,
    });
  },

  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
  },
};
</script>
