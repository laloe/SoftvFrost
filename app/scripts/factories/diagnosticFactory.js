'use strict';
angular.module('softvFrostApp')
	.factory('diagnosticFactory', function($http, $q,globalService) {
		var factory = {};
		var paths = {
			getToken: '/HuguesRequest/GetToken',
			getCommand: '/HuguesRequest/TestMethod',
			setCommand: '/SDTCommands/GetData'
		};

		factory.getLoginUid = function() {
			var deferred = $q.defer();
			$http.get(globalService.getUrlHughesMonitoreo() + paths.getToken).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};

		factory.getCommand = function(sanData) {
			var deferred = $q.defer();
			var Parametros = {
				'loginuuid': sanData.token,
				'san': sanData.san,
				'command': 'SDT',
				'operator_id': 'televera'
			};
			$http.post(globalService.getUrlHughesMonitoreo() + paths.getCommand, JSON.stringify(Parametros)).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};
		factory.setCommand = function(sanData) {
			var deferred = $q.defer();
			var Parametros = {
				'loginuuid': sanData.token,
				'san': sanData.san,
				'command': sanData.command,
				'operator_id': 'televera',
				'param1': sanData.param1,
				'param2': sanData.param2
			};
			$http.post(globalService.getUrlHughesMonitoreo() + paths.setCommand, JSON.stringify(Parametros)).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};

		return factory;
	});
