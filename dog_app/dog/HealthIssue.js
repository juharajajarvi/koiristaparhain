function HealthIssue(type, text, effect, maxIncreaseWhenOperated, cureChance, price) {
    this.dog = null;
    this.type = type;
    this.text = text;
    this.effect = effect;
    this.originalEffect = effect;
    this.isHidden = false;

    this.operations = [];

    this.cureChance = cureChance;
    this.price = price;

    this.findDate = null;
    this.isFound = false;

    this.startDate = null;
    this.isTriggered = false;

    this.isCured = false;

    this.isSeen = false;

    // Health problems might start as undetected and only be found at later age.
    this.setIsFound = function (date) {
        if (!this.isFound) {
            if (date >= this.findDate) {
                this.isFound = true;
                return true;
            }
        }

        return false;
    };

    /* Return true when trigger happens.*/
    this.tryTriggering = function (currentDate) {

        if (this.isTriggered) {
            return false;
        }

        var timeDiff = currentDate.getTime() - this.startDate.getTime();

        if (timeDiff > 0) {
            this.isTriggered = true;
            return true;
        } else {
            return false;
        }
    };

    this.setFindDate = function (date, findAfterDays) {
        //console.log(date);

        // Randomize when this health issue will be find.
        // The more serious the issue, the more sooner it will probably be found.

        this.findDate = new Date(date);
        if (findAfterDays == null) {
            this.findDate.setDate(this.findDate.getDate() + (RandomHelper.linearNormalDistributed() * 180.0 + 400.0 * (-1.0 / this.originalEffect)) + 180.0);
        } else {
            this.findDate.setDate(this.findDate.getDate() + findAfterDays);
        }

        //console.log(this.findDate);
        this.startDate = new Date(this.findDate);
        this.startDate.setDate(this.findDate.getDate() + 1);

        //console.log(this.startDate);
    };

    this.getHealthEffect = function () {

        if (this.isTriggered) {
            return this.effect;
        } else {
            return 0;
        }
    };

    this.hide = function () {
        this.isHidden = true;
        this.isSeen = true;
    };

    this.getPrice = function () {
        return this.price;
    };

    this.acknowledge = function () {
        this.isSeen = true;
    };

    this.operate = function () {

        this.isSeen = true;

        var operation = {
            changeInHealth: 0,
            isCured: false,
            effect: 0
        };

        var whatHappendsRandom = Math.random();

        if (whatHappendsRandom <= this.cureChance) {
            // Totally cured
            operation.changeInHealth = (-1) * this.effect;
        } else if (whatHappendsRandom > 0.95) {
            // Totally dead
            operation.changeInHealth = -10;
        } else {
            // Random effect
            operation.changeInHealth = RandomHelper.linearNormalDistributed() * this.originalEffect;
        }

        if (operation.changeInHealth + this.effect >= 0) {
            operation.changeInHealth = this.effect * (-1);
            this.isCured = true;
        } else if (operation.changeInHealth < 0) {
            // Badly-gone surgeries start to affect health
            this.isTriggered = true;
        }

        this.effect = this.effect + operation.changeInHealth;
        operation.effect = this.effect;

        operation.isCured = this.isCured;

        this.operations.push(operation);

    };

    this.createSkeleton = function () {
        return {
            type: this.type,
            text: this.text,
            effect: this.effect,
            originalEffect: this.originalEffect,
            isHidden: this.isHidden,
            operations: this.operations,
            cureChance: this.cureChance,
            price: this.price,
            findDate: this.findDate,
            isFound: this.isFound,
            startDate: this.startDate,
            isTriggered: this.isTriggered,
            isCured: this.isCured,
            isSeen: this.isSeen
        };
    };

    this.deserialize = function (issue) {
        this.type = issue.type;
        this.text = issue.text;
        this.effect = issue.effect;
        this.originalEffect = issue.originalEffect;
        this.isHidden = issue.isHidden;
        this.operations = issue.operations;
        this.cureChance = issue.cureChance;
        this.price = issue.price;
        this.findDate = new Date(issue.findDate);
        this.isFound = issue.isFound;
        this.startDate = new Date(issue.startDate);
        this.isTriggered = issue.isTriggered;
        this.isCured = issue.isCured;
        this.isSeen = issue.isSeen;
    };
}