"use strict";

function Ratings(fixedAttributes, numberAttributes, dogGame) {

    this.getHeightGrade = function () {

        if (numberAttributes.getAgeInWeeks() < 8) {
            return "";
        }

        var deviation = Math.abs(numberAttributes.getHeight() - numberAttributes.getOptimalHeight());
        var relative = deviation / DogData.OPTIMUM_HEIGHT.MAX_ABSOLUTE_DEVIATION;

        var grade = 10 * (1 - Math.pow(relative, 3));
        grade = Library.restrictToRange(grade, 0, 10);
        return Math.round(grade);
    };

    this.getMassGrade = function () {
        var relative = fixedAttributes.massFactor / DogData.OPTIMUM_MASS.MAX_RELATIVE_DEVIATION;

        var grade = 10 * (1 - Math.pow(relative, 3));
        grade = Library.restrictToRange(grade, 0, 10);
        return Math.round(grade);
    };

    this.getRating = function () {
        return parseFloat(this.getRatingFloat()).toFixed(1);
    };

    this.getRatingStar = function () {
        return Library.getStarImage(this.getRatingFloat());
    };

    this.getBreedRatingStar = function () {
        return Library.getStarImage(this.getBreedRating());
    };

    this.getMatchShowRatingStar = function () {
        return Library.getStarImage(this.getMatchShowRating());
    };

    this.getBreedRating = function () {

        var sum_mental = this.getMentalRatingFloat();
        var sum_physical = this.getHeightGrade();
        var sum_other = numberAttributes.getHealth();

        // The smallest rating affects with factor 3
        var minRating = Math.min(numberAttributes.getCalmness(), numberAttributes.getComposure(), numberAttributes.getOpenness(), this.getHeightGrade(), this.getMassGrade(), numberAttributes.getHealth());

        var sum = Math.round(sum_mental) + Math.round(sum_physical) + Math.round(sum_other) + minRating * 2;

        var grade = sum / (3 + 1 + 1 + 2);
        grade += dogGame.genes.shinyFur.getRatingEffect();

        return Library.restrictToRange(parseFloat(grade).toFixed(1), 0, 13);
    };

    this.getRatingFloat = function () {

        var sum_mental = this.getMentalRatingFloat();
        var sum_physical = this.getHeightGrade();
        var sum_other = this.getOtherRatingsFloat();

        // The smallest rating affects with factor 3
        var minRating = Math.min(numberAttributes.getCalmness(), numberAttributes.getComposure(), numberAttributes.getOpenness(), this.getHeightGrade(), this.getMassGrade(), numberAttributes.getHealth(), numberAttributes.getTraining(), numberAttributes.getExperience());

        var sum = Math.round(sum_mental) + Math.round(sum_physical) + Math.round(sum_other) + minRating * 2;

        var grade = sum / (3 + 1 + 3 + 2);
        grade += dogGame.genes.shinyFur.getRatingEffect() + dogGame.attributes.number.luck;


        return Library.restrictToRange(parseFloat(grade).toFixed(1), 0, 13);
    };

    this.getMatchShowRating = function () {
        var sum_mental = this.getMentalRatingFloat();
        var sum_other = this.getOtherRatingsFloat();

        // The smallest rating affects with factor 3
        var minRating = Math.min(numberAttributes.getCalmness(), numberAttributes.getComposure(), numberAttributes.getOpenness(), numberAttributes.getHealth(), numberAttributes.getTraining(), numberAttributes.getExperience());

        var sum = Math.round(sum_mental) + Math.round(sum_other) + minRating * 2;

        var grade = sum / (3 + 3 + 2);
        grade += dogGame.genes.shinyFur.getRatingEffect() + dogGame.attributes.number.luck;

        return Library.restrictToRange(parseFloat(grade).toFixed(1), 0, 13);
    };

    this.getOtherRatingsFloat = function () {
        return numberAttributes.getHealth() + numberAttributes.getTraining() + numberAttributes.getExperience();
    };

    this.getMentalRatingFloat = function () {
        return numberAttributes.getCalmness() + numberAttributes.getComposure() + numberAttributes.getOpenness();
    };

}