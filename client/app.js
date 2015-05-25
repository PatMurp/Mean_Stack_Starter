var app = angular.module("starterApp", ['mm.foundation', 'ui.router'])

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'partials/home.html',
				module: 'public'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'partials/login.html',
				controller: 'AuthCtrl',
				module: 'public',
				onEnter: ['$state', 'Auth', function($state, Auth) {
					if(Auth.isLoggedIn()) {
						$state.go('admin')
					}
				}]
			})
			.state('register', {
				url: '/signup',
				templateUrl: 'partials/signup.html',
				controller: 'AuthCtrl',
				module: 'public',
				onEnter: ['$state', 'Auth', function($state, Auth) {
					if(Auth.isLoggedIn()) {
						$state.go('admin')
					}
				}]
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'partials/admin.html',
				controller: 'AdminCtrl',
				module: 'private' // add module: private to restricted pages
			})

		$urlRouterProvider.otherwise( function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("home");
    });
}]);

// restrict access if user not logged in 
app.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {

	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.module === 'private' && !Auth.isLoggedIn()) {
        // If logged out and transitioning to a logged in page:
        e.preventDefault();
        $state.go('login');
    } else if (toState.module === 'public' && Auth.isLoggedIn()) {
        // If logged in and transitioning to a logged out page:
        e.preventDefault();
        $state.go('admin');
    };
	});
}]);


angular.module('starterApp').directive('ngReallyClick', [function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('click', function() {
				var message = attrs.ngReallyMessage;
				if (message && confirm(message)) {
					scope.$apply(attrs.ngReallyClick);
				}
			});
		}
	}
}]);

