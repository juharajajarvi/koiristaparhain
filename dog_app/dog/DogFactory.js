var DogFactory = {
    generateAdultDog: function (avgAttr, deviation, isOwn, date, breed, isStartingDog, bankAccount, vet) {
        var age = (2 + 4 * Math.random()) * 7 * 4 * 12;
        var sex = RandomHelper.getRandomSex();

        var heightFactor = DogData.OPTIMUM_HEIGHT.MAX_GENERATED_RELATIVE_DEVIATION * RandomHelper.normalDistributedRandomNumber();
        var massFactor = heightFactor; //DogData.OPTIMUM_MASS.MAX_RELATIVE_DEVIATION * RandomHelper.linearNormalDistributed();

        var color = RandomHelper.randomChoose([Constants.COLOR.BLUEMERLE, Constants.COLOR.TRICOLOUR, Constants.COLOR.SABLE]);
        if (color == Constants.COLOR.BLUEMERLE && Math.random() < DogData.BIMERLE_PROBABILITY) {
            color = Constants.COLOR.BIMERLE;
        }

        var openness = Library.restrictToRange(avgAttr + deviation * RandomHelper.linearNormalDistributed(), 0, 10);
        var calmness = Library.restrictToRange(avgAttr + deviation * RandomHelper.linearNormalDistributed(), 0, 10);
        var composure = Library.restrictToRange(avgAttr + deviation * RandomHelper.linearNormalDistributed(), 0, 10);
        var health = Library.restrictToRange(avgAttr + deviation * RandomHelper.linearNormalDistributed(), 5, 10);

        // Too annoying to give nearly dead dog at beginning
        if (isStartingDog) {
            health = health * 1.5;
            //heightFactor= DogData.OPTIMUM_HEIGHT.MAX_GENERATED_RELATIVE_DEVIATION;
        }

        var genes = {};
        genes.cea = new Gene(
            [
                Math.random() < DogData.DISEASES.CEA.PROBABILITY,
                Math.random() < DogData.DISEASES.CEA.PROBABILITY
            ]
        );
        genes.hips = new Hips(
            [
                Math.random() < DogData.DISEASES.HIPS.PROBABILITY,
                Math.random() < DogData.DISEASES.HIPS.PROBABILITY,
                Math.random() < DogData.DISEASES.HIPS.PROBABILITY,
                Math.random() < DogData.DISEASES.HIPS.PROBABILITY
            ]
        );
        genes.shinyFur = new Trait(
            [
                Math.random() < DogData.TRAITS.SHINY_FUR.PROBABILITY,
                Math.random() < DogData.TRAITS.SHINY_FUR.PROBABILITY
            ],
            DogData.TRAITS.SHINY_FUR.RATING_INCREASE
        );
        genes.genePool = new GenePool(
            []
        );

        var training = Library.restrictToRange(avgAttr + deviation * RandomHelper.linearNormalDistributed(), 0, 10);
        var experience = Library.restrictToRange(avgAttr + deviation * RandomHelper.linearNormalDistributed(), 0, 10);
        var kennel = RandomHelper.randomChoose(NameHelper.KENNELS);
        var kennelName;

        if (sex == Constants.SEX.FEMALE) {
            kennelName = NameHelper.getRandomFemaleName();
        } else {
            kennelName = NameHelper.getRandomMaleName();
        }

        var dog = new Dog(age, heightFactor, massFactor, sex, color, openness, calmness, composure, health, training, experience, kennel, kennelName, isOwn, date, breed, genes, bankAccount, vet);

        // To avoid infinite loops
        var tries = 0,
            maxTries = 10;

        while (dog.attributes.number.getHealth() < 2.0 && tries < maxTries) {
            age = (2 + 4 * Math.random()) * 7 * 4 * 12;

            dog.attributes.number.age = age;
            dog.attributes.raw.health *= 1.15;
            tries++;
        }

        return dog;
    },

    generateDogFromDatabase: function (data, date, bankAccount) {

        if (data==null) {
            return null;
        }

        var age = data.attributes.raw.age,
            heightFactor = data.attributes.fixed.heightFactor,
            massFactor = data.attributes.fixed.massFactor,
            sex = data.attributes.fixed.sex,
            color = data.attributes.fixed.color,
            openness = data.attributes.raw.openness,
            calmness = data.attributes.raw.calmness,
            composure = data.attributes.raw.composure,
            health = data.attributes.raw.health,
            training = data.attributes.raw.training,
            experience = data.attributes.raw.experience,
            kennel = data.attributes.fixed.kennel,
            kennelName = data.attributes.fixed.officialName,
            isOwn = data.attributes.fixed.isOwn,
            date = date,
            breed = data.attributes.fixed.breed;
        var genes = {};
        genes.cea = new Gene(
            data.genes.cea.alleles
        );
        genes.hips = new Hips(
            data.genes.hips.alleles
        );
        genes.shinyFur = new Trait(
            data.genes.shinyFur.alleles,
            data.genes.shinyFur.ratingEffect
        );
        genes.genePool = new GenePool(
            data.genes.genePool.alleles
        );

        var dog = new Dog(
            age, heightFactor, massFactor, sex, color, openness, calmness, composure, health, training, experience, kennel, kennelName, isOwn, date, breed, genes, bankAccount);
        dog = DogSerializer.copyDogData(data, dog, false);

        dog.addDatabaseHealthIssues(data.healthIssues);

        return dog;
    },

    generatePuppy: function (dog1, dog2, kennel, isOwn, isSaleAge, date, bankAccount, vet) {

        var age = 0;

        if (isSaleAge === true) {
            age = 8 * 7;
        }

        var sex = RandomHelper.getRandomSex();

        // Let's assume parents are selected properly.
        var color = DogData.getColor(dog1, dog2);

        var avgHeightFactor = (dog1.attributes.fixed.heightFactor + dog2.attributes.fixed.heightFactor) / 2.0;
        var heightFactor = avgHeightFactor + 0.3 * DogData.OPTIMUM_HEIGHT.MAX_GENERATED_RELATIVE_DEVIATION * RandomHelper.normalDistributedRandomNumber();
        //heightFactor = Library.restrictToRange(avgHeightFactor, -1*DogData.OPTIMUM_HEIGHT.MAX_GENERATED_RELATIVE_DEVIATION, DogData.OPTIMUM_HEIGHT.MAX_GENERATED_RELATIVE_DEVIATION);

        var massFactor = heightFactor; //avgMassFactor * ( 1 + 0.1 * RandomHelper.linearNormalDistributed());

        var avgOpenness = (dog1.attributes.number.getOpenness() + dog2.attributes.number.getOpenness()) / 2.0;
        var avgCalmness = (dog1.attributes.number.getCalmness() + dog2.attributes.number.getCalmness()) / 2.0;
        var avgComposure = (dog1.attributes.number.getComposure() + dog2.attributes.number.getComposure()) / 2.0;
        var avgHealth = (dog1.attributes.number.getHealth() + dog2.attributes.number.getHealth()) / 2.0;
        avgHealth = avgHealth - (dog1.breed.getBirthStress() + dog2.breed.getBirthStress()) * 4;

        if (isSaleAge) {
            avgHealth = Library.restrictToRange(avgHealth * 1.5, 1, 10);
        }

        var openness = Library.restrictToRange(avgOpenness + 2.0 * RandomHelper.linearNormalDistributed(), 1, 10);
        var calmness = Library.restrictToRange(avgCalmness + 2.0 * RandomHelper.linearNormalDistributed(), 1, 10);
        var composure = Library.restrictToRange(avgComposure + 2.0 * RandomHelper.linearNormalDistributed(), 1, 10);

        var health = Library.restrictToRange(avgHealth + 2.0 * RandomHelper.linearNormalDistributed(), 1, 10);

        var genes = {};
        genes.cea = new Gene(
            dog1.genes.cea.getRandomAllele().concat(dog2.genes.cea.getRandomAllele())
        );
        genes.hips = new Hips(
            dog1.genes.hips.getRandomAlleles().concat(dog2.genes.hips.getRandomAlleles())
        );
        genes.shinyFur = new Trait(
            dog1.genes.shinyFur.getRandomAllele().concat(dog2.genes.shinyFur.getRandomAllele()),
            DogData.TRAITS.SHINY_FUR.RATING_INCREASE
        );
        genes.genePool = new GenePool(
            dog1.genes.genePool.getRandomAlleles().concat(dog2.genes.genePool.getRandomAlleles())
        );

        var training = 0;
        var experience = 0;

        var officialName;

        if (sex == Constants.SEX.FEMALE) {
            officialName = NameHelper.getRandomFemaleName();
        } else {
            officialName = NameHelper.getRandomMaleName();
        }

        var breed = dog1.attributes.fixed.getBreed();

        var puppy = new Dog(age, heightFactor, massFactor, sex, color, openness, calmness, composure, health, training, experience, kennel, officialName, isOwn, date, breed, genes, bankAccount, vet);

        dog1.breed.addPuppy(puppy);
        dog2.breed.addPuppy(puppy);

        return puppy;
    }

};