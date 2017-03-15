'use strict';
angular.module('softvFrostApp')
	.factory('incidenciasFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			addTicket: '/Ticket/AddTicket',
			getTickets: '/Ticket/GetTicketList',
			getTerminal: '/Terminal/GetByTerminal',
			getMotivo: '/MotivoTicket/GetMotivoTicketList',
			getSintoma: '/Sintoma/GetSintomaList',
			getTipoContrato: '/TipoContacto/GetTipoContactoList',
			getMedio: '/MedioComunicacion/GetMedioComunicacionList',
			getTicketDetalle: '/Ticket/GetDeepTicket',
			getSolucion: '/SolucionTicket/GetSolucionTicketList',
			closeTicket: '/Ticket/UpdateTicket'
		};

		factory.addTicket = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objTicket': {
					'IdUsuario': 1,
					'IdTicketPadre': 0,
					'SAN': obj.san,
					'Fecha': obj.fecha,
					'IdSintoma': obj.sintoma,
					'IdMotivoTicket': obj.motivo,
					'Prioridad': obj.prioridad,
					'Descripcion': obj.descripcion,
					'IdTipoContacto': obj.tipoContacto,
					'NombreContacto': obj.nombreContacto,
					'IdMedioComunicacion': obj.medioComun,
					'NumeroContacto': obj.numeroContacto,
					'FechaCierre': '',
					'Estado': 'P'
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addTicket, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getTickets = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTickets, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getTerminal = function(san) {
			var deferred = $q.defer();
			var Parametros = {
				'SAN': san
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			console.log($localStorage.currentUser.token);
			console.log($localStorage.currentUser.idUsuario);
			$http.post(globalService.getUrl() + paths.getTerminal, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getMotivo = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getMotivo, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getSintoma = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getSintoma, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getTipoContrato = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTipoContrato, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getMedio = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getMedio, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getTicketDetalle = function(ticket) {
			var deferred = $q.defer();
			var Parametros = {
				'IdTicket': ticket
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getTicketDetalle, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getSolucion = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getSolucion, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.closeTicket = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objTicket': {
					'IdTicket': obj.ticket,
					'FechaCierre': obj.fechaCierre,
					'IdSolucion': obj.solucion,
					'Causa': obj.causa,
					'DescripcionSolucion': obj.descripcionSolucion
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.closeTicket, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.UpdateFile = function(file, Distribuidor) {
			var deferred = $q.defer();
			var data = new FormData();
			for (var i = 0; i < file.length; i++) {
				console.log(file[i]);
				data.append('file' + i, file[i]);
			}
			data.append('Distribuidor', Distribuidor);

			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
					'Content-Type': undefined
				}
			};
			$http.post(globalService.getUrl() + paths.UploadFile, data, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		return factory;
	});
