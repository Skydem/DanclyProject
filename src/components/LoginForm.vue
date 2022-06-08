<template>
  <div class="login-form">
    <div class="alerts"></div>
    <form class="forms">
      <label class="form-labels" for="email">Email</label>
      <input type="email" name="email"
        class="form-text-input" placeholder="email" />
      <label class="form-labels" for="email">Hasło</label>
      <input type="password" name="password"
        class="form-text-input" placeholder="Hasło" />
      <input type="submit" value="Zarejestruj się!"
      class="button filled-button form-submit"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
};
</script>
