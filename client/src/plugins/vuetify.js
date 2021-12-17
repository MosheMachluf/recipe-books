import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  theme: {
    themes: {
      light: {
        primary: "#fb8c00",
        secondary: "#b0bec5",
        success: "#34aa54",
        accent: "#8c9eff",
        error: "#f36",
      },
    },
  },
});
