<template>
  <div id="modal" class="modal"
  v-if="authModalShow">
    <div class="close-button"
      @click.prevent="toggleAuthModal"
      @keyup.esc="toggleAuthModal">X</div>
    <div class="modal-content">
      <div class="modal-title">
        <h2>Twoje konto</h2>
      </div>
      <ul class="tabs">
        <li class="auth-tab">
          <a class="auth-tab-text button tran" href="#"
            @click.prevent="tab = 'login'"
            :class="{
              'filled-tonal-button': tab === 'login',
              'text-button': tab === 'register'
              }"
          >
          Login</a>
        </li>
        <li class="auth-tab">
          <a class="auth-tab-text button tran" href="#"
            @click.prevent="tab = 'register'"
            :class="{
              'filled-tonal-button': tab === 'register',
              'text-button': tab === 'login'
              }"
          >
          Zarejestruj się</a>
        </li>
      </ul>
      <login-form v-if="tab === 'login'"></login-form>
      <register-form v-else></register-form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'AuthModal',
  components: {
    LoginForm,
    RegisterForm,
  },
  computed: {
    ...mapState(['authModalShow']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
  },
  data() {
    return {
      tab: 'login',
    };
  },
};
</script>

<style scoped>
template {
  background-color: black;
}
</style>
