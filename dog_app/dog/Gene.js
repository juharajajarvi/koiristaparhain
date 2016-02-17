function Gene(alleles) {
    this.alleles = alleles;

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
            return "Sairas";
        } else if (this.isCarrier()) {
            return "Kantaja";
        } else {
            return "Terve";
        }
    };
}