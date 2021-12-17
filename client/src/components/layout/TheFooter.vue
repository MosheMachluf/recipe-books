<template>
  <v-bottom-navigation
    background-color="black"
    color="primary"
    dark
    shift
    fixed
    grow
    class="main-navigation"
  >
    <v-btn to="/" text>
      <span>ראשי</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/search" text>
      <span>אינדקס</span>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-bottom-sheet v-model="sheet">
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <span>הוסף</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-list style="width: 100vw">
        <v-list-item
          class="text-center"
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
          :to="tile.to"
        >
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>

    <v-btn to="/profile/my-fav" text>
      <span>מועדפים</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn to="/profile/edit" text>
      <span>פרופיל</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    sheet: false,
    tiles: [
      { title: "צור ספר", to: { name: "AddBook" } },
      { title: "הוסף מתכון", to: { name: "AddRecipe" } },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
