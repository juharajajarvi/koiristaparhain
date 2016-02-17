var ChihuahuaData = {
    OPTIMUM_HEIGHT: {
        FEMALE: 20,
        MALE: 20,
        MAX_ABSOLUTE_DEVIATION: 1.5,
        MAX_GENERATED_RELATIVE_DEVIATION: 0.3
    },
    OPTIMUM_MASS: {
        MAX_RELATIVE_DEVIATION: 0.095,
        MAX_GENERATED_RELATIVE_DEVIATION: 0.3
    },
    NINE_FACTOR: 0.04,
    DISEASES: {
        CEA: {
            PROBABILITY: 0.0,
            MAX_HEALTH_AFFECT: 0.0,
            MIN_HEALTH_AFFECT: 0.0
        },
        HIPS: {
            PROBABILITY: 0.2,
            MAX_HEALTH_AFFECT: -2.0,
            MIN_HEALTH_AFFECT: -1.0
        }
    },
    TRAITS: {
        SHINY_FUR: {
            PROBABILITY: 0.2,
            RATING_INCREASE: 2.0
        }
    },
    BIMERLE_PROBABILITY: 0.5,

    // pituus_paino
    getOptimalMass: function (height) {

        var a = -3.83073e-005;
        var b = 0.061332;
        var c = -0.81454;

        var res = a * Math.pow(height, 4) + b * Math.pow(height, 2) + c * height;

        return res * 1000;
    },

// saka_narttu & saka_uros
    getPuppyHeight: function (months, isFemale) {

        // male
        var a = -11.8906;
        var b = 1.07776;
        var c = 20.9007;

        // narttu
        if (isFemale) {
            //a = -9.74203;
            //b = 0.990674;
            //c = 19.7464;
        }

        return a / (months + b) + c;
    },

// pennun_massa.txt
    getPuppyMass: function (week) {

        // male
        var a = -1.72727;
        var b = 83.8182;
        var c = 120.212;

        return a * Math.pow(week, 2) + b * week + c;
    },

    canMate: function (dog1, dog2) {
        return (this.getColor(dog1, dog2) !== 'error');
    },

    getColor: function (dog1, dog2) {

        var isBothFemale = dog1.attributes.fixed.isFemale() && dog2.attributes.fixed.isFemale();
        var isBothMale = dog1.attributes.fixed.isMale() && dog2.attributes.fixed.isMale();

        if (isBothFemale || isBothMale) {
            return 'error';
        }

        return RandomHelper.randomChoose([Constants.COLOR.SABLE]);
    },

    calculateCurrentHealth: function (initialHealth, ageInYears) {
        var currentHealth = initialHealth - 10.0 * Math.pow(ageInYears / (7.0 + initialHealth), 6) - (1.0 - Math.sqrt(initialHealth / 10.0)) * ageInYears;
        return Library.restrictToRange(currentHealth, 0, 10);
    }
};
