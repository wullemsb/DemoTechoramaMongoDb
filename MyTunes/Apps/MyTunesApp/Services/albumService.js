"use strict";

(function (app) {

    var albumService = function ($http) {

        var getAlbums = function () {
            return $http.get("/api/albums");
        };

        var getAlbum = function (albumId) {
            return $http.get("/api/album/" + albumId);
        };

        var save = function (album) {
            return $http.post("/api/album", album);
        };

        var deleteAlbum = function (albumId) {
            return $http.delete("/api/album/" + albumId);
        };

        return {
            getAlbums: getAlbums,
            getAlbum: getAlbum,
            save: save,
            deleteAlbum: deleteAlbum
        };
    };
    albumService.$inject = ["$http"];
    app.factory("albumService", albumService);
}(angular.module("myTunesApp")));