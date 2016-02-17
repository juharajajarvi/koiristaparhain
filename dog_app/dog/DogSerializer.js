var DogSerializer = {

    serialize: function (array) {

        var result = [];
        for (var i = 0; i < array.length; i++) {
            var from = array[i];
            result.push(this.copyDogData(from, null, true));
        }

        return JSON.stringify(result);
    },

    copyDogData: function (from, to, isSave) {

        if (from == null) {
            return null;
        }
        if (to == null) {

            // Make a "skeleton" object
            to = {
                attributes: {
                    fixed: {},
                    number: {},
                    raw: {}
                },
                breed: {},
                genes: {
                    cea: {},
                    hips: {},
                    shinyFur: {},
                    genePool: {}
                },
                placements: {},
                healthIssues: []
            };
        }

        to.attributes.fixed.color = from.attributes.fixed.color;
        to.attributes.fixed.heightFactor = from.attributes.fixed.heightFactor;
        to.attributes.fixed.isOwn = from.attributes.fixed.isOwn;
        to.attributes.fixed.kennel = from.attributes.fixed.kennel;
        to.attributes.fixed.massFactor = from.attributes.fixed.massFactor;
        to.attributes.fixed.officialName = from.attributes.fixed.officialName;
        to.attributes.fixed.sex = from.attributes.fixed.sex;
        to.attributes.fixed.timeOfDeath = from.attributes.fixed.timeOfDeath;
        to.attributes.fixed.breed = from.attributes.fixed.breed;

        to.attributes.number.date = new Date(from.attributes.number.date);

        to.attributes.raw.age = from.attributes.raw.age;
        to.attributes.raw.calmness = from.attributes.raw.calmness;
        to.attributes.raw.composure = from.attributes.raw.composure;
        to.attributes.raw.currentPuppyHeightUncertaintyFactor = from.attributes.raw.currentPuppyHeightUncertaintyFactor;
        to.attributes.raw.currentPuppyMassUncertaintyFactor = from.attributes.raw.currentPuppyMassUncertaintyFactor;
        to.attributes.raw.experience = from.attributes.raw.experience;
        to.attributes.raw.gainedAbsoluteExperience = from.attributes.raw.gainedAbsoluteExperience;
        to.attributes.raw.health = from.attributes.raw.health;
        to.attributes.raw.openness = from.attributes.raw.openness;
        to.attributes.raw.training = from.attributes.raw.training;

        to.breed.birthStress = from.breed.birthStress;
        //to.breed.litters = from.breed.litters;

        //to.placements = from.placements;

        to.genes.cea.alleles = from.genes.cea.alleles;
        to.genes.cea.healthEffect = from.genes.cea.healthEffect;

        to.genes.hips.alleles = from.genes.hips.alleles;
        to.genes.hips.healthEffect = from.genes.hips.healthEffect;

        to.genes.shinyFur.alleles = from.genes.shinyFur.alleles;
        to.genes.shinyFur.ratingEffect = from.genes.shinyFur.ratingEffect;

        to.genes.genePool.alleles = from.genes.genePool.alleles;

        to.hasMuotovalio = from.hasMuotovalio ? from.hasMuotovalio : false;
        to.isMaailmanvoittaja = from.isMaailmanvoittaja ? from.isMaailmanvoittaja : false;
        to.isPohjoismaidenvoittaja = from.isPohjoismaidenvoittaja ? from.isPohjoismaidenvoittaja : false;

        if (isSave === true) {

            for (var i = 0; i < from.healthIssues.length; i++) {
                to.healthIssues.push(from.healthIssues[i].createSkeleton());
            }

        }

        return to;
    }


};