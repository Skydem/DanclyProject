module.exports = {
    generatedPass: Math.random().toString(36).slice(1, 10),
    secondGeneratedPass: Math.random().toString(36).slice(1, 11),
    generatedLogin: Math.random().toString(36).slice(0, 7),
    num: 7,
    aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus dapibus dolor eu fringilla. Duis sit amet mattis diam.",

    getRandomNumberGenerator(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    randomNameGenerator(num) {
        let res = '';
        for (let i = 0; i < num; i++) {
            const random = Math.floor(Math.random() * 27);
            res += String.fromCharCode(97 + random);
        }
        return res;
    }
}
