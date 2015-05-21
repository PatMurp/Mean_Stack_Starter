'use strict';

angular
	.module("starterApp")
	.controller('AuthCtrl', ['$scope','$state','Auth',
	function($scope, $state, Auth) {
		$scope.user = {};

		$scope.register = function() {
			Auth.register($scope.user).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('admin');
			});
		};

		$scope.logIn = function() {
			Auth.logIn($scope.user).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('admin');
			});
		};

}])