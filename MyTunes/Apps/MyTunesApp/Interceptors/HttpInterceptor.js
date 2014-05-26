(function (module) {
    var httpInterceptor = function ($rootScope, $q, $timeout) {
        var verifyIsProgress = function () {
            if (typeof $rootScope.nofActiveCalls === 'undefined' || $rootScope.nofActiveCalls <= 0) {
                if ($rootScope.isProgress !== false) {
                    $rootScope.isProgress = false;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                }
            } else {
                if ($rootScope.isProgress !== true) {
                    $rootScope.isProgress = true;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                }
            }
        }

        var verifyIsBusy = function () {
            if (typeof $rootScope.nofActiveCalls === 'undefined' || $rootScope.nofActiveCalls <= 0) {
                if ($rootScope.isBusy !== false) {
                    $rootScope.isBusy = false;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                }
            } else {
                if ($rootScope.isBusy !== true) {
                    $rootScope.isBusy = true;
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                }
            }
        }

        var processResponse = function (response) {
            --$rootScope.nofActiveCalls;
            verifyIsProgress();
            verifyIsBusy();

            // Return the response or promise.
            return response || $q.when(response);
        };
        var processRequest = function (config) {
            //todo: put current selected language in query string
            if (typeof $rootScope.nofActiveCalls === 'undefined') {
                $rootScope.nofActiveCalls = 0;
            }
            ++$rootScope.nofActiveCalls;
            verifyIsBusy();
            $timeout(function () { verifyIsProgress(); }, 150, false);

            // Return the config or wrap it in a promise if blank.
            return config || $q.when(config);
        };
        var processRequestError = function (rejection) {
            --$rootScope.nofActiveCalls;
            verifyIsBusy();
            verifyIsProgress();

            // Return the promise rejection.
            return $q.reject(rejection);
        };
        var processResponseError = function (rejection) {
            --$rootScope.nofActiveCalls;
            verifyIsBusy();
            verifyIsProgress();
            if (typeof rejection.data.errors != 'undefined') {
                $rootScope.errors = rejection.data.errors;
            }

            // Return the promise rejection.
            return $q.reject(rejection);
        }
        return {
            response: processResponse,
            request: processRequest,
            requestError: processRequestError,
            responseError: processResponseError
        };
    };

    httpInterceptor.$inject = ["$rootScope", "$q", "$timeout"];
    module.factory("httpInterceptor", httpInterceptor);
    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
}(angular.module("myTunesApp")))
