function BankAccount($scope, amount) {
    this.$scope = $scope;
    this.sum = 0;
    this.history = [];
    this.sponsor = null;
    this.allSponsors = [];

    this.foodQuality = 1;

    this.init = function (amount) {
        this.increase(amount);

        this.allSponsors.push(new Sponsor("Hilma ja Lexa", "hilma_ja_lexa.png", "no", "Ei purkamisehtoa.", 15));
        this.allSponsors.push(new Sponsor("Ansun koiratarvike", "ansun_koiratarvike.png", "health", "Sopimus puretaan jos pentueessasi on CEA:ta sairastavia tai E-lonkkaisia pentuja.", 25));
        this.allSponsors.push(new Sponsor("Hau.com", "hau_com.png", "rank", "Sopimus puretaan jos sijoitut virallisessa näyttelyssä viidettä sijaa huonommin.", 35));
        //this.allSponsors.push(new Sponsor("Ei sponsoria", "no", "no_sponsor.png", "-", 0));
    };

    this.trySponsorCancel = function (type) {
        if (this.hasSponsor()) {
            this.sponsor.tryCancellation(type);
        }
    };

    this.increase = function (amount) {
        this.sum += amount;
    };

    this.decrease = function (amount) {
        this.sum -= amount;
    };

    this.printAmount = function () {
        return parseInt(this.sum) + " €";
    };

    this.getClass = function () {
        if (this.sum < 0) {
            return "debt";
        } else {
            return "";
        }
    };

    this.init(amount);

    this.hasSponsor = function () {
        return this.sponsor !== null;
    };

    this.getSponsorName = function () {
        return this.sponsor.name;
    };

    this.getExpensesPerDay = function () {
        return (this.$scope.dogs.length * this.getFoodPricePerDay()
        + this.$scope.puppies.length * this.getFoodPricePerDay());
    };

    this.getExpensesPerWeek = function () {
        return 7 * this.getExpensesPerDay();
    };

    this.getIncomePerDay = function () {
        return parseInt(this.getIncomePerWeek() / 7);
    };

    this.getIncomePerWeek = function () {
        if (this.hasSponsor()) {
            return this.sponsor.getAmountPerWeek();
        } else {
            return 0;
        }
    };

    this.getTotalPerWeek = function () {
        return this.getIncomePerWeek() - this.getExpensesPerWeek();
    };

    this.chooseSponsor = function (sponsor, callback) {
        console.log('BankAccount choose');
        this.sponsor = sponsor;
        var currentDate = new Date(this.$scope.currentDate);
        currentDate.setMonth(currentDate.getMonth() + sponsor.contractLength * 12);
        this.sponsor.contractUntil = currentDate;

        if (callback) {
            callback();
        }

    };

    this.getFoodPricePerDay = function () {
        return this.getFoodPricePerWeek() / 7.0;
    };

    this.getFoodPricePerWeek = function () {
        return DifficultySettings.FOOD.PRICES[this.foodQuality];
    };

    this.getFoodQualityEffect = function () {
        return DifficultySettings.FOOD.HEALTH_EFFECT[this.foodQuality];
    };

    this.serialize = function () {
        var obj = {
            sum: this.sum,
            foodQuality: this.foodQuality,
            sponsor: this.hasSponsor() ? this.sponsor.serialize() : null
        };
        return JSON.stringify(obj);
    };

    this.deserialize = function (skeleton) {
        this.sum = skeleton.sum;
        this.foodQuality = skeleton.foodQuality;

        if (skeleton.sponsor != null) {
            this.sponsor = new Sponsor(skeleton.sponsor.name, skeleton.sponsor.img, skeleton.sponsor.cancellation, skeleton.sponsor.cancellationText, skeleton.sponsor.amountPerWeek);
            this.sponsor.deserialize(skeleton.sponsor);
        }
    };

    this.canAfford = function (amount) {
        return this.sum >= amount;
    };


}