function NumberAttributes(fixedAttributes, rawAttributes, date, dog) {

    this.date = date;

    this.luck = 0;

    this.foodHealthEffect = 0;

    this.getFoodHealthEffect = function () {
        return this.foodHealthEffect.toFixed(1);
    };

    this.getFoodHealthClass = function () {
        if ( this.foodHealthEffect > 0) {
            return 9;
        } else if ( this.foodHealthEffect < 0 ) {
            return 1;
        } else {
            return "A";
        }
    };

    this.calculateFoodHealthEffect = function() {

        if (dog.bankAccount == null) {
            return;
        }

        var maxFoodEffect = dog.bankAccount.getFoodQualityEffect();
        var dailyFoodEffect = 0;

        // Current food has no effect. We should slowly fade to zero effect.
        if (maxFoodEffect == 0) {
            if (this.foodHealthEffect < 0) {
                dailyFoodEffect = 1.0 / 31.0;
            } else if (this.foodHealthEffect > 0) {
                dailyFoodEffect = -1.0 / 31.0;
            }

        } else {
            dailyFoodEffect = maxFoodEffect / 31.0;
        }

        this.foodHealthEffect += dailyFoodEffect;

        // Restrict to max range
        if ( maxFoodEffect > 0 && this.foodHealthEffect > maxFoodEffect ) {
            this.foodHealthEffect = maxFoodEffect;
        } else if ( maxFoodEffect < 0 && this.foodHealthEffect < maxFoodEffect ) {
            this.foodHealthEffect = maxFoodEffect;
        }
    };

    this.isMonday = function() {
        return this.date.getDay() == 1;
    };

    this.isFirstDayOfEveryThirdMonths = function() {
        return this.date.getDate() == 1 && this.date.getMonth() % 3 == 0;
    };

    this.getAge = function () {
        return rawAttributes.age;
    };

    this.shouldDie = function() {
      return this.getHealth() <= 0 && ! dog.isDead();
    };

    this.getAgeInWeeks = function () {
        return this.getAge()/7.0;
    };

    this.getAgeInMonths = function () {
        return Math.round(this.getAgeInMonthsFloat());
    };

    this.getAgeInMonthsFloat = function () {
        return this.getAge() / (7.0*4.0);
    };

    this.getAgeInYears = function () {
        return this.getAgeInYearsFloat().toFixed(1);
    };

    this.getAgeInYearsFloat = function () {
        return parseFloat(this.getAge() / (7 * 4 * 12));
    };

    this.getHeight = function () {

        if (this.getAgeInWeeks() < 8) {
            return 0;
        } else if ( this.getAgeInMonths() < 12 ) {
            var puppyHeight = DogData.getPuppyHeight(this.getAgeInMonthsFloat(), fixedAttributes.isFemale()) * fixedAttributes.getHeightFactor();
            puppyHeight += this.getHeightMeasureUncertainty(Constants.MEASURE_UNCERTAINTY.HEIGHT);
            return puppyHeight;
        } else {
            if (fixedAttributes.isFemale()) {
                return DogData.OPTIMUM_HEIGHT.FEMALE * fixedAttributes.getHeightFactor();
            } else {
                return DogData.OPTIMUM_HEIGHT.MALE * fixedAttributes.getHeightFactor();
            }
        }
    };

    this.getHeightRounded = function() {
        return parseFloat(this.getHeight()).toFixed(1);
    };

    this.getOptimalHeight = function () {
        if ( this.getAgeInMonths() < 12 ) {
            return DogData.getPuppyHeight(this.getAgeInMonthsFloat(), fixedAttributes.isFemale());
        } else {
            if (fixedAttributes.isFemale()) {
                return DogData.OPTIMUM_HEIGHT.FEMALE;
            } else {
                return DogData.OPTIMUM_HEIGHT.MALE;
            }
        }
    };

    this.getMassMeasureUncertainty = function() {
        return rawAttributes.currentPuppyMassUncertaintyFactor;
    };

    this.canReproduce = function() {
        return this.getAgeInYears() >= 2.0;
    };

    this.getHeightMeasureUncertainty = function(deviation) {
        return deviation * rawAttributes.currentPuppyHeightUncertaintyFactor;
    };

    this.getMass = function () {
        var mass = this.getOptimalMass() * fixedAttributes.getMassFactor();

        if ( this.getAgeInMonths() < 12 ) {
            var value = mass + mass * this.getMassMeasureUncertainty();
            return value;
        } else {
            return mass;
        }
    };

    this.getOptimalMass = function () {

        var max = 9.0;
        var min = 8.0;

        if (this.getAgeInWeeks() < min) {
            return DogData.getPuppyMass(this.getAgeInWeeks(), fixedAttributes.isFemale());
        } else if (this.getAgeInWeeks() >= min && this.getAgeInWeeks() < max) {

            var diff = max - min;
            var a = (max - this.getAgeInWeeks()) / diff;
            var b = (this.getAgeInWeeks() - min) / diff;

            var puppyMass = DogData.getPuppyMass(this.getAgeInWeeks(), fixedAttributes.isFemale());
            var adultMass = DogData.getOptimalMass(this.getOptimalHeight());

            return a*puppyMass + b*adultMass;
        } else {
            return DogData.getOptimalMass(this.getOptimalHeight());
        }
    };

    this.canRemove = function() {
        return !dog.isDead();
    };

    this.canBeKilled = function() {
        return (this.getHealth() < 2);
    };

    this.getMassInGrams = function () {
        return Math.round(this.getMass());
    };

    this.getMassInKilograms = function () {
        return parseFloat(this.getMass() / 1000).toFixed(1);
    };

    this.getOpenness = function () {
        return Math.round(rawAttributes.openness);
    };

    this.getCalmness = function () {
        return Math.round(rawAttributes.calmness);
    };

    this.getComposure = function () {
        return Math.round(rawAttributes.composure);
    };

    this.getHealthFloat = function () {
        var overall = DogData.calculateCurrentHealth(rawAttributes.health, this.getAgeInYearsFloat());
        var birthEffect = dog.breed.birthStress;
        var foodEffect = this.foodHealthEffect;
        var healthIssuesEffect = dog.getTotalHealthIssueEffect();

        return Library.restrictToRange(overall+birthEffect+foodEffect+healthIssuesEffect, 0, 10);
    };

    this.getHealth = function () {
        return Math.round(this.getHealthFloat());
    };

    this.getTrainingFloat = function () {
        return Library.restrictToRange(rawAttributes.training, 0, 10);
    };

    this.getTraining = function () {
        return Math.round(rawAttributes.training);
    };

    this.getExperienceFloat = function () {
        return Library.restrictToRange(10.0*Math.sqrt((rawAttributes.experience + rawAttributes.gainedAbsoluteExperience)/10.0), 0, 10);
    };

    this.getExperience = function () {
        return Math.round( this.getExperienceFloat() );
    };

}