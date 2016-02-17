function Vet($scope) {

    this.healthIssuesCount = function() {
        var number = 0;
        for (var i=0; i < $scope.dogs.length; i++) {
            for (var j=0; j < $scope.dogs[i].healthIssues.length; j++) {
                if ($scope.dogs[i].healthIssues[j].isFound && !$scope.dogs[i].healthIssues[j].isHidden) {
                    number++;
                }
            }
        }
        return number;
    };

    this.unseenHealthIssuesCount = function() {
        var number = 0;
        for (var i=0; i < $scope.dogs.length; i++) {
            for (var j=0; j < $scope.dogs[i].healthIssues.length; j++) {
                if ($scope.dogs[i].healthIssues[j].isFound && !$scope.dogs[i].healthIssues[j].isSeen) {
                    number++;
                }
            }
        }
        return number;
    };

}