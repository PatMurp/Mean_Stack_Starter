'use strict';

angular
	.module('starterApp')
	.controller('AdminCtrl', [
	'$scope',
	'$http',
	function($scope, $http) {

		$http.get('/api/users').success(function(users) {
			$scope.adminUsers = users;
		});

		$scope.removeAdminUser = function(index) {
			$http.delete('/api/users/' + index._id)
				.success(function() {
					$scope.adminUsers.splice(index, 1)
			})
		}
}]);