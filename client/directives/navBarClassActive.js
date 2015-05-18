'use strict';

// add active class to nav bar depending on url
angular.module('starterApp')
    .directive('classOnActiveLink', [function() {
    return {
        link: function(scope, element, attrs) {

            var anchorLink = element.children()[0].getAttribute('ng-href') || element.children()[0].getAttribute('href');
            anchorLink = anchorLink.replace(/^#/, '');

            scope.$on("$routeChangeSuccess", function (event, current) {
                if (current.$$route.originalPath == anchorLink) {
                    element.addClass(attrs.classOnActiveLink);
                }
                else {
                    element.removeClass(attrs.classOnActiveLink);
                }
            });
        }
    };
}]);