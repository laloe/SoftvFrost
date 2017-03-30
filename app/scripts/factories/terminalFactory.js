'use strict';
angular.module('softvFrostApp')
	.factory('terminalFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getTerminalList: '/Terminal/GetTerminalList',
			getServicioList: '/Servicio/GetServicioList',
			GuardaTerminal: '/Terminal/AddTerminal',
			getTerminalById: '/Terminal/GetByTerminal',
			buscarTerminal: '/Terminal/GetFilterTerminalList',
			updateTerminal: '/Terminal/UpdateTerminal',
			getComandoList: '/Comando/GetComandoList',
			getEstadoById: '/Estado/GetEstado',
			getSequenceId: '/SequenceId/GetSequenceId',
			getServicioListByProgramCode: '/Servicio/GetServicioListByProgramCode',
			hughesValidaServicio: '/ValidaServicio',
			hughesCambiarStatusServicio: '/CambiarStatusServicio',
			hughesActivarTerminal: '/ActivarTerminal',
			hughesToken: '/Token',
			hughesCambioServicio: '/CambioServicio',
			hughesConsumoDeTerminal: '/ConsumoDeTerminal',
			hughesFapStatus: '/FapStatus',
			addMovimiento: '/Movimiento/AddMovimiento',
			getSuscriptorById: '/Suscriptor/GetSuscriptor',
			hughesCrearTerminal: '/CrearTerminal',
			getMovimientosBySan: '/Movimiento/GetMovimientoListBySAN',
			detalleMovimiento: '/Movimiento/GetDeepMovimiento',
			sigleMovimiento: '/DetalleMovimiento/GetDetalleMovimientoIdList'
		};

		factory.sigleMovimiento = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'IdMovimiento': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.sigleMovimiento, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.detalleMovimiento = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'IdMovimiento': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.detalleMovimiento, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.getMovimientosBySan = function(san) {
			var deferred = $q.defer();
			var Parametros = {
				'SAN': san
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getMovimientosBySan, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.updateTerminal = function(obj) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.updateTerminal, JSON.stringify(obj), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.buscarTerminal = function(obj) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'SAN': obj.san,
				'Suscriptor': obj.suscriptor,
				'Estatus': obj.estatus,
				'Servicio': obj.servicio,
				'Op': obj.op
			};
			$http.post(globalService.getUrl() + paths.buscarTerminal, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};


		factory.GuardaTerminal = function(objeto) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'IdSuscriptor': objeto.IdSuscriptor,
				'IdServicio': objeto.IdServicio,
				'Latitud': '' + objeto.Latitud + '',
				'Longitud': '' + objeto.Longitud + '',
				'Estatus': objeto.Estatus,
				'FechaAlta': objeto.FechaAlta,
				'FechaSuspension': objeto.FechaSuspension,
				'ESN': objeto.ESN,
				'Comentarios': objeto.Comentarios
			};
			console.log(JSON.stringify({
				'objTerminal': parametros
			}));

			$http.post(globalService.getUrl() + paths.GuardaTerminal, JSON.stringify({
				'objTerminal': parametros
			}), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
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

		factory.getServicioList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getServicioList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getTerminalById = function(id) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'SAN': id
			};
			$http.post(globalService.getUrl() + paths.getTerminalById, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.getComandoList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getComandoList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getEstadoById = function(id) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'IdEstado': id
			};
			$http.post(globalService.getUrl() + paths.getEstadoById, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.getSequenceId = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

			$http.get(globalService.getUrl() + paths.getSequenceId, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};


		factory.hughesValidaServicio = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesValidaServicio, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesCambiarStatusServicio = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			$http.post(globalService.getUrlHughesService() + paths.hughesCambiarStatusServicio, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesActivarTerminal = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesActivarTerminal, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesToken = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesToken, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesCambioServicio = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesCambioServicio, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesConsumoDeTerminal = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesConsumoDeTerminal, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesFapStatus = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			$http.post(globalService.getUrlHughesService() + paths.hughesFapStatus, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.addMovimiento = function(obj) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			obj.objMovimiento.IdUsuario = $localStorage.currentUser.idUsuario;
			var parametros = obj;
			$http.post(globalService.getUrl() + paths.addMovimiento, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getSuscriptorById = function(id) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'IdSuscriptor': id
			};
			$http.post(globalService.getUrl() + paths.getSuscriptorById, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.getServicioListByProgramCode = function(id) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'ProgramCode': id,
				'Op': 0
			};
			$http.post(globalService.getUrl() + paths.getServicioListByProgramCode, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesCrearTerminal = function(obj) {
			var deferred = $q.defer();
			var parametros = obj;
			$http.post(globalService.getUrlHughesService() + paths.hughesCrearTerminal, JSON.stringify(parametros)).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		return factory;


	});
