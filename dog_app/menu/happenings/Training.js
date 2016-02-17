/*jslint node: true */
'use strict';

function Training(type, name, place, time, level, $scope) {
    this.type = type;
    this.name = name;
    this.place = place;
    this.level = parseFloat(level);
    this.time = time;
    this.isSignup = false;
    this.userDog = null;
    this.userRank = 0;

    this.isTraining = function () {
        return true;
    };

    this.getMinimumAgeInMonths = function () {
        return 2;
    };

    this.getStarImage = function () {
        return Library.getStarImage(this.level);
    };

    this.getNameGenetive = "koulutukseen";

    this.printDate = function () {
        var prettyPrintedDate = this.time.toLocaleDateString();
        var day = '';

        if (this.time.getDay() === 6) {
            day = 'Lauantai';
        } else if (this.time.getDay() === 0) {
            day = 'Sunnuntai';
        } else if (this.time.getDay() === 3) {
            day = 'Keskiviikko';
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

    this.getAction = function (currentDate) {
        if (this.time <= currentDate) {
            if (this.isSignup) {
                return "start";
            } else {
                return "remove";
            }
        } else {
            return "";
        }
    };

    this.getName = function () {
        return this.type;
    };

    this.printLevel = function () {
        return ""; //parseFloat(this.level).toFixed(1);
    };

    this.getButtonText = function () {
        if (this.isSignup) {
            return "Peru ilmoittautuminen";
        } else {
            return "Ilmoittaudu";
        }
    };

    this.getJumpButtonText = function () {
        return "Aloita heti";
    };

    this.getPricePrint = function () {
        return this.getPrice() + " €";
    };


    this.getPrice = function () {
        return Math.round(this.getMoneyFactor());
    };

    this.getMoneyFactor = function () {
        return DifficultySettings.MONEY.TRAINING_PRICE;
    };

    this.getHtmlClass = function () {
        return "training";
    };

}