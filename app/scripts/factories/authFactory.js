'use strict';
angular.module('softvFrostApp')
	.factory('authFactory', function($http, $q, globalService, $base64, $localStorage, $location, $window) {
		var factory = {};
		var paths = {
			login: '/Usuario/LogOn'
		};

		factory.login = function(user, password) {
			var token = $base64.encode(user + ':' + password);
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': 'Basic ' + token
				}
			};
			$http.post(globalService.getUrl() + paths.login, JSON.stringify(Parametros), config)
				.then(function(response) {
					console.log(response.data);
					if (response.data.LogOnResult.Token) {
						console.log($localStorage);
						$localStorage.currentUser = {
							token: response.data.LogOnResult.Token,
							nombre: response.data.LogOnResult.Nombre,
							idRol: response.data.LogOnResult.IdRol,
							idUsuario: response.data.LogOnResult.IdUsuario,
							usuario: response.data.LogOnResult.Usuario,
							menu: response.data.LogOnResult.Menu
						};
						$window.location.reload();
					} else {
						$location.path('/auth/login');
					}
				})
				.catch(function(response) {
					deferred.reject(response);
				});
			return deferred.promise;
		};

		return factory;
	});
