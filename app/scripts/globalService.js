'use strict';
angular.module('softvFrostApp')
	.service('globalService', function () {
		var svc = {};

		svc.getUrl = function () {
			return 'http://35.164.143.107/SoftvWCFService.svc';
		};
		svc.getUrlHughesService = function () {
			return 'http://35.164.143.107:8081/SoftvFrostAPI';
		};

		svc.getUrlBeams = function () {
			return 'http://35.164.143.107:8050/beams/';
		};

		svc.getUrlHughesMonitoreo = function () {
			return 'http://35.164.143.107:8050/api';
		};

		return svc;
	});
