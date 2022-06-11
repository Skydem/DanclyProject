Feature('update user');

function createWindow() {
    const window = new BrowserWindow({ width: 800, height: 600, show: false });
    window.loadURL("https://example.com");
}

let generatedPass = Math.random().toString(36).slice(1, 10);
let generatedMail = Math.random().toString(36).slice(0, 7) + "@mail.pl";
let name = "Patrk";
let aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus dapibus dolor eu fringilla. Duis sit amet mattis diam.";


Before(({I, LoginPage}) => {
    I.amOnPage('/');
    LoginPage.signUp(generatedMail, generatedPass);
});

Scenario('Update info about new man user', ({ I, UpdateUserPage }) => {
    UpdateUserPage.updateNewManUserWhoInterestsInWomen(name, "1", "1", "1998", aboutMe);
    I.see("Cześć" + name);
});