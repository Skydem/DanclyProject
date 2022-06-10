import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';

export default createStore({
  state: {
    userLoggedIn: false,
    authModalShow: false,
    populated: false,
    matchesForUser: {},
    user: {},
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
    updateMatchesForUser(state, val) {
      state.matchesForUser = val;
    },
    updateUser(state, val) {
      state.user = val;
    },
  },
  actions: {
    setMatchesForUser({ commit }, value) {
      commit('updateMatchesForUser', value);
    },
    setUser({ commit }, value) {
      commit('updateUser', value);
    },
    async register({ commit }, { email, password }) {
      const response = await axios.post('http://localhost:8001/signup', { email, password });
      const success = response.status === 201;
      if (success) router.push({ name: 'Onboarding' });
      // document.cookie = `Email=${response.data.email}`;
      document.cookie = `UserId=${response.data.userId}`;
      document.cookie = `AuthToken=${response.data.token}`;
      commit('toggleAuthModal');
      commit('toggleAuth');
    },
    async login({ commit }, { email, password }) {
      const response = await axios.post('http://localhost:8001/login', { email, password });
      console.log(response);
      const success = response.status === 200;
      if (success) router.push({ name: 'Dashboard' });
      // document.cookie = `Email=${response.data.email}`;
      document.cookie = `UserId=${response.data.userId}`;
      document.cookie = `AuthToken=${response.data.token}`;
      commit('toggleAuthModal');
      commit('toggleAuth');
    },
    async userPut({ commit }, values) {
      console.log(values);
      const response = await axios.put('http://localhost:8001/user', values);
      // const success = response.statusCode === 200;
      console.log(response);
      const success = 1;
      if (success) router.push({ name: 'Dashboard' });
      commit('togglePopulated');
    },
    signout({ commit }) {
      document.cookie = 'AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'UserId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      router.push({ name: 'home' });
      commit('toggleAuth');
    },
  },
});
