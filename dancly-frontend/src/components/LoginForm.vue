<template>
  <div class="login-form">
    <div class="alerts"
    v-if="login_show_alert"
    :class="login_alert_variant">
      {{ login_alert_msg }}
    </div>
    <vee-form class="forms"
    :validation-schema="loginSchema" @submit="login">

      <label class="form-labels" for="email">Email</label>
      <vee-field type="email" name="email"
        class="form-text-input" placeholder="email" />
      <ErrorMessage class="form-error" name="email" />

      <label class="form-labels" for="email">Hasło</label>
      <vee-field type="password" name="password"
        class="form-text-input" placeholder="Hasło" />
      <ErrorMessage class="form-error" name="password" />

      <button type="submit"
      class="button filled-button form-submit" :disabled="login_in_submission">
        Zaloguj się
      </button>
    </vee-form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:6|max:32',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'alert-process',
      login_alert_msg: 'Chwileczkę, logujemy cię...',
    };
  },
  methods: {
    async login(values) {
      console.log(values);
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'alert-proces';
      this.login_alert_msg = 'Chwileczkę, logujemy cię...';
      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        console.log('error login form!');
        console.log(error);
        this.login_in_submission = false;
        this.login_alert_variant = 'alert-error';
        this.login_alert_msg = error.response.data;
      }
    },
  },
};
</script>
