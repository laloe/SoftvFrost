'use strict';
angular.module('softvFrostApp').controller('NuevoUsuarioCtrl', NuevoUsuarioCtrl);

function NuevoUsuarioCtrl(usuarioFactory, rolFactory, $state, ngNotify) {

	function init() {
		rolFactory.GetRoleList().then(function(data) {
			vm.Roles = data.GetRoleListResult;

		});
	};

	function GuardarUsuario() {
		if (vm.Contrasena === vm.Contrasena2) {
			var obj = {};
			obj.IdRol = vm.Rol.IdRol;
			obj.Nombre = vm.Nombre;
			obj.Email = vm.Correo;
			obj.Usuario = vm.Descripcion;
			obj.Password = vm.Contrasena;
			usuarioFactory.AddUsuario(obj).then(function(data) {
				$state.go('home.provision.usuarios');
				ngNotify.set('Usuario agregado correctamente.', 'success');
			});
		} else {
			ngNotify.set('Las contraseña no coinciden.', 'error');
		}
	}


	var vm = this;
	init();
	vm.GuardarUsuario = GuardarUsuario;
	vm.titulo = 'Nuevo Usuario';
	vm.passwordPanel = true;
	vm.ValidatePanel = false;
	vm.editar = true;
}
