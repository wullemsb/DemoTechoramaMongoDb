'use strict';

(function () {
    var app = angular.module('myTunesApp', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/albums', { templateUrl: '/apps/myTunesApp/templates/albumList.html' })
            .when('/album/:albumId', { templateUrl: '/apps/myTunesApp/templates/album.html' })
            .when('/albums/search/:search', { templateUrl: '/apps/myTunesApp/templates/albumList.html' })
            .when('/artists', { templateUrl: '/apps/myTunesApp/templates/artistList.html' })
            .when('/artists/search/:search', { templateUrl: '/apps/myTunesApp/templates/artistList.html' })
            .when('/editalbum/:albumId', { templateUrl: '/apps/myTunesApp/templates/editalbum.html' })
            .when('/editartist/:artistId', { templateUrl: '/apps/myTunesApp/templates/editartist.html' })
            .otherwise({ redirectTo: '/albums' });
    }]);
}());
