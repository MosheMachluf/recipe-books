import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      userId: null,
      token: null,
    };
  },
  mutations,
  getters,
  actions,
};
