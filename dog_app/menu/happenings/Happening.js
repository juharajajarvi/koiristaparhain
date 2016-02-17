/*jslint node: true */
'use strict';

function Happening(type, name, place, time, level, $scope) {
    this.type = type;
    this.name = name;
    this.place = place;
    this.level = parseFloat(level);
    this.time = time;
    this.isSignup = false;
    this.dogs = [];
    this.rankedDogs = [];
    this.userDog = null;
    this.userRank = 0;

    this.isTraining = function () {
        return false;
    };

    this.getMinimumAgeInMonths = function () {
        if (this.isMatchShow()) {
            return 4;
        } else {
            return 9;
        }
    };

    this.getNameGenetive = "näyttelyyn";

    this.printDate = function () {
        var prettyPrintedDate = this.time.toLocaleDateString();
        var day = '';

        if (this.time.getDay() === 6) {
            day = 'Lauantai';
        } else if (this.time.getDay() === 0) {
            day = 'Sunnuntai';
        }

        return day + ' ' + prettyPrintedDate;
    };

    this.toggleSignup = function () {
        this.isSignup = !this.isSignup;
    };

    this.simulateTo = function () {
        this.isSignup = true;
        $scope.age(31); // Well.... It should stop at the happening anyway...
    };

    this.getStarImage = function () {
        return Library.getStarImage(this.level);
    };

    this.getAction = function (currentDate) {
        if (this.time <= currentDate) {
            if (this.isSignup) {
                return "start";
            } else if (this.isBigTournament() && this.time.getDay() == currentDate.getDay()) {
                return "last_chance_to_signup";
            } else {
                return "remove";
            }
        } else {
            return "";
        }
    };

    this.generateDogs = function (date, breed) {
        for (var i = 0; i < 10; i++) {
            var dog = DogFactory.generateAdultDog(this.level - 0.5, 1.5, false, date, breed);
            this.dogs.push(dog);
        }
    };

    this.printLevel = function () {
        return parseFloat(this.level).toFixed(1);
    };

    this.sortUsingOfficialRating = function (obj) {
        return obj.sort(function (a, b) {
            return b.attributes.ratings.getRating() - a.attributes.ratings.getRating();
        });
    };

    this.sortUsingMatchShowRating = function (obj) {
        return obj.sort(function (a, b) {
            return b.attributes.ratings.getMatchShowRating() - a.attributes.ratings.getMatchShowRating();
        });
    };

    this.rankDogs = function () {
        if (this.isMatchShow()) {
            this.rankedDogs = this.sortUsingMatchShowRating(this.dogs);
        } else {
            this.rankedDogs = this.sortUsingOfficialRating(this.dogs);
        }

        var userRank = -1;
        for (var i = 0; i < this.rankedDogs.length; i++) {
            if (this.rankedDogs[i] == this.userDog) {
                userRank = i + 1;
            }
        }

        // The amount of experience relates on the toughness of competetion.
        // The rating of the best dog (other than user) will affect it.
        var bestOtherDog = 0;
        if (userRank === 1) {
            bestOtherDog = 1;
        }
        var competitionToughness = this.level;

        var userMoneyReward = 0;
        var userTrophy;
        var userTrophy2;

        var maxUsableExperience = Math.pow((this.dogs.length + 1.0 - userRank) / this.dogs.length, 3) * competitionToughness;
        var previousExperience = this.userDog.attributes.number.getExperienceFloat();
        var absoluteGainedExperience = (maxUsableExperience - previousExperience / 2.0);
        absoluteGainedExperience = Library.restrictToRange(absoluteGainedExperience, 0, 10);

        if (previousExperience > 9.99) {
            absoluteGainedExperience = 0;
        } else if (absoluteGainedExperience > 2) {
            absoluteGainedExperience = absoluteGainedExperience * 0.5;
        }

        this.userDog.charts.updateChart(true);
        this.userDog.attributes.raw.gainExperience(absoluteGainedExperience);
        this.userDog.charts.updateChart(true);

        var changeInExperice = parseFloat(this.userDog.attributes.number.getExperienceFloat() - previousExperience).toFixed(2);

        if (userRank <= 3) {
            userMoneyReward = (4.0 - this.userRank / 3.0) * this.level * this.getMoneyFactor();
            if (this.name == HappeningHelper.NAMES.WORLD_SHOW) {
                userTrophy = RandomHelper.randomChoose(HappeningHelper.TROPHIES.WORLD_SHOW[userRank]);
            } else if (this.name == HappeningHelper.NAMES.NORTH_SHOW) {
                userTrophy = RandomHelper.randomChoose(HappeningHelper.TROPHIES.NORTH_SHOW[userRank]);
            } else {
                userTrophy = RandomHelper.randomChoose(HappeningHelper.TROPHIES[userRank]);
            }

        } else {
            userTrophy = RandomHelper.randomChoose(HappeningHelper.TROPHIES.CONSOLATION);
        }

        var placement2 = null;

        var isRop = false;
        if (!this.isMatchShow() && userRank === 1) {

            isRop = true;
            if (!this.isBigTournament()) {
                userTrophy = HappeningHelper.TROPHIES.ROP[0];
            }
            var bestInShowFactor = DifficultySettings.HAPPENINGS.OFFICIAL_SHOW.BIS_FACTOR + DifficultySettings.HAPPENINGS.OFFICIAL_SHOW.BIS_DEVIATION * RandomHelper.linearNormalDistributed();

            if (this.rankedDogs[0].attributes.ratings.getRating() > this.rankedDogs[1].attributes.ratings.getRating() * bestInShowFactor) {
                userMoneyReward *= 1.5;
                userTrophy2 = HappeningHelper.TROPHIES.BEST_IN_SHOW[0];
                placement2 = new Placement(userRank, this.userDog.attributes.number.getAgeInYears(), this.name, this.type, this.time, this.place, userTrophy2, false, 0, 0);
            }
        }

        if (userRank==1 && this.isWorldShow()) {
            this.userDog.isMaailmanvoittaja = true;
        } else if (userRank==1 && this.isNorthShow()) {
            this.userDog.isPohjoismaidenvoittaja = true;
        }

        if (this.userDog.attributes.number.getHeight() >= 44 && this.userDog.attributes.ratings.getMatchShowRating() >= 8) {
            this.isLassie = true;
        }

        var placement = new Placement(userRank, this.userDog.attributes.number.getAgeInYears(), this.name, this.type, this.time, this.place, userTrophy, isRop, userMoneyReward, changeInExperice);

        // Kennel level is only gained from official shows
        if (!this.isMatchShow() && this.$scope.level < maxUsableExperience) {
            this.$scope.level = maxUsableExperience;
            this.$scope.resetBreedDogs();
            if (maxUsableExperience / 2.0 >= 3.0 && this.$scope.activateThreeStar !== false) {
                this.$scope.activateThreeStar = true;
            }
        }

        this.placement = placement;
        this.userDog.placements.push(placement);

        if (placement2 != null) {
            this.placement2 = placement2;
            this.userDog.placements.push(placement2);
        }

    };

    this.getName = function () {
        return this.name;
    };

    this.isBigTournament = function () {
        return this.name === HappeningHelper.NAMES.WORLD_SHOW || this.name === HappeningHelper.NAMES.NORTH_SHOW;
    };

    /*
     this.getButtonText = function () {
     if (this.isSignup) {
     return "Peru ilmoittautuminen";
     } else {
     return "Ilmoittaudu";
     }
     };*/

    this.getPricePrint = function () {
        return this.getPrice() + " €";
    };

    this.getPrice = function () {
        return Math.round(this.level * this.getMoneyFactor());
    };

    this.getMoneyFactor = function () {
        if (this.isMatchShow()) {
            return DifficultySettings.HAPPENINGS.MATCH_SHOW.MONEY_FACTOR;
        } else {
            if (this.isWorldShow()) {
                return DifficultySettings.HAPPENINGS.WORLD_SHOW.MONEY_FACTOR;
            } else if (this.isNorthShow()) {
                return DifficultySettings.HAPPENINGS.NORTH_SHOW.MONEY_FACTOR;
            } else {
                return DifficultySettings.HAPPENINGS.OFFICIAL_SHOW.MONEY_FACTOR;
            }
        }
    };

    this.isMatchShow = function () {
        return this.name === Constants.HAPPENINGS.MATCH_SHOW;
    };

    this.isWorldShow = function () {
        return (this.name === HappeningHelper.NAMES.WORLD_SHOW);
    };

    this.isNorthShow = function () {
        return (this.name === HappeningHelper.NAMES.NORTH_SHOW);
    };

    this.getHtmlClass = function () {
        if (this.isMatchShow()) {
            return "match-show";
        } else {
            if (this.isWorldShow()) {
                return "big-show";
            } else if (this.isNorthShow()) {
                return "big-show";
            } else {
                return "official-show";
            }
        }
    };
}