/*jslint node: true */
'use strict';

function OnlineHappening(type, name, time, $scope) {
    this.type = type;
    this.name = name;
    this.time = time;
    this.price = 200;
    this.isSignup = false;
    this.dogs = [];
    this.rankedDogs = [];
    this.userDog = null;
    this.userRank = 0;

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

    this.getMinimumAgeInMonths = function() {
        return 9;
    };

    this.toggleSignup = function () {
        this.isSignup = !this.isSignup;
    };

    this.getName = function () {
        return this.name;
    };

    this.getHtmlClass = function () {
        return "official-show";
    };
}