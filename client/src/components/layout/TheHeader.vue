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

      <v-toolbar-title v-html="pageTitle"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="isLoggedIn" color="black" depressed @click="logout">
        התנתק
      </v-btn>
      <template v-else>
        <v-btn color="black" class="ml-2" depressed :to="{ name: 'Login' }">
          התחבר
        </v-btn>
        <v-btn color="black" depressed :to="{ name: 'Signup' }"> הרשם </v-btn>
      </template>
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
        `<span>${this.greetingText()}, </span><strong>${this.userName}</strong>`
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

    greetingText() {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay() + 1;

      switch (true) {
        case (hour >= 6 && hour < 12):
          return 'בוקר טוב';

        case (hour >= 12 && hour < 17):
          return 'צהריים טובים';

        case (hour >= 17):

          if (day === 5) {
            return 'חמישי שמח';
          }

          if (day === 6) {
            return 'שבת שלום';
          }

          return 'ערב טוב';

        case (hour >= 22 && hour < 6):
          return 'לילה טוב';
      }

    }
  },
};
</script>

<style lang="scss" scoped>
.sticky-top {
  top: 0;
  position: sticky;
}
</style>
