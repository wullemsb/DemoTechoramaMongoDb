(function (app) {
    var artistsController = function ($scope, $rootScope, $routeParams, artistService, $location) {
        $rootScope.navigation = { isArtists: true };
        $scope.search = $routeParams.search;
        $scope.isProgress = true;
        artistService.getArtists().success(function (data) {
            $scope.artists = data;
            var artistIds = [];
            angular.forEach(data, function (artist) {
                artistIds.push(artist.id);
            });
            artistService.getNofAlbumsByArtist(artistIds).success(function (data) {
                angular.forEach($scope.artists, function (artist) {
                    var nofAlbums = jQuery.grep(data, function (nofAlbumsByArtist) {
                        return nofAlbumsByArtist._id.$oid == artist.id;
                    })[0];
                    artist.nofAlbums = nofAlbums.count;
                });
            });
        }).error(function (response) {
        })['finally'](function () {
            $scope.isProgress = false;
        });
        $scope.editArtist = function (id) {
            $location.path('/editartist/' + id).hash('');
        };
    };
    artistsController.$inject = ["$scope", "$rootScope", "$routeParams", "artistService", "$location"];
    app.controller("artistsController", artistsController);
}(angular.module("myTunesApp")));


