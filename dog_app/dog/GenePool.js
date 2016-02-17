/**
 * @param name
 * @param alleles (array of strings, {alpha, beta, gamma, delta, epsilon})
 * @constructor
 */
function GenePool(alleles) {

    this.hasGeneratedHealthProblems = false;

    this.dog = null;

    this.calmnessEffect = 0;

    if (alleles.length == 0) {

        var emphasis = "";

        // To make genes not-so-evenly distributed, choose randomly gene that will be more emphasised
        var index = Math.random();

        if (index < 0.2) {
            emphasis = "alpha";
        } else if (index < 0.4) {
            emphasis = "beta";
        } else if (index < 0.6) {
            emphasis = "gamma";
        } else if (index < 0.8) {
            emphasis = "delta";
        } else {
            emphasis = "epsilon";
        }

        for (var i = 0; i < 15; i++) {
            alleles.push(RandomHelper.randomChoose(['alpha', 'beta', 'gamma', 'delta', 'epsilon', emphasis]));
        }
    }

    this.alleles = alleles;

    /**
     * Counts values in alleles. name = alpha, beta, gamma, delta, epsilon.
     */
    this.getCount = function (name) {
        var count = 0;
        for (var i = 0; i < this.alleles.length; i++) {
            if (this.alleles[i] == name) {
                count++;
            }
        }

        return count;
    };

    this.hasPoorGenePool = function () {
        return this.isLackingAlpha() === true
            || this.isLackingBeta() === true
            || this.isLackingDelta() === true
            || this.isLackingEpsilon() === true
            || this.isLackingGamma() === true;
    };

    this.numberAlpha = function () {
        return this.getCount("alpha");
    };

    this.numberBeta = function () {
        return this.getCount("beta");
    };

    this.numberGamma = function () {
        return this.getCount("gamma");
    };

    this.numberDelta = function () {
        return this.getCount("delta");
    };

    this.numberEpsilon = function () {
        return this.getCount("epsilon");
    };

    this.isLackingAlpha = function () {
        return this.isLacking("alpha");
    };

    this.isLackingBeta = function () {
        return this.isLacking("beta");
    };

    this.isLackingGamma = function () {
        return this.isLacking("gamma");
    };

    this.isLackingDelta = function () {
        return this.isLacking("delta");
    };

    this.isLackingEpsilon = function () {
        return this.isLacking("epsilon");
    };

    this.isLacking = function (name) {
        var count = this.getCount(name);

        if (count == 0) {
            return true;
        } else if (count == 1) {
            return "almost";
        } else {
            return false;
        }
    };

    this.getRandomAlleles = function () {
        var allelesInRandomOrder = shuffleArray(this.alleles);
        allelesInRandomOrder = allelesInRandomOrder.slice(0, this.alleles.length / 2);

        return allelesInRandomOrder;

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
    };

    this.generateHealthProblems = function () {

        if (this.hasGeneratedHealthProblems) {
            return;
        }

        this.hasGeneratedHealthProblems = true;

        var effect = 0;
        if (this.isLackingAlpha() === true) {
            effect = (-4.9 * Math.random() - 0.5);
            this.dog.addIssue(new HealthIssue('health', 'Koiralla havaittiin sydämen vajaatoimintaa', effect, 3.5, 0.4, 2000));
        }
        if (this.isLackingBeta() === true) {
            effect = (-3.9 * Math.random() - 0.3);
            this.dog.addIssue(new HealthIssue('health', 'Koiralla on polven sijoiltaanmeno.', effect, 4.4, 0.7, 3000));
        }
        if (this.isLackingGamma() === true) {
            effect = (-4.9 * Math.random() - 1.5);
            this.dog.addIssue(new HealthIssue('health', 'Hengitysvaikeus.', effect, 2.2, 0.15, 10000));
        }
        if (this.isLackingDelta() === true) {
            effect = (-1.9 * Math.random() - 0.2);
            this.dog.addIssue(new HealthIssue('health', 'Koiralla on vino hammas.', effect, 1.1, 0.9, 500));
        }
        if (this.isLackingEpsilon() === true) {
            effect = (-1.9 * Math.random() - 0.2);
            this.dog.addIssue(new HealthIssue('health', 'Koiralla on virtsakivi.', effect, 4.2, 0.75, 1500));
        }
    };
}