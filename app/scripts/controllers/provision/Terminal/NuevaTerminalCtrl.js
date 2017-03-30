'use strict';
angular.module('softvFrostApp').controller('NuevaTerminalCtrl', NuevaTerminalCtrl);

function NuevaTerminalCtrl(terminalFactory, $uibModal, $rootScope, ngNotify, $state, $filter) {
	this.$onInit = function() {
		/*terminalFactory.getServicioList().then(function(data) {
			vm.Servicios = data.GetServicioListResult;
		});*/
	}

	function BuscaSuscriptor() {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalBusquedaSuscriptor.html',
			controller: 'ModalBusquedaSuscriptorCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'
		});
	}

	function ValidarServicio() {
		var parametros = new Object();
		//Obtiene 	transactionSequenceId necesario para las peticiones a Hughes
		terminalFactory.getSequenceId().then(function (Sequence) {
			parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
			//Obtiene el código del estado para hughes
			terminalFactory.getEstadoById(vm.IdEstado).then(function (data) {
				console.log(data);
				vm.estado = data.GetEstadoResult;
				parametros.direccion = vm.Calle + ' ' + vm.Numero;
				parametros.ciudad = vm.Ciudad;
				parametros.estado = vm.estado.Codigo;
				parametros.codigoPostal = vm.CP;
				parametros.latitud = vm.Latitud;
				parametros.longitud = vm.Longuitud;
				//Obtiene el nombre del frupo de servicios disponibles en esa área
				terminalFactory.hughesValidaServicio(parametros).then(function (hughesData) {
					console.log(hughesData);
					if (hughesData.EnhancedServicePrequalResponse.Code != '682') {
						ngNotify.set('Sin área de cobertura', 'error');
						vm.Servicios = '';
					} else {
						//Filtra los servicios por las disponibilidad en Hughes
						terminalFactory.getServicioListByProgramCode(hughesData.EnhancedServicePrequalResponse.ProductList.Product.ProgramCode).then(function (dataServicios) {
							console.log(dataServicios);
							vm.Servicios = dataServicios.GetServicioListByProgramCodeResult;
						});
					}
				});
			});
		});
	}

	function hughesGetSanCompuesto(obj) {
		var a = obj.toString();
		var i;
		for (i = a.length; i < 9; i++) {
			a = '0' + a;
		}
		return 'TLV' + a;
	};

	function BuscaLatLong() {
		var obj = {
			lat: 23.96617587126503,
			long: -101.953125
		};
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalGetLatLong.html',
			controller: 'ModalGetLatLongCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg',
			resolve: {
				datosGis: function () {
					return obj;
				}
			}
		});
	}
	$rootScope.$on('cliente_seleccionado', function (e, detalle) {
		vm.IdSuscriptor = detalle.IdSuscriptor;
		vm.NombreSuscriptor = detalle.Nombre + ' ' + detalle.Apellido;

		vm.FirstNameSuscriptor = detalle.Nombre;
		vm.LastNameSuscriptor = detalle.Apellido;
		vm.Calle = detalle.Calle;
		vm.Numero = detalle.Numero;
		vm.Ciudad = detalle.Ciudad;
		vm.IdEstado = detalle.IdEstado;
		vm.CP = detalle.CP;
		vm.Telefono = detalle.Telefono;
		vm.Email = detalle.Email;
	});

	$rootScope.$on('get_LatLong', function (e, detalle) {
		vm.Latitud = detalle[0];
		vm.Longuitud = detalle[1];
	});

	function GuardaTerminal() {
		if (vm.IdSuscriptor == null || vm.IdSuscriptor == undefined) {
			ngNotify.set('No se ha definido un suscriptor para la terminal', 'error');
			return;
		}

		var parametros = {
			'IdSuscriptor': vm.IdSuscriptor,
			'IdServicio': vm.Servicio.IdServicio,
			'Latitud': vm.Latitud,
			'Longitud': vm.Longuitud,
			'Estatus': vm.Status.clave,
			'FechaAlta': vm.FechaAlta,
			'FechaSuspension': '',
			'ESN': vm.ESN,
			'Comentarios': vm.Comentarios
		};
		//Guarda la terminal en la base y obtiene el SAN
		terminalFactory.GuardaTerminal(parametros).then(function (data) {
			var obj = new Object();
			//Crea la terminal en la plataforma de Hughes
			terminalFactory.getSequenceId().then(function (Sequence) {
				obj.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
				obj.SAN = hughesGetSanCompuesto(data.AddTerminalResult);
				obj.nombre = vm.FirstNameSuscriptor;
				obj.apellido = vm.LastNameSuscriptor;
				obj.direccion = vm.Calle + ' ' + vm.Numero;
				obj.ciudad = vm.Ciudad;
				obj.estado = vm.estado.Codigo;
				obj.codigoPostal = vm.CP;
				obj.latitud = vm.Latitud;
				obj.longitud = vm.Longuitud;
				obj.telefono = vm.Telefono;
				obj.email = vm.Email;
				obj.servicio = vm.Servicio.Nombre;
				//alert(JSON.stringify(obj));
				terminalFactory.hughesCrearTerminal(obj).then(function (hughesData) {
					console.log(hughesData);
					var Obj2 = new Object();
					Obj2.objMovimiento = new Object();
					Obj2.objMovimiento.SAN=data.AddTerminalResult;
					Obj2.objMovimiento.IdComando=1;//Hardcodeado a la tabla de Comando
					Obj2.objMovimiento.IdUsuario=0;
					Obj2.objMovimiento.IdTicket=0;
					Obj2.objMovimiento.OrderId=hughesData.StandardResponse.OrderId;
					vm.fechaAuxiliar = new Date();
		      Obj2.objMovimiento.Fecha=$filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
					Obj2.objMovimiento.Mensaje=hughesData.StandardResponse.Message;
					Obj2.objMovimiento.IdOrigen=2;//Hardcodeado a la tabla de OrigenMovimiento
					Obj2.objMovimiento.Detalle1='';
					Obj2.objMovimiento.Detalle2='';

					if (hughesData.StandardResponse.Code != '5') {
						//----------------------------------
						var Obj3 = new Object();
						Obj3.objTerminal = new Object();
						Obj3.objTerminal.SAN = data.AddTerminalResult;
						Obj3.objTerminal.IdSuscriptor = vm.IdSuscriptor;
						Obj3.objTerminal.IdServicio = vm.Servicio.IdServicio;

						Obj3.objTerminal.Latitud = vm.Latitud;
						Obj3.objTerminal.Longitud = vm.Longuitud;
						Obj3.objTerminal.Estatus = 'Incompleta';
						Obj3.objTerminal.FechaAlta = vm.FechaAlta;
						Obj3.objTerminal.FechaSuspension = '';
						Obj3.objTerminal.ESN = vm.ESN;
						Obj3.objTerminal.Comentarios = vm.Comentarios;
						console.log(Obj3);
						terminalFactory.updateTerminal(Obj3).then(function (data) {
							ngNotify.set('Error al crear la terminal en la plataforma.', 'error');
						});
						//--------------------------------------------------

					} else {
						ngNotify.set('La terminal se ha guardado correctamente', 'success');
					}

					terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
					});
					$state.go('home.provision.terminales');
				});
			});
		});
	}




	var vm = this;
	vm.titulo = 'Nueva Terminal';
	vm.BuscaSuscriptor = BuscaSuscriptor;
	vm.ValidarServicio = ValidarServicio;
	vm.BuscaLatLong = BuscaLatLong;
	vm.GuardaTerminal = GuardaTerminal;
	vm.ListaStatus = [{
		'clave': 'Pendiente',
		'Nombre': 'Pendiente'
	},
	{
		'clave': 'Activa',
		'Nombre': 'Activa'
	},
	{
		'clave': 'Suspendida',
		'Nombre': 'Suspendida'
	},
	{
		'clave': 'Cancelada',
		'Nombre': 'Cancelada'
	}
	];
}
