Feature('login');

const variables = require("../variables/variables");
const generatedMail = Math.random().toString(36).slice(0, 7) + "@mail.pl";

Before(({I}) => {
   I.amOnPage('/');
})

Scenario('Try to login with incorrect password', ({ I, LoginPage }) => {
   LoginPage.loginToThePage("admin@admin.pl", variables.generatedPass);
   I.wait(1);
   I.see("Niepoprawne hasło");
});

Scenario('Try to login with incorrect login without domain', ({I, LoginPage}) => {
   LoginPage.loginToThePage(variables.generatedLogin, variables.generatedPass);
   I.see("Pole email musi być prawidłowym e-mailem.");
});

Scenario('Try to login with unexisted user', ({I, LoginPage}) => {
   LoginPage.loginToThePage(generatedMail, variables.generatedPass);
   I.see("Taki użytkownik nie istnieje!");
});

Scenario('Create new user', ({ I, LoginPage}) => {
   LoginPage.signUp(generatedMail, variables.generatedPass);
   I.wait(1);
   I.see("Imię");
});

Scenario('Try to create user which email is used', ({ I, LoginPage }) => {
   LoginPage.signUp("test@test.pl", variables.generatedPass);
   I.wait(1);
   I.see("Użytkownik z podanym mailem istnieje. Proszę się zalogować.");
});

Scenario('Try to sign up with different passwords', ({ I, LoginPage }) => {
   LoginPage.tryToSignUpWithDifferentPasswords(generatedMail, variables.generatedPass, variables.secondGeneratedPass);
   I.see("Hasła do siebie nie pasują.");
});
