const { I } = inject();

module.exports = {
    locators: {
        matchName: "//*[@id='app']/div/div/div/h3[contains(@class, 'card-padding')][last()]",
        pairName: "//*[@id='app']/div/div[1]/div[2]/div[1]/h3",
        matchesButton: "//*[@id='app']/div/div[1]/ul/li[1]/a",
        chatButton: "//*[@id='app']/div/div[1]/ul/li[2]/a",
        getPairButton: "//*[@id='app']/div/div/div/div/div[last()][contains(text(), ('Yas'))]",
        getNoPairButton: "//*[@id='app']/div/div[2]/div[3]/div/div[1]",
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
    }
}