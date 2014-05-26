//(function (module) {
//    var rightClickDirective = function ($parse) {
//        //return function (scope, element, attrs) {
//        //    var fn = $parse(attrs.ngRightClick);
//        //    element.bind('contextmenu', function (event) {
//        //        scope.$apply(function () {
//        //            event.preventDefault();
//        //            fn(scope, { $event: event });
//        //        });
//        //    });
//        //};
//    };
//    module.directive("rightClick", [rightClickDirective, "$parse"]);
//}(angular.module("myTunesApp")));

(function (module) {
    var rightClickDirective = function ($parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var fn = $parse(attrs.rightClick);
                element.bind('contextmenu', function (event) {
                    scope.$apply(function () {
                        event.preventDefault();
                        fn(scope, { $event: event });
                    });
                });
            }
        }
    };
    module.directive("rightClick", ["$parse", rightClickDirective]);
}(angular.module("myTunesApp")));

