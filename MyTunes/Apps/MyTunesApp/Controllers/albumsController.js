(function (app) {
    var albumsController = function ($scope, $rootScope, $routeParams, albumService) {
        $rootScope.navigation = { isAlbums: true };
        $scope.search = $routeParams.search;
        $scope.isProgress = true;
        albumService.getAlbums().success(function (data) {
            $scope.albums = data;
            angular.forEach($scope.albums, function (album, index) {
                if (!album.artists) {
                    album.artists = album.artist;
                }
            });
        }).error(function (response) {
        })['finally'](function () {
            $scope.isProgress = false;
        });

    };
    albumsController.$inject = ["$scope", "$rootScope", "$routeParams", "albumService"];
    app.controller("albumsController", albumsController);
}(angular.module("myTunesApp")));


