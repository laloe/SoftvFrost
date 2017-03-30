'use strict';
angular.module('softvFrostApp').controller('UsuariosCtrl', UsuariosCtrl);

function UsuariosCtrl(usuarioFactory, rolFactory, $state, ngNotify) {

	function Init() {
		usuarioFactory.getUsuarioList().then(function(data) {
			vm.Usuarios = data.GetUsuarioListResult;
		});
		rolFactory.GetRoleList().then(function(data) {
			vm.Roles = data.GetRoleListResult;

		});
	}

	function EditaUsuario(x) {

		$state.go('home.provision.editausuario', {
			obj: x
		});
	}

	function Busca(option) {

		if (option == 1) {

			if (vm.Busuario == '' || vm.Busuario == null) {
				var Parametros = {
					'Nombre': '',
					'Email': '',
					'Usuario2': '',
					'Op': 0,
					'IdRol': 0
				};

				usuarioFactory.BuscaUsuario(Parametros).then(function(data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});

			} else {
				console.log(vm.Busuario);
				var Parametros = {
					'Nombre': vm.Busuario,
					'Email': '',
					'Usuario2': vm.Busuario,
					'Op': 1,
					'IdRol': 0
				};
				console.log(Parametros);
				usuarioFactory.BuscaUsuario(Parametros).then(function(data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});
			}
		} else if (option == 2) {
			if (vm.Bcorreo == '' || vm.Bcorreo == null) {
				var Parametros = {
					'Nombre': '',
					'Email': '',
					'Usuario2': '',
					'Op': 0,
					'IdRol': 0
				};
				usuarioFactory.BuscaUsuario(Parametros).then(function(data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});

			} else {
				var Parametros = {
					'Nombre': '',
					'Email': vm.Bcorreo,
					'Usuario2': '',
					'Op': 2,
					'IdRol': 0
				};
				usuarioFactory.BuscaUsuario(Parametros).then(function(data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});
			}



		} else if (option == 3) {

			if (vm.Rol == '' || vm.Rol == null) {
				var Parametros = {
					'Nombre': '',
					'Email': '',
					'Usuario2': '',
					'Op': 0,
					'IdRol': 0
				};
				usuarioFactory.BuscaUsuario(Parametros).then(function(data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});

			} else {

				var Parametros = {
					'Nombre': '',
					'Email': '',
					'Usuario2': '',
					'Op': 3,
					'IdRol': vm.Rol.IdRol
				};
				usuarioFactory.BuscaUsuario(Parametros).then(function(data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});

			}

		}

	}

	var vm = this;
	Init();
	vm.EditaUsuario = EditaUsuario;
	vm.Busca = Busca;
}
