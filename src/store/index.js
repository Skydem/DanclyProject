import { createStore } from 'vuex';

export default createStore({
  state: {
    userLoggedIn: false,
    authModalShow: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
  },
});
