var RandomHelper = {
    randomChoose: function (objects) {
        return objects[Math.floor(Math.random() * objects.length)];
    },
    linearNormalDistributed: function () {
        return Math.random() - Math.random();
    },
    normalDistributedRandomNumber: function () {
        return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
    },
    getRandomSex: function () {
        return RandomHelper.randomChoose([Constants.SEX.FEMALE, Constants.SEX.MALE]);
    }
};