var DifficultySettings = {
    STARTING_DOG: {
        AVG: 4.0,
        DEVIATION: 0.7,
        LEVEL: 0
    },
    MONEY: {
        STARTING_AMOUNT: 10000,
        MUOTOVALIO_PRICE: 500,
        TRAINING_PRICE: 10,
        GENETEST_COST: 200
    },
    FOOD: {
        PRICES: [2, 4, 7],
        HEALTH_EFFECT: [-1.7, 0, 1.2]
    },
    BORN: {
        AVG_AMOUNT: 4.0,
        DEVIATION: 3.1,
        MONEY_PER_SELL: 900
    },
    BREED_LIST: {
        KENNEL_STAR_FACTOR: 1.25, // Always generate puppies that are better than current level
        MIN_DOG_LEVEL: 2.2,
        MAX_DOG_LEVEL: 9.99,
        DEVIATION: 2.0
    },
    HAPPENINGS: {
        WORLD_SHOW: {
            MONEY_FACTOR: 50
        },
        NORTH_SHOW: {
            MONEY_FACTOR: 20
        },
        OFFICIAL_SHOW: {
            MONEY_FACTOR: 7,
            BIS_FACTOR: 1.15,
            BIS_DEVIATION: 0.15
        },
        MATCH_SHOW: {
            MONEY_FACTOR: 2
        }
    },
    PEVISA: {
        FINE_PER_E_HIP_PUPPY: 500,
        FINE_PER_HEALTH_BELOW_2: 600,
        FINE_PER_CEA_PUPPY: 200
    },
    SPONSOR: {
        MIN_STARS: 2.5
    }
};