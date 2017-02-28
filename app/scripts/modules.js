'use strict';
angular.module('softvFrostApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home',
				data: {
					pageTitle: 'BIENVENIDO | SOFTV WEB',
				},
				url: '/home',
				views: {
					'homeview': {
						templateUrl: 'views/main.html',
						controller: 'MainCtrl',
						controllerAs: '$ctrl'
					}
				},
			},
			{
				name: 'login',
				url: '/auth/login',
				data: {
					pageTitle: 'BIENVENIDO | SOFTV WEB'
				},
				views: {
					'loginview': {
						templateUrl: 'views/login/login.html',
						controller: 'LoginCtrl',
						controllerAs: '$ctrl'
					}
				},
			}
		];

		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
