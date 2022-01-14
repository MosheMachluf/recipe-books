<template>
  <v-card rounded="lg" :to="bookLink">
    <v-img
      :src="image"
      :lazy-src="image"
      height="200px"
      class="white--text align-end"
      gradient="to top, rgba(0, 0, 0, 0.7) 20%, transparent 70%"
    >
      <v-card-title>{{ title }}</v-card-title>
    </v-img>

    <v-card-subtitle>{{ date }}</v-card-subtitle>

    <v-card-text>{{ desc }}</v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ userFullName }}</v-list-item-title>
        </v-list-item-content>

        <!-- <v-row align="center" justify="end">
          <v-icon class="me-1"> mdi-heart </v-icon>
          <span class="subheading me-2">0</span>
          <span class="me-1">·</span>
          <v-icon class="me-1"> mdi-share-variant </v-icon>
          <span class="subheading">0</span>
        </v-row> -->
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["id", "title", "desc", "image", "created", "user"],
  computed: {
    userFullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    bookLink() {
      return { name: "Book", params: { bookId: this.id } };
    },
    date() {
      return this.$helpers.getDate(this.created);
    },
  },
};
</script>
