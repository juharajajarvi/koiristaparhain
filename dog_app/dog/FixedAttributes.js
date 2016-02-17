function FixedAttributes(kennel, officialName, sex, color, heightFactor, massFactor, isOwn, breed) {
    this.kennel = kennel;
    this.officialName = officialName;
    this.sex = sex;
    this.color = color;
    this.heightFactor = heightFactor;
    this.massFactor = heightFactor;
    this.timeOfDeath = null;
    this.isOwn = isOwn;
    this.breed = breed;

    this.isOwned = function() {
        return this.isOwn === true || this.isOwn === "true";
    };

    this.getFullName = function() {
        return this.kennel + " " + this.officialName;
    };

    this.isFemale = function () {
        return this.sex === Constants.SEX.FEMALE;
    };

    this.isMale = function () {
        return this.sex === Constants.SEX.MALE;
    };

    this.isShetlandsheepdog = function() {
        return this.breed == Constants.BREEDS.shetlandsheepdog.breed;
    };

    this.isChihuahua = function() {
        return this.breed == Constants.BREEDS.chihuahua.breed;
    };

    this.getBreed = function() {
        return this.breed;
    };

    this.getBreedText = function() {
        return Constants.BREEDS[this.getBreed()].name;
    };

    this.isBimerle = function() {
        return this.color === Constants.COLOR.BIMERLE;
    };

    this.isBluemerle = function () {
        return this.color === Constants.COLOR.BLUEMERLE || this.isBimerle();
    };

    this.isTricolour = function () {
        return this.color === Constants.COLOR.TRICOLOUR;
    };

    this.isSable = function () {
        return this.color === Constants.COLOR.SABLE;
    };

    this.getMassFactor = function() {
        return 1.0 + this.massFactor;
    };


    this.getHeightFactor = function() {
        return 1.0 + this.heightFactor;
    };
}