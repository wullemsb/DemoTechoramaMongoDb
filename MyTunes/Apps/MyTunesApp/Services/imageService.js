"use strict";

(function (app) {
    var imageService = function ($http) {
        var uploadFile = function (file, compId) {
            var fd = new FormData();
            fd.append("file", file);

            return $http.post("/api/image/", fd, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        };

        return {
            uploadFile: uploadFile
        };
    };
    imageService.$inject = ["$http"];
    app.factory("imageService", imageService);
}(angular.module("myTunesApp")));


