<template>
  <h1 class="text-center">Stwórz konto</h1>
  <div class="onboarding">
    <vee-form :validation-schema="registerSchema" @submit="register"
    class="onboard-form">
      <div class="onboard-section forms">

        <label class="form-labels" for="firstName">Imię</label>
        <vee-field type="text" name="firstName" class="form-text-input" placeholder="Imię" />
        <ErrorMessage class="form-error" name="firstName" />

        <label class="form-labels">Data urodzenia</label>
        <div class="row-section">

          <vee-field type="number" name="dob_day" class="form-text-input" placeholder="DD" />
          <ErrorMessage class="form-error" name="dob_day" />

          <vee-field type="number" name="dob_month" class="form-text-input" placeholder="MM" />
          <ErrorMessage class="form-error" name="dob_month" />

          <vee-field type="number" name="dob_year" class="form-text-input" placeholder="YYYY" />
          <ErrorMessage class="form-error" name="dob_year" />

        </div>

        <h2>Identyfikuję się jako...</h2>
        <div class="row-section">
          <div class="gender-box">
            <label for="man-gender-identity">
              <vee-field type="radio" name="gender_identity" id="man-gender-identity"
                value="man"/>
              Mężczyzna
            </label>
          </div>
          <div class="gender-box">
            <label for="woman-gender-identity">
              <vee-field type="radio" name="gender_identity" id="woman-gender-identity"
                value="woman" />
              Kobieta
            </label>
          </div>
          <div class="gender-box">
            <label for="more-gender-identity">
              <vee-field type="radio" name="gender_identity" id="more-gender-identity"
                value="more" />
              Inne
            </label>
          </div>
          <ErrorMessage class="form-error" name="gender" />
        </div>

        <label for="show-gender">
          <vee-field type="checkbox" name="show-gender" value="1" id="show-gender" />
          Pokaż płeć w profilu
        </label>

        <h2>Interesują mnie:</h2>
        <div class="row-section">
          <div class="gender-box">
            <label for="man-gender-interest">
              <vee-field type="radio" name="gender_interest" id="man-gender-interest"
                value="man" />
              Mężczyzni
            </label>
          </div>
          <div class="gender-box">
            <label for="woman-gender-interest">
              <vee-field type="radio" name="gender_interest" id="woman-gender-interest"
                value="woman" />
              Kobiety
            </label>
          </div>
          <div class="gender-box">
            <label for="everyone-gender-interest">
              <vee-field type="radio" name="gender_interest" id="everyone-gender-interest"
                value="everyone" />
              Wszyscy
            </label>
          </div>
          <ErrorMessage class="form-error" name="gender_interest" />
        </div>
        <label for="about">O mnie</label>
        <vee-field type="textarea" name="about" id="about" placeholder="Lubię..."
          class="form-text-input" />
        <button type="submit" class="button filled-tonal-button form-submit">
          Zarejestruj</button>
      </div>
      <div class="onboard-section forms">
        <label for="">Zdjęcie Profilowe</label>
        <vee-field type="url" name="url" id="url" class="form-text-input"
        v-model="urlPic"/>
        <div class="photo-container">
          <img :src="urlPic" alt="a">
        </div>
      </div>
    </vee-form>

  </div>
</template>

<script>
export default {
  name: 'OnboardingView',
  methods: {
    register(values) {
      console.log(values);
    },
  },
  data() {
    return {
      urlPic: 'https://i.imgur.com/oPj4A8u.jpeg',
    };
  },
};
</script>

<style>
</style>
