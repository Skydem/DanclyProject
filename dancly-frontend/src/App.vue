<template>
  <header-vue></header-vue>
  <auth-modal></auth-modal>
  <router-view/>
</template>

<script>
import HeaderVue from './components/Header.vue';
import AuthModal from './components/AuthModal.vue';

export default {
  name: 'App',
  components: {
    HeaderVue,
    AuthModal,
  },
};
</script>

<style>
@import url(./assets/style.css);
</style>
