'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalDetalleSuscriptorCtrl', function($uibModalInstance, $uibModal, suscriptor, SuscriptorFactory, $rootScope, ngNotify) {
		this.$onInit = function() {
			SuscriptorFactory.getTerminals(suscriptor.IdSuscriptor).then(function(data) {
				vm.terminales = data.GetDeepIdSuscriptorResult;
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}



		var vm = this;
		vm.cancel = cancel;
		vm.suscriptor = suscriptor;

	})
