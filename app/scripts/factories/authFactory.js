'use strict';
angular.module('softvFrostApp')
	.factory('authFactory', function($http, $q, globalService, $base64, $localStorage) {
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
					if (response.data.LogOnResult.Token) {
						$localStorage.currentUser = {
							token: response.data.LogOnResult.Token,
							nombre: response.data.LogOnResult.Nombre,
							idRol: response.data.LogOnResult.IdRol,
							idUsuario: response.data.LogOnResult.IdUsuario,
							usuario: response.data.LogOnResult.Usuario
						};
						deferred.resolve(true);
					} else {
						deferred.resolve(false);
					}
				})
				.catch(function(response) {
					deferred.reject(response);
				});
			return deferred.promise;
		};

		return factory;
	});
