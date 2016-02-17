/*jslint node: true */
'use strict';

var HappeningHelper = {
        NAMES: {
            MATCH_SHOW: [
                '',
                '',
                ''
            ],
            SHOW: [
                ''
            ],
            WORLD_SHOW: 'Maailman voittaja',
            NORTH_SHOW: 'Pohjoismaiden voittaja'
        },
        PLACES: {
            FINLAND: [
                'Helsinki',
                'Espoo',
                'Karkkila',
                'Vihti',
                'Turku',
                'Riihimäki',
                'Rusko',
                'Oulu',
                'Rovaniemi',
                'Jämsä',
                'Jyväskylä',
                'Forssa',
                'Hanko',
                'Hyvinkää',
                'Hämeenlinna',
                'Huittinen',
                'Keuruu',
                'Kokkola',
                'Kouvola',
                'Naantali',
                'Paimio',
                'Salo',
                'Rauma',
                'Somero',
                'Seinäjoki',
                'Pori',
                'Vantaa',
                'Tampere',
                'Tornio'
            ],
            MAAILMAN_VOITTAJA: [
                'Moskova, Venäjä',
                'Barcelona, Espanja',
                'Tukholma, Ruotsi',
                'Amsterdam, Hollanti',
                'Pariisi, Ranska',
                'Lontoo, Englanti'
            ],
            POHJOISMAIDEN_VOITTAJA: [
                'Tukholma, Ruotsi',
                'Oslo, Norja',
                'Helsinki, Suomi',
                'Kööpenhamina, Tanska',
                'Reykjakvik, Islanti'
            ]
        },
        TROPHIES: {
            1: [
                'dog_app/dog/img/trophy1_1.png'
            ],
            2: [
                'dog_app/dog/img/ruusuke.png',
                'dog_app/dog/img/ruusuke2.png'
            ],
            3: [
                'dog_app/dog/img/ruusuke.png',
                'dog_app/dog/img/ruusuke2.png'

            ],
            CONSOLATION: [
                'dog_app/dog/img/food_happydog.png'
            ],
            ROP: [
                'dog_app/dog/img/ROP.png'
            ],
            MUOTOVALIO: [
              'dog_app/dog/img/muotovalio.png'
            ],
            BEST_IN_SHOW: [
                'dog_app/dog/img/best_in_show.png'
            ],
            WORLD_SHOW: {
                1: [
                    'dog_app/dog/img/world_1.png'
                ],
                2: [
                    'dog_app/dog/img/world_2.png'
                ],
                3: [
                    'dog_app/dog/img/world_3.png'
                ]
            },
            NORTH_SHOW: {
                1: [
                    'dog_app/dog/img/north_1.png'
                ],
                2: [
                    'dog_app/dog/img/north_2.png'
                ],
                3: [
                    'dog_app/dog/img/north_3.png'
                ]
            }

        },
        TEXT: {
            ORDINARY: {
                1: ['Loistavaa!', 'Upeaa!', 'Mahtavaa!', 'Uskomatonta!', 'Den glider in!'],
                2: ['Yeah!', 'Hienoa!'],
                3: ['Hyvä suoritus!', 'Hienoa!']
            },
            BIG_TOURNAMENT: {
                1: ['MAHTAVAA!', 'UPEAA!', 'LOISTAVAA!', 'ONNEKSI OLKOON!'],
                2: ['HIENOA!'],
                3: ['YEAH!']
            },
            PLACES: {
                1: 'voitti tapahtuman',
                2: 'tuli toiseksi tapahtumassa',
                3: 'tuli kolmanneksi tapahtumassa'
            }
        }
    }
    ;
