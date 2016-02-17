var ShetlandSheepdogData = {
    OPTIMUM_HEIGHT: {
        FEMALE: 36,
        MALE: 37,
        MAX_ABSOLUTE_DEVIATION: 4.0,
        MAX_GENERATED_RELATIVE_DEVIATION: 0.40
    },
    OPTIMUM_MASS: {
        MAX_RELATIVE_DEVIATION: 0.095,
        MAX_GENERATED_RELATIVE_DEVIATION: 0.3
    },
    NINE_FACTOR: 0.04,
    DISEASES: {
        CEA: {
            PROBABILITY: 0.2,
            MAX_HEALTH_AFFECT: -1.5,
            MIN_HEALTH_AFFECT: -0.5
        },
        HIPS: {
            PROBABILITY: 0.25,
            MAX_HEALTH_AFFECT: -2.0,
            MIN_HEALTH_AFFECT: -1.7
        }
    },
    TRAITS: {
        SHINY_FUR: {
            PROBABILITY: 0.2,
            RATING_INCREASE: 2.0
        }
    },
    BIMERLE_PROBABILITY: 0.2,

    // pituus_paino
    getOptimalMass: function (height) {

        var a = 4.08151e-006;
        var b = -0.00459804;
        var c = 0.160469;

        var res = a * Math.pow(height, 4) + b * Math.pow(height, 2) + c * height;

        return res * 1000;
    },

// sheltti_saka_narttu & sheltti_saka_uros
    getPuppyHeight: function (months, isFemale) {

        // male
        var a = -20.5823;
        var b = -0.670902;
        var c = 38.8282;

        // female
        if (isFemale) {
            a = -14.6916;
            b = -0.929549;
            c = 37.3541;
        }

        return a / (months + b) + c;
    },

// pennun_massa.txt
    getPuppyMass: function (week) {

        // male
        var a = 5.88106;
        var b = 246.962;
        var c = 211.286;

        return a * Math.pow(week, 2) + b * week + c;
    },
    canMate: function (dog1, dog2) {
            return (this.getColor(dog1, dog2) !== 'error');
    },
    getColor: function (dog1, dog2) {

        var isEitherBluemerle = (dog1.attributes.fixed.isBluemerle() || dog2.attributes.fixed.isBluemerle() );
        var isEitherTricolour = (dog1.attributes.fixed.isTricolour() || dog2.attributes.fixed.isTricolour() );
        var isEitherSable = (dog1.attributes.fixed.isSable() || dog2.attributes.fixed.isSable() );

        var isBothFemale = dog1.attributes.fixed.isFemale() && dog2.attributes.fixed.isFemale();
        var isBothMale = dog1.attributes.fixed.isMale() && dog2.attributes.fixed.isMale();

        if (isBothFemale || isBothMale) {
            return 'error';
        }

        // tricolour + tricolour
        if (dog1.attributes.fixed.isTricolour() && dog2.attributes.fixed.isTricolour()) {
            color = Constants.COLOR.TRICOLOUR;

            // sable + sable
        } else if (dog1.attributes.fixed.isSable() && dog2.attributes.fixed.isSable()) {
            color = Constants.COLOR.SABLE;

            // bluemerle + tricolour
        } else if (isEitherBluemerle && isEitherTricolour) {
            color = RandomHelper.randomChoose([Constants.COLOR.BLUEMERLE, Constants.COLOR.TRICOLOUR]);

            if (color == Constants.COLOR.BLUEMERLE && Math.random() < DogData.BIMERLE_PROBABILITY) {
                color = Constants.COLOR.BIMERLE;
            }

            // tricolour + sable
        } else if (isEitherTricolour && isEitherSable) {
            color = RandomHelper.randomChoose([Constants.COLOR.TRICOLOUR, Constants.COLOR.SABLE]);
        } else {
            color = 'error';
        }

        return color;
    },

    calculateCurrentHealth: function (initialHealth, ageInYears) {
        var currentHealth = initialHealth - 10.0*Math.pow(ageInYears/(7.0+initialHealth), 6) - (1.0 - Math.sqrt(initialHealth/10.0))*ageInYears;
        return Library.restrictToRange(currentHealth, 0, 10);
    }
};
