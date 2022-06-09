import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';

export default createStore({
  state: {
    userLoggedIn: false,
    authModalShow: false,
    populated: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    togglePopulated(state) {
      state.populated = !state.populated;
    },
  },
  actions: {
    async register({ commit }, { email, password }) {
      const response = await axios.post('http://localhost:8000/signup', { email, password });
      const success = response.status === 201;
      if (success) router.push({ name: 'Onboarding' });
      // document.cookie = `Email=${response.data.email}`;
      document.cookie = `UserId=${response.data.userId}`;
      document.cookie = `AuthToken=${response.data.token}`;
      commit('toggleAuthModal');
      commit('toggleAuth');
    },
    async login({ commit }, { email, password }) {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      const success = response.status === 201;
      if (success) router.push({ name: 'Dashboard' });
      // document.cookie = `Email=${response.data.email}`;
      document.cookie = `UserId=${response.data.userId}`;
      document.cookie = `AuthToken=${response.data.token}`;
      commit('toggleAuthModal');
      commit('toggleAuth');
    },
    async userPut({ commit }, values) {
      console.log(values);
      const response = await axios.put('http://localhost:8000/user', values);
      const success = response.statusCode === 200;
      if (success) router.push({ name: 'Dashboard' });
      commit('togglePopulated');
    },
    signout({ commit }) {
      commit('toggleAuth');
    },
  },
});
