(function (app) {
    var albumController = function ($scope, $rootScope, albumService, $routeParams, artistService) {
        $scope.isProgress = true;
        var noArtist = { id: null, name: "" };

        var updateArtists = function () {
            if ($scope.artists && $scope.album) {
                var artistNames = '';
                if ($scope.album.artistIds) {
                    angular.forEach($scope.album.artistIds, function (artistId, index) {
                        if (artistNames !== '') {
                            artistNames = artistNames + ', ';
                        }
                        artistNames = artistNames + jQuery.grep($scope.artists, function (a) {
                            return a.id == artistId;
                        })[0].name;
                    });
                } else {
                    artistNames = jQuery.grep($scope.artists, function (a) {
                        return a.id == $scope.album.artistId;
                    })[0].name;
                }
                $scope.artistNames = artistNames;
            }
        };

        artistService.getArtists().success(function (data) {
            data.push(noArtist);
            $scope.artists = data;
            updateArtists();
        });

        albumService.getAlbum($routeParams.albumId).success(function (data) {
            $scope.album = data;
            updateArtists();
        }).error(function (response) {
        })['finally'](function () {
            $scope.isProgress = false;
        });

    };
    albumController.$inject = ["$scope", "$rootScope", "albumService", "$routeParams", "artistService"];
    app.controller("albumController", albumController);
}(angular.module("myTunesApp")));


