'use strict';
angular.module('softvFrostApp').controller('PermisosCtrl', PermisosCtrl);

function PermisosCtrl(permisoFactory, rolFactory, ngNotify) {
	function Init() {
		rolFactory.GetRoleList().then(function(data) {
			vm.Roles = data.GetRoleListResult;
			vm.Rol = vm.Roles[0];
			GetModuleList();
		});
	}

	function GetModuleList() {
		permisoFactory.GetModuleList().then(function(data) {
			var modulos = data.GetModuleListResult;
			console.log(data);
			permisoFactory.GetPermisoList(vm.Rol.IdRol).then(function(data) {
				var permisos = data.GetPermiRolListResult;
				console.log(data.GetPermiRolListResult);
				vm.Modules = MergePermisos(modulos, permisos);
			});
		});
	}

	function MergePermisos(modulos, permisos) {
		if (permisos.length > 0) {
			for (var a = 0; a < modulos.length; a++) {
				for (var b = 0; b < permisos.length; b++) {
					if (modulos[a].IdModule == permisos[b].IdModule) {
						modulos[a].OptAdd = permisos[b].OptAdd;
						modulos[a].OptDelete = permisos[b].OptDelete;
						modulos[a].OptUpdate = permisos[b].OptUpdate;
						modulos[a].OptSelect = permisos[b].OptSelect;

					}
				}
			}

		} else {
			for (var a = 0; a < modulos.length; a++) {
				modulos[a].OptAdd = false;
				modulos[a].OptDelete = false;
				modulos[a].OptUpdate = false;
				modulos[a].OptSelect = false;

			}
		}
		return modulos;
	}

	function ObtenPermisos() {
		GetModuleList();
	}

	function Guardar() {
		if (vm.Rol == null) {
			ngNotify.set('Selecciona algún rol para continuar.', 'error');
			return;
		}
		permisoFactory.GuardaPermisos(vm.Rol.IdRol, vm.Modules).then(function(data) {
			ngNotify.set('Los permisos se establecieron correctamente', 'success');

		});

	}
	var vm = this;
	Init();
	vm.ObtenPermisos = ObtenPermisos;
	vm.Guardar = Guardar;
}
