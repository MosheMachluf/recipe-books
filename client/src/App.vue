<template>
  <v-app id="inspire">
    <the-header></the-header>

    <v-main class="grey lighten-3" style="margin-top: -64px">
      <v-container style="margin-bottom: 80px">
        <router-view></router-view>
      </v-container>
    </v-main>

    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader";
import TheFooter from "@/components/layout/TheFooter";

export default {
  components: { TheHeader, TheFooter },
  data: () => ({
    links: ["ראשי", "הודעות", "פרופיל", "עדכונים"],
  }),
  created() {
    this.$store.dispatch("auth/tryLogin");
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700&display=swap");

* {
  font-weight: 300;
}

.v-application {
  font-family: "Heebo", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
}

.big-shadow {
  box-shadow: 0 25px 25px rgb(91 91 91 / 25%) !important;
}

// .v-card * {
//   white-space: pre;
// }
</style>
