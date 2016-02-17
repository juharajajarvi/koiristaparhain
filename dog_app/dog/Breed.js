function Breed(fixedAttributes) {

    this.fixedAttributes = fixedAttributes;

    this.birthStress = 0;

    this.litters = [];

    this.startNewLitter = function (date) {

        var litterObject = {
            index: this.getNumberOfLitters() + 1,
            date: date,
            puppies: []
        };
        this.litters.push(litterObject);
    };

    this.setBirthStress = function() {
        if (this.fixedAttributes.isFemale()) {
            this.birthStress = 1;
        }
    };

    this.decreaseBirthStress = function () {
        this.birthStress = Library.restrictToRange(this.getBirthStress() - (1.0 / 365.0), 0, 1);
    };

    this.getBirthStressDescription = function () {
        if (this.getBirthStress() == 0) {
            if (this.getNumberOfLitters() == 0) {
                return "Koiralla ei ole raskausstressiä, koska se ei ole synnyttänyt pentuja.";
            } else {
                return "Edellisestä raskausta on niin kauan, että stressi on mennyt ohi.";
            }
        } else if (this.getBirthStress() < 0.25) {
            return "Edellisestä raskaudesta on melko kauan, mutta ei ole silti kannattavaa tehdä koiralla pentuja nyt.";
        } else if (this.getBirthStress() < 0.5) {
            return "Koiralla vielä melko paha stressi edellisestä raskaudesta.";
        } else {
            return "Koiralla on hyvin paha stressi edellisestä raskaudesta. Jos teetät sillä nyt pentuja, ne ovat merkittävästi huonolaatuisempia kuin normaalisti.";
        }
    };

    this.getBirthStressText = function () {
        return Math.ceil(this.getBirthStress() * 100) + " %";
    };

    this.getBirthStress = function () {
        return this.birthStress;
    };

    this.hasBirthStress = function () {
        return this.getBirthStress() > 0;
    };

    this.getNumberOfLitters = function () {
        return this.litters.length;
    };

    this.addPuppy = function (puppy) {

        // Don't keep track of puppies of unrelevant dogs.
        if (this.getNumberOfLitters() == 0) {
            return;
        }
        this.litters[this.getNumberOfLitters() - 1].puppies.push(puppy);
    };

}