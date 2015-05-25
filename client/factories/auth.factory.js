'use strict';

angular
	.module('starterApp')
	.factory('Auth', ['$http', '$window', function($http, $window) {
		var auth = {};

		//save token to localStorage
		auth.saveToken = function(token) {
			$window.localStorage['starter-app-token'] = token;
		};

		// get token from localStorage
		auth.getToken = function() {
			return $window.localStorage['starter-app-token'];
		};

		// check if user is logged in
		auth.isLoggedIn = function() {
			var token = auth.getToken();

			if(token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		// return logged in username 
		auth.currentUser = function() {
			if(auth.isLoggedIn()) {
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.username;
			}
		};

		// register user and save returned token
		auth.register = function(user) {
			return $http.post('/api/users/register', user).success(function(data) {
				auth.saveToken(data.token);
			});
		};

		// login user and save returned token
		auth.logIn = function(user) {
			return $http.post('/api/users/login', user).success(function(data) {
				auth.saveToken(data.token);
			})
		}

		// logout user & remove token
		auth.logOut = function() {
			$window.localStorage.removeItem('starter-app-token');
			return $http.get('/api/users/logout')
		};

		return auth;
}]);