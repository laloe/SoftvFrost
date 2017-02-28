'use strict';
angular.module('softvFrostApp')
	.factory('terminalFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getTerminalList: '/Terminal/GetTerminalList'
		};
		factory.getTerminalList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTerminalList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;
	});
