(function (app) {
    var editAlbumController = function ($scope, $rootScope, albumService, $routeParams, $location, artistService, imageService) {
        $scope.isShowImage = false;
        var noArtist = { id: null, name: "" };

        var updateSelectedArtists = function () {
            if ($scope.album && $scope.artists) {
                $scope.selectedArtists = [];
                if ($scope.album.artistIds) {
                    if ($scope.album.artistIds) {
                        angular.forEach($scope.album.artistIds, function (artistId, index) {
                            var selectedArtist = jQuery.grep($scope.artists, function (artist) {
                                return artist.id == artistId;
                            })[0];
                            $scope.selectedArtists.push({ artist: selectedArtist });
                        });
                    } 
                } else {
                    var selectedArtist = jQuery.grep($scope.artists, function (artist) {
                        return artist.id == $scope.album.artistId;
                    })[0];
                    $scope.selectedArtists.push({ artist: selectedArtist });
                }
            }
        };

        artistService.getArtists().success(function (data) {
            data.push(noArtist);
            $scope.artists = data;
            updateSelectedArtists();
        });

        if ($routeParams.albumId && $routeParams.albumId !== 'new') {
            $scope.isShowImage = true;
            albumService.getAlbum($routeParams.albumId).success(function (data) {
                $scope.album = data;
                updateSelectedArtists();
            }).error(function (response) {
            })['finally'](function () {
            });
        } else {
            $scope.album = { tracks: [], artistId: null };
        }

        $scope.cancelEdit = function () {
            $location.path('/albums').hash('');
        };

        $scope.save = function () {
            $scope.album.artistIds = [];
            $scope.album.artist = '';
            angular.forEach($scope.selectedArtists, function (selectedArtist, index) {
                $scope.album.artistIds.push(selectedArtist.artist.id);
                if ($scope.album.artist !== '') {
                    $scope.album.artist += ', ';
                }
                $scope.album.artist += selectedArtist.artist.name;
            });
            if ($scope.file) {
                imageService.uploadFile($scope.file).then(function (response) {
                    var savedFile = response.data;
                    $scope.album.imageId = savedFile.id;
                    albumService.save($scope.album).then(function (response) {
                        $location.path('/albums').hash('');
                    }).catch(function (response) {
                    });
                });
            } else {
                albumService.save($scope.album).then(function (response) {
                    $location.path('/albums').hash('');
                });
            }
        };

        $scope.delete = function () {
            albumService.deleteAlbum($scope.album.id).then(function (response) {
                $location.path('/albums').hash('');
            }).catch(function (response) {
            });
        };

        $scope.addArtist = function () {
            $scope.selectedArtists.push({ artist: noArtist });
        };

        $scope.removeArtist = function (artist) {
            var index = $scope.selectedArtists.indexOf(artist);
            if (index >= 0) {
                $scope.selectedArtists.splice(index, 1);
                $scope.form.$setDirty();
            }
        };

        $scope.addTrack = function () {
            $scope.album.tracks.push({});
        };

        $scope.removeTrack = function (track) {
            var index = $scope.album.tracks.indexOf(track);
            if (index >= 0) {
                $scope.album.tracks.splice(index, 1);
                $scope.form.$setDirty();
            }
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
    editAlbumController.$inject = ["$scope", "$rootScope", "albumService", "$routeParams", "$location", "artistService", "imageService"];
    app.controller("editAlbumController", editAlbumController);
}(angular.module("myTunesApp")));


