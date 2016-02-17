function Hips(alleles) {
    this.alleles = alleles;

    /**
     * Counts values in alleles
     */
    this.getCount = function () {
        var count = 0;
        for (var i = 0; i < this.alleles.length; i++) {
            if (this.alleles[i] == true) {
                count++;
            }
        }

        return count;
    };

    this.isA = function () {
        return this.getCount() <= 1;
    };

    this.isC = function () {
        return !this.isA() && !this.isE();
    };

    this.isE = function () {
        return this.getCount() >= 3;
    };

    this.getRandomAlleles = function () {
        var num1 = -1;
        var num2 = -1;

        while (num1 == num2) {
            num1 = parseInt(Math.random() * this.alleles.length);
            num2 = parseInt(Math.random() * this.alleles.length);
        }

        return [this.alleles[num1], this.alleles[num2]];
    };

    this.getStatusText = function () {
        if (this.isA()) {
            return "A";
        } else if (this.isC()) {
            return "C";
        } else {
            return "E";
        }
    };
}