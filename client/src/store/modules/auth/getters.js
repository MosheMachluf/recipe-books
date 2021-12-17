export default {
  user(state) {
    return state.user;
  },
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
};
