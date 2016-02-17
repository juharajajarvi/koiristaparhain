/*
 * TODO: This file should be splitted into smaller modules.
 *
 */

if (LaunchSettings.ASK_PAGE_CHANGE_CONFIRM) {
    window.onbeforeunload = function () {
        return "Muista tallentaa peli ennen kuin vaihdat sivua!";
    };
}

// Prevent the backspace key from navigating back.
$(document).on('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' &&
            (
            d.type.toUpperCase() === 'TEXT' ||
            d.type.toUpperCase() === 'PASSWORD' ||
            d.type.toUpperCase() === 'FILE' ||
            d.type.toUpperCase() === 'EMAIL' ||
            d.type.toUpperCase() === 'SEARCH' ||
            d.type.toUpperCase() === 'DATE' )
            ) ||
            d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

var demoApp = angular.module('dogApp', ['ngDialog', 'googlechart', 'ui.bootstrap', 'ngSanitize']);

demoApp.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        showClose: false,
        disableAnimation: true,
        closeByDocument: false,
        closeByEscape: false
    });
}]);

demoApp.controller('SimpleController', function ($scope, $rootScope, ngDialog, $http, $sce) {

    $scope.isNgDialogOpen = function () {

        console.log(ngDialog.getDialogCount());
        return ngDialog.getDialogCount();
    };

    $scope.openNewGameDialog = function () {
        $scope.user = new User("", "Korvalan", "", Constants.BREEDS.shetlandsheepdog.breed);

        if (LaunchSettings.ASK_BREED_SELECT) {
            var dialog = ngDialog.open({
                template: 'dog_app/new_game/main_page.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            });
            $scope.user.dialogId = dialog.id;
        }
        else {
            $scope.init();
        }
    };

    $scope.showHelpDialog = function () {
        ngDialog.openConfirm({
            className: 'ngdialog-theme-hint',
            template: 'dog_app/hints/basic_help_1.html',
            scope: $scope,
            closeByEscape: false,
            showClose: false
        }).then(function () {
            $scope.init();
        });
    };

    $scope.init = function () {

        //console.log('initing');
        $scope.vet = new Vet($scope);
        $scope.user.show = true;
        $scope.user.testKennel = $scope.user.kennel;

        if ($scope.user.isShetlandsheepdog()) {
            DogData = ShetlandSheepdogData;
        } else if ($scope.user.isChihuahua()) {
            DogData = ChihuahuaData;
        }

        $scope.achievements = new Achievements();

        $scope.level = DifficultySettings.STARTING_DOG.LEVEL;
        $scope.hints = {
            hasWarnedTooDifficult: false,
            hasAcceptedPevisa: false,
            hasStoppedPohjoismaidenVoittaja: true,
            hasStoppedMaailmanVoittaja: true
        };
        $scope.currentDate = new Date();
        $scope.bankAccount = new BankAccount($scope, DifficultySettings.MONEY.STARTING_AMOUNT);

        $scope.puppiesForSale = [];
        $scope.puppies = [];
        $scope.puppies_parents = {
            mother: null,
            father: null
        };
        $scope.deadDogs = [];
        $scope.happenings = [];
        $scope.onlineHappenings = [OnlineHappeningFactory.createShow($scope)];

        $scope.tabs = [
            {
                name: 'happenings',
                buttonTitle: 'Tapah&shy;tumat',
                active: false,
                include: 'dog_app/menu/happenings/main_page.html'
            },
            {
                name: 'online_happenings',
                buttonTitle: 'Online',
                active: false,
                include: 'dog_app/menu/happenings_online/main_page.html'
            },
            {
                name: 'achievements',
                buttonTitle: 'Tavoit&shy;teet',
                active: false,
                include: 'dog_app/menu/achievements/main_page.html'
            },
            {
                name: 'own_dogs',
                buttonTitle: 'Omat koirat',
                active: false,
                include: 'dog_app/menu/own_dogs/main_page.html'
            },
            {
                name: 'puppies',
                buttonTitle: 'Pentue',
                active: false,
                include: 'dog_app/menu/own_puppies/main_page.html'
            },
            {name: 'dead', buttonTitle: 'Kuolleet', active: false, include: 'dog_app/menu/dead/main_page.html'},
            /*
             {
             name: 'trophies',
             buttonTitle: 'Palkintokaappi',
             active: false,
             include: 'dog_app/menu/trophy_cabinet/main_page.html'
             },*/
            {
                name: 'buy_puppy',
                buttonTitle: 'Osta pentu',
                active: false,
                include: 'dog_app/menu/buy_puppy/main_page.html'
            },
            {
                name: 'vet',
                buttonTitle: 'Eläin&shy;lääkäri',
                active: false,
                include: 'dog_app/menu/vet/main_page.html'
            },
            {
                name: 'bank_account',
                buttonTitle: 'Raha-asiat',
                active: false,
                include: 'dog_app/menu/bank_account/main_page.html'
            },
            {
                name: 'save_game',
                buttonTitle: 'Tallenna peli',
                active: false,
                include: 'dog_app/menu/save_game/main_page.html'
            }
        ];

        $scope.setActive('own_dogs');

        $scope.day = 0;
        $scope.dogs = [
            DogFactory.generateAdultDog(DifficultySettings.STARTING_DOG.AVG, DifficultySettings.STARTING_DOG.DEVIATION, true, $scope.currentDate, $scope.user.breed, true, $scope.bankAccount, $scope.vet)
        ];

        $scope.resetBreedDogs();
        $scope.generateHappenings(0, 28);

        if ($scope.user.newgame == false) {
            $scope.load();
        } else {
            if ($scope.user.dialogId != null) {

                ngDialog.close($scope.user.dialogId);
            } else {
                //console.log('no dialog');
            }
        }
    };

    $scope.getCurrentPrintDate = function () {
        return $scope.currentDate.toLocaleDateString('fi');
    };

    $scope.setActive = function (name) {

        function getTabForName(name) {
            for (var i = 0; i < $scope.tabs.length; i++) {
                if ($scope.tabs[i].name == name) {
                    return i;
                }
            }

            return name;
        }

        var index = getTabForName(name);

        for (var i = 0; i < $scope.tabs.length; i++) {
            $scope.tabs[i].active = false;
        }

        if ($scope.tabs[index].buttonTitle == "Osta pentu") {

            var useLevel = Library.restrictToRange($scope.level, 1.0, 9.9);

            $scope.puppiesForSale = [];
            for (var i = 0; i < 10; i++) {
                var dog1 = DogFactory.generateAdultDog(useLevel, 1, false, $scope.currentDate, $scope.user.breed, null);
                var dog2 = DogFactory.generateAdultDog(useLevel, 1, false, $scope.currentDate, $scope.user.breed, null);

                while (!DogData.canMate(dog1, dog2)) {
                    dog2 = DogFactory.generateAdultDog(useLevel, 1, false, $scope.currentDate, $scope.user.breed, $scope.bankAccount);
                }

                $scope.puppiesForSale.push(DogFactory.generatePuppy(dog1, dog2, dog1.attributes.fixed.kennel, false, true, $scope.currentDate, $scope.breed, $scope.bankAccount));
            }
        } else if ($scope.tabs[index].buttonTitle == "Tallenna peli") {
            $scope.user.save.status = 'new';

        } else if ($scope.tabs[index].buttonTitle == "Lataa peli") {
            $scope.user.load.status = 'new';
        } else if ($scope.tabs[index].buttonTitle == "Online") {
            var data = "";
            var req = {
                method: 'POST',
                url: 'backend/get_results.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data: $.param(data)
            };

            $http(req).success(function (data, status, headers, config) {
                console.log(data);
            });
        }
        $scope.tabs[index].active = true;
    };

    $scope.generateHappenings = function (startDay, numberOfDays) {
        var startDate = new Date($scope.currentDate);
        startDate.setDate($scope.currentDate.getDate() + startDay);

        for (var i = 0; i < numberOfDays; i++) {
            var testDate = new Date(startDate);
            testDate.setDate(startDate.getDate() + i);

            if ($scope.isMaailmanVoittajaDay(testDate)) {
                var newHappening = HappeningFactory.createMaailmanVoittaja(testDate, $scope);
                $scope.happenings.push(newHappening);
            } else if ($scope.isPohjoismaidenVoittajaDay(testDate)) {
                var newHappening = HappeningFactory.createPohjoismaidenVoittaja(testDate, $scope);
                $scope.happenings.push(newHappening);
            } else if (testDate.getDay() === 6 || testDate.getDay() === 0) {
                var newHappening = HappeningFactory.createRandomHappening(testDate, $scope);
                $scope.happenings.push(newHappening);
            } else if (testDate.getDay() === 3) {
                var newHappening = HappeningFactory.createTraining(testDate, $scope);
                $scope.happenings.push(newHappening);
            }
        }

    };

    $scope.isMaailmanVoittajaDay = function (testDate) {
        // Maailman voittaja is always 1.9.
        return testDate.getDate() === 1 && testDate.getMonth() === 8;
    };

    $scope.isPohjoismaidenVoittajaDay = function (testDate) {
        // Pohjoismaiden voittaja is always 1.7.
        return testDate.getDate() === 1 && testDate.getMonth() === 6;
    };

    $scope.age = function (amount) {

        if ($scope.daysToSimulate > 0) {
            //console.log('SIMULATING IN PROGRESS, RESTRICTED');
            return;
        }

        if (amount == 31) {
            amount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][$scope.currentDate.getMonth()];
        }

        // Cannot continue with unseen issues
        if ($scope.vet.unseenHealthIssuesCount() > 0) {
            ngDialog.openConfirm({
                template: 'dog_app/menu/vet/cannot_continue_with_unseen.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function () {
                $scope.setActive('vet');
            });

        } else {
            // This code is awful!
            // Aging can open multiple dialogs, which are asynchronous.
            // We can only proceed when the dialog is closed, so we will
            // need to use callbacks. It causes the structure to be terrible to maintain.
            $scope.resetAgeProcess(amount);
            $scope.agePart_0_Basic();
        }

    };

    $scope.resetAgeProcess = function (amount) {
        $scope.stopSimulation = false;
        $scope.isLastDay = false;

        $scope.addedDays = 0;
        $scope.daysToSimulate = amount;
    };

    $scope.agePart_0_Basic = function () {
        //console.log('started 0 - basic');
        $scope.callback = null;

        $scope.isLastDay = ($scope.addedDays + 1 === $scope.daysToSimulate);
        $scope.shouldStop = ($scope.addedDays === $scope.daysToSimulate);

        if ($scope.shouldStop || $scope.stopSimulation) {
            //console.log('stop simulating');
            $scope.resetAgeProcess(0);
            return;
        }

        $scope.addedDays++;
        $scope.day++;

        $scope.currentDate.setDate($scope.currentDate.getDate() + 1);
        $scope.generateHappenings(28, 1);

        $scope.bankAccount.increase($scope.bankAccount.getIncomePerDay());
        $scope.bankAccount.decrease($scope.bankAccount.getExpensesPerDay());

        // No special restritions for moving forward.
        // No dialogs generated.
        $scope.agePart_1_Age_Dogs();
    };

    $scope.agePart_1_Age_Dogs = function () {
        //console.log('started 1 - age old dogs');

        var i = 0;
        for (i = 0; i < $scope.dogs.length; i++) {
            var dog = $scope.dogs[i];
            var foundHealthIssues = dog.getOlder();
            if (dog.attributes.number.shouldDie()) {
                dog.attributes.fixed.timeOfDeath = $scope.getCurrentPrintDate();
            }
            if (foundHealthIssues) {
                $scope.stopSimulation = true;
                this.setActive('vet');
            }
        }

        if ($scope.puppies.length > 0) {
            // Either of parent is not owned by the player
            if (!$scope.puppies_parents.mother.attributes.fixed.isOwned()) {
                $scope.puppies_parents.mother.getOlder();
            }
            if (!$scope.puppies_parents.father.attributes.fixed.isOwned()) {
                $scope.puppies_parents.father.getOlder();
            }
        }

        $scope.numberOfDeadPuppies = 0;
        for (i = 0; i < $scope.puppies.length; i++) {
            var puppy = $scope.puppies[i];
            puppy.getOlder();
            if (puppy.attributes.number.shouldDie()) {
                if (!puppy.isDead()) {
                    puppy.attributes.fixed.timeOfDeath = $scope.getCurrentPrintDate();
                }
            }
            if (puppy.isDead()) {
                $scope.numberOfDeadPuppies++;
            }
        }

        // No special restritions for moving forward.
        // No dialogs generated.
        $scope.agePart_2_Happenings();
    };

    $scope.agePart_2_Happenings = function () {
        //console.log('started 2 - happenings');
        $scope.nextPart = null;
        $scope.showLastChanceText = false;

        for (i = 0; i < $scope.happenings.length; i++) {
            var happening = $scope.happenings[i];

            var action = happening.getAction($scope.currentDate);
            if (action === "remove") {
                $scope.happenings.splice(i, 1);
                i--;
            } else if (action === "last_chance_to_signup") {
                if ($scope.isMaailmanVoittajaDay($scope.currentDate) && $scope.hints.hasStoppedMaailmanVoittaja == false) {
                    $scope.showLastChanceText = true;
                    $scope.setActive('happenings');
                    $scope.stopSimulation = true;
                    $scope.hints.hasStoppedMaailmanVoittaja = true;
                } else if ($scope.isPohjoismaidenVoittajaDay($scope.currentDate) && $scope.hints.hasStoppedPohjoismaidenVoittaja == false) {
                    $scope.showLastChanceText = true;
                    $scope.setActive('happenings');
                    $scope.stopSimulation = true;
                    $scope.hints.hasStoppedPohjoismaidenVoittaja = true;
                }
            } else if (action === "start") {
                //console.log("opened happening dialog");
                $scope.nextPart = $scope.agePart_3_Handle_Puppies;
                $scope.happenings.splice(i, 1);
                i--;
                $scope.startHappening(happening);
                $scope.stopSimulation = true;
            }
        }

        if ($scope.nextPart == null) {
            $scope.agePart_3_Handle_Puppies();
        }

    };

    $scope.agePart_3_Handle_Puppies = function () {
        //console.log('started 3 - handle puppies');
        $scope.nextPart = null;

        var allPuppiesAreDead = ($scope.numberOfDeadPuppies == $scope.puppies.length);
        if ($scope.puppies.length > 0) {

            // Check if any puppy is of give-away-age. Dead puppies do not age.
            var indexOfFirstAlivePuppy = 0;
            for (var i = 0; i < $scope.puppies.length; i++) {
                if (!$scope.puppies[i].isDead()) {
                    indexOfFirstAlivePuppy = i;
                }
            }

            if ($scope.puppies[indexOfFirstAlivePuppy].attributes.number.getAgeInWeeks() >= 8 || allPuppiesAreDead) {
                $scope.stopSimulation = true;
                $scope.nextPart = $scope.agePart_4_ChooseSponsor;

                //console.log('age of sale started');

                ngDialog.openConfirm({
                    template: 'dog_app/menu/own_puppies/age_of_sale.html',
                    scope: $scope,
                    closeByEscape: false,
                    showClose: false
                }).then(function () {

                    var sold = 0;
                    var kept = 0;

                    $scope.fines = {
                        eHipsCount: 0,
                        healthBelow2Count: 0,
                        ceaCount: 0
                    };

                    for (var i = 0; i < $scope.puppies.length; i++) {
                        var puppy = $scope.puppies[i];

                        if (puppy.genes.hips.isE()) {
                            $scope.fines.eHipsCount++;
                            $scope.bankAccount.trySponsorCancel('health');
                        }
                        if (puppy.genes.cea.isActive()) {
                            $scope.fines.ceaCount++;
                            $scope.bankAccount.trySponsorCancel('health');
                        }
                        if (puppy.attributes.number.getHealth() < 2) {
                            $scope.fines.healthBelow2Count++;
                        }

                        if (puppy.selectedAction === "sell") {
                            $scope.bankAccount.increase(DifficultySettings.BORN.MONEY_PER_SELL);
                            sold++;
                        } else if (puppy.selectedAction === "keep") {
                            $scope.dogs.push(puppy);
                            kept++;
                        } else if (puppy.selectedAction === "bury") {
                            $scope.deadDogs.push(puppy);
                        }
                    }

                    $scope.fines.total = $scope.fines.eHipsCount * DifficultySettings.PEVISA.FINE_PER_E_HIP_PUPPY + $scope.fines.healthBelow2Count * DifficultySettings.PEVISA.FINE_PER_HEALTH_BELOW_2 + $scope.fines.ceaCount * DifficultySettings.PEVISA.FINE_PER_CEA_PUPPY;

                    $scope.bankAccount.decrease($scope.fines.total);

                    $scope.puppies_parents.mother = null;
                    $scope.puppies_parents.father = null;
                    $scope.puppies = [];
                    $scope.setActive('own_dogs');

                    //console.log('starting pevisa dialog');

                    if ($scope.fines.total > 0) {
                        ngDialog.openConfirm({
                            template: 'dog_app/menu/own_puppies/pevisa_fines.html',
                            scope: $scope,
                            closeByEscape: false,
                            showClose: false
                        }).then(function () {
                            $scope.nextPart();
                        });
                    } else {
                        $scope.nextPart();
                    }
                });
            }
        }

        if ($scope.nextPart) {
            //console.log('dialog opened, waiting');
        } else {
            $scope.agePart_4_ChooseSponsor();
        }

    };

    $scope.agePart_4_ChooseSponsor = function () {
        //console.log('started 4 - choose sponsor');
        $scope.nextPart = null;

        if ($scope.level / 2.0 >= DifficultySettings.SPONSOR.MIN_STARS && !$scope.bankAccount.hasSponsor()) {
            //console.log('choosing first sponsor');
            $scope.nextPart = $scope.agePart_0_Basic;
            $scope.stopSimulation = true;

            ngDialog.openConfirm({
                template: 'dog_app/menu/bank_account/choose_sponsor.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function (sponsor) {
                var callback = function () {
                    $scope.tryUnlocking([AchievementsConstants.SPONSOR], $scope.nextPart);
                };
                $scope.bankAccount.chooseSponsor(sponsor, callback);

            });
        } else if ($scope.bankAccount.hasSponsor() && $scope.currentDate.getTime() >= $scope.bankAccount.sponsor.contractUntil.getTime()) {
            //console.log('choosing renew sponsor');
            $scope.nextPart = $scope.agePart_0_Basic;
            $scope.stopSimulation = true;

            ngDialog.openConfirm({
                template: 'dog_app/menu/bank_account/choose_sponsor.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function (sponsor) {
                var callback = function () {
                    $scope.tryUnlocking([AchievementsConstants.SPONSOR], $scope.nextPart);
                };
                $scope.bankAccount.chooseSponsor(sponsor, callback);
            });
        } else if ($scope.bankAccount.hasSponsor() && $scope.bankAccount.sponsor.hasJustCancelled == true) {
            $scope.nextPart = $scope.agePart_0_Basic;
            $scope.stopSimulation = true;

            ngDialog.openConfirm({
                template: 'dog_app/menu/bank_account/sponsor_cancellation.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function () {
                $scope.bankAccount.sponsor.hasJustCancelled = false;
                $scope.nextPart();
            });
        }

        if ($scope.nextPart) {
            //console.log('dialog opened, waiting');
        } else {
            //console.log('no dialog, proceeding');
            $scope.agePart_0_Basic();
        }

    };

    $scope.buyPuppyConfirm = function (dog) {
        $scope.buyPuppy = dog;

        ngDialog.openConfirm({
            template: 'dog_app/menu/buy_puppy/confirm_buy.html',
            scope: $scope,
            closeByEscape: false,
            showClose: false
        }).then(function () {
            dog.attributes.fixed.isOwn = "true";
            dog.charts.updateChart(true);
            $scope.dogs.push(dog);
            $scope.bankAccount.decrease(dog.getBuyPrice());
            $scope.setActive('own_dogs');
        });
    };

    $scope.selectForBreed = function (dog2) {
        $scope.dog1 = $scope.dogToBreed;
        $scope.dog2 = dog2;

        if ($scope.puppies.length > 0) {
            ngDialog.openConfirm({
                template: 'dog_app/menu/own_puppies/one_puppies_limit.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            });

        } else if (DogData.getColor($scope.dog1, $scope.dog2) === 'error') {
            ngDialog.openConfirm({
                template: 'dog_app/menu/own_puppies/unable_to_breed.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            });
        } else {
            ngDialog.openConfirm({
                template: 'dog_app/menu/own_puppies/pair.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function () {
                $scope.bankAccount.decrease(dog2.getBreedPrice());
                $scope.createPuppies($scope.dog1, $scope.dog2, $scope.user.kennel);

                if ($scope.dog1.attributes.fixed.isFemale()) {
                    $scope.puppies_parents.mother = $scope.dog1;
                    $scope.puppies_parents.father = $scope.dog2;
                } else {
                    $scope.puppies_parents.mother = $scope.dog2;
                    $scope.puppies_parents.father = $scope.dog1;
                }
            });
        }

    };

    $scope.createPuppies = function (dog1, dog2, kennel) {

        dog1.breed.startNewLitter($scope.getCurrentPrintDate());
        dog2.breed.startNewLitter($scope.getCurrentPrintDate());

        var trophy2 = null;

        var numberOfPuppies = Math.round(DifficultySettings.BORN.AVG_AMOUNT + DifficultySettings.BORN.DEVIATION * RandomHelper.linearNormalDistributed());
        for (var i = 0; i < numberOfPuppies; i++) {
            var newPuppy = DogFactory.generatePuppy(dog1, dog2, kennel, "true", false, $scope.currentDate, $scope.bankAccount);
            $scope.puppies.push(newPuppy);
            if (newPuppy.genes.shinyFur.isActive()) {
                trophy2 = AchievementsConstants.SHINY;
            }
        }

        dog1.breed.setBirthStress();
        dog2.breed.setBirthStress();

        ngDialog.openConfirm({
            template: 'dog_app/menu/own_puppies/born.html',
            scope: $scope,
            closeByEscape: false,
            showClose: false
        }).then(function () {
            $scope.tryUnlocking([AchievementsConstants.LITTER, trophy2]);
            $scope.resetBreedDogs();
            $scope.setActive("puppies");
        });

    };

    $scope.removePermanently = function (dog) {
        $scope.removeDog = dog;

        for (var i = 0; i < $scope.deadDogs.length; i++) {
            if ($scope.deadDogs[i] === $scope.removeDog) {
                $scope.deadDogs.splice(i, 1);
                break;
            }
        }
    };

    $scope.remove = function (dog) {
        $scope.removeDog = dog;

        if (dog.isDead()) {
            for (var i = 0; i < $scope.dogs.length; i++) {
                if ($scope.dogs[i] === $scope.removeDog) {
                    $scope.dogs.splice(i, 1);
                    break;
                }
            }
            $scope.deadDogs.push($scope.removeDog);
        } else {
            ngDialog.openConfirm({
                template: 'dog_app/menu/dead/remove.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function () {
                for (var i = 0; i < $scope.dogs.length; i++) {
                    if ($scope.dogs[i] === $scope.removeDog) {
                        $scope.dogs.splice(i, 1);
                        break;
                    }
                }

                if ($scope.removeDog.attributes.number.canBeKilled()) {
                    $scope.removeDog.attributes.fixed.timeOfDeath = $scope.getCurrentPrintDate();
                    $scope.deadDogs.push($scope.removeDog);
                }

            });
        }
    };

    $scope.startHappening = function (happening) {

        if (happening.isTraining()) {
            $scope.activeHappening = happening;
            $scope.bankAccount.decrease(happening.getPrice());
            ngDialog.openConfirm({
                template: 'dog_app/menu/happenings/choose_dog_for_happening.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function (dog) {

                if (dog === null) {

                    //console.log('no dog chosen');
                    $scope.nextPart();

                } else {

                    //console.log('selected dog');
                    happening.userDog = dog;

                    var trainingBefore = happening.userDog.attributes.number.getTraining();

                    happening.userDog.charts.updateChart(true);
                    happening.userDog.attributes.raw.addTraining(2.0);
                    happening.userDog.charts.updateChart(true);

                    var trainingAfter = happening.userDog.attributes.number.getTraining();

                    happening.changeInTraining = trainingAfter - trainingBefore;

                    $scope.announceTraining(happening);
                }

            });
        } else {

            function chooseDog() {
                //console.log('choosing dog for happening');
                ngDialog.openConfirm({
                    template: 'dog_app/menu/happenings/choose_dog_for_happening.html',
                    scope: $scope,
                    closeByEscape: false,
                    showClose: false
                })
                    .then(function (dog) {

                        //console.log(dog);
                        if (dog == null) {
                            //console.log('cancel');
                            $scope.nextPart();
                        } else {
                            //console.log('open');
                            $scope.bankAccount.decrease(happening.getPrice());
                            happening.generateDogs($scope.currentDate, $scope.user.breed);
                            happening.userDog = dog;
                            happening.dogs.push(dog);
                            $scope.announceHappening(happening);

                        }
                    }
                );
            }

            $scope.activeHappening = happening;

            if (!$scope.hints.hasWarnedTooDifficult) {

                var happeningLevel = happening.level;
                var maxMatchShowRating = 0;
                var maxOfficialShowRating = 0;

                for (var i = 0; i < $scope.dogs.length; i++) {
                    var dog = $scope.dogs[i];
                    if (dog.attributes.ratings.getRating() > maxOfficialShowRating) {
                        maxOfficialShowRating = dog.attributes.ratings.getRating();
                    }
                    if (dog.attributes.ratings.getMatchShowRating() > maxMatchShowRating) {
                        maxMatchShowRating = dog.attributes.ratings.getMatchShowRating();
                    }
                }

                var isTooDifficult = false;

                happeningLevel = happeningLevel / 2.0;
                maxOfficialShowRating = maxOfficialShowRating / 2.0 + 1.0;
                maxMatchShowRating = maxMatchShowRating / 2.0 + 1.0;

                if (happening.isMatchShow() && happeningLevel > maxMatchShowRating) {
                    isTooDifficult = true;
                } else if (!happening.isMatchShow() && happeningLevel > maxOfficialShowRating) {
                    isTooDifficult = true;
                }

                if (isTooDifficult) {
                    var dialog = ngDialog.open({
                        className: 'ngdialog-theme-hint',
                        template: 'dog_app/hints/too_difficult_show.html',
                        scope: $scope,
                        closeByEscape: false,
                        showClose: false
                    });

                    dialog.closePromise.then(function () {
                        //console.log('close too difficult show warning');
                        $scope.hints.hasWarnedTooDifficult = true;
                        chooseDog();
                    });
                } else {
                    chooseDog();
                }

            } else {
                chooseDog();
            }

        }
    };

    $scope.chooseDogForOnline = function (happening) {
        $scope.onlineHappening = happening;
        ngDialog.openConfirm({
            template: 'dog_app/menu/happenings_online/choose_dog_for_happening.html',
            scope: $scope,
            closeByEscape: false,
            showClose: false
        })
            .then(function (dog) {
                if (dog != null) {
                    $scope.onlineSignup(happening, dog);
                }
            }
        );
    };

    $scope.onlineSignup = function (happening, dog) {

        var data = {
            username: $scope.user.username,
            password: Library.sha1($scope.user.password),
            dog: DogSerializer.copyDogData(dog),
            dog_name: dog.attributes.fixed.kennel + ' ' + dog.attributes.fixed.officialName,
            dog_rating: dog.attributes.ratings.getRating()
        };

        // To whom might be reading this:
        // Every time you hack this "security" measure, a puppy will die.
        // Please, think of the puppies.
        data.code = Library.sha1(data.username + data.dog_name + data.dog_rating);

        var req = {
            method: 'POST',
            url: 'backend/signup.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: $.param(data)
        };

        $http(req).success(function (data, status, headers, config) {
            if (data == true) {
                happening.isSignup = true;
            }
        });
    };

    $scope.announceHappening = function (happening) {
        //console.log('announcing happening');

        happening.userDog.attributes.number.luck = Math.random() * 2.0 - 1.0;
        happening.$scope = $scope;
        happening.rankDogs();
        $scope.bankAccount.increase($scope.activeHappening.placement.moneyReward);

        var rank = happening.placement.rank;

        if (rank > 5) {
            $scope.bankAccount.trySponsorCancel('rank');
        }

        var dialog = ngDialog.open({
            template: 'dog_app/menu/happenings/happening_results_v2.html',
            scope: $scope,
            closeByEscape: false,
            showClose: false
        });
        dialog.closePromise.then(function () {

            //console.log('done with happening results');
            $scope.activeHappening.userDog.attributes.number.luck = 0;

            var trophy1 = null, trophy2 = null, trophy3 = null, trophy4 = null, trophy5 = null;
            if ($scope.activeHappening.placement.changeInExperience > 0) {
                trophy1 = AchievementsConstants.EXPERIENCE;
            }
            if ($scope.activeHappening.placement.rank === 1) {
                if ($scope.activeHappening.name == HappeningHelper.NAMES.WORLD_SHOW) {
                    trophy2 = AchievementsConstants.WORLD_WINNER;
                    if ($scope.activeHappening.userDog.attributes.ratings.getRating() / 2.0
                        >= 5.0) {
                        trophy4 = AchievementsConstants.TEN;
                    }
                } else if ($scope.activeHappening.name == HappeningHelper.NAMES.NORTH_SHOW) {
                    trophy2 = AchievementsConstants.NORTH_WINNER;
                } else if (!$scope.activeHappening.isMatchShow()) {
                    trophy2 = AchievementsConstants.WIN_SHOW;
                }
            }
            if ($scope.activateThreeStar === true) {
                trophy3 = AchievementsConstants.THREE_STAR;
            }
            if ($scope.activeHappening.isLassie === true) {
                trophy5 = AchievementsConstants.MOVIESTAR;
            }
            var callback = function () {
                $scope.tryForMuotovalio(happening);
            };
            $scope.tryUnlocking([trophy1, trophy2, trophy3, trophy4, trophy5], callback);

        });
    };

    $scope.tryForMuotovalio = function (happening) {

        //console.log('trying for muotovalio');

        if (happening.userDog.isEligibleForMuotovalio()) {
            //console.log('got muotovalio!');
            happening.userDog.hasMuotovalio = true;
            var amount = DifficultySettings.MONEY.MUOTOVALIO_PRICE;
            happening.userDog.placements.push(new Placement(null, happening.userDog.attributes.number.getAgeInYears(), "Muotovalio", null, $scope.currentDate, null, HappeningHelper.TROPHIES.MUOTOVALIO[0], true, amount, 0));
            $scope.bankAccount.increase(amount);

            ngDialog.openConfirm({
                template: 'dog_app/honors/muotovalio.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function () {
                $scope.tryUnlocking([AchievementsConstants.MUOTOVALIO], $scope.nextPart);
            });
        } else {
            //console.log('not muotovalio');
            $scope.nextPart();
        }
    };

    $scope.announceTraining = function (happening) {
        ngDialog.openConfirm({
            template: 'dog_app/menu/happenings/training_results.html',
            scope: $scope,
            closeByEscape: false,
            showClose: false
        }).then(function () {
            if ($scope.activeHappening.changeInTraining > 0) {
                $scope.tryUnlocking([AchievementsConstants.TRAINING], $scope.nextPart);
            } else {
                $scope.nextPart();
            }
        });
    };

// codeNameList is array possibly containing multiple trophies
    $scope.tryUnlocking = function (codeNameList, callback, number) {

        //console.log('trying to unlock');

        // Default parameter
        if (number == null) {
            number = 0;
        }

        // All trophies have been handled already
        if (number >= codeNameList.length) {
            if (callback) {
                //console.log('calling callback from tryUnlocking');
                callback();
            }
            return;
        }

        // Use testAchievement because angular updates UI immediately.
        // The last trophy would always be null, and would look weird on the UI!
        $scope.testAchievement = $scope.achievements.tryUnlocking(codeNameList[number]);

        if ($scope.testAchievement !== null) {
            $scope.achievement = $scope.testAchievement;

            var page = 'unlocked';
            if ($scope.achievement.codeName == AchievementsConstants.MOVIESTAR) {
                page = 'lassie';
            }

            ngDialog.openConfirm({
                className: 'ngdialog-theme-achievement',
                template: 'dog_app/menu/achievements/' + page + '.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function () {
                $scope.bankAccount.increase($scope.achievement.prize);
                $scope.tryUnlocking(codeNameList, callback, ++number);
            });
        } else {
            // We can have nulls in between but the next might be not null
            $scope.tryUnlocking(codeNameList, callback, ++number);
        }
    };

    $scope.getStarImage = function () {
        return $sce.trustAsHtml(Library.getStarImage($scope.level));
    };

    $scope.buyPuppy = function (dog) {
        $scope.dogs.push(dog);
    };

    $scope.createBreedList = function (dog) {

        $scope.dogToBreed = dog;
        var generatingLevel = Library.restrictToRange($scope.level * DifficultySettings.BREED_LIST.KENNEL_STAR_FACTOR, DifficultySettings.BREED_LIST.MIN_DOG_LEVEL, DifficultySettings.BREED_LIST.MAX_DOG_LEVEL);

        // The breed list might have been created previously for a different dog.
        // Verify that we can actually make mate the dogs.
        for (var i = 0; i < $scope.breedDogs.length; i++) {
            if (!DogData.canMate(dog, $scope.breedDogs[i])) {
                //console.log('removing mate');
                $scope.breedDogs.splice(i, 1);
                i--;
            }
        }

        while ($scope.breedDogs.length < 10) {
            var newDog = DogFactory.generateAdultDog(generatingLevel, DifficultySettings.BREED_LIST.DEVIATION, false, $scope.currentDate, $scope.user.breed, false, $scope.bankAccount);
            if (DogData
                    .canMate($scope.dogToBreed, newDog)) {
                $scope.breedDogs.push(newDog);
            }
        }

        if (!$scope.hints.hasAcceptedPevisa) {
            ngDialog.openConfirm({
                template: 'dog_app/menu/own_puppies/pevisa.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function (dog) {
                $scope.hints.hasAcceptedPevisa = true;
                if ($scope.level === 0) {
                    warnKennelLevel();
                } else {
                    breedList();
                }
            });
        } else {
            breedList();
        }

        function warnKennelLevel() {
            ngDialog.openConfirm({
                className: 'ngdialog-theme-hint',
                template: 'dog_app/hints/kennel_level_too_low.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function (dog) {
                breedList();
            });
        }

        function breedList() {
            ngDialog.openConfirm({
                template: 'dog_app/menu/own_puppies/breed_list.html',
                scope: $scope,
                closeByEscape: false,
                showClose: false
            }).then(function (dog) {
                $scope.selectForBreed(dog);
            });

        }
    };


    $scope.resetBreedDogs = function () {
        $scope.breedDogs = [];
    };

    $scope.openNewGameDialog();


    $scope.load = function () {

        $scope.user.save.status = 'new';

        var data = {
            username: $scope.user.username,
            password: Library.sha1($scope.user.password)
        };

        var req = {
            method: 'POST',
            url: 'backend/load.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: $.param(data)
        };

        $http(req).success(function (data, status, headers, config) {


            if (data.status == "success") {

                $scope.user.isRegistered = true;

                $scope.user.kennel = data.kennel_name;
                $scope.level = data.star_level;

                $scope.bankAccount.deserialize(angular.fromJson(data.bank_account));

                $scope.currentDate = new Date(data.date);
                $scope.achievements.deserialize(angular.fromJson(data.achievements));

                $scope.dogs = [];
                data.dogs = angular.fromJson(data.dogs);
                for (var i = 0; i < data.dogs.length; i++) {
                    var dog = DogFactory.generateDogFromDatabase(data.dogs[i], $scope.currentDate, $scope.bankAccount);
                    $scope.dogs.push(dog);
                }

                $scope.puppies = [];
                data.puppies = angular.fromJson(data.puppies);
                for (var i = 0; i < data.puppies.length; i++) {
                    var dog = DogFactory.generateDogFromDatabase(data.puppies[i], $scope.currentDate, $scope.bankAccount);
                    $scope.puppies.push(dog);
                }

                data.puppies_parents = angular.fromJson(data.puppies_parents);
                $scope.puppies_parents.mother = DogFactory.generateDogFromDatabase(data.puppies_parents.mother, $scope.currentDate, $scope.bankAccount);
                $scope.puppies_parents.father = DogFactory.generateDogFromDatabase(data.puppies_parents.father, $scope.currentDate, $scope.bankAccount);

                $scope.deadDogs = [];
                data.dead_dogs = angular.fromJson(data.dead_dogs);
                for (var i = 0; i < data.dead_dogs.length; i++) {
                    var dog = DogFactory.generateDogFromDatabase(data.dead_dogs[i], $scope.currentDate, $scope.bankAccount);
                    $scope.deadDogs.push(dog);
                }

                data.happenings = angular.fromJson(data.happenings);
                HappeningFactory.deserialize($scope, data.happenings);

                $scope.hints = angular.fromJson(data.hints);

                $scope.user.load.status = 'success';
                if ($scope.user.dialogId !== null) {
                    ngDialog.close($scope.user.dialogId);
                }

            } else {
                $scope.user.load.status = 'failed';
            }

        })
            .error(function (data, status, headers, config) {
                $scope.user.load.status = 'failed';
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

    $scope.save = function (isRegister) {

        $scope.user.save.status = 'saving';

		// Password is hashed again on server. I know, this is horrible code.
		
        var data = {
            username: $scope.user.username,
            kennel_name: $scope.user.testKennel,
            password: Library.sha1($scope.user.password),
            date: $scope.currentDate,
            star_level: $scope.level,
            bank_account: $scope.bankAccount.serialize(),
            dogs: DogSerializer.serialize($scope.dogs),
            puppies: DogSerializer.serialize($scope.puppies),
            puppies_parents: JSON.stringify({
                mother: DogSerializer.copyDogData($scope.puppies_parents.mother, null, true),
                father: DogSerializer.copyDogData($scope.puppies_parents.father, null, true)
            }),
            dead_dogs: DogSerializer.serialize($scope.deadDogs),
            achievements: $scope.achievements.serialize(),
            happenings: HappeningFactory.serialize($scope.happenings),
            hints: JSON.stringify($scope.hints),
            is_register: isRegister
        };

        var req = {
            method: 'POST',
            url: 'backend/save.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: $.param(data)
        };

        $http(req).success(function (data, status, headers, config) {
            if (data.status === 'success') {
                if (isRegister) {
                    $scope.user.kennel = $scope.user.testKennel;
                }
                $scope.user.save.status = 'success';
                $scope.user.isRegistered = true;
            } else if (data.info == 'username_taken') {
                $scope.user.save.status = 'username_taken';
            } else if (data.info == 'data_validation_failed') {
                $scope.user.save.status = 'data_validation_failed';
            } else {
                $scope.user.save.status = 'failed';
            }

        }).
            error(function (data, status, headers, config) {
                $scope.user.save.status = 'failed';
            });

    };
})
;

demoApp.controller('MainCtrl', function ($scope) {

});

demoApp.controller('ButtonsCtrl', ['$scope', function ($scope) {
    $scope.singleModel = 1;
    if ($scope.dog.isDead()) {
        $scope.dog.selectedAction = 'bury';
    } else {
        $scope.dog.selectedAction = 'sell';
    }

}]);

demoApp.controller('BreedSelectController', ['$scope', function ($scope) {
    $scope.breed = Constants.BREEDS.chihuahua.breed;
}]);

demoApp.directive('focusMe', function ($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                //console.log('value=', value);
                if (value === true || value === undefined) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
        }
    };
});