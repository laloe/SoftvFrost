'use strict';

/**
 * @ngdoc function
 * @name softvFrostApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softvFrostApp
 */
angular.module('softvFrostApp')
	.controller('MainCtrl', function($localStorage, $window, $location) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		this.$onInit = function() {
			if ($localStorage.currentUser) {
				vm.menus = $localStorage.currentUser.menu;
				vm.usuario = $localStorage.currentUser.usuario;
				//$location.path('/home/provision/suscriptores');
			} else {
				$location.path('/auth/login');
			}

		};

		function logOut() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}

		function menuClick(x) {
			var $this = $('.test' + x);
			$('.tree').not($this).slideUp(600);
			$this.toggle(700);

			$('.tree').not($this).parent('li').find('.tree-toggle .right-arrow').removeClass('fa-angle-down').addClass('fa-angle-right');
			$this.parent('li').find('.tree-toggle .right-arrow').toggleClass('fa-angle-right fa-angle-down');
		}

		var vm = this;
		vm.logOut = logOut;
		vm.menuClick = menuClick;
		var $ = angular.element;
	});
