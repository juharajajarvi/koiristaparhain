var AchievementsConstants = {
    EXPERIENCE: 'experience',
    TRAINING: 'training',
    WIN_SHOW: 'win_show',
    SPONSOR: 'sponsor',
    LITTER: 'litter',
    THREE_STAR: 'three_star',
    MUOTOVALIO: 'muotovalio',
    NORTH_WINNER: 'north_winner',
    WORLD_WINNER: 'world_winner',
    TEN: 'ten',
    MOVIESTAR: 'moviestar',
    SHINY: 'shiny'
};

function Achievements() {
    this.achievements = [
        new Achievement(AchievementsConstants.EXPERIENCE, "Hanki kokemusta", "Kartuta koiran kokemusta, menemällä Tapahtumat-välilehdelle ja osallistumalla mätsäreihin.", 150, false),
        new Achievement(AchievementsConstants.TRAINING, "Kouluta koiraa", "Kartuta koiran koulutusta, menemällä Tapahtumat-välilehdelle ja osallistumalla koirakouluun.", 150, false),
        new Achievement(AchievementsConstants.WIN_SHOW, "Voita näyttely", "Osallistu näyttelyyn Tapahtumat-välilehdellä. Osallistu aluksi näyttelyihin, joilla on pieni tähtilukema.", 150, false),
        new Achievement(AchievementsConstants.SPONSOR, "Hanki sponsori", "Sinulle tarjotaan sponsorointisopimusta, kun olet menestynyt hyvin näyttelyissä.", 200, false),
        new Achievement(AchievementsConstants.LITTER, "Tee pentuja", "Tee pentuja jonkin koirasi kanssa menemällä Omat koirat -välilehdelle ja klikkaamalla koiran profiilista Tee pentuja -näppäintä", 200, false),
        new Achievement(AchievementsConstants.THREE_STAR, "3-tähden kenneli", "Kasvata kennelisi tähtiluokitusta vähintään 3-tähteen voittamalla riittävän korkeatasoinen näyttely", 250, false),
        new Achievement(AchievementsConstants.MUOTOVALIO, "Muotovalio", "Koirastasi tulee muotovalio, kun se on voittanut kolme ROP-palkintoa, joista yksi vähintään kaksivuotiaana.", 500, false),
        new Achievement(AchievementsConstants.NORTH_WINNER, "Pohjoismaiden voittaja", "Voita Pohjoismaiden voittaja -näyttely. Kilpailu järjestetään joka vuosi 1. heinäkuuta", 1000, false),
        new Achievement(AchievementsConstants.WORLD_WINNER, "Maailman voittaja", "Voita Maailman voittaja -näyttely. Kilpailu järjestetään joka vuosi 1. syyskuuta", 2000, false),

        new Achievement(AchievementsConstants.MOVIESTAR, "Elokuvatähti", "Sijoitu huonosti Maailman voittaja -näyttelyssä koiralla, jonka henkiset ominaisuudet ovat loistavat, mutta se on liian korkea.", 5000, true),
        new Achievement(AchievementsConstants.TEN, "5-tähden koira", "Voita Maailman voittaja -näyttely koiralla, jonka arvosana on 5 tähteä.", 5000, true),
        new Achievement(AchievementsConstants.SHINY, "Säihkyvä pentu", "", 2000, true)
    ];

    // sukulinja

    this.serialize = function() {
        var skeleton = [];
        for (var i=0; i < this.achievements.length; i++) {
            var achievement = this.achievements[i];
            skeleton.push ({
                name: achievement.name,
                isLocked: achievement.isLocked
            });
        }
        return JSON.stringify(skeleton);
    };

    this.deserialize = function(skeleton) {

        for (var i=0; i < skeleton.length; i++) {

            var name = skeleton[i].name;
            var isLocked = skeleton[i].isLocked;

            for (var j=0; j < this.achievements.length; j++) {
                if (this.achievements[i].name == name) {
                    this.achievements[i].isLocked = isLocked;
                    break;
                }
            }

        }
    };

    this.tryUnlocking = function (codeName) {

        var achievement = this.getAchievement(codeName);
        if (achievement !== null && achievement.isLocked) {
            achievement.unlock();
            return achievement;
        }
        return null;
    };

    this.getAchievement = function (codeName) {
        for (var i = 0; i < this.achievements.length; i++) {
            if (this.achievements[i].codeName == codeName) {
                return this.achievements[i];
            }
        }

        return null;
    };

}