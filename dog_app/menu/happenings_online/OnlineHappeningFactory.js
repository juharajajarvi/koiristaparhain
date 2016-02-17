var OnlineHappeningFactory = {

    createShow: function ($scope) {

        var type = Constants.HAPPENINGS.SHOW;
        var name = "Näyttely, aikuiset koirat (online)";

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return new OnlineHappening(
            type,
            name,
            tomorrow,
            $scope
        );
    }

};