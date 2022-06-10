<template>
  <div class="register-form">
    <div class="alerts"
    v-if="register_show_alert"
    :class="register_alert_variant">
      {{ register_alert_msg }}
    </div>
    <vee-form class="forms"
    :validation-schema="registerSchema" @submit="register">

      <label class="form-labels" for="email">Email</label>
      <vee-field type="email" name="email"
        class="form-text-input" placeholder="email" />
      <ErrorMessage class="form-error" name="email" />

      <label class="form-labels" for="email">Hasło</label>
      <vee-field type="password" name="password"
        class="form-text-input" placeholder="Hasło" />
      <ErrorMessage class="form-error" name="password" />

      <label class="form-labels" for="confirmPass">Powtórz hasło</label>
      <vee-field type="password" name="confirmPass"
        class="form-text-input" placeholder="Powtórz hasło" />
      <ErrorMessage class="form-error" name="confirmPass" />

      <button type="submit"
      class="button filled-button form-submit" :disabled="register_in_submission">
        Zarejestruj się
      </button>
    </vee-form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      registerSchema: {
        email: 'required|email',
        password: 'required|min:6|max:32',
        confirmPass: 'passwords_mismatch:@password',
      },
      register_in_submission: false,
      register_show_alert: false,
      register_alert_variant: 'alert-process',
      register_alert_msg: 'Chwileczkę, rejestrujemy cię...',
    };
  },
  methods: {
    async register(values) {
      console.log(values);
      this.register_in_submission = true;
      this.register_show_alert = true;
      this.register_alert_variant = 'alert-process';
      this.register_alert_msg = 'Chwileczkę, rejestrujemy cię...';
      // rejestrowanie - przekazanie do nastepnego komponentu
      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        console.log('error register form!');
        console.log(error);
        this.register_in_submission = false;
        this.register_alert_variant = 'alert-error';
        this.register_alert_msg = 'Error';
      }
    },
  },
};
</script>
