import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import moment from "moment";

Vue.config.productionTip = false;

Vue.prototype.$helpers = {
  /**
   * return date in format MM/DD/yyy
   * @param date
   * @returns {string}
   */
  getDate(date) {
    return date ? moment(date).format("DD/MM/YYYY") : null;
  },
};

store.dispatch("auth/tryLogin").then(() => {
  router.beforeEach(function (to, from, next) {
    const appName = "ספרי מתכונים";
    document.title = appName;
    if (to.meta.title) {
      document.title = `${appName} | ${to.meta.title}`;
    }

    if (to.meta.requiresAuth && !store.getters["auth/isLoggedIn"]) {
      next("/login");
      return;
    }

    if (to.meta.requiresUnauth && store.getters["auth/isLoggedIn"]) {
      next("/");
      return;
    }

    next();
  });

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
