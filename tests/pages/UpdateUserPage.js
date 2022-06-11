const { I } = inject();

module.exports = {
    locators: {
        // name input
        nameInput: "//*[@id=\"app\"]/div/form/div[1]/input[1]",
        // date of birth
        dayOfBirth: "//*[@id=\"app\"]/div/form/div[1]/div[1]/input[1]",
        monthOfBirth: "//*[@id=\"app\"]/div/form/div[1]/div[1]/input[2]",
        yearOfBirth: "//*[@id=\"app\"]/div/form/div[1]/div[1]/input[3]",
        // gender identity
        manGenderIdentity: "//*[@id=\"app\"]/div/form/div[1]/div[2]/div[1]/label",
        womanGenderIdentity: "//*[@id=\"app\"]/div/form/div[1]/div[2]/div[2]/label",
        otherGenderIdentity: "//*[@id=\"app\"]/div/form/div[1]/div[2]/div[3]/label",
        // gender interest
        manGenderInterest: "//*[@id=\"app\"]/div/form/div[1]/div[3]/div[1]/label",
        womanGenderInterest: "//*[@id=\"app\"]/div/form/div[1]/div[3]/div[2]/label",
        everyoneGenderInterest: "//*[@id=\"app\"]/div/form/div[1]/div[3]/div[3]/label",
        // about me
        aboutMeInput: "#about",
        // profile img
        imgProfile: "#url",
        submitButton: "//*[@id=\"app\"]/div/form/div[1]/button",
    },

    updateNewManUserWhoInterestsInWomen(name, dobDay, dobMonth, dobYear, aboutMe) {
        I.wait(2);
        I.fillField(this.locators.nameInput, name);
        I.fillField(this.locators.dayOfBirth, dobDay);
        I.fillField(this.locators.monthOfBirth, dobMonth);
        I.fillField(this.locators.yearOfBirth, dobYear);
        I.click(this.locators.manGenderIdentity);
        I.click(this.locators.womanGenderInterest);
        I.fillField(this.locators.aboutMeInput, aboutMe);
        I.click(this.locators.submitButton);
    }

}