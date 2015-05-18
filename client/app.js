 var app = angular.module("starterApp", ['ngRoute'])

 app.config(['$routeProvider', function($routeProvider) {
 	$routeProvider
 		.when('/', {
 			templateUrl: 'partials/home.html'
 		})
 		.when('/login', {
 			templateUrl: 'partials/login.html'
 		})
 		.when('/signup', {
 			templateUrl: 'partials/signup.html'
 		})
 		.otherwise({
 			redirectTo: '/'
 		})
 }]);

 