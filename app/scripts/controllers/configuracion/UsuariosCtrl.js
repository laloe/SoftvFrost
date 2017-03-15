'use strict';
angular.module('softvFrostApp').controller('UsuariosCtrl', UsuariosCtrl);

function UsuariosCtrl(usuarioFactory, $state, ngNotify) {

	function Init() {
		usuarioFactory.getUsuarioList().then(function(data) {
			vm.Usuarios = data.GetUsuarioListResult;
		});
	}

	function EditaUsuario(x) {

		$state.go('home.provision.editausuario', {
			obj: x
		});
	}

	function BuscaUsuario() {
		if (vm.Busuario == null) {
			ngNotify.set('El campo busqueda esta vacio', 'error');
			return;
		}
		usuarioFactory.BuscaUsuario(vm.Busuario).then(function(data) {
			vm.Usuarios = data.GetUsuario2ListResult;
		});
	}

	var vm = this;
	Init();
	vm.EditaUsuario = EditaUsuario;
}
