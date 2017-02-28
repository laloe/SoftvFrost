'use strict';

/**
 * @ngdoc function
 * @name softvFrostApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softvFrostApp
 */
angular.module('softvFrostApp')
	.controller('MainCtrl', function($localStorage, $window) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		this.$onInit = function() {
			vm.usuario = $localStorage.currentUser.usuario;
		}

		function logOut() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}

		var vm = this;
		vm.logOut = logOut;
	});
