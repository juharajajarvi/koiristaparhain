function Placement(rank, dogAgeInYearsWhenGiven, nameOfHappening, typeOfHappening, dateOfHappening, placeOfHappening, trophy, isRop, moneyReward, changeInExperience) {

    this.rank = rank;
    this.nameOfHappening = nameOfHappening;
    this.typeOfHappening = typeOfHappening;
    this.dogAgeInYearsWhenGiven = dogAgeInYearsWhenGiven;
    this.dateOfHappening = dateOfHappening;
    this.placeOfHappening = placeOfHappening;
    this.trophy = trophy;
    this.moneyReward = Math.round(moneyReward);
    this.changeInExperience = changeInExperience;
    this.isRop = isRop;

    this.tooltip = this.dateOfHappening.toLocaleDateString() + " - " + this.nameOfHappening;

    if (this.typeOfHappening !== null) {
        this.tooltip += " (" + this.typeOfHappening + ")";
    }
    if (this.placeOfHappening !== null) {
        this.tooltip += ", " + this.placeOfHappening;
    }
    if (this.rank !== null) {
        this.tooltip += ", sijoitus " + this.rank + ".";
    }

}