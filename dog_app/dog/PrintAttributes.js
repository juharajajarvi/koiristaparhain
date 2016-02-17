function PrintAttributes(fixedAttributes, numberAttributes, dog) {

    this.getAge = function () {
        if (numberAttributes.getAgeInWeeks() < 16) {

            var weekText = "viikkoa";
            var dayText = "päivää";

            var ageInWeeks = numberAttributes.getAgeInWeeks();
            var fullWeeks = Math.floor(ageInWeeks);

            var fullDays = ageInWeeks - fullWeeks;
            fullDays *= 7;
            fullDays = Math.floor(fullDays);

            if (fullWeeks === 1) {
                weekText = "viikko";
            }
            if (fullDays === 1) {
                dayText = "päivä";
            }

            var text = '';

            if (fullWeeks > 0) {
                text = fullWeeks + " " + weekText;
            }
            if (fullWeeks > 0 && fullDays > 0) {
                text += ' ja ';
            }
            if (fullDays > 0 || fullWeeks == 0) {
                text += fullDays + " " + dayText;
            }

            return text;
        } else if (numberAttributes.getAgeInMonths() < 12) {
            return numberAttributes.getAgeInMonths() + " kuukautta";
        } else {
            return numberAttributes.getAgeInYears() + " vuotta";
        }
    };

    this.getHeight = function () {
        if (numberAttributes.getAgeInWeeks() < 8) {
            return "?";
        } else {
            return numberAttributes.getHeightRounded() + " cm";
        }
    };

    this.getMass = function () {
        if (numberAttributes.getAgeInWeeks() < 8) {
            return numberAttributes.getMassInGrams() + " g";
        } else {
            return numberAttributes.getMassInKilograms() + " kg";
        }
    };

    this.getOptimalMass = function() {
      return parseFloat(numberAttributes.getOptimalMass()/1000).toFixed(1) + " kg";
    };

    this.getImage = function () {

        if (dog.isDead() ) {
            return 'dog_app/dog/img/dead_dog.png';
        } else if ( fixedAttributes.isShetlandsheepdog() ) {
            if (fixedAttributes.isBimerle()) {
                return 'dog_app/dog/img/'+dog.attributes.fixed.breed+'/bimerle'+this.getTrait()+'.png';
            } else if (fixedAttributes.isBluemerle()) {
                return 'dog_app/dog/img/'+dog.attributes.fixed.breed+'/bluemerle'+this.getTrait()+'.png';
            } else if (fixedAttributes.isTricolour()) {
                return 'dog_app/dog/img/'+dog.attributes.fixed.breed+'/tricolour'+this.getTrait()+'.png';
            } else if (fixedAttributes.isSable()) {
                return 'dog_app/dog/img/'+dog.attributes.fixed.breed+'/sable'+this.getTrait()+'.png';
            }
        } else if ( fixedAttributes.isChihuahua() ) {
            return 'dog_app/dog/img/'+dog.attributes.fixed.breed+'/sable.png';
        }
    };

    this.getTrait = function() {
        return dog.genes.shinyFur.isActive()? '_shiny' : '';
    };

    this.getHtmlClass = function () {
        if (numberAttributes.getAgeInWeeks() < 8) {
            return 'puppy';
        } else if (numberAttributes.getAgeInMonths() < 6) {
            return 'semiadult';
        } else {
            return 'adult';
        }
    };

    this.getNameCssClass = function() {
        if (fixedAttributes.isOwn) {
            return "blue-color";
        } else {
            return "other";
        }
    };

}