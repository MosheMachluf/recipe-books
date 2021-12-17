<template>
  <!-- color: red accent-4 -->
  <v-card tile flat>
    <v-toolbar color="primary" dark extended flat :height="headerHeight">
      <v-btn v-if="showBackButton" icon dark @click="backHistory">
        <v-icon> mdi-arrow-right </v-icon>
      </v-btn>

      <!-- <h2>
        <span>ערב טוב, </span>
        <strong>{{ userName }}</strong>
      </h2> -->

      <v-toolbar-title v-html="pageTitle"> </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="isLoggedIn" color="black" depressed @click="logout">
        התנתק
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  props: ["some"],
  data() {
    return {
      headerHeight: "100px",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    userName() {
      return this.$store.getters["auth/user"]?.firstName || "אורח";
    },
    showBackButton() {
      return this.$route.meta?.showBackButton;
    },
    pageTitle() {
      return (
        this.$route.meta?.title ||
        `<span>ערב טוב, </span><strong>${this.userName}</strong>`
      );
    },
  },

  methods: {
    backHistory() {
      this.$router.back();
    },

    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.sticky-top {
  top: 0;
  position: sticky;
}
</style>
