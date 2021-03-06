var NameHelper = {
    KENNELS: [
        'Mikonhuhdan',
        'Kesärinteen',
        'Vattolan',
        'Vekkulan',
        'Korvalan',
        'Candyland',
        'Unelmien',
        'Välijärven',
        'Tuorilan'
    ],
    FEMALES: [
        'Pulu',
        'Pupu',
        'Hilma',
        'Simpu',
        'Ansu',
        'Yin',
        'Villasukka',
        'Onnellisuus',
        'Lankakerä',
        'Ananas',
        'Wake Me Up',
        'Kreisibailaaja',
        'Eden',
        'Vadelmasuklaa',
        'Crazy In Love',
        'Puuttuva palanen',
        'Timantti',
        'Cara Mia Addio',
        'All Or Nothing',
        'Sunshine',
        'Sotke mut',
        'Waka Waka',
        'Sign Of A Victory',
        "Superstylin'",
        'I Could Be The One',
        'Tu Tienes Mi Corazon',
        'Beibi',
        'Laitettu liikkumaan',
        'Carpe Diem',
        'Taivaan lahja',
        'Nainen ratissa',
        'Musta tykätään',
        'Superlove',
        'Maria Magdalena',
        'Pyrstötähti',
        'Meritähti',
        'Alma',
        'Herranjestas',
        'Sylivauva',
        'Sateentanssija',
        'Tuulispää',
        'Somethingroyal',
        'Princequillo',
        'Maya',
        'Nuppu',
        'Lumi',
        'Maxine',
        'Sissi',
        'Simpukka',
        'Suklaa',
        'Suklaarasia',
        'Stella',
        'Tyyne',
        'Prinsessa',
        'Fanni',
        'Ada',
        'Helmi',
        'Kaunis aamu',
        'Marilyn',
        'Boo Boo',
        'Ziggy',
        'Yolo',
        'Swag Dog',
        'New York',
        'Paris',
        'Barcelona',
        'Riga',
        'Amsterdam',
        'Tiffany',
        'Sydänystävä',
        'Korvapää',
        'Auringonpilkku',
        'Päivänsäde',
        'Tähti',
        'Tähtisäde',
        'Sydän haluaa',
        'Rakkauspakkaus',
        'Pakkaspupu',
        'Ikuinen rakkaus',
        'Silmät ei nää',
        'Ehkä tänään',
        'Tuulilasin kyyneleet',
        'Leelee',
        'Smitten',
        'Hullaantunut',
        'Pihkassa',
        'Sheep Wolf',
        'Sia',
        'Starship',
        'Nyt on jo myöhäistä',
        'Boxxy',
        'Kat',
        'Aurora',
        'Eilisen aurinko',
        'Annetaan tapahtuu',
        'Gaia',
        'Afrodite',
        'Poseidon',
        'Athene'
    ],
    MALES: [
        'Admiral Awesome',
        'Rico',
        'Snappi',
        'Papu',
        'Arjuna',
        'Brahma',
        'Ganesha',
        'Krishna',
        'Shiva',
        'Vihsnu',
        'Antti',
        'Koirakaveri',
        'Lexa',
        'Appelsiini',
        'Karvakasa',
        'Hulivili',
        'Akhilles',
        'Yang',
        'Zeus',
        'Apollon',
        'Thor',
        'Kaaos',
        'Prometheus',
        'Hermes',
        'Loki',
        'Herakles',
        'Legolas',
        'Frodo',
        'Bilbo',
        'Atlas',
        'Näillä mennään',
        'Rukkanen',
        'Hurrikaani',
        'Pyörremyrsky',
        'Cowboy',
        'Kingi',
        'Pähkinä',
        'Daddy',
        'The Lucky One',
        'Wake Me Up',
        'Kullankaivaja',
        'Cobrastyle',
        'Super Critical',
        'Astronautti',
        'Harder Better Faster Stronger',
        'Survivor',
        'Tuisku',
        'Zoobi doobi',
        'All Izz Well',
        'No Problem',
        'Not In Love',
        'World Is Ours',
        'Big Bang',
        'Superstar',
        'On Top Of The World',
        "Don't Forget Who You Are",
        'Magic',
        'Friends Forever',
        'Sanchez',
        'Te Amo',
        "Je t'aime",
        'Härkä',
        'Mestari',
        'Macho Fantastico',
        'Naurava kulkuri',
        'Max',
        'Pyry',
        'Glacier',
        'Crevasse',
        'Komistus',
        'Luna',
        'Days Go By',
        'Hollywood',
        'Clark Gable',
        'John F. Kennedy',
        'Prestige',
        'Alf',
        'Ben',
        'Proto',
        'Tuulen viemää',
        'Chuck',
        'John',
        'JD',
        'Johnny',
        'Tohtori',
        'Roi',
        'Roy',
        'Roy Orbison',
        'Huckleberry Finn',
        'Luka',
        'Pires',
        'Robert',
        'Bob',
        'Bobby',
        'Thierry',
        'Alexis',
        'Francois',
        'Jacques',
        'Epic',
        'Apogee',
        'Kovaa ja korkealta',
        'Komee ja korkealta',
        'Xenon',
        'Kromi',
        'Kulta',
        'Hopea',
        'Viikinki',
        "J'accuse",
        'Jalmari',
        'Willie',
        'Vili',
        'Wilson',
        'Nelson',
        'Bravo',
        'Alpha',
        'Alfa',
        'Maanteiden kuningas',
        'Teuvo',
        'Söpöhäntä',
        'Töpöhäntä',
        'Paha poika',
        "D'Artagnan",
        'Muskettisoturi',
        'Urho',
        'Kepponen',
        'Kaikki hyvin',
        'Ihailen sun geenejä',
        'King Kong',
        'Sheepdog Millionaire'
    ],
    getRandomFemaleName: function () {
        return RandomHelper.randomChoose(NameHelper.FEMALES);
    },
    getRandomMaleName: function () {
        return RandomHelper.randomChoose(NameHelper.MALES);
    }
};