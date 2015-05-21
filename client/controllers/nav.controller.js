'use strict';

angular
	.module('starterApp')
	.controller('NavCtrl', [
	'$scope',
	'Auth',
	function($scope, Auth) {
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.currentUser = Auth.currentUser;
		$scope.logOut = Auth.logOut;
}]);