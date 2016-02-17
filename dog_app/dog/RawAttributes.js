function RawAttributes(age, openness, calmness, composure, health, training, experience) {
    this.age = age;
    this.openness = parseFloat(openness);
    this.calmness = parseFloat(calmness);
    this.composure = parseFloat(composure);
    this.health = parseFloat(health);
    this.training = parseFloat(training);
    this.experience = parseFloat(experience);
    this.gainedAbsoluteExperience = 0;

    this.currentPuppyMassUncertaintyFactor = 0;
    this.currentPuppyHeightUncertaintyFactor = 0;

    this.increaseAgeByOneDay = function () {
        this.age += 1;
    };

    this.setPuppySizeUncertaintyFactor = function () {
        this.currentPuppyMassUncertaintyFactor = RandomHelper.linearNormalDistributed()*Constants.MEASURE_UNCERTAINTY.MASS_BEFORE_SALE;
        this.currentPuppyHeightUncertaintyFactor = RandomHelper.linearNormalDistributed();
    };

    this.gainExperience = function(amount) {
        this.gainedAbsoluteExperience += amount;
    };

    this.addTraining = function(amount) {
      this.training += amount;

        if (this.training > 10) {
            this.training = 10.0;
        }
    };

    this.setPuppySizeUncertaintyFactor();
}