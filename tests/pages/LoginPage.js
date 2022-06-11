const { I } = inject();

module.exports = {
    locators: {
        loginRegisterButton: "//*[@id=\"header\"]/div/li/a",
        emailInput: "//*[@id=\"modal\"]/div[2]/div[2]/form/input[1]",
        passwordInput: "//*[@id=\"modal\"]/div[2]/div[2]/form/input[2]",
        confirmPasswordInput: "//*[@id=\"modal\"]/div[2]/div[2]/form/input[3]",
        submitButton: "//*[@id=\"modal\"]/div[2]/div[2]/form/button",
        signUpChoose: "//*[@id=\"modal\"]/div[2]/ul/li[2]/a",
        loginChoose: "//*[@id=\"modal\"]/div[2]/ul/li[1]/a",
        alertInfo: "//*[@id=\"modal\"]/div[2]/div[2]/div",

    },

    tryToSignUpWithDifferentPasswords(email, firstPass, secondPass) {
        I.click(this.locators.loginRegisterButton);
        I.click(this.locators.signUpChoose);
        I.fillField(this.locators.emailInput, email);
        I.fillField(this.locators.passwordInput, firstPass);
        I.fillField(this.locators.confirmPasswordInput, secondPass);
        I.click(this.locators.submitButton);
    },

    loginToThePage(email, password) {
        I.click(this.locators.loginRegisterButton);
        I.click(this.locators.loginChoose);
        I.fillField(this.locators.emailInput, email);
        I.fillField(this.locators.passwordInput, password);
        I.click(this.locators.submitButton);
    },

    signUp(email, password) {
        I.click(this.locators.loginRegisterButton);
        I.click(this.locators.signUpChoose);
        I.fillField(this.locators.emailInput, email);
        I.fillField(this.locators.passwordInput, password);
        I.fillField(this.locators.confirmPasswordInput, password);
        I.click(this.locators.submitButton);
    },
}