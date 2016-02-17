var HappeningFactory = {

    createRandomHappening: function (testDate, $scope) {

        var name = RandomHelper.randomChoose([Constants.HAPPENINGS.MATCH_SHOW, Constants.HAPPENINGS.SHOW]);
        var type = name;

        var avgLevel = 0;
        var avgDeviation = 0;

        if (name == Constants.HAPPENINGS.MATCH_SHOW) {
            avgLevel = 3.0;
            avgDeviation = 2.5;
        } else {
            avgLevel = 5.5;
            avgDeviation = 3.5;
        }

        var level = avgLevel + avgDeviation * RandomHelper.linearNormalDistributed();

        return new Happening(
            type,
            name,
            RandomHelper.randomChoose(HappeningHelper.PLACES.FINLAND),
            testDate,
            level,
            $scope
        );
    },

    createTraining: function (testDate, $scope) {
        var type = Constants.HAPPENINGS.TRAINING;
        var name = Constants.HAPPENINGS.TRAINING;
        var avgLevel = 0;
        var avgDeviation = 0;

        avgLevel = 3.0;
        avgDeviation = 2.0;

        var level = avgLevel + avgDeviation * RandomHelper.linearNormalDistributed();

        return new Training(
            type,
            name,
            RandomHelper.randomChoose(HappeningHelper.PLACES.FINLAND),
            testDate,
            level,
            $scope
        );
    },

    createMaailmanVoittaja: function (testDate, $scope) {

        var type = Constants.HAPPENINGS.SHOW;
        var name = HappeningHelper.NAMES.WORLD_SHOW;
        var avgLevel = 9.75;
        var avgDeviation = 0.40;

        var level = avgLevel + avgDeviation * RandomHelper.linearNormalDistributed();

        return new Happening(
            type,
            name,
            RandomHelper.randomChoose(HappeningHelper.PLACES.MAAILMAN_VOITTAJA),
            testDate,
            level,
            $scope
        );
    },
    createPohjoismaidenVoittaja: function (testDate, $scope) {

        var type = Constants.HAPPENINGS.SHOW;
        var name = HappeningHelper.NAMES.NORTH_SHOW;
        var avgLevel = 9.0;
        var avgDeviation = 0.75;

        var level = avgLevel + avgDeviation * RandomHelper.linearNormalDistributed();

        return new Happening(
            type,
            name,
            RandomHelper.randomChoose(HappeningHelper.PLACES.POHJOISMAIDEN_VOITTAJA),
            testDate,
            level,
            $scope
        );
    },

    serialize: function (happenings) {
        var skeleton = [];
        for (var i = 0; i < happenings.length; i++) {
            var happening = happenings[i];
            var happening_skeleton = {
                type: happening.type,
                name: happening.name,
                time: happening.time,
                place: happening.place,
                level: happening.level
            };
            skeleton.push(happening_skeleton);
        }

        return JSON.stringify(skeleton);
    },

    deserialize: function ($scope, skeleton) {

        $scope.happenings = [];
        for (var i = 0; i < skeleton.length; i++) {
            var event = null;

            if (skeleton[i].type == Constants.HAPPENINGS.TRAINING) {
                event = new Training(
                    skeleton[i].type,
                    skeleton[i].name,
                    skeleton[i].place,
                    new Date(skeleton[i].time),
                    skeleton[i].level,
                    $scope
                );
            } else {
                event = new Happening(
                    skeleton[i].type,
                    skeleton[i].name,
                    skeleton[i].place,
                    new Date(skeleton[i].time),
                    skeleton[i].level,
                    $scope
                );
            }

            $scope.happenings.push(event);
        }

    }

};