Feature('login');

Before(({I}) => {
   I.amOnPage('/');
})

Scenario('Try to login with incorrect password', ({ I }) => {

});

Scenario('Try to login with incorrect login', ({I, LoginPage}) => {

});

Scenario('Create new user', ({ I, LoginPage}) => {

});

Scenario('Try to create user which email is used', ({ I, LoginPage }) => {

});

Scenario('Try to sign up with different passwords', ({ I, LoginPage }) => {
   LoginPage.tryToSignUpWithDifferentPasswords("test@app.pl", "123fdsfsd", "45fsdfsfds6");
   I.see("Hasła do siebie nie pasują.");
});
