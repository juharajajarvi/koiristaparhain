function Trait(alleles, ratingEffect) {
    this.alleles = alleles;
    this.ratingEffect = ratingEffect;

    /**
     * Counts values in alleles
     */
    this.getCount = function() {
        var count = 0;
        for (var i=0; i < this.alleles.length; i++) {
            if (this.alleles[i] === true) {
                count++;
            }
        }

        return count;
    };

    this.isActive = function () {
        return this.getCount() == 2;
    };

    this.isCarrier = function () {
        return this.getCount() == 1;
    };

    this.getRandomAllele = function () {
        return [RandomHelper.randomChoose(this.alleles)];
    };

    this.getStatusText = function () {
        if (this.isActive()) {
            return "Kyllä";
        } else if (this.isCarrier()) {
            return "Kantaja";
        } else {
            return "Ei";
        }
    };

    this.getRatingEffect = function (ageInDays) {
        if (this.isActive()) {
            return Number((this.ratingEffect).toFixed(1));
        } else {
            return 0;
        }
    };
}