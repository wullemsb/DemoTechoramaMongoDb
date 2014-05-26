(function (app) {
    var editArtistController = function ($scope, $routeParams, $location, artistService, imageService) {

        $scope.isShowImage = false;

        if ($routeParams.artistId && $routeParams.artistId !== 'new') {
            $scope.isShowImage = true;
            artistService.getArtist($routeParams.artistId).success(function (data) {
                $scope.artist = data;
            }).error(function (response) {
            })['finally'](function () {
            });
        } else {
            $scope.artist = {};
        }

        $scope.cancelEdit = function () {
            $location.path('/artists').hash('');
        };

        $scope.save = function () {
            imageService.uploadFile($scope.file).then(function (response) {
                var savedFile = response.data;
                $scope.artist.imageId = savedFile.id;
                artistService.save($scope.artist).then(function (response) {
                    $location.path('/artists').hash('');
                }).catch(function (response) {
                    l.stop();
                });
            });
        };

        $scope.delete = function () {
            artistService.deleteArtist($scope.artist.id).then(function (response) {
                $location.path('/artists').hash('');
            }).catch(function (response) {
            });
        };

        $scope.showImage = function (isShowImage) {
            $scope.isShowImage = isShowImage;
        };

        $scope.selectedFileChanged = function (element) {
            $scope.$apply(function () {
                $scope.file = element.files[0];
                $scope.form.$setDirty();
            });
        };
    };
    editArtistController.$inject = ["$scope", "$routeParams", "$location", "artistService", "imageService"];
    app.controller("editArtistController", editArtistController);
}(angular.module("myTunesApp")));


