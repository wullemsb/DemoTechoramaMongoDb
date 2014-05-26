(function (module) {
    var ratingDirective = function () {
        return {
            restrict: "AE",
            replace: true,
            scope: {
                score: '=score',
                stars: '=stars'
            },
            link: function (scope, elements, attrs) {
                for (var iElem = 0; iElem < elements.length; ++iElem) {
                    var element = elements[iElem];
                    var content = '';
                    var score = scope.score;
                    if (!score) {
                        score = 2;
                    }
                    for (var iStar = 0; iStar < scope.stars; ++iStar) {
                        if (iStar < score) {
                            content += '<i style="font-size:1em; opacity:.6;" class="fa fa-3x fa-star"></i>'
                        } else {
                            content += '<i style="font-size:1em; opacity:.6;" class="fa fa-3x fa-star-o"></i>'
                        }
                    }
                    element.innerHTML = content;
                }
            }
        }
    };
    module.directive("rating", [ratingDirective]);
}(angular.module("myTunesApp")));


