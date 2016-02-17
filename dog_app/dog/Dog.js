function Dog(age, heightFactor, massFactor, sex, color, openness, calmness, composure, health, training, experience, kennel, officialName, isOwn, date, breed, genes, bankAccount) {

    this.attributes = {
        fixed: new FixedAttributes(kennel, officialName, sex, color, heightFactor, massFactor, isOwn, breed),
        raw: new RawAttributes(age, openness, calmness, composure, health, training, experience)
    };
    this.attributes.number = new NumberAttributes(this.attributes.fixed, this.attributes.raw, date, this);
    this.attributes.print = new PrintAttributes(this.attributes.fixed, this.attributes.number, this);
    this.attributes.ratings = new Ratings(this.attributes.fixed, this.attributes.number, this);

    this.placements = [];
    this.breed = new Breed(this.attributes.fixed);

    this.genes = genes;
    this.genes.genePool.dog = this;
    this.healthIssues = [];
    this.charts = new Charts(this.attributes);

    this.bankAccount = bankAccount;

    this.hasMuotovalio = false;
    this.isMaailmanvoittaja = false;
    this.isPohjoismaidenvoittaja = false;

    this.init = function() {
        this.generateHealthProblems();
        this.charts.updateChart(true);
    };

    //{index: 2, tooltip: 'Pentueet', active: false, include: 'dog/dog_profile/dog_profile_abstract_litters.html'},
    //{index: 3, tooltip: 'Palkinnot', active: false, include: 'dog/dog_profile/dog_profile_abstract_trophies.html'}
    this.tabs = [
        {
            index: 0,
            title: 'Yleiskuvaus',
            active: true,
            include: 'dog_app/dog/dog_profile/dog_profile_abstract_general.html'
        },
        {
            index: 1,
            title: 'Kuvaajat',
            active: false,
            include: 'dog_app/dog/dog_profile/dog_profile_abstract_graphs.html'
        },
        {
            index: 2,
            title: 'Arvosanat',
            active: false,
            include: 'dog_app/dog/dog_profile/dog_profile_abstract_ratings.html'
        },
        {index: 3, title: 'Geenit', active: false, include: 'dog_app/dog/dog_profile/dog_profile_abstract_genes.html'}
    ];

    this.generateHealthProblems = function() {
        this.genes.genePool.generateHealthProblems();
        if (this.genes.cea.isActive()) {
            effect = (-1.9 * Math.random() - 0.5);
            this.addIssue(new HealthIssue('health', 'Koiralla on silmäsairaus (CEA)', effect, 3.5, 0.05, 4000));
        }
        if (this.genes.hips.isC()) {
            effect = (-2.9 * Math.random() - 0.5);
            this.addIssue(new HealthIssue('health', 'Pieni lonkkavika.', effect, 3.5, 0.65, 2000));
        } else if (this.genes.hips.isE()) {
            effect = (-5.9 * Math.random() - 0.5);
            this.addIssue(new HealthIssue('health', 'Vakava lonkkavika.', effect, 3.5, 0.45, 5000));
        }
    };

    this.tryTriggeringHealthIssues = function() {
        var hasTriggered = false;
        for (var i=0; i < this.healthIssues.length; i++) {
            if (this.healthIssues[i].tryTriggering(date)) {
                hasTriggered = true;
            }
        }

        return hasTriggered;
    };

    this.addDatabaseHealthIssues = function(issues) {
        for (var i=0; i < issues.length; i++) {
            var issue = issues[i];
            var issueObject = new HealthIssue(issue.type, issue.text, issue.effect, issue.cureChance, issue.price);
            issueObject.dog = this;
            issueObject.deserialize(issue);
            this.healthIssues.push(issueObject);
        }
    };

    this.addIssue = function (issue, findAfterDays) {
        issue.dog = this;
        issue.setFindDate(date, findAfterDays);
        this.healthIssues.push(issue);
    };

    this.findHealthIssues = function () {
        var hasFound = false;
        for (var i = 0; i < this.healthIssues.length; i++) {
            if ( this.healthIssues[i].setIsFound(date) ) {
                hasFound = true;
            }
        }
        return hasFound;
    };

    this.getTotalHealthIssueEffect = function () {
        var total = 0;
        for (var i = 0; i < this.healthIssues.length; i++) {
            total += this.healthIssues[i].getHealthEffect(date);
        }

        return total;
    };


    this.getBreedPrice = function () {
        var price = 2800 * Math.pow(this.attributes.ratings.getRating() / 10.0, 2) + 200;
        return Math.round(price);
    };

    this.buyGenetest = function () {
        this.genetestPaid = true;
        this.tabs[0].active = false;
        this.tabs[3].active = true;
        this.bankAccount.decrease(DifficultySettings.MONEY.GENETEST_COST);
    };

    this.getBuyPrice = function () {
        return Math.round(1300 + this.attributes.ratings.getBreedRating() * 200);
    };

    this.getOlder = function () {
        var found = false;
        if (this.attributes.fixed.timeOfDeath === null) {
            this.attributes.number.calculateFoodHealthEffect();
            this.attributes.raw.increaseAgeByOneDay();
            this.attributes.raw.setPuppySizeUncertaintyFactor();
            this.charts.updateChart();
            this.breed.decreaseBirthStress();
            this.tryTriggeringHealthIssues();
            found = this.findHealthIssues();
        }

        return found;
    };


    this.pay = function (price) {
        this.bankAccount.decrease(price);
    };

    this.isEligibleForMuotovalio = function () {

        // Can only get it once
        if (this.hasMuotovalio) {
            return false;
        }

        var numberOfFirstPlaces = 0;
        var atleastOneAfter2Years = false;

        for (var i = 0; i < this.placements.length; i++) {
            var placement = this.placements[i];
            if (placement.isRop) {
                numberOfFirstPlaces++;
                if (placement.dogAgeInYearsWhenGiven >= 2) {
                    atleastOneAfter2Years = true;
                }
            }
        }

        // Needs 3 ROPs where one is got at minimum age of 2 years
        if (numberOfFirstPlaces >= LaunchSettings.ROPS_REQUIRED_FOR_MUOTOVALIO && atleastOneAfter2Years) {
            return true;
        }
    };

    this.isDead = function () {
        return this.attributes.fixed.timeOfDeath !== null;
    };

    this.getRemoveText = function () {
        if (this.isDead()) {
            return "Hautaa";
        } else if (this.attributes.number.canBeKilled()) {
            return "Lopeta";
        } else {
            return "Anna pois";
        }
    };

    this.getRemoveActionText = function () {
        if (this.attributes.number.canBeKilled()) {
            return "Haluatko viedä koiran lopetettavaksi?";
        } else {
            return "Haluatko antaa koiran pois?";
        }
    };

    this.init();

}
