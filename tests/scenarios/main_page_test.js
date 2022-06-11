Feature('update user');

const variables = require("../variables/variables");
const assert = require("assert");
const imgUrl = "https://randomuser.me/api/portraits/men/" + variables.getRandomNumberGenerator(1, 100) + ".jpg";
const generatedMail = Math.random().toString(36).slice(0, 7) + "@mail.pl";

Before(({I, LoginPage, UpdateUserPage}) => {
    I.amOnPage('/');
    LoginPage.signUp(generatedMail, variables.generatedPass);
    UpdateUserPage.updateNewManUserWhoInterestsInWomen(variables.randomNameGenerator(variables.num), "1", "1", "1998", variables.aboutMe, imgUrl);
});

Scenario('Get match with another user and check if this user appears in pairs', ({ I, MainPage }) => {
    I.wait(4);
    const name = MainPage.getNameFromMatch();
    I.see("Yas");
    MainPage.getPair();
    assert.equal(MainPage.getNameFromPair(), name);
});