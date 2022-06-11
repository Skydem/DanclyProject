const { I } = inject();

module.exports = {
    locators: {
        matchName: "//*[@id='app']/div/div[2]/div/h3[contains(@class, 'card-padding')]",
        matchedUser: "//*[@id='app']/div/div[1]/div[2]/div",
        pairName: "//*[@id='app']/div/div[1]/div[2]/div/h3",
        matchesButton: "//*[@id='app']/div/div[1]/ul/li[1]/a",
        chatButton: "//*[@id='app']/div/div[1]/ul/li[2]/a",
        getPairButton: "//*[@id='app']/div/div[2]/div/div/div[2]",
        getNoPairButton: "//*[@id='app']/div/div[2]/div/div/div[1]",
        chatInput: "#message",
        signOutButton: "//*[@id=\"header\"]/div/li[2]/a",
        refreshChatButton: "//*[@id=\"app\"]/div/div[1]/div[2]/div[2]/button[2]",
    },

    getPair() {
        I.click(this.locators.getPairButton);
    },

    getNoPair() {
        I.click(this.locators.getNoPairButton);
    },

    async getNameFromMatch() {
        await I.grabTextFrom(this.locators.matchName);
    },

    async getNameFromPair() {
        await I.grabTextFrom(this.locators.pairName);
    },

    chooseMatchedUser() {
        I.click(this.locators.matchedUser);
    },

    typeMessage(message) {
        I.fillField(this.locators.chatInput, message);
        I.pressKey("Enter");
    },

    refreshChat() {
      I.click(this.locators.refreshChatButton);
    },

    signOutFromDancly() {
        I.click(this.locators.signOutButton);
    }
}