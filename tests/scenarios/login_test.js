Feature('login');

let generatedPass = Math.random().toString(36).slice(1, 10);
let secondGeneratedPass = Math.random().toString(36).slice(1, 9);
let generatedMail = Math.random().toString(36).slice(0, 7) + "@mail.pl";

Before(({I}) => {
   I.amOnPage('/');
})

Scenario('Try to login with incorrect password', ({ I, LoginPage }) => {
   LoginPage.loginToThePage("admin@admin.pl", generatedPass);
   I.wait(1);
   I.see("Error");
});

Scenario('Create new user', ({ I, LoginPage}) => {
   LoginPage.signUp(generatedMail, "admin123");
   I.see("Imię");
});

Scenario('Try to create user which email is used', ({ I, LoginPage }) => {
   LoginPage.signUp("test@test.pl", generatedPass);
   I.see("Error");
});

Scenario('Try to sign up with different passwords', ({ I, LoginPage }) => {
   LoginPage.tryToSignUpWithDifferentPasswords(generatedMail, generatedPass, secondGeneratedPass);
   I.see("Hasła do siebie nie pasują.");
});
