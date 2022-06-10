<template>
  <header id="header">
    <!-- <ul> -->
      <li class="logo-container">
        <router-link :to="{ name: 'home' }">
          <img src="@/assets/img/logo.png" alt="logo" class="logo" />
        </router-link>
      </li>
      <div class="nav-buttons-container">
        <li style="margin-right: 20px;" class="button text-button">
          <router-link :to="{ name: 'about' }">About</router-link>
        </li>
        <li v-if="!userLoggedIn">
          <a class="button filled-button" href="#"
          @click.prevent="toggleAuthModal">
            Login/Register
          </a>
        </li>
        <li v-else>
          <a class="button" href="#" @click.prevent="signout">Sign Out</a>
        </li>
      </div>
    <!-- </ul> -->
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    ...mapMutations(['toggleAuth']),
    signout() {
      this.$store.dispatch('signout');
    },
    checkLogin() {
      /* eslint-disable prefer-destructuring */
      if (document.cookie && !this.userLoggedIn) {
        const gotCookies = document.cookie.split('; ');
        console.log(gotCookies);
        gotCookies.forEach((cookie) => {
          const tmpCookie = cookie.split('=');
          console.log(tmpCookie);
          if (tmpCookie[0] === 'UserId') {
            this.toggleAuth();
          }
        });
      }
      /* eslint-enable prefer-destructuring */
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>

<style>

</style>
