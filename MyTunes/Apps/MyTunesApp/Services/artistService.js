"use strict";

(function (app) {

    var artistService = function ($http) {

        var getArtists = function () {
            return $http.get("/api/artists");
        };

        var getArtist = function (artistId) {
            return $http.get("/api/artist/" + artistId);
        };

        var save = function (artist) {
            return $http.post("/api/artist", artist);
        };

        var deleteArtist = function (artistId) {
            return $http.delete("/api/artist/" + artistId);
        };

        var getNofAlbumsByArtist = function (artistIds) {
            return $http.post("api/nofalbumsbyartist", artistIds);
        };

        return {
            getArtists: getArtists,
            save: save,
            deleteArtist: deleteArtist,
            getArtist: getArtist,
            getNofAlbumsByArtist: getNofAlbumsByArtist
        };
    };
    artistService.$inject = ["$http"];
    app.factory("artistService", artistService);
}(angular.module("myTunesApp")));