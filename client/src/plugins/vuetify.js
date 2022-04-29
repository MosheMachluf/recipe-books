import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  theme: {
    themes: {
      light: {
        primary: "#fb7100",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        success: "#34aa54",
        error: "#E91E63",
        dark: "#13123e"
      },
    },
  },
});
