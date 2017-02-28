'use strict';

/**
 * @ngdoc overview
 * @name softvFrostApp
 * @description
 * # softvFrostApp
 *
 * Main module of the application.
 */
angular.module('softvFrostApp', [
		'ngAnimate',
		'ngSanitize',
		'ngNotify',
		'angularValidator',
		'ngStorage',
		'base64',
		'ui.router',
		'angularUtils.directives.dirPagination',
		'ngStorage',
		'ui.bootstrap',
		'blockUI'
	])
	.config(['$provide', '$urlRouterProvider', '$httpProvider', function($provide, $urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/auth/login');
		$provide.factory('ErrorHttpInterceptor', function($q, $injector) {
			function notifyError(rejection) {
				var notify = $injector.get('ngNotify');
				var content = '¡Se ha generado un error! \n' + rejection.data;
				notify.set(content, {
					type: 'error',
					duration: 4000
				});
			}
			return {
				requestError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					notifyError(rejection);
					sessionStorage.clear();
					return $q.reject(rejection);
				}
			};
		});
		$httpProvider.interceptors.push('ErrorHttpInterceptor');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}])
	.constant('APP_CONFIG', window.appConfig)
	.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$location', function($rootScope, $state, $stateParams, $localStorage, $location) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		// $rootScope.$on('$locationChangeStart', function() {
		// 	if ($localStorage.currentUser) {
		// 		$location.path('/home');
		// 	} else {
		// 		$location.path('/auth/login');
		// 	}
		// });

	}]);
