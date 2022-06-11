Feature('update user');

const variables = require("../variables/variables");
const imgUrl = "https://randomuser.me/api/portraits/men/" + variables.getRandomNumberGenerator(1, 100) + ".jpg";
const generatedMail = Math.random().toString(36).slice(0, 7) + "@mail.pl";
const name = variables.randomNameGenerator(variables.num)

Before(({I, LoginPage}) => {
    I.amOnPage('/');
    LoginPage.signUp(generatedMail, variables.generatedPass);
});

Scenario('Update info about new man user', ({ I, UpdateUserPage }) => {
    UpdateUserPage.updateNewManUserWhoInterestsInWomen(name, "1", "1", "1998", variables.aboutMe, imgUrl);
    I.wait(2);
    I.see("Cześć " + name + "!");
});