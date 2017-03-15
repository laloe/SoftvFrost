'use strict';
angular.module('softvFrostApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://35.164.143.107/SoftvWCFService.svc';
		};
		return svc;
	});
