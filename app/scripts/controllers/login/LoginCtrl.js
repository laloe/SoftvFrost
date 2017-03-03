'use strict';
angular.module('softvFrostApp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl(authFactory, ngNotify, $state, $localStorage) {
	this.$onInit = function() {
		if ($localStorage.currentUser) {
			$state.go('home');
		}
	}

	function login() {
		authFactory.login(vm.user, vm.password).then(function(data) {
			if (data) {
				$state.go('home');
			} else {
				ngNotify.set('Datos de acceso erroneos', 'error');
			}
		});
	}

	var vm = this;
	vm.login = login;
}
