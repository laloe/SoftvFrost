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
		'blockUI',
		'ngMap',
		'permission', 'permission.ui',
		'ui.mask'

	])
	.config(['$provide', '$urlRouterProvider', '$httpProvider', function($provide, $urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/auth/login');
		$provide.factory('ErrorHttpInterceptor', function($q, $injector) {
			function notifyError(rejection) {
				var notify = $injector.get('ngNotify');
				var content = '¡Se ha generado un error! \n' + rejection.data;
				if (rejection.status === 404) {
					notify.set(content, {
						type: 'error',
						duration: 4000
					});
				}
			}
			return {
				requestError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				}
			};
		});
		$httpProvider.interceptors.push('ErrorHttpInterceptor');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}])
	.constant('APP_CONFIG', window.appConfig)
	.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$location', 'permissionsFactory', 'PermPermissionStore', function($rootScope, $state, $stateParams, $localStorage, $location, permissionsFactory, PermPermissionStore) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		if ($localStorage.currentUser) {
			$location.path('/home');
			var permissions = permissionsFactory.on();
			console.log(permissions);
			PermPermissionStore.definePermission('anonymous', function() {
				return false;
			});
			PermPermissionStore.defineManyPermissions(permissions, function() {
				return true;
			});
		} else {
			$location.path('/auth/login');
			PermPermissionStore.definePermission('anonymous', function() {
				return true;
			});
		}

	}]);
