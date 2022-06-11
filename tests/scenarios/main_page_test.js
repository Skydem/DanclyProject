Feature('main page');

Before(({I}) => {
    I.amOnPage('/');
});

Scenario('Get match with another user and check if this user appears in pairs', ({ I, LoginPage, UpdateUserPage, MainPage }) => {
    LoginPage.signUp(generatedMail, generatedPass);
    UpdateUserPage.updateNewManUserWhoInterestsInWomen(variables.randomNameGenerator(variables.num), "1", "1", "1998", variables.aboutMe, imgUrl);
    I.wait(2);
    name = MainPage.getNameFromMatch().toString();
    MainPage.getPair();
    I.wait(2);
    I.assert(name, MainPage.getNameFromPair());
});

Scenario('Type message to the match', ({I, LoginPage, MainPage}) => {
    LoginPage.loginToThePage(generatedMail, generatedPass);
    I.wait(2);
    MainPage.chooseMatchedUser();
    I.wait(2);
    MainPage.typeMessage(textMessage);
    I.wait(2);
    I.see(textMessage);
});

Scenario('Reject potential pair', ({I, LoginPage, MainPage}) => {
    LoginPage.loginToThePage(generatedMail, generatedPass);
    I.wait(2);
    let name = MainPage.getNameFromMatch().toString();
    MainPage.getNoPair();
    I.dontSee(name);
});

Scenario('Go to the chat and check pair messages', ({I, LoginPage, MainPage}) => {
    LoginPage.loginToThePage(generatedMail, generatedPass);
    I.wait(2);
    MainPage.chooseMatchedUser();
    MainPage.refreshChat();
    I.wait(5);
    I.see("Piszesz z Sara");
    I.see(textMessage);
});

Scenario('Sign out from application', ({I, LoginPage, MainPage}) => {
    LoginPage.loginToThePage(generatedMail, generatedPass);
    I.wait(2);
    let pairName = MainPage.getNameFromPair().toString();
    MainPage.signOutFromDancly();
    I.dontSee(pairName);
});

const variables = require("../variables/variables");
const imgUrl = "https://randomuser.me/api/portraits/men/" + variables.getRandomNumberGenerator(1, 100) + ".jpg";
const generatedMail = Math.random().toString(36).slice(0, 7) + "@mail.pl";
const generatedPass = variables.generatedPass;
const textMessage = "Wiadomość testowa";